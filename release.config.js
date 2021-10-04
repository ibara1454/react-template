module.exports = {
  // semantic-release#configuration
  // https://github.com/semantic-release/semantic-release/blob/88e423b8286cfe852d8348d174e621c1e39e42d8/docs/usage/configuration.md#configuration
  //
  // The branches on which releases should happen.
  branches: ['master'],
  // Plugin lists
  // https://github.com/semantic-release/semantic-release/blob/88e423b8286cfe852d8348d174e621c1e39e42d8/docs/extending/plugins-list.md
  plugins: [
    // Determine the type of release by analyzing commits with conventional-changelog.
    // https://github.com/semantic-release/commit-analyzer/tree/5a0d481e5a40d5f4fbb6c53b79c10e5ded357730#releaserules
    '@semantic-release/commit-analyzer',
    // Generate release notes for the commits added since the last release with
    // conventional-changelog.
    // https://github.com/semantic-release/release-notes-generator/tree/070f99874dd0882e159a18c911da1b1ecf7cb7bd
    '@semantic-release/release-notes-generator',
    // Create or update the changelog file in the local project repository.
    // https://github.com/semantic-release/changelog/tree/b3680bbd827b0e4ca78d772e1ca565040ea2a70d
    '@semantic-release/changelog',
    // Update the package.json version and
    // publish the package on the npm registry (only for public repo)
    // https://github.com/semantic-release/npm/tree/d5cab62ee88e38f2b866feda5c7af8fce95c0173
    ['@semantic-release/npm', { npmPublish: false }],
    // Publish a GitHub release and add a comment to GitHub issues and pull requests resolved
    // in the release.
    // https://github.com/semantic-release/github/tree/4dfcb504054d49d8438134afa2836f125ce8c7b5
    '@semantic-release/github',
    // Push a release commit and tag, including configurable files.
    // https://github.com/semantic-release/git/tree/a5345f34f2dc7fbbc0a21a308f677663d9523800
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message:
          // eslint-disable-next-line no-template-curly-in-string
          'build: bump the version to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
