'use strict';

const RuleSet = require('./api/rules.js');

let ruleSet = new RuleSet();

module.exports.handler = (e, ctx, cb) => {
  var request = e.Records[0].cf.request;
  console.log('Request:');
  console.log(JSON.stringify(request));
  return ruleSet
    .loadRules(request)
    .then(() => {
      var res = ruleSet.applyRules(e).res
      if (res.uri !== undefined && res.uri.includes('?')) {
        res.querystring = res.uri.split('?')[1];
        res.uri = res.uri.split('?')[0];
      }
      console.log('Result:');
      console.log(JSON.stringify(res));
      cb(null, res);
    });
};