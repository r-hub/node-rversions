
const mycache = require('./cache');
const urls = require('./urls');

const got = require('got');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

async function r_branches(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_branches'); }
    if (cached !== undefined) { return cached; }

    const opts = {
        method: 'PROPFIND',
        headers: {
            Depth: '1'
        }
    };

    const resp = await got(urls.branches, opts);
    const doc = new dom().parseFromString(resp.body);
    const expr = xpath.parse('.//D:propstat/D:prop');
    const props = expr.select({ node: doc, isHtml: true });

    const branches = props.map(function(n) {
        const xdate = xpath.parse('.//D:creationdate');
        const xtag = xpath.parse('.//D:getetag');
        const date = xdate.select({ node: n, isHtml: true })[0].textContent;
        const branch =
              xtag.select({ node: n, isHtml: true })[0]
              .textContent
              .replace(/^.*\/branches\/R-([-0-9]+-branch).*$/, '$1');

        if (/^[0-9]+-[0-9]+(-[0-9]+|)-branch$/.test(branch)) {
            return {
                branch: branch,
                date: date
            };
        } else {
            return null;
        }
    });

    const branches2 = branches
          .filter(function(x) { return x !== null; })
          .sort(function(a, b) {
              if (a.date < b.date) {
                  return -1;
              } else {
                  return 1;
              }
          })

    mycache.set('r_branches', branches2);
    return mycache.get('r_branches');    
}

module.exports = r_branches;
