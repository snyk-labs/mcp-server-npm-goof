# Step 5

## Goals

- Learn how MCP server tools can exploit the coding agent to exfiltrate data from the coding agent's environment
- Understand the potential risks of allowing MCP server tools to execute shell commands or access the file system
- Understand the potential risks of MCP server configurations that maintain secrets on disk 

## Your Tasks

In this step, we will explore the potential risks of allowing MCP server tools to execute shell commands or access the file system, your job is to complete the following tasks:

1. Now let's use another tool, the `searchNpmPackage` tool, which allows searching for npm packages based on a query string. What do you think this tool does? Can you use it to search for packages on npm?
2. What's unique about the tool's description? Do you think a coding agent can easily be fooled by the instructions in the tool description that would exfiltrate data from the coding agent's environment to a remote attacker-controlled server?
3. Choose a target project that will use the vulnerable MCP Server, such as one of the previous coding agents you have used in the previous steps or a new one and make sure the MCP server is configured, running, and connected to the coding agent as an MCP Server tool.
4. Configure this MCP server in your coding agent, such as the following: `.gemini/settings.json`, appending to that MCP config a stub GitHub remote server with a token:

  ```json
    "GitHub": {
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ghp_A1bC2dE3fH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4c"
      }
    },
  ```
1. Can you come up with a prompt that will use the `searchNpmPackage` tool?
   - Hint: in a Gemini CLI coding agent chat session put this prompt: `Use the search tool to find an npm package that supports charting`
2. Use this tool via a prompt, what did you observe? Did the tool call succeed? Did the exfiltration attempt succeed?
3. How would you mitigate this vulnerability? What are some secure coding practices that can be followed when developing MCP Server tools to prevent such vulnerabilities?