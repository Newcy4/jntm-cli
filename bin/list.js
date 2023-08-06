#!/usr/bin/env node

// fs模块读取文件的写法
// const fs = require('fs')
// fs.readFile(`${__dirname}/../template.json`, 'utf-8', (err, data) => {
//   console.log(data)
// })


const tempList = require('../template.json')
console.log(tempList)