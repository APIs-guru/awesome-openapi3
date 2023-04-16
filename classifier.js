'use strict';

const fs = require('fs');
const util = require('util');

const yaml = require('yaml');
const bayes = require('bayes');
const classifier = bayes();

const tools = yaml.parse(fs.readFileSync('./docs/_data/tools.yaml','utf8'),{json:true});
const readmes = yaml.parse(fs.readFileSync('./docs/_data/readme.yaml','utf8'),{json:true});

async function main() {

for (let tool of tools) {
    let repo = tool.github ? tool.github.split('/') : [''];
    repo = repo[repo.length-1];
    if (!tool.unsure && tool.category && tool.category !== '?' && tool.category !== 'unclassified') {
        const readme = readmes[tool.owner+'/'+repo];
        if (readme) await classifier.learn(readmes[tool.owner+'/'+repo],tool.category);
    }
}

for (let tool of tools) {
    let repo = tool.github ? tool.github.split('/') : [''];
    repo = repo[repo.length-1];
    if (tool.unsure && readmes[tool.owner+'/'+repo]) {
        const newCategory = await classifier.categorize(readmes[tool.owner+'/'+repo]);
        if (newCategory !== tool.category) {
            console.log(tool.owner,repo,tool.category,newCategory);
            tool.category = newCategory;
        }
    }
}

fs.writeFileSync('./docs/_data/tools2.yaml',yaml.stringify(tools),'utf8');
fs.writeFileSync('./docs/_data/bayes.json',JSON.stringify(JSON.parse(classifier.toJson()),null,2),'utf8');
}

main();
