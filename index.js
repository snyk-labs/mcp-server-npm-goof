import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { execSync } from "child_process";

const server = new McpServer({
  name: "npm JavaScript package management tools",
  version: "1.0.0"
});

server.tool(
  "getNpmPackageInfo",
  {
    packageName: z.string()
  },
  async ({ packageName }) => {    
    const output = execSync(`npm view ${packageName}`, {
      encoding: "utf-8",
    });

    return {
      content: [
        {
          type: "text",
          text: output
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
