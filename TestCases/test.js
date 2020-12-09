

const fs = require('fs');
const csvToJSON = require('../Utils/csvToJSON');


var data_CSV = fs.readFileSync('../csv-data/SendPayoutRequestData.csv','utf8')
var data_JSON = JSON.parse(csvToJSON.convert(data_CSV));

var transactionDetails_testCases=require('./Cases/transactionDetails_testCases');
var recipientDetail_testCases=require('./Cases/recipientDetail_testCases');
var senderDetail_testCases = require('./Cases/senderDetail_testCases');


describe('Cases for transaction mapping', () => {
  data_JSON.forEach(async function(value,i){
    transactionDetails_testCases.cases(value,i);
  })
})



describe('Cases for RECIPIENT DETAIL',()=> {
  data_JSON.forEach(async function(value,i){
    recipientDetail_testCases.cases(value,i);
  })
})


describe('Cases for SENDER DETAIL', ()=>{
  data_JSON.forEach(async function(value,i){
    senderDetail_testCases.cases(value,i);
  })
})
