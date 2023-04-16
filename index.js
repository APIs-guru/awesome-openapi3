'use strict';

const fs = require('fs');
const yaml = require('yaml');
const fetch = require('node-fetch');
const humanUnit = require('human-unit').default;
const uuidv4 = require('uuid').v4;

const stats = require('./stats.js');

const str = fs.readFileSync('./docs/_data/tools.yaml','utf8');
let entries = yaml.parse(str);

const rms = fs.readFileSync('./docs/_data/readme.yaml','utf8');
const readmes = yaml.parse(rms);

const username = process.env.github_user;
const password = process.env.github_pwd;
const digest = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
const options = { headers: { authorization: digest } };

const mag = {
    factor: [1000,1000,1000],
    units: ['','K','M','B']
};

async function main() {

entries = entries.sort(function(a,b){
    if (a.github < b.github) return -1;
    if (a.github > b.github) return +1;
    return 0;
});

for (let entry of entries) {
    if (!entry.uuid) {
        entry.uuid = uuidv4();
    }
	if (entry.github && entry.github.indexOf('github.com')>=0) {
      	let url = entry.github.replace('://','');
        let components = url.split('/');
        const user = components[1];
        const repo = components[2];
        let apicall = 'https://api.github.com/repos/'+user+'/'+repo;
        console.log(apicall);
        let obj;
        try {
            const res = await fetch(apicall,options);
            const json = await res.text();
            obj = JSON.parse(json);
        }
        catch (ex) {
            console.warn(ex.message);
        }
        if (obj && obj.id) {
            entry.name = obj.name||entry.name;
            entry.github = obj.html_url;
            entry.description = obj.description||entry.description||'';
            entry.language = obj.language||'Unknown';
            entry.archived = !!obj.archived;
            entry.stars = obj.stargazers_count||0;
            entry.watch = obj.subscribers_count||0;
            entry.forks = obj.forks||0;
            entry.updated = obj.updated_at;
            entry.issues = obj.open_issues_count||0;
            if (obj.organization) {
                entry.owner = obj.organization.login;
                entry.logo  = obj.organization.avatar_url;
            }
            else {
                entry.owner = obj.owner.login;
                entry.logo  = obj.owner.avatar_url;
            }
            if (obj.license) {
                entry.license = obj.license.spdx_id;
                if (entry.license === 'NOASSERTION') {
                    entry.license = '';
                }
            }
        }
        apicall = 'https://api.github.com/repos/'+user+'/'+repo+'/readme';
        options.headers.accept = 'application/vnd.github.VERSION.raw';
        console.log(apicall);
        try {
            const rmres = await fetch(apicall,options);
            const readme = await rmres.text();
            if (readme) {
                readmes[user+'/'+repo] = readme;
            }
        }
        catch (ex) {
            console.warn(ex.message);
        }

        entry.downloads = await stats.getDownloadStats(entry.name, entry.language, options);
        const hu = humanUnit(entry.downloads||0,'',mag);
        if (entry.downloads) entry.downloadStr = (Math.round(hu.value*100)/100)+hu.unit;
    }
}

entries = entries.filter((e,i,a)=>a.findIndex(t=>((t.github||t.uuid) === (e.github||e.uuid)))===i);

}

main();

process.on('exit',function(){
    fs.writeFileSync('./docs/_data/tools.yaml',yaml.stringify(entries),'utf8');
    fs.writeFileSync('./docs/_data/readme.yaml',yaml.stringify(readmes),'utf8');
});

