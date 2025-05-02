import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getNpmPackageInfo } from "./command.js";

const server = new McpServer({
  name: "npm JavaScript package management tools",
  version: "1.0.0",
  description: "Provides tools to get information about open source npm packages from the npmjs registry"
});

server.tool(
  "getNpmPackageInfo",
  "Get information about an npm package",
  {
    packageName: z.string()
  },
  getNpmPackageInfo
);

const transport = new StdioServerTransport();
await server.connect(transport);
