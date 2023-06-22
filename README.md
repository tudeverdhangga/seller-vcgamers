# VCGamers



## Seller's App

Repository akan disediakan oleh VCGamers, beserta setup dan pipeline untuk CI/CD nya.

Setiap hari akan ada daily report meliputi Apa yang dikerjakan kemarin, Apa yang akan dikerjakan hari ini, Obstacle/Blocker yang sedang dihadapi.

## Feature Branch Rules

Branch Naming Convention: Branches should be named `<username>/<role>/<details>.`

Branch Lifespan: Branches should be short-lived and merged into the trunk as soon as the feature is complete.

*Branch from Trunk: Always create new branches from the trunk.*

*Rebase Often: Rebase your branch from the trunk frequently to minimize merge conflicts.*

## Commit Rules

Commit messages should follow these conventions:

- add: for new features (Example: add: User registration feature)
- fix: for bug fixes (Example: fix: Resolve login bug)
- cicd: for changes to the CI/CD pipeline (Example: cicd: Update test pipeline)
- chore: for routine tasks or maintenance activities (Example: chore: Update dependencies)
- docs: for changes to documentation (Example: docs: Update API reference)
- refactor: for code changes that neither fix a bug nor add a feature (Example: refactor: Simplify authentication logic)
- style: for changes that do not affect the meaning of the code (like formatting) (Example: style: Fix indentations)
- test: for adding or correcting existing tests (Example: test: Add unit tests for user registration)
- deploy: for changes in the deployment process using Argo CD (Example: deploy: Update Argo CD manifest)
- plugin: for adding or updating plugins in KrakenD (Example: plugin: Add rate limiting plugin in KrakenD)
- helm: for updating or adding Helm charts (Example: helm: Update chart for new service)