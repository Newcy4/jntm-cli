#!/usr/bin/env node

const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const tempList = require('../template.json')

// 自定义交互式命令行的问题及简单的校验
let question = [
  {
    name: "name",
    type: 'input',
    message: "Please input the template name: ",
    validate(val) {
      if (val === '') {
        return 'Name is required!'
      } else if (tempList[val]) {
        return 'Template has already existed!'
      } else {
        return true
      }
    }
  },
  {
    name: "url",
    type: 'input',
    message: "Please input the template repository url: ",
    validate(val) {
      if (val === '') return 'The url is required!'
      return true
    }
  }
]

inquirer
  .prompt(question).then(answers => {
    // answers对象是inquirer收集的用户输入信息
    let { name, url } = answers;
    // 过滤 unicode 字符
    tempList[name] = url.replace(/[\u0000-\u0019]/g, '')
    // 把模板信息写入 template.json 文件中
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tempList), 'utf-8', err => {
      if (err) {
        console.log(err)
        return
      }
      console.log('\n')
      console.log(chalk.green('Added successfully!\n'))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tempList)
      console.log('\n')
    })
  })
