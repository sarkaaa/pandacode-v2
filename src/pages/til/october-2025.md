---
layout: ../../layouts/Layout.astro
title: 'October 2025'
---

# What I have learned in October 2025

## PNPM

**PNPM has a built in patch system**

Patching is explained on the [official website](https://pnpm.io/cli/patch).

**Phantom dependency prevention**

A phantom dependency is a package imported in the codebase but not declared directly; it is pulled in transitively by another dependency. If that parent dependency is removed, your code may break because the phantom dependency is no longer installed.

```json
// package.json
{
  ...
  "devDependencies": {
    "a": "^1.0.0"
  }
}
```

```js
// project codebase
import * from 'a'
import * from 'b' // does not exist in package.json

b.call();
```

Package b is not specified in package.json, but installed by a dependency. Once we uninstall a, the error will occur.

## Autocannon

A simple benchmarking tool for HTTP/HTTPS.

Check it out [here](https://github.com/mcollina/autocannon).
