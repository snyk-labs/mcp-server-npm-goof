# Step 6

## Goals

- Learn about MCP server Resources and how they can be used by coding agents
- Understand the potential security implications of vulnerable resource handlers in the MCP Server
- Learn about path traversal vulnerabilities and how they can be exploited in the context of MCP Server resource handlers
- Gain hands-on experience with identifying and exploiting vulnerabilities in MCP Server resource handlers

## Your Tasks

In this step,

1. For this task, we'll need to use a coding agent (or any other AI agent) that supports MCP Server Resources.
2. The following instructions assume access and usage of the GitHub Copilot coding agent. Add the MCP Server to it `.vscode/mcp.json` file:
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
3. Add a `.github/workflows` folder to the root of the target project (where you are actually working with the coding agent), and create a `ci.yaml` file in it:
    ```yaml
        name: CI

        on:
        push:
            branches: [ main ]
        pull_request:
            branches: [ main ]

        jobs:
        test:
            runs-on: ubuntu-latest
            
            strategy:
            matrix:
                node-version: [18, 20, 22]
            
            steps:
            - uses: actions/checkout@v4
            
            - name: Use Node.js ${{ matrix.node-version }}
            uses: actions/setup-node@v4
            with:
                node-version: ${{ matrix.node-version }}
                cache: 'npm'
            
            - name: Install dependencies
            run: npm ci
            
            - name: Check syntax
            run: node --check index.js
            
            - name: Test server startup
            run: timeout 10s npm start || true
    ```
4. Now in that reference project you are using the vulnerable MCP server you want to start using resources as follows:
5. Open the Command Palette and make sure you have the MCP server started (MCP: Start Server)
6. Open the Command Palette and run the command `MCP: Browse Resources`
7. In the input box that appears, enter `ci` and hit Enter
8.  You should see the contents of the `ci.yaml` file appear in a new editor
9.  Now, to demonstrate the vulnerability, open the Command Palette and again open the `MCP: Browse Resources` command
10. This time, in the input box that appears, enter a URL encoded path traversal payload such as `%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd` and hit Enter
11. You should see the contents of the `/etc/passwd` file appear in a new editor, demonstrating the path traversal vulnerability in the MCP server
