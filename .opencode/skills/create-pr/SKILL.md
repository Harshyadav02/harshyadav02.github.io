---

name: create-pr
description: Prepare a detailed GitHub pull request title and description from the current changes, and create the PR when a suitable GitHub integration is available.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Create Pull Request

When the user asks to create, raise, open, or submit a PR, follow this workflow.

## Hard Rules

* **Never commit to `main`.** Work on a dedicated feature branch named for the change (e.g. `fix/blog-tag-filtering`, `feat/xyz`).
* **Never push `main` to the remote directly.** `main` is updated only by merging a reviewed PR.
* When implementing a fix or feature (not only when asked for a PR), create a feature branch first and commit there. Pushing the feature branch is fine; pushing `main` is not.
* If you are on `main` with changes, create a feature branch (`git switch -c <feature-branch>`) before committing.
* If the requested change is already committed on `main` (e.g. pushed directly by mistake), do NOT open a PR for it. Report that it bypassed the PR flow and ask how to proceed.
* Do not open an empty PR. If the feature branch has no commits ahead of `main`, there is nothing to PR.

## 1. Inspect the Changes

First inspect the repository:

* `git status`
* `git branch --show-current`
* `git remote -v`
* `git log --oneline`
* `git diff`
* `git diff --cached`

Determine:

* Current branch
* Target/base branch
* Commits that will be included
* Uncommitted changes
* Files changed
* Purpose of the changes

Do not create a PR description based only on the user's request. Base it on the actual repository changes.

Before proceeding, verify the current branch is not `main`. If it is, the change needs a feature branch — see Commit Changes. Confirm whether any commits were pushed directly to `main`; if so, there is nothing to PR.

## 2. Review the Complete Diff

Review all changes that will be included in the PR.

If changes are currently uncommitted:

1. Identify the files belonging to the requested task.
2. Do not include unrelated pre-existing changes.
3. Review the complete diff before committing.

## 3. Validate Changes

Run relevant validation when applicable.

For example:

* Unit tests
* Linting
* Helm lint
* Helm template rendering
* Kubernetes manifest validation
* Repository-specific CI commands

Only report validation that was actually performed.

## 4. Commit Changes

If the requested changes are not committed:

1. Ensure you are on a feature branch, not `main`. If on `main`, create one first with `git switch -c <feature-branch>` before staging anything.
2. Stage only files related to the requested task.
3. Review the staged diff.
4. Create a concise conventional commit message.
5. Commit the changes.
6. Push the feature branch to the remote with `git push -u origin <feature-branch>`.

Do not blindly use `git add .`.

Do not commit unrelated changes.

Do not push `main`.

## 5. Generate PR Title

Generate a concise PR title based on the actual changes.

Prefer conventional wording when appropriate.

Examples:

* `docs: refresh profile README content and tech stack`
* `feat: add Kubernetes descheduler configuration`
* `fix: correct OpenSearch node affinity`
* `chore: update Helm dependency`

## 6. Generate Detailed PR Description

Always generate a complete PR description, regardless of whether the PR can actually be created.

The description must be based on the actual diff and commits.

Use this structure:

## Summary

Briefly explain what changed and the purpose of the change.

## Changes

List the important changes made.

Be specific. Mention relevant files, components, configuration, or functionality when useful.

## Technical Details

Explain important implementation details and design decisions.

For configuration or infrastructure changes, explain relevant behavior such as scheduling, resource allocation, deployment behavior, networking, storage, or observability when applicable.

## Validation

List the validation that was actually performed.

If no tests were run, explicitly state that.

Do not invent test results.

## Impact

Explain the operational or user-facing impact.

For documentation-only changes, explicitly state that there is no runtime or operational impact.

For infrastructure changes, mention potential deployment or operational considerations.

## Notes

Mention anything reviewers should know, including follow-up work or limitations when applicable.

### PR Description Quality Rules

* Do not write a generic description.
* Do not simply repeat the commit message.
* Do not describe changes that are not present in the diff.
* Do not invent tests, validation, screenshots, or implementation details.
* Explain the "why" when it can be determined from the changes.
* Prefer concrete technical details over vague statements.
* Make the description useful to someone reviewing the PR without having to inspect every changed line.

## 7. Confirm Before Creating the PR

Before creating or submitting the PR, always stop and ask the user for explicit confirmation.

* Present the file that are changed and will be commited in the pr. 
* Present the generated PR title and a summary of the changes.
* Wait for the user to approve before creating the PR.
* Do not create the PR automatically, even if a GitHub integration, MCP, or CLI is available.
* If the user asks to modify the title or description, apply their edits and confirm again before creating the PR.

Only after the user explicitly confirms, proceed to create the PR.

## 8. Create the PR

If a suitable GitHub integration, MCP, or CLI is available and the user has confirmed, create the PR using the available mechanism.

The PR must use the generated title and detailed description.

If PR creation fails:

* Do not discard the generated PR description.
* Clearly report why PR creation failed.
* Return the generated PR title and complete PR description so it can be pasted into GitHub manually.
* If a PR URL is available for manually creating the PR, provide it.

PR creation failure must not prevent the PR title and description from being generated.

## 9. Final Response

Always report:

* PR title
* PR description
* Validation performed
* Commit created
* PR URL if successfully created
* Reason for failure if PR creation was unsuccessful
