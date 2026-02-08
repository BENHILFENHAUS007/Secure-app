# Secure-app: GitHub Actions Approval Workflow

This repository now includes a **manual GitHub Actions approval flow** that mimics the “propose -> approve -> apply” lifecycle.

## Why this exists
Perplexity's in-chat **Approve / Refine** UI is an internal agent workflow, not a native GitHub feature.
If you want a GitHub-native equivalent, use this workflow:

- `.github/workflows/github-agent-approval.yml`

## How to use

1. Open **Actions → GitHub Agent Approval Flow**.
2. Click **Run workflow** with:
   - `mode=propose`
   - `step_name=<logical change step>`
   - optional `files_hint`
3. Review the step summary output.
4. Re-run with `mode=apply` once approved.

## Required one-time repo setup

To force a true approval gate before apply:

1. Go to **Settings → Environments**
2. Create environment: `production-approval`
3. Add **Required reviewers**

When `mode=apply` is used, GitHub will pause for environment approval before running the apply job.

## Suggested operator prompt style

Use prompts that explicitly request staged proposals before apply, for example:

> Propose one logical change step at a time. Wait for approval before applying. Do not auto-push.
