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
        message: "请输入项目名称(英文)",
        default: "projectName",
      },
      {
        type: "list",
        name: "template",
        message: "选择一个项目模板",
        choices: ["cms", "simple"],
        default: "cms",
      },
      {
        type: "input",
        name: "host",
        message: "请输入host",
        default: "t.jd.com",
      },
      {
        type: "input",
        name: "proxy",
        message: "请输入代理地址",
        default: "proxy.jd.com",
      },
    ])
    .then((answers) => {
      handle(answers);
    });
}
