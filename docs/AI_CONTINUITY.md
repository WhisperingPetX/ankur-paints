# Ankur Paints — AI-Assisted Engineering Continuity Protocol

**Document Version:** 1.2.0  
**Phase:** Phase 1 — Requirements Discovery & SOP Analysis  
**Last Updated:** 2026-10-20  
**Objective:** Guarantee consistent, reliable, error-free engineering across disparate AI sessions, models, and conversation boundaries.

---

## 1. The Context Boundary Reality

A new conversation session with an AI assistant (such as ChatGPT, Claude, or Antigravity) begins with **zero ambient memory** of previous conversations, past debugging attempts, or uncommitted code discussions.

> [!IMPORTANT]
> **No Automatic Memory or Workspace Access:** A new ChatGPT conversation has **no automatic access to previous chat history** and **no automatic connection to your local computer's filesystem or workspace**. It cannot inspect your files unless they are running in an IDE agent configured with local access, or you explicitly upload/paste the project files into that conversation.

- A new AI assistant session **only** knows what is explicitly provided to it:
  1. The prompt, text instructions, and files uploaded or pasted into the chat by the user.
  2. Local files only if the environment specifically provides local filesystem tool access (e.g. Antigravity IDE workspace).
- **The documentation files in `docs/` are designed to be portable context packages.** When starting a new ChatGPT conversation, the user should provide or upload `PROJECT_HANDOVER.md` and `PROJECT_STATUS.md` so the new AI instance immediately understands the project purpose, current phase, verified state, and exact next step without confusion or repetition.

---

## 2. Protocol at the Beginning of Each Session (Session Start)

Every AI assistant starting a new task on the Ankur Paints project MUST execute the following sequential discovery steps before writing or modifying any code:

1. **Locate and Set the Project Root:**
   - Confirm the working directory is `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints` (or the authorized active workspace).
   - Check if the repository has uncommitted changes or unstaged files.

2. **Read the Core Governance Documents:**
   - Read `docs/PROJECT_HANDOVER.md` to understand the high-level status, verified scope, and current phase.
   - Read `docs/PROJECT_STATUS.md` to identify the exact verified task previously completed and the specified "Next Action".
   - Read `docs/DECISIONS_LOG.md` to understand agreed architecture choices and avoid proposing discarded alternatives.
   - Read `docs/OPEN_QUESTIONS.md` to avoid making assumptions on unresolved business rules.

3. **Compare Documentation Against Disk Reality:**
   - Verify that files claimed to exist in `PROJECT_STATUS.md` actually exist on the filesystem.
   - Run verification commands (e.g., `git status`, test runners, linter checks) to confirm that the state is clean.
   - **Identify Contradictions:** If the documentation claims a feature is implemented or tested, but the code is missing or failing, the assistant must immediately report this discrepancy to the user before proceeding.

4. **Confirm the Current Phase & Task:**
   - Match the user's prompt against the 15-phase roadmap. If the user asks for code belonging to Phase 5 while Phase 2 is incomplete, remind the user of the staged gate and seek explicit confirmation.

---

## 3. Protocol During Execution (In-Flight Task Rules)

1. **One Small, Verifiable Step at a Time:**
   - Never combine major refactoring, schema changes, and UI authoring into a single unverified step.
   - Write complete, robust code. Avoid placeholders such as `// TODO: Implement later` or omitting error handling.
2. **Preserve Documentation & Code Integrity:**
   - Preserve comments, type definitions, and existing test suites.
   - Do not delete, rename, or overwrite files without explicit user instruction.
3. **Never Fabricate Credentials or Business Rules:**
   - Never guess secret keys, passwords, or production endpoints.
   - Never assume incentive percentages, tax rates, or pricing tiers without referencing `docs/OPEN_QUESTIONS.md` or receiving direct confirmation.

---

## 4. Protocol at the End of Each Task (Task Wrap-Up)

Before completing a response or handing back control to the user, the AI assistant MUST perform the following wrap-up sequence:

1. **Execute Concrete Verification Checks:**
   - Run type checks (`tsc --noEmit`), linters (`eslint`), or test suites (`npm test` / unit tests).
   - Verify that the newly written code compiles and functions without regressions.
2. **Distinguish Implemented Work from Tested Work:**
   - Clearly state what was coded versus what was end-to-end verified with simulated or manual test runs.
   - Never claim a backup, deployment, database migration, or Git commit exists unless explicitly verified via tool output.
3. **Update the Documentation:**
   - Update `docs/PROJECT_STATUS.md` with:
     - The task completed.
     - Files created, edited, or removed.
     - Exact checks performed and their tangible results.
     - Any new open questions or blockers discovered.
     - Exactly one unambiguous, concrete **Next Action**.
   - If an architectural or business decision was made, append an entry to `docs/DECISIONS_LOG.md`.
   - Update `docs/PROJECT_HANDOVER.md` if the phase transitioned or milestone was achieved.
4. **Present a Crisp Status Summary:**
   - Summarize what was completed, verified facts, and provide the exact next step for the user.

---

## 5. Summary Checklist for AI Assistants

```markdown
[ ] 1. Read docs/PROJECT_HANDOVER.md and docs/PROJECT_STATUS.md?
[ ] 2. Verified workspace file existence and Git status?
[ ] 3. Identified and reported any discrepancies between docs and code?
[ ] 4. Stayed strictly within the active phase boundaries?
[ ] 5. Ran actual tests / type checks on all modified code?
[ ] 6. Updated docs/PROJECT_STATUS.md with verified results and next action?
[ ] 7. Preserved all secrets and avoided guessing business logic?
```
