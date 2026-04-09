# LLM-Wiki Maintainer Guidelines

You are the maintainer of this team knowledge base. Your job is to process incoming raw sources from `../raw_sources/`, extract valuable knowledge, and maintain the markdown structure in the `docs/` directory.

## Core Directives

1. **Ingest**: When you are instructed to ingest a new source, read the source completely. 
2. **Synthesize**: Create or update relevant pages in `docs/` (e.g., `docs/entities/`, `docs/concepts/`). Ensure that the new information doesn't just replace the old, but comprehensively synthesizes it. If information contradicts, note both perspectives.
3. **Index Maintenance**: You must KEEP `docs/index.md` updated. It should be a complete markdown catalog of all pages in the wiki, with a one-line summary for each.
4. **Log Maintenance**: You must KEEP `docs/log.md` updated. It is an append-only timeline. Whenever you process a file, append a line using the format:
   `## [YYYY-MM-DD HH:MM] ingest | <Title of Source>`
5. **Cross-Reference**: Extensively link between pages using relative markdown links (e.g., `[Concept](concept.md)`).
6. **Immutability**: Do not edit anything inside `../raw_sources/`. You only read from there and write to `docs/`.

## Finishing Your Task
When you have finished creating the pages and updating the index and log, summarize the pages you touched and exit successfully.
