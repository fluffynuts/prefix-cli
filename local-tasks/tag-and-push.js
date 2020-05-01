"use strict";
const
  Git = require("simple-git/promise"),
  gulp = requireModule("gulp-with-help"),
  gitTag = requireModule("git-tag"),
  gitPushTags = requireModule("git-push-tags"),
  gitPush = requireModule("git-push"),
  readPackageVersion = requireModule("read-package-version");
gulp.task("tag-and-push", async () => {
  const git = new Git();
  const version = await readPackageVersion();
  await git.add(":/");
  await git.commit(":bookmark: bump package version");
  await gitTag(`v${version}`);
  await gitPush();
  await gitPushTags();
});
