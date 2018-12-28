'use strict';

const fs = require('fs');

const yaml = require('js-yaml');
const graphql = require('graphql-request').GraphQLClient;

const estr = fs.readFileSync('./docs/_data/tools.yaml','utf8');
const entries = yaml.load(estr);

const query = `{
	search(type: REPOSITORY, query: "topic:openapi3", first: 100) {
    edges{
      node {
        ... on Repository {
          url
        }
      }
    }
  }
}`

let existing = 0;
let added = 0;

const client = new graphql('https://api.github.com/graphql', { headers: {
    Authorization: 'Basic '+Buffer.from(process.env.github_user+':'+process.env.github_pwd).toString('base64')
}});

client.request(query).then(function(data){

    for (let edge of data.search.edges) {
        let url = edge.node.url;
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
})
.catch(function(ex){
    console.error(ex.message);
});

process.on('exit',function(){
    console.log('Existing:',existing,'added:',added);
    if (added) {
        fs.writeFileSync('./docs/_data/tools.yaml',yaml.dump(entries),'utf8');
    }
});
