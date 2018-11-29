'use strict';

const fs = require('fs');
const util = require('util');

const yaml = require('js-yaml');

const tools = yaml.safeLoad(fs.readFileSync('./docs/_data/tools.yaml','utf8'),{json:true});

function extract(desc){
    desc = desc.toLowerCase();
    desc = desc.split('(').join(' ');
    desc = desc.split(')').join(' ');
    desc = desc.split('.').join(' ');
    desc = desc.split('!').join(' ');
    desc = desc.split('/').join(' ');
    desc = desc.split(',').join(' ');
    desc = desc.split("n't").join('nt');
    desc = desc.split("'").join(' ');
    desc = desc.split('  ').join(' ');
    return desc.split(' ');
}

const words = {};
let totalwords = 0;

for (let tool of tools) {
    if (tool.category && tool.category !== '?' && tool.category !== 'unclassified') {
        const descwords = extract(tool.description);
        for (let descword of descwords) {
            totalwords++;
            if (!words[descword]) words[descword] = {};
            if (typeof words[descword][tool.category] === 'undefined') {
                words[descword][tool.category] = 0;
            }
            words[descword][tool.category]++;
        }
    }
}
console.log(totalwords);
console.log(util.inspect(words));

for (let tool of tools) {
    if (tool.v3 && tool.description && (!tool.category || tool.category === '?' || tool.category === 'unclassified')) {
        const scores = {};
        const descwords = extract(tool.description);
        for (let descword of descwords) {
            const score = words[descword];
            for (let s in score) {
                if (!scores[s]) scores[s] = 0;
                scores[s] = scores[s] + words[descword][s];
            }
        }
        const keys = Object.keys(scores);
        let kv = [];
        for (let key of keys) {
            kv.push({key:key,value:scores[key]});
        }
        kv = kv.sort(function(a,b){
            if (a.value<b.value) return +1;
            if (a.value>b.value) return -1;
            return 0;
        });
        if (kv && kv.length) {
            tool.category = kv[0].key;
            tool.unsure = true;
            console.log(tool.name,tool.category);
        }
    }
}

fs.writeFileSync('./docs/_data/tools2.yaml',yaml.safeDump(tools),'utf8');
