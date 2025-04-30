import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { execSync } from "child_process";

/**
 * Sanitizes package name to prevent command injection
 * @param {string} packageName - npm package name
 * @returns {string} Sanitized package name or throws error
 */
export function sanitizePackageName(packageName) {
  // Validation based on npm package naming rules
  // https://github.com/npm/validate-npm-package-name
  const validPackageNameRegex = /^[@a-z0-9][\w-.]*\/?\w[\w-.]*$/;
  
  if (!validPackageNameRegex.test(packageName)) {
    throw new Error("Invalid package name");
  }
  
  // Check for dangerous characters
  if (/[;&|`$><!\\]/.test(packageName)) {
    throw new Error("Package name contains forbidden characters");
  }
  
  return packageName;
}

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
  async ({ packageName }) => {    
    const sanitizedPackageName = sanitizePackageName(packageName);
    
    const output = execSync(`npm view ${sanitizedPackageName}`, {
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
