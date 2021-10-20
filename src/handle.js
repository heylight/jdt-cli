import fse from "fs-extra";
import path from "path";
import write from "write";
import cliSpinners from "cli-spinners";
import { exec } from "child_process";
import { compile } from "handlebars";

async function copyConfig(to, answers) {
  let pkg = fse.readFileSync(path.join(to, "package.json"), "utf-8");
  await write(path.join(to, "package.json"), compile(pkg)(answers), {
    overwrite: true,
  });
  if (
    answers.template === "vue-project" ||
    answers.template === "vue3-project"
  ) {
    let env = fse.readFileSync(path.join(to, "vue.config.js"), "utf-8");
    await write(path.join(to, "vue.config.js"), compile(env)(answers), {
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
  }
}
function handle(answers) {
  const from = path.resolve(__dirname, `../template/${answers.template}`);
  const to = path.resolve(process.cwd(), answers.name);
  fse.copy(from, to).then(() => {
    copyConfig(to, answers);
  });
}
export default handle;
