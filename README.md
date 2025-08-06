# PotionForge 🧪

A monorepo for React Native mobile applications powered by [Ignite](https://github.com/infinitered/ignite), using [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) for package management.

## Project Structure

This project uses a **Yarn Workspaces monorepo** structure where:

- **Single workspace**: The entire project is one Yarn workspace
- **Multiple packages**: Each directory in `/apps` is a package within that workspace
- **Shared dependencies**: Dependencies are hoisted to the root `node_modules` when possible
- **Unified management**: Commands can be run across all packages from the root

```
potionforge/
├── apps/           # Mobile applications directory
│   └── MyApp/     # Each app is a package within the workspace
├── package.json    # Root workspace configuration
└── README.md      # This file
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Yarn](https://yarnpkg.com/) (v1.22 or newer)
- [React Native development environment](https://reactnative.dev/docs/environment-setup)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd potionforge
   ```

2. Install dependencies (this will install for all packages in the workspace):
   ```bash
   yarn install
   ```

## Creating a New App

1. Create a new project in https://expo.dev. Copy the project ID.

1. Make a new app

```sh
./scripts/make
```

Follow the instructions, input the project ID, and update the assets if desired.

2. Create a new Firebase project

3. Add/register iOS app

4. Input a bundle id.

5. Download iOS plist and move it to the googleServices directory in the new project.

6. Add/register Android app

7. Download google-services.json and move it to the googleServices directory in the new project.

## Development

Each app in the `apps` directory is a React Native application package with its own:
- `package.json`
- Dependencies
- Scripts
- Configuration

However, they all share the same workspace, which provides benefits like:
- **Dependency sharing**: Common dependencies are installed once at the root
- **Cross-package development**: Easy to develop multiple related apps together
- **Unified tooling**: Linting, testing, and building can be coordinated across all apps
- **Version consistency**: Ensures all apps use compatible versions of shared dependencies

To work on a specific app:

1. Navigate to the app directory:
   ```bash
   cd apps/your-app-name
   ```

2. Start the development server:
   ```bash
   yarn start
   ```

3. Run the app:
   ```bash
   # For iOS
   yarn ios

   # For Android
   yarn android
   ```

## Workspace Scripts

- `yarn clean`: Clean all workspaces (runs the clean script in each package)

## License

Private - All Rights Reserved