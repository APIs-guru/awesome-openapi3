'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const fetch = require('node-fetch');

const str = fs.readFileSync('./docs/_data/tools.yaml','utf8');
const entries = yaml.load(str);

const rms = fs.readFileSync('./docs/_data/readme.yaml','utf8');
const readmes = yaml.load(rms);

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
        let apicall = 'https://api.github.com/repos/'+user+'/'+repo;
        console.log(apicall);
        const res = await fetch(apicall,options);
        const json = await res.text();
        //console.log(json);
        const obj = JSON.parse(json);
        if (obj.id) {
            entry.name = obj.name||entry.name;
            entry.description = obj.description||entry.description||'';
            entry.language = obj.language;
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

        // switch language?
        if (entry.language && entry.language.toLowerCase() === 'javascript') {
            apicall = 'https://api.npms.io/v2/package/'+encodeURIComponent(entry.name);
            console.log(apicall);
            try {
                const npmres = await fetch(apicall,options);
                const npmstxt = await npmres.text();
                const npmsio = JSON.parse(npmstxt);
                if (npmsio && npmsio.collected && npmsio.collected.npm && npmsio.collected.npm.downloads) {
                    entry.downloads = npmsio.collected.npm.downloads[npmsio.collected.npm.downloads.length-1].count;
                }
            }
            catch (ex) {
                console.warn(ex.message);
            }
        }
    }
}

}

main();

process.on('exit',function(){
    fs.writeFileSync('./docs/_data/tools.yaml',yaml.dump(entries),'utf8');
    fs.writeFileSync('./docs/_data/readme.yaml',yaml.dump(readmes),'utf8');
});

