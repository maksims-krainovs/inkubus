# Inkubus Project Context

This document provides context for AI agents working on the Inkubus project.

## Overview

Inkubus is a command-line interface (CLI) application built with Node.js, TypeScript, and the Ink library for React-based terminal UIs. Its primary function is to display and manage environment variables from `.env` files located in the `config/` directory.

## Key Technologies

-   **Language:** TypeScript
-   **Framework:** React (via Ink)
-   **Platform:** Node.js
-   **UI:** Ink

## Architecture

-   **`source/app.tsx`**: The main application component. It manages the global state, including messages.
-   **`source/cli.tsx`**: The entry point for the CLI application. It renders the main React component using Ink.
-   **`source/useGetEnvs.tsx`**: A React hook responsible for finding and loading `.env` file names from the `config/` directory. It handles the loading state asynchronously.
-   **`source/MainWindow.tsx`**: The main UI component. It displays the content of the selected `.env` file and a list of available files for selection. It handles the "loading" and "no files found" states. It also validates the format of the highlighted `.env` file, checking that each line is a `KEY=VALUE` pair. It displays a `VALID` or `INVALID` status.
-   **`source/Messages.tsx`**: A component that displays status or error messages to the user. The application state is configured to only store the last 3 messages.
-   **`source/models.ts`**: Contains shared type definitions and constants, like `CONFIG_DIR` and `ENV_FILE_EXTENSION`.
-   **`config/`**: The directory where `.env` files (e.g., `test.env`, `prod.env`) are stored.

## Build & Run

To build and run the application:

```bash
npm run build && ./dist/cli.js
```