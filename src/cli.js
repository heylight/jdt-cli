import inquirer from "inquirer";
import handle from "./handle";
import pkgjson from "../package.json";

export function cli(args) {
  console.log("京东科技 前端项目生成工具 v" + pkgjson.version);
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "project name",
        default: "project-name",
      },
      {
        type: "list",
        name: "template",
        message: "choose a template",
        choices: ["cms", "multi-page"],
        default: "cms",
      },
      {
        type: "input",
        name: "host",
        message: "host",
        default: "t.jd.com",
        when(answers) {
          return answers.template === "cms";
        },
      },
      {
        type: "input",
        name: "proxy",
        message: "proxy",
        default: "proxy.jd.com",
        when(answers) {
          return answers.template === "cms";
        },
      },
      {
        type: "confirm",
        name: "install",
        message: "install now?",
      },
    ])
    .then(handle);
}
