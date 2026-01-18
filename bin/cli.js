#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { demoTreeData, generateMarkdown } = require('../libs/shared.js');

const program = new Command();

// 读取JSON文件
function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    
    // 支持两种JSON格式：
    // 1. 直接是数组格式
    // 2. 包含root属性的对象格式
    if (Array.isArray(jsonData)) {
      return jsonData;
    } else if (jsonData.root && Array.isArray(jsonData.root)) {
      return jsonData.root;
    } else {
      console.error('JSON文件格式不正确，请确保是数组格式或包含root属性的对象格式');
      process.exit(1);
    }
  } catch (error) {
    console.error(`读取JSON文件失败: ${error.message}`);
    process.exit(1);
  }
}

// 写入Markdown文件
function writeMarkdownFile(content, outputPath) {
  try {
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`Markdown文件已生成: ${outputPath}`);
  } catch (error) {
    console.error(`写入Markdown文件失败: ${error.message}`);
    process.exit(1);
  }
}

// 生成示例JSON文件
function generateSampleJson() {
  const sampleJson = {
    root: demoTreeData
  };
  
  try {
    fs.writeFileSync('sample.json', JSON.stringify(sampleJson, null, 2), 'utf8');
    console.log('示例JSON文件已生成: sample.json');
  } catch (error) {
    console.error(`生成示例JSON文件失败: ${error.message}`);
    process.exit(1);
  }
}

// 主程序
program
  .name('markdown-web-nav')
  .description('用 Markdown 语法在文档类平台页面中制作网址导航')
  .version('1.0.0');

program
  .command('generate')
  .description('根据JSON文件生成Markdown导航')
  .argument('<input>', '输入的JSON文件路径')
  .option('-o, --output <path>', '输出的Markdown文件路径', 'web-nav.md')
  .action((input, options) => {
    const inputPath = path.resolve(input);
    const outputPath = path.resolve(options.output);
    
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      console.error(`输入文件不存在: ${inputPath}`);
      process.exit(1);
    }
    
    // 读取JSON数据
    const treeData = readJsonFile(inputPath);
    
    // 生成Markdown内容
    const markdownContent = generateMarkdown(treeData);
    
    // 写入Markdown文件
    writeMarkdownFile(markdownContent, outputPath);
  });

program
  .command('sample')
  .description('生成示例JSON文件')
  .action(() => {
    generateSampleJson();
  });

program.parse();