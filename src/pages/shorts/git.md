---
layout: ../../layouts/Layout.astro
title: 'Multiple git config files'
pubDate: 2022-07-01
description: "Separate your Git configs for work and personal using includeIf and multiple config files."
author: 'Šárka Chwastková'
tags: ["git", "configuration"]
---
# Git config

Have you ever wondered how to distinguish your git config between your work and personal profiles?

Actually, it's not to difficult and tricky as it could look at first sight.

In my example, I wanted to distinguish the config file for work repositories on GitLab and personal repositories on GitHub.

1. Create the first git config file:
```bash
# file: ~/.gitconfig-personal
[user]
	name = John Doe
	email = john.doe@gmail.com
```
2. Create the second git config file:
```bash
# file: ~/.gitconfig-work
[user]
	name = John Doe
	email = work.john.doe@companyabc.com
```
3. Edit your `.gitconfig` file:
```bash
# file: ~/.gitconfig
[includeIf "hasconfig:remote.*.url:**github.com:*/*.git"]
	path = ~/.gitconfig-personal

[includeIf "hasconfig:remote.*.url:**gitlab.companyabc.com:*/*.git"]
	path = ~/.gitconfig-work
```

... and that's all!