import copy from "copy";
import path from "path";
import write from "write";
import cliSpinners from "cli-spinners";
import { exec } from "child_process";

import { compile } from "handlebars";
import { PACKAGE_JSON, ENV } from "./config";

async function copyConfig(to, answers) {
  const text1 = compile(PACKAGE_JSON)(answers);
  await write(path.join(to, "package.json"), text1, { overwrite: true });
  const text2 = compile(ENV)(answers);
  await write(path.join(to, ".env"), text2, { overwrite: true });

  let i = 0;
  let spin = setInterval(() => {
    const { frames } = cliSpinners.dots;
    process.stdout.write(`\r${frames[(i = ++i % frames.length)]} install...`);
  }, cliSpinners.dots.interval);
  exec(`cd ${answers.name}&&npm i`, function (err) {
    clearInterval(spin);
    process.stdout.clearLine();
    console.log("\n完成!\n");
  });
}
function handle(answers) {
  const from = path.resolve(__dirname, `../template/${answers.template}/**/*`);
  const to = path.resolve(process.cwd(), answers.name);
  copy(from, to, function (err, file) {
    if (["cms"].includes(answers.template)) {
      copyConfig(to, answers);
    } else {
      console.log("\n完成!\n");
    }
  });
}
export default handle;
