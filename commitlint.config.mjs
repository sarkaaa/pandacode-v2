export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 72],
    "type-enum": [2, "always", ["feat", "fix", "test", "chore", "revert", "ci"]],
    "scope-enum": [2, "always", ["content", "components", "pages", "layouts", "styles", "types", "configs", "other"]],
    "subject-case": [2, "always", "sentence-case"],
    "body-empty": [0],
    "footer-empty": [1, "always"],
  },
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: '⚠️ can not be empty',
      upperLimitWarning: '⚠️ over limit',
      lowerLimitWarning: '⚠️ below limit'
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🧪',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '🧹',
          },
          revert: {
            description: 'Revert a previous commit',
            title: 'Reverts',
            emoji: '♻️',
          },
          ci: {
            description: 'CI related changes',
            title: 'CI',
            emoji: '🤖',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change?',
      },
      subject: {
        description: 'Write a commit title:',
      },
      body: {
        description: 'Provide a longer description of the change:',
      },
    },
  }
};
