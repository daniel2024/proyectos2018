const dwolla = require('dwolla-v2');

// creo un cliente de  dwolla
const appKey = '8gPHaxKdVSK6gOm5PtYCWbEL3klJMLROq1XpmhbHCJi90AX9Ut';
const appSecret = 't0YmIguGRuqIFhRBQAtqLDHPrtGNKDN157XmRNvxGyuN1lUmgY';
const client = new dwolla.Client({
  key: appKey,
  secret: appSecret,
  environment: 'sandbox'})
  
  
  

export default client;