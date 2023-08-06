#!/usr/bin/env node

const program = require("commander");  // 解析和控制命令行语句
const inquirer = require("inquirer");  // 可交互命令行
const chalk = require("chalk");  // 命令行打印美化
const ora = require("ora");  // 命令行动态效果
const download = require("download-git-repo");  // 远程仓库下载
const tempList = require('../template.json')

console.log(chalk.bgRed('全民制作人们大家好'))
console.log(chalk.yellow.bold('现在开始构建脚手架，music~'))

program.parse()

// 约定命令格式： jntm init <templateName> <projectName> 
let templateName = "";
let projectName = "";

let question = [
  {
    name: "projectName",
    type: "input",
    message: "请输入项目名称",
    validate(val) {
      if (val === "") return "The projectName is required!";
      return true;
    }
  }
];

const promptList = [
  {
    type: "list",
    message: "Please choose a template:",
    name: "templateName",
    choices: Object.keys(tempList),
    validate(val) {
      if (val === "") {
        return "Template is not exist";
      }
    }
  }
];

// console.log(program.args)
// 当没有输入参数的时候给个提示
if (program.args.length < 2) {
  inquirer
    .prompt(promptList)
    .then(answers => {
      templateName = answers.templateName;
    })
    .then(() => {
      inquirer.prompt(question).then(answers => {
        projectName = answers.projectName;
        startProject();
      });
    });
} else {
  templateName = program.args[0];
  projectName = program.args[1];
  // 小小校验一下参数
  if (!tempList[templateName]) {
    console.log(chalk.red("\n Template does not exit! \n "));
    return
  }
  if (!projectName) {
    console.log(chalk.red("\n The projectName is required! \n "));
    return
  }
  startProject();
}

// 开始下载脚手架的流程
function startProject() {
  url = tempList[templateName];

  console.log(chalk.white("\n Start generating... \n"));
  // 出现加载图标
  const spinner = ora("Downloading...");
  spinner.start();
  // 执行下载方法并传入参数
  download(url, projectName, err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(`Generation failed. ${err}`));
      return;
    }
    // 结束加载图标
    spinner.succeed();
    console.log(chalk.green("\n Generation completed!"));
    console.log("\n To get started");
    console.log(`\n    cd ${projectName} \n`);
    process.exit();
  });
}



