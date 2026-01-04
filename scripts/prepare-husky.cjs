/* Production-safe Husky install.
   - If this project is not in a git repo (e.g., ZIP deploy), do nothing.
   - If git exists, install Husky hooks.
*/
const fs = require("fs");
const { spawnSync } = require("child_process");

function hasGitRepo() {
  try {
    return fs.existsSync(".git") || fs.existsSync("../.git");
  } catch {
    return false;
  }
}

if (!hasGitRepo()) {
  process.exit(0);
}

const res = spawnSync("npx", ["husky", "install"], { stdio: "inherit", shell: process.platform === "win32" });
process.exit(res.status ?? 0);
