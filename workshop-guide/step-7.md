# Step 7

## Goals

- Learn about indirect prompt injection
- Learn about the dangers of YOLO modes that allow coding agents to invoke tools without HITL

## Your Tasks

1. Restart your coding agent with YOLO flags
   - If you're using the Gemini CLI, you can invoke it using `gemini --yolo`
2. Now let's use one of the MCP server tools as follows: `get npm package insights for react` (or maybe try one of: `use the getNpmPackageInsights tool to show me insights for package lodash`, `fetch download insights for react use the mcp server tool`)
3. What did the Gemini coding agent do? did it trigger the MCP Server tool? did it also read sensitive files on disk? did it send them to a remote URL...?
4. Why did Gemini CLI do that? ("it just followed instructions"...? exactly)
5. Now ponder and suggest
   - What's a real world scenario of this kind of indirect prompt injection happening? (e.g... attackers can embed this as part of the description or README of an actual real legitimate package on the npmjs registry...?)
   - How would you mitigate this?