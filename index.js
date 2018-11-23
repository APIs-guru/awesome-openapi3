'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const fetch = require('node-fetch');

const str = fs.readFileSync('./docs/_data/tools.yaml','utf8');
const entries = yaml.load(str);

const username = process.env.github_user;
const password = process.env.github_pwd;
const digest = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
const options = { headers: { authorization: digest } };

async function main() {

for (let entry of entries) {
	if (entry.github && entry.github.indexOf('github.com')>=0) {
      	let url = entry.github.replace('://','');
        let components = url.split('/');
        const user = components[1];
        const repo = components[2];
        const apicall = 'https://api.github.com/repos/'+user+'/'+repo;
        console.log(apicall);
        const res = await fetch(apicall,options);
        const json = await res.text();
        //console.log(json);
        const obj = JSON.parse(json);
        if (obj.id) {
            entry.description = obj.description||entry.description;
            entry.language = obj.language;
            entry.archived = !!obj.archived;
            entry.stars = obj.stargazers_count||0;
            entry.watch = obj.subscribers_count||0;
            entry.forks = obj.forks||0;
            entry.updated = obj.updated_at;
            entry.issues = obj.open_issues_count||0;
            if (obj.license) {
                entry.license = obj.license.spdx_id;
            }
        }
    }
}

}

main();

process.on('exit',function(){
    fs.writeFileSync('./docs/_data/tools.yaml',yaml.dump(entries),'utf8');
});

