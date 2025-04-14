# MCP Server for NPM Package Info

A Model Context Protocol server that provides a tool to fetch npm package information.

## Features

- Exposes a `getNpmPackageInfo` tool using MCP
- Uses STDIO transport for IDE integrations (like Cursor)
- Returns structured package information

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

This server is designed to be used with IDE integrations like Cursor that support the Model Context Protocol.

### Tool: getNpmPackageInfo

Parameters:
- `packageName` (string): The name of the npm package to look up

Returns:
- `packageInfo` (object): JSON object containing all available information about the package
