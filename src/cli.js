import inquirer from "inquirer";
import handle from "./handle";
import updateNotifier from "update-notifier";
import pkgjson from "../package.json";

export function cli(args) {
  updateNotifier({ pkg: pkgjson }).notify();
  console.log("京东科技 前端项目生成工具 v" + pkgjson.version);
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "project name",
        default: "project_name",
      },
      {
        type: "list",
        name: "template",
        message: "choose a template",
        choices: [
          "vue-project",
          "multi-page",
          "vue3-project",
          "react-project",
          "react-ts-project",
          "craco-react-ts",
        ],
        default: "vue-project",
      },
      {
        type: "input",
        name: "host",
        message: "host",
        default: "t.jd.com",
        when(answers) {
          return (
            answers.template === "vue-project" ||
            answers.template === "vue3-project" ||
            answers.template === "react-project" ||
            answers.template === "react-ts-project" ||
            answers.template === "craco-react-ts"
          );
        },
      },
      {
        type: "input",
        name: "proxy",
        message: "proxy",
        default: "proxy.jd.com",
        when(answers) {
          return (
            answers.template === "vue-project" ||
            answers.template === "vue3-project" ||
            answers.template === "react-project" ||
            answers.template === "react-ts-project" ||
            answers.template === "craco-react-ts"
          );
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
