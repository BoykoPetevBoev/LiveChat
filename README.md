## SoftUni Fest 2021
## Terminal Cheat Sheet

| Commands | Notes |
| -------- | ----- |
| `mkdir`  | create new directory |
| `rmdir <FolderName>`  | remove directory |
| `touch <FileName>` | create new file |
| `open ` | open file |
| `rmd` | delete file |
| `explorer .` | ppen a file explorer in current directory |

## Working with Git

| Commands | Notes |
| -------- | ----- |
| `git init` | initializes the repository |
| `git chechout master` | use master branch |
| `git chechout -b <BranchName>` | create new local branch |
| `git branch -d <Branchname>`   | deletes local branch |
| `git push origin master` | send changes to the master branch of your remote repository |
| `git pull` | fetch and merge changes on the remote server to your working directory |
| `git status` | show those *unknown* files |
| `git add .` |  add those *unknown* files |
| `git commit -m "message"` |  commit all changes |
| `git push` | push changes in GitHub |

### Git commit in Master
1. `git status`
2. `git add .`
3. `git commit -m "message"` 
4. `git push`

### Git commit in branch
1. `git checkout master`
2. `git pull`
3. `git checkout -b "branch-name"`
4. `...`
5. `git status`
6. `git add .`
7. `git commit -m "message"` 
8. `git push --set-upstream origin branch-name`
