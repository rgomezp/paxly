#!/usr/bin/env node

/**
 * Wrapper script for `eas build` that fixes the cleanup bug in @expo/build-tools
 *
 * The bug: process.kill() is called on a process that doesn't exist, causing ESRCH error
 * The fix: Use NODE_OPTIONS to inject a require hook that patches process.kill globally
 *
 * This wrapper patches process.kill at the module level before any child processes are spawned.
 */

const { spawn } = require("child_process")
const path = require("path")
const fs = require("fs")

// Create a patch module that fixes process.kill
// eslint-disable-next-line no-undef
const patchModulePath = path.join(__dirname, ".process-kill-patch.js")
const patchModuleContent = `
// Patch process.kill to handle ESRCH errors gracefully
const originalKill = process.kill;
process.kill = function(pid, signal) {
  try {
    return originalKill.call(this, pid, signal);
  } catch (error) {
    // ESRCH = "No such process" - this is the cleanup bug in @expo/build-tools
    // If the process doesn't exist, it's already gone, so we can safely ignore this
    if (error.code === 'ESRCH' || error.errno === -3) {
      // Silently ignore - the process was already terminated
      return true;
    }
    // Re-throw other errors
    throw error;
  }
};
`

fs.writeFileSync(patchModulePath, patchModuleContent)

// Set NODE_OPTIONS to require our patch module before anything else
// This ensures the patch is applied in all child processes
const originalNodeOptions = process.env.NODE_OPTIONS || ""
const nodeOptions = originalNodeOptions
  ? `${originalNodeOptions} -r ${patchModulePath}`
  : `-r ${patchModulePath}`

// Get the eas build arguments
const args = process.argv.slice(2)

// Spawn eas build with the patched environment
const easBuild = spawn("eas", ["build", ...args], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  },
})

easBuild.on("error", (error) => {
  console.error("Failed to start eas build:", error)
  // Clean up patch module
  try {
    fs.unlinkSync(patchModulePath)
  } catch {}
  process.exit(1)
})

easBuild.on("exit", (code) => {
  // Clean up patch module
  try {
    fs.unlinkSync(patchModulePath)
  } catch {}
  process.exit(code || 0)
})

// Handle cleanup on unexpected termination
process.on("SIGINT", () => {
  try {
    fs.unlinkSync(patchModulePath)
  } catch {}
  process.exit(1)
})

process.on("SIGTERM", () => {
  try {
    fs.unlinkSync(patchModulePath)
  } catch {}
  process.exit(1)
})
