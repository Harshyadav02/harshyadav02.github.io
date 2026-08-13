---

name: create-pr
description: Prepare a detailed GitHub pull request title and description from the current changes, and create the PR when a suitable GitHub integration is available.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Create Pull Request

When the user asks to create, raise, open, or submit a PR, follow this workflow.

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

1. Stage only files related to the requested task.
2. Review the staged diff.
3. Create a concise conventional commit message.
4. Commit the changes.

Do not blindly use `git add .`.

Do not commit unrelated changes.

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
