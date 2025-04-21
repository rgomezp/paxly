# PotionForge 🧪

A monorepo for React Native mobile applications powered by [Ignite](https://github.com/infinitered/ignite).

## Project Structure

```
potionforge/
├── apps/           # Mobile applications directory
│   └── ...        # Each app is a separate workspace
├── package.json    # Root package configuration
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

2. Install dependencies:
   ```bash
   yarn install
   ```

## Creating a New App

To create a new mobile app in the monorepo:

1. Navigate to the apps directory:
   ```bash
   cd apps
   ```

2. Create a new Ignite app:
   ```bash
   npx ignite-cli@latest new YourAppName
   ```

3. The new app will be automatically added to the workspace.

## Development

Each app in the `apps` directory is a standalone React Native application with its own:
- `package.json`
- Dependencies
- Scripts
- Configuration

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

## Scripts

- `yarn clean`: Clean all workspaces

## License

Private - All Rights Reserved 