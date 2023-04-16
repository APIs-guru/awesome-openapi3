'use strict';

const fs = require('fs');
const yaml = require('yaml');

const estr = fs.readFileSync('./docs/_data/tools.yaml','utf8');
const entries = yaml.parse(estr);

let existing = 0;
let added = 0;

async function main(topic) {

    let res = await fetch(`https://api.github.com/search/repositories?q=topic:${topic}`, { headers:
        { "Accept": "application/vnd.github.mercy-preview+json" } });
    let data = await res.json();

    for (let edge of data.items) {
        let url = edge.html_url;
        let entry = entries.find(function(e,i,a){
            return e.github && e.github.toLowerCase() === url.toLowerCase();
        });
        if (entry) {
            existing++;
        }
        else {
            entries.push({ github: url, v3: true, category: 'unclassified' });
            console.log('New',url);
            added++;
        }
    }
}

main('openapi3');
main('openapi31');
main('openapi3_1');
main('openapi3_1');

process.on('exit',function(){
    console.log(`Existing: ${existing}, added: ${added}`);
    if (added) {
        fs.writeFileSync('./docs/_data/tools.yaml',yaml.stringify(entries),'utf8');
    }
});
