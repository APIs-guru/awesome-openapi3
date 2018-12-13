'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

const estr = fs.readFileSync('./docs/_data/tools.yaml','utf8');
const entries = yaml.load(estr);

const str = fs.readFileSync('./response.json','utf8');
const res = JSON.parse(str);

let found = 0;

for (let edge of res.data.search.edges) {
    let url = edge.node.url;
    let entry = entries.find(function(e,i,a){
        return e.github.toLowerCase() === url.toLowerCase();
    });
    if (entry) {
        found++;
    }
    else {
        entries.push({ github: url, v3: true, category: 'unclassified' });
    }
}

process.on('exit',function(){
    console.log('Found',found);
    fs.writeFileSync('./docs/_data/tools.yaml',yaml.dump(entries),'utf8');
});
