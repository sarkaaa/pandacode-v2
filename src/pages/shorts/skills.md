---
layout: ../../layouts/Layout.astro
title: 'Cursor SKILLS'
pubDate: 2026-05-12
description: "My humble Cursor skills."
author: 'Šárka Chwastková'
tags: ["cursor", "skills"]
---
# Cursor skills

I started collecting my Cursor agent skills in a public repository — [skills-vault](https://github.com/sarkaaa/skills-vault).

> *What are skills? A skill is a portable, version-controlled package that teaches agents how to perform domain-specific tasks. Skills can include scripts, templates, and references that agents may act on using their tools.* 
> Source: [Cursor skills](https://cursor.com/docs/skills)

## Playwright setup

The [pw-setup](https://github.com/sarkaaa/skills-vault/blob/main/skills/pw-setup/SKILL.md) skill scaffolds a full Playwright E2E project from scratch. Trigger it by asking the agent to create a new Playwright project or set up a test automation environment.

It sets up the following stack:

| Tool | Role |
|------|------|
| Playwright | E2E testing framework |
| Biome | Lint + format (replaces ESLint + Prettier) |
| Husky | Git hooks runner |
| commitlint | Enforce conventional commit messages |
| dotenv | `.env` support in tests |

The skill walks through every step — initialising the project with `pnpm`, configuring Biome, setting up Husky pre-commit hooks, wiring up commitlint for conventional commits, adding dotenv to `playwright.config.ts`, and even providing a ready-made GitHub Actions workflow using the official Playwright Docker image.
