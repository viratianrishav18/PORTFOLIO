# Contributing to Portfoliop

Thank you for contributing. This document defines the expected workflow and quality bar for all changes.

## 1. Branching and Workflow

- `main` must remain stable and deployable.
- Do not commit directly to `main`.
- Create a focused branch for each change.

### Branch Naming

Use lowercase and hyphenated names:

- `feature/<scope>-<description>`
- `bugfix/<scope>-<description>`
- `hotfix/<scope>-<description>`
- `chore/<scope>-<description>`
- `release/vX.Y.Z`

Examples:

- `feature/ui-contact-form-validation`
- `bugfix/repos-empty-state`

## 2. Local Setup

```bash
git clone https://github.com/<your-username>/Portfoliop.git
cd Portfoliop
npm install
```

## 3. Daily Development Cycle

1. Sync before coding:

```bash
git checkout main
git pull --rebase
```

2. Create your branch:

```bash
git checkout -b feature/<scope>-<description>
```

3. Make focused changes.

4. Stage only relevant files:

```bash
git add <file1> <file2>
```

5. Review staged changes:

```bash
git diff --staged
```

6. Commit using clear, conventional messages.

7. Push branch:

```bash
git push -u origin <your-branch>
```

8. Open a Pull Request and request review.

## 4. Commit Message Standard

Use Conventional Commits:

```text
type(scope): short imperative summary
```

Examples:

- `feat(hero): add animated intro headline`
- `fix(contact): prevent duplicate submit`
- `docs(readme): update setup instructions`

Allowed types:

- `feat`
- `fix`
- `refactor`
- `docs`
- `test`
- `chore`
- `perf`
- `ci`
- `build`

Rules:

- One logical change per commit.
- Use imperative mood (add, fix, update, remove).
- Keep subject concise (prefer <= 72 characters).
- Add a commit body when rationale is not obvious.

## 5. Pull Request Expectations

Each PR should:

- Be small and focused.
- Reference the related issue (if any).
- Include test evidence.
- Include screenshots for UI changes.
- Describe risk and rollback approach when relevant.

Before requesting review:

```bash
git fetch origin
git rebase origin/main
npm run build
```

## 6. Quality Gate

At minimum, ensure:

- Build passes (`npm run build`).
- Linting passes (if configured).
- No secrets or environment credentials are committed.
- Documentation is updated when behavior changes.

## 7. Merge and Cleanup

After your PR is merged:

```bash
git checkout main
git pull --rebase
git branch -d <your-branch>
git fetch --prune
```

Delete merged remote branches to keep the repository clean.

## 8. Releases and Tags

Use annotated semantic version tags:

```bash
git checkout main
git pull --rebase
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

Versioning follows Semantic Versioning:

- Major: breaking changes
- Minor: backward-compatible features
- Patch: backward-compatible fixes
