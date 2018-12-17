const https = require('https');
const querystring = require('querystring');
const url = require('url');
const fetch = require('node-fetch');

function postAsync(ourUrl, package, ourOptions) {
    return new Promise(function (resolve, reject) {
        const postData = querystring.stringify(
            {'requests':[{"indexName":package,"params":'query: facets:["tags","type","type"], maxValuesPerFacet: 100, page: 0, tagFilters: '}]
        });

        const up = url.parse(ourUrl);

        const options = Object.assign({},{
          hostname: up.hostname,
          port: 443,
          path: up.path,
          method: 'POST',
          headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Content-Length': postData.length
             }
        },ourOptions);

        const req = https.request(options, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}

async function postData(res) {
    let data = '';
    await res.on('data',function(chunk){
        data += chunk;
    });
    return data;
}

async function getNPM(package, options) {
    const apicall = 'https://api.npms.io/v2/package/'+encodeURIComponent(package.toLowerCase());
    console.log(apicall);
    try {
        const npmres = await fetch(apicall,options);
        const npmstxt = await npmres.text();
        const npmsio = JSON.parse(npmstxt);
        if (npmsio && npmsio.collected && npmsio.collected.npm && npmsio.collected.npm.downloads) {
            return npmsio.collected.npm.downloads[npmsio.collected.npm.downloads.length-1].count;
        }
    }
    catch (ex) {
        console.warn(ex.message);
    }
    return 0;
}

async function getNuget(package,options) {
    const packLower = package.toLowerCase();
    const apicall = 'https://api-v2v3search-0.nuget.org/query?='+packLower;
    console.log(apicall);
    try {
        const nugetres = await fetch(apicall,options);
        const nugettxt = await nugetres.text();
        const nuget = JSON.parse(nugettxt);
        const data = nuget.data.find(function(e,i,a){
            return e.id.toLowerCase() === packLower;
        });
        if (data) return data.totalDownloads;
        return 0;
    }
    catch (ex) {
        console.warn(ex.message);
    }
    return 0;
}

async function getPHP(package, options) {
    const apicall = 'https://m58222sh95-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=M58222SH95&x-algolia-api-key=5ae4d03c98685bd7364c2e0fd819af05';
    console.log(apicall);
    try {
        const phpres = await postAsync(apicall, package, options);
        const phptxt = await postData(phpres);
        const php = JSON.parse(phptxt);
        const pack = php.results[0].hits.find(function(e,i,a){
            return data.package.name.toLowerCase() === packLower;
        });
        return pack.meta.downloads;
    }
    catch (ex) {
        console.log(ex.message);
    }
    return 0;
}

async function getDownloadStats(package, language, options) {
    // switch based on language
    const langLower = language ? language.toLowerCase() : '';
    if ((langLower === 'javascript') || (langLower === 'typescript')) {
        return await getNPM(package, options);
    }
    else if (langLower === 'c#') {
        return await getNuget(package, options);
    }
    //else if (langLower === 'php') {
    //    return await getPHP(package, options);
    //}
    return 0;
}

module.exports = {
  getDownloadStats
};

