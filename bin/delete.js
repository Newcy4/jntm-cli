#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const tempList = require('../template')

let question = [
  {
    name: "name",
    message: "Please input template name you want to delete:",
    validate(val) {
      if (val === '') {
        return 'Name is required!'
      } else if (!tempList[val]) {
        return 'Template does not exist!'
      } else {
        return true
      }
    }
  }
]


inquirer
  .prompt(question).then(answers => {
    let { name } = answers;
    delete tempList[name]
    // 更新 template.json 文件
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tempList), 'utf-8', err => {
      if (err) {
        console.log('Delete template fail', err)
        return
      }
      console.log('\n')
      console.log(chalk.green('Deleted successfully!\n'))
      console.log(chalk.grey(`The latest template list is:`))
      console.log(tempList)
    })
  })