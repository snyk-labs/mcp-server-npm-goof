# MCP Server for NPM Package Info

A Model Context Protocol server that provides a tool to fetch npm package information.

**Security Disclaimer**: this repository is intentionally vulnerable, intended to be used as an educational tool for MCP Server security.

## How to use the MCP Server

Define the MCP Server in your Agent MCP configuration, as follows:

```json
{
    "servers": {
        "npm-and-node-tools": {
            "type": "http",
            "url": "http://localhost:3500/mcp"
        }
    },
    "inputs": []
}
```

## Features

- Exposes a `getNpmPackageInfo` tool using MCP
- Uses HTTP (Streamable HTTP) transport for remote connections
- Returns structured package information
- Supports session management for stateful connections

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

The server will start listening on port 3000 by default. You can customize the port by setting the `PORT` environment variable:

```bash
PORT=3500 npm start
```

This server is designed to be used with IDE integrations and AI agents that support the Model Context Protocol over HTTP.

### Tool: getNpmPackageInfo

Parameters:
- `packageName` (string): The name of the npm package to look up

Returns:
- `packageInfo` (object): JSON object containing all available information about the package
