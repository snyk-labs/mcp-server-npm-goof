# Step 2

## Goals

- Configure the MCP Server in an Agent MCP configuration
- Connect the Agent to the MCP Server and verify connectivity
- Explore how to use the tools exported by the MCP Server from the Agent

## Your Tasks

In this step, we will configure the MCP server in an Agent MCP configuration, your job is to complete the following tasks:

1. Define the MCP Server in your Agent MCP configuration. Use the following JSON snippet conventions for either Gemini CLI or OpenCode:

For Gemini CLI, add the following to your `settings.json`:

```json
{
  "mcpServers": {
    "npm-and-node-tools": {
      "type": "http",
      "url": "http://localhost:3500/mcp"
    }
  }
}
```

For OpenCode, add the following to your `opencode.jsonc`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "mcp": {
        "npm-and-node-tools": {
            "type": "remote",
            "url": "http://localhost:3500/mcp",
            "enabled": true
        }
    },
}
```

1. Make sure the MCP Server is running (from Step 1) and that your Agent can connect to it. You should see logs in the MCP Server console indicating that the server is receiving requests.
2. Can you find how to use one of the tools from the MCP server? Hint: you can try to use the `getNpmPackageInfo` tool to fetch information about a specific npm package. You can do this by sending a request to the MCP Server using the defined tool name and parameters. Check the MCP Server logs to see the incoming requests and responses.