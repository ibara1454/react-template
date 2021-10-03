module.exports = {
  '*.{ts,tsx}': [
    'prettier --write',
    'eslint --cache --fix',
    // Do not emit outputs but only run the type check.
    // Note that we run this command without appending the file name,
    // this means the `tsc` command will be applied on the while project.
    //
    // We are doing this because
    // 1. even there is only few files is changed, the other unchanged files may be affected by it
    // 2. option 'project' cannot be mixed with source files on a command line
    //
    // References:
    // 1. https://github.com/okonet/lint-staged/issues/825#issuecomment-620018284
    // 2. https://stackoverflow.com/a/35815607
    (_fileNames) => 'tsc --noEmit',
  ],
  '*.{js,jsx}': ['prettier --write', 'eslint --cache --fix'],
  '*.css': ['prettier --write', 'stylelint --fix'],
  '*.{md}': 'prettier --write',
};
