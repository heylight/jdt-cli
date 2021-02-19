import copy from "copy";
import path from "path";
import write from "write";
import cliSpinners from "cli-spinners";
import { exec } from "child_process";
import { compile } from "handlebars";

async function copyConfig(to, answers) {
  let pkg = require(path.join(`../template/${answers.template}/package.json`));
  await write(
    path.join(to, "package.json"),
    compile(JSON.stringify(pkg, null, 2))(answers),
    {
      overwrite: true,
    }
  );
  if (answers.template === "cms") {
    let env = require(path.join(`../template/${answers.template}/.env`));
    await write(path.join(to, ".env"), compile(env)(answers), {
      overwrite: true,
    });
  }
  if (answers.install) {
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
  } else {
    console.log("\n完成!\n");
  }
}
function handle(answers) {
  const from = path.resolve(__dirname, `../template/${answers.template}/**/*`);
  const to = path.resolve(process.cwd(), answers.name);
  copy(from, to, function (err, file) {
    if (err) {
      console.log(err);
    } else {
      copyConfig(to, answers);
    }
  });
}
export default handle;
