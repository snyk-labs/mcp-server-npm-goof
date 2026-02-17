# Step 3

## Goals

- Understand the security implications of vulnerable tools in the MCP Server
- Learn how to identify and exploit vulnerabilities in MCP Server tools
- Gain hands-on experience with security testing of MCP Server tools
- Understand the importance of secure coding practices when developing MCP Server tools

## Your Tasks

In this step, we will explore the security concern of vulnerable tools in the MCP Server, your job is to complete the following tasks:

1. Review the code of the MCP Server and identify any tools that may have security vulnerabilities. Pay special attention to tools that execute shell commands or access the file system, such as the `getNpmPackageInfo` tool.
2. What security vulnerabilities can you identify in the `getNpmPackageInfo` tool? Can you explain the security vulnerability associated with this tool implementation?
3. Consider how an attacker might exploit this tool to execute arbitrary commands or access sensitive information on the server. Try to craft a malicious input that could be used to exploit the vulnerability in the `getNpmPackageInfo` tool. For example, you might try to input a package name that includes shell command injection payloads.
4. Check the MCP Server logs to see if your malicious input was received and if the vulnerability was successfully exploited. What was the outcome of your exploit attempt? Did you manage to execute arbitrary commands or access sensitive information on the server? If so, what information were you able to access or what commands were you able to execute?

