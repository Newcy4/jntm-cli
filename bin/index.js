#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')


program
  .name('jntm')
  .description('个人练习生用于练习的脚手架')
  .usage('<command>')
  .version('1.0.0');


program.command('init')
  .description('init a template')
  .action(() => {
    require('./init')
  })

program.command('list')
  .description('show the template list')
  .action(() => {
    require('./list')
  })

program.command('add')
  .description('add a template')
  .action(() => {
    require('./add')
  })

program.command('delete')
  .description('delete the template')
  .action(() => {
    require('./delete')
  })

program.parse()

// let options = program.opts()
// console.log(options)




