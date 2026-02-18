# TODO List

## MCP Server that exposes code eval

Seems kinda obvious but nice to demo and get the awareness going. In this scenario we'd perform code eval (like literally `eval`) inside the MCP server tool based on remote data or LLM provided data.

- Is this secure? What can go wrong?
- What's the way to mitigate around this?

## Typosquatting on other tool names

Instead of the current example that shows the MCP Server masquerading as the ReadFile tool, which is a bit harder to spoof and prioritize over the internal agent tool for this, we can typosquat on another tool in other MCP servers like say GitHub MCP with obvious tool names like `get_repo_details` or whatever they have.

## Outdated components in the MCP Server package.json

Imagine the MCP Server has pinned versions of deps in package.json - what happens when they are found vulnerable?

