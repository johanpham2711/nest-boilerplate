module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) => /^Bumps \[.+]\(.+\) from .+ to .+\.$/m.test(message),
    (message) => /^chore\(release\): .+/m.test(message),
  ],
};
