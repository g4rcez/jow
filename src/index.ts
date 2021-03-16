import { exec } from "child_process";
import { promisify } from "util";
import OS from "os";
import FS from "fs";
import { join } from "path";
import { Npm } from "./typings/npm-info";

const $ = promisify(exec);

// https://github.com/dword-design/package-name-regex/blob/master/src/index.js
// https://github.com/sindresorhus/semver-regex/blob/main/index.js
const checkSemver = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(@((?<=v?|\sv?)(?:(?:0|[1-9]\d*)\.){2}(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b)$|$)/;

const md = (path: string) => {
  if (!FS.existsSync(path)) {
    FS.mkdirSync(path, { recursive: true });
  }
};

const jowRcPath = join(OS.homedir(), ".node_modules");
const current = process.cwd();

(async () => {
  const [name] = process.argv.splice(2);
  if (name.length > 100 || !checkSemver.test(name)) {
    console.log("No");
    process.exit(1);
  }

  console.log(jowRcPath);

  const { stdout } = await $(`npm info ${name} --json`);
  const info: Npm.Show = JSON.parse(stdout);

  const [pkg, version = info["dist-tags"].latest] = name.split("@");

  const fullPathToNewLibrary = join(jowRcPath, pkg, version);
  const nodeModulesLibrary = join(fullPathToNewLibrary, "node_modules");
  md(jowRcPath);
  md(fullPathToNewLibrary);
  console.log({
    jowRcPath,
    fullPathToNewLibrary,
  });
  process.chdir(fullPathToNewLibrary);
  try {
    const output = await $(`npm install ${pkg}@${version}`);
    if (output.stderr !== "") {
      console.log(`Error on download", ${pkg}@${version}`);
    }
    process.chdir(current);
  } catch (error) {}
})();
