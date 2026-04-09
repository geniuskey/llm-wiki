# LLM-Wiki: Web-Based Team Knowledge Repository

**LLM-Wiki** is a persistent, auto-maintained knowledge base powered by Large Language Models. Instead of typical RAG (Retrieval-Augmented Generation) where models rediscover information on every query, this system dynamically updates and cross-references a markdown-based wiki whenever new sources (files, URLs, text) are added.

The underlying reasoning engine is driven by **Claude Code CLI**, wrapped in a modern web architecture, so your human team members never have to do the manual bookkeeping of updating indexes, logging changes, or inter-linking documents.

## Core Features

- **Multi-format Ingestion**: Drag-and-drop PDFs, DOCX, PPTX, XLSX, and simple Text/Markdown files out-of-the-box.
- **URL Fetching**: Feed Jira, Confluence, or general web URLs to instantly capture their contents into the knowledge base.
- **Autonomous Maintenance**: The backend automatically triggers a subprocess using Anthropic's Claude CLI (`claude -p`) to read the raw sources, synthesize updates, maintain the `docs/index.md`, append to `docs/log.md`, and generate cross-references.
- **Flexible Deployment Toggle**: Use `.env` to decide whether changes are pushed to GitHub Actions (`github`) or built locally using MkDocs (`local`).

---

## Tech Stack
- **Frontend**: React (Vite) + TailwindCSS + Lucide Icons.
- **Backend / Scraper**: Python (FastAPI) utilizing `pdfplumber`, `python-docx`, `python-pptx`, `openpyxl`, and `beautifulsoup4`.
- **Knowledge Engine**: Claude CLI.
- **Wiki Platform**: [MkDocs Material Theme](https://squidfunk.github.io/mkdocs-material/).

---

## Directory Structure

```text
llm-wiki/
├── frontend/        # React Web UI for submitting documents and URLs
├── backend/         # FastAPI server taking tasks, parsing text, orchestrating Claude Code
├── wiki/            # The actual generated Markdown Wiki
│   ├── docs/        # Handled by Claude Code: Entity pages, concepts, index, log
│   ├── raw_sources/ # Immutable, raw ingested texts (extracted from PDF/PPTX/etc.)
│   ├── mkdocs.yml   # Wiki layout and UI configurations
│   └── CLAUDE.md    # The Core System Prompt & Rules for the Claude CLI
├── run_all.bat      # Quick-start launch script for Windows
└── run_all.sh       # Quick-start launch script for Linux/macOS
```

---

## Prerequisites & Setup

### 1. Custom LLM API Settings (Claude Code CLI)
If you wish to use your own custom LLM API endpoint (instead of the default Anthropic Cloud integration), you should configure your Claude Code Settings:
- On Windows: Modify or create `C:\Users\%USERNAME%\.claude\settings.json`.
- Add your custom endpoints, base URLs, and API tokens.
- When the backend invokes `claude -p`, it will transparently use your custom setup!

### 2. Dependencies
Ensure you have the following installed on your machine:
- **Node.js** (v18+)
- **Python** (3.10+) 
- **Git**

### 3. Environment Variables (`.env`)
At the root of the project, prepare your `.env` file (`.env.example` behavior):
```env
# Deployment mode: `local` or `github`
DEPLOYMENT_MODE=local

# Add your Web / URL ingestion tokens (Optional)
# JIRA_API_ENCODED_TOKEN=
# CONFLUENCE_API_TOKEN=
```

---

## How to Run Locally

You can launch both the React Frontend and the FastAPI Backend simultaneously using the provided launch scripts:

```bash
# Windows
.\run_all.bat

# Linux / macOS
bash run_all.sh
```

1. **Frontend (UI)** will be accessible via a Vite localhost URL (usually `http://localhost:5173`).
2. **Backend (API)** will bind to `http://localhost:8000`.

Once the servers are up, visit the UI, drop a document into the portal, and watch as Claude Code autonomously grows your Wiki engine!