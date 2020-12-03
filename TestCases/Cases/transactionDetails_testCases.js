
//#region  functions 

    //parse the JSON
    function parse(json_string) {
      return JSON.parse(json_string, function (key, value) {
          if (value !== "" && value!==null) {
              return value;
          }
      });
    }

    //get currency code
    function getCurrencyCode(currency){
      var out_currency=currencyCode.find(o => (o.Num === currency || o.Code === currency));
        if(out_currency) {
          return out_currency.Code ;
        }
        else {
          return currency ;
        }
    }

    //get alpha2 country code 
    function getCountryCode(country){
      var out_country=countryCode.find(o => (o.Alpha2 === country || o.Alpha3 === country || o.Num === country));
        if(out_country) {
          return out_country.Alpha2;
        }
        else {
          return country;
        }
    }

    //get bankCodeType
    function getBankCodeType(countryCode,currencyCode){
       var out_type=bankCodeType.find(o=> (o.countryCode === countryCode && o.currencyCode === currencyCode));
       if(out_type){
         return out_type.bankCodeType
       }else{
         return "bankCode";
       }
    }

    //get account type - e.g saving , current
    function getAccountType(Country , account_Type){
      var out_type=accountType.find(o => (o.Country === Country));
          if(out_type){
            if(out_type[account_Type]){
              return out_type[account_Type];
            }else{
              return account_Type
             }
          }else{
            return account_Type
          }
     }

    //parse amount according to currency
    function parseAmount(amount,currency){
      var out_currency=currencyCode.find(o => (o.Num === currency || o.Code === currency));
        if(out_currency) {
            if(out_currency.Dec!==0 && out_currency.Dec!==null){
              return parseFloat(amount/Math.pow(10,out_currency.Dec)).toFixed(out_currency.Dec);
            }
            else {
              return amount;
            }
        }
        else {
          return amount;
        }
    }

    //convert visa request payload in key value form
    function kvPayoutDetails(obj) {
      if (typeof obj.value !== 'object') {
        kvArray.push(obj);
      }
      else{
        if(obj.key===null)
          Object.keys(obj.value).map(function (propertyName) {return {"key": propertyName,"value": obj.value[propertyName]};}).forEach(child => kvPayoutDetails(child));
        else
          Object.keys(obj.value).map(function (propertyName) {return {"key": obj.key+"."+propertyName,"value": obj.value[propertyName]};}).forEach(child => kvPayoutDetails(child));
      }
    }

    //concatenate sender value for hashing
    function getPayerDetails(json_string) {
    return JSON.parse(json_string, function (key, value) {
           if(Array.isArray(value)){
               if(typeof value !== 'object'){
                   sender_hashValue=sender_hashValue+value;
               }
           }
           else {
               if(typeof value !== 'object'){
                   sender_hashValue=sender_hashValue+value;
               }
           } 
    });
    }

//#endregion

//#region lookups

 var idType={
  "P": "Passport",
  "D": "Driving License",
  "N": "National ID Card"
 };
 
 var idTypeAdditional={
     "P": "PASSPORT_NUMBER",
     "D": "DRIVING_LICENSE_NUMBER",
     "N": "NATIONAL_ID_CARD"
 }

 var additionalDataName={
  "PATRONYMIC":"PATRONYMIC_MIDDLE_NAME"
 };

 var skip_additionalDataName={
  "GoodsName":"GOODS_NAME",
  "GoodsOriginCountry":"GOODS_ORIGIN",
  "GoodsShippingCountry":"GOODS_SHIPPING",
  "KID":"KID",
  "TAX_REF":"TAX_REF"
 };

 var skip_idName={
  "BULSTAT":"BULSTAT",
  "PIN":"PIN",
  "LNC":"LNC",
  "PAYMENT_TYPE_CODE":"PTC"
 };
 
 var accountNumber={
  "IBAN":"iban",
  "DEFAULT":"accountNumber"
 };
 
 var bankCode={
  "SORT_CODE": "sortCode",
  "DEFAULT": "bankCode",
  "ABA":"abaRoutingNumber",
  "FEDWIRE":"fedwireCode"
 };
 
 var idTypeExceptional ={
  "T":"Tax_ID",
  "F":"FOREIGN_ID"
 };

 var swiftBic_Country={
  "MA":"Morocco",
  "AU":"Australia",
  "TR":"Turkey",
  "IL":"Israel",
  "AE":"United Arab Emirates",
  "NZ":"New Zealand",
  "PK":"Pakistan",
  "CZ":"Czech Repulic",
  "JM":"Jamaica",
  "SG":"Singapore",
  "BA":"Bosnia",
  "AL":"Albania",
  "BB":"Barbados",
  "NO":"Norway",
  "PL":"Poland",
  "VN":"Vietnam",
  "CI":"CI"
};

 var bankCodeType=[
   { "countryCode":"GB","currencyCode":"GBP","bankCodeType":"sortCode" },
   { "countryCode":"GH","currencyCode":"GHS","bankCodeType":"sortCode" },
   { "countryCode":"KE","currencyCode":"KES","bankCodeType":"sortCode" },
   { "countryCode":"NG","currencyCode":"NGN","bankCodeType":"sortCode" },
   { "countryCode":"TZ","currencyCode":"TZS","bankCodeType":"sortCode" },
   { "countryCode":"UG","currencyCode":"UGX","bankCodeType":"sortCode" },
   { "countryCode":"CA","currencyCode":"CAD","bankCodeType":"abaRoutingNumber" },
   { "countryCode":"CA","currencyCode":"USD","bankCodeType":"abaRoutingNumber" },
   { "countryCode":"HU","currencyCode":"HUF","bankCodeType":"abaRoutingNumber" },
   { "countryCode":"US","currencyCode":"USD","bankCodeType":"abaRoutingNumber" }
 ];

 var accountType=[
  {"Country":	"IN","1": "CH",	"2":"SA", "3":"Invalid", "4":"Invalid", "5":"Invalid"},
  {"Country":	"BR","1": "CH",	"2":"SA", "3":"Invalid", "4":"Invalid", "5":"Invalid"},
  {"Country":	"CL", "3":"Invalid", "4":"3", "5":"Invalid"},
  {"Country":	"TT","2": "0","3":"Invalid", "4":"Invalid", "5":"2"},
  {"Country":	"JM", "1":"2", "2":"1", "3":"Invalid", "4":"Invalid", "5":"Invalid"},
  {"Country": "JP", "1":"Invalid", "2":"1"}
];

 var currencyCode=[
 {"Num":	"784",	"Code":	"AED",	"Dec":	2},
 {"Num":	"971",	"Code":	"AFN",	"Dec":	2},
 {"Num":	"008",	"Code":	"ALL",	"Dec":	2},
 {"Num":	"051",	"Code":	"AMD",	"Dec":	2},
 {"Num":	"532",	"Code":	"ANG",	"Dec":	2},
 {"Num":	"973",	"Code":	"AOA",	"Dec":	2},
 {"Num":	"032",	"Code":	"ARS",	"Dec":	2},
 {"Num":	"036",	"Code":	"AUD",	"Dec":	2},
 {"Num":	"533",	"Code":	"AWG",	"Dec":	2},
 {"Num":	"944",	"Code":	"AZN",	"Dec":	2},
 {"Num":	"977",	"Code":	"BAM",	"Dec":	2},
 {"Num":	"052",	"Code":	"BBD",	"Dec":	2},
 {"Num":	"050",	"Code":	"BDT",	"Dec":	2},
 {"Num":	"975",	"Code":	"BGN",	"Dec":	2},
 {"Num":	"048",	"Code":	"BHD",	"Dec":	3},
 {"Num":	"108",	"Code":	"BIF",	"Dec":	0},
 {"Num":	"060",	"Code":	"BMD",	"Dec":	2},
 {"Num":	"096",	"Code":	"BND",	"Dec":	2},
 {"Num":	"068",	"Code":	"BOB",	"Dec":	2},
 {"Num":	"984",	"Code":	"BOV",	"Dec":	2},
 {"Num":	"986",	"Code":	"BRL",	"Dec":	2},
 {"Num":	"044",	"Code":	"BSD",	"Dec":	2},
 {"Num":	"064",	"Code":	"BTN",	"Dec":	2},
 {"Num":	"072",	"Code":	"BWP",	"Dec":	2},
 {"Num":	"933",	"Code":	"BYN",	"Dec":	2},
 {"Num":	"084",	"Code":	"BZD",	"Dec":	2},
 {"Num":	"124",	"Code":	"CAD",	"Dec":	2},
 {"Num":	"976",	"Code":	"CDF",	"Dec":	2},
 {"Num":	"947",	"Code":	"CHE",	"Dec":	2},
 {"Num":	"756",	"Code":	"CHF",	"Dec":	2},
 {"Num":	"948",	"Code":	"CHW",	"Dec":	2},
 {"Num":	"990",	"Code":	"CLF",	"Dec":	4},
 {"Num":	"152",	"Code":	"CLP",	"Dec":	0},
 {"Num":	"156",	"Code":	"CNY",	"Dec":	2},
 {"Num":	"170",	"Code":	"COP",	"Dec":	2},
 {"Num":	"970",	"Code":	"COU",	"Dec":	2},
 {"Num":	"188",	"Code":	"CRC",	"Dec":	2},
 {"Num":	"931",	"Code":	"CUC",	"Dec":	2},
 {"Num":	"192",	"Code":	"CUP",	"Dec":	2},
 {"Num":	"132",	"Code":	"CVE",	"Dec":	2},
 {"Num":	"203",	"Code":	"CZK",	"Dec":	2},
 {"Num":	"262",	"Code":	"DJF",	"Dec":	0},
 {"Num":	"208",	"Code":	"DKK",	"Dec":	2},
 {"Num":	"214",	"Code":	"DOP",	"Dec":	2},
 {"Num":	"012",	"Code":	"DZD",	"Dec":	2},
 {"Num":	"818",	"Code":	"EGP",	"Dec":	2},
 {"Num":	"232",	"Code":	"ERN",	"Dec":	2},
 {"Num":	"230",	"Code":	"ETB",	"Dec":	2},
 {"Num":	"978",	"Code":	"EUR",	"Dec":	2},
 {"Num":	"242",	"Code":	"FJD",	"Dec":	2},
 {"Num":	"238",	"Code":	"FKP",	"Dec":	2},
 {"Num":	"826",	"Code":	"GBP",	"Dec":	2},
 {"Num":	"981",	"Code":	"GEL",	"Dec":	2},
 {"Num":	"936",	"Code":	"GHS",	"Dec":	2},
 {"Num":	"292",	"Code":	"GIP",	"Dec":	2},
 {"Num":	"270",	"Code":	"GMD",	"Dec":	2},
 {"Num":	"324",	"Code":	"GNF",	"Dec":	0},
 {"Num":	"320",	"Code":	"GTQ",	"Dec":	2},
 {"Num":	"328",	"Code":	"GYD",	"Dec":	2},
 {"Num":	"344",	"Code":	"HKD",	"Dec":	2},
 {"Num":	"340",	"Code":	"HNL",	"Dec":	2},
 {"Num":	"191",	"Code":	"HRK",	"Dec":	2},
 {"Num":	"332",	"Code":	"HTG",	"Dec":	2},
 {"Num":	"348",	"Code":	"HUF",	"Dec":	2},
 {"Num":	"360",	"Code":	"IDR",	"Dec":	2},
 {"Num":	"376",	"Code":	"ILS",	"Dec":	2},
 {"Num":	"356",	"Code":	"INR",	"Dec":	2},
 {"Num":	"368",	"Code":	"IQD",	"Dec":	3},
 {"Num":	"364",	"Code":	"IRR",	"Dec":	2},
 {"Num":	"352",	"Code":	"ISK",	"Dec":	0},
 {"Num":	"388",	"Code":	"JMD",	"Dec":	2},
 {"Num":	"400",	"Code":	"JOD",	"Dec":	3},
 {"Num":	"392",	"Code":	"JPY",	"Dec":	0},
 {"Num":	"404",	"Code":	"KES",	"Dec":	2},
 {"Num":	"417",	"Code":	"KGS",	"Dec":	2},
 {"Num":	"116",	"Code":	"KHR",	"Dec":	2},
 {"Num":	"174",	"Code":	"KMF",	"Dec":	0},
 {"Num":	"408",	"Code":	"KPW",	"Dec":	2},
 {"Num":	"410",	"Code":	"KRW",	"Dec":	0},
 {"Num":	"414",	"Code":	"KWD",	"Dec":	3},
 {"Num":	"136",	"Code":	"KYD",	"Dec":	2},
 {"Num":	"398",	"Code":	"KZT",	"Dec":	2},
 {"Num":	"418",	"Code":	"LAK",	"Dec":	2},
 {"Num":	"422",	"Code":	"LBP",	"Dec":	2},
 {"Num":	"144",	"Code":	"LKR",	"Dec":	2},
 {"Num":	"430",	"Code":	"LRD",	"Dec":	2},
 {"Num":	"426",	"Code":	"LSL",	"Dec":	2},
 {"Num":	"434",	"Code":	"LYD",	"Dec":	3},
 {"Num":	"504",	"Code":	"MAD",	"Dec":	2},
 {"Num":	"498",	"Code":	"MDL",	"Dec":	2},
 {"Num":	"969",	"Code":	"MGA",	"Dec":	2},
 {"Num":	"807",	"Code":	"MKD",	"Dec":	2},
 {"Num":	"104",	"Code":	"MMK",	"Dec":	2},
 {"Num":	"496",	"Code":	"MNT",	"Dec":	2},
 {"Num":	"446",	"Code":	"MOP",	"Dec":	2},
 {"Num":	"929",	"Code":	"MRU",	"Dec":	2},
 {"Num":	"480",	"Code":	"MUR",	"Dec":	2},
 {"Num":	"462",	"Code":	"MVR",	"Dec":	2},
 {"Num":	"454",	"Code":	"MWK",	"Dec":	2},
 {"Num":	"484",	"Code":	"MXN",	"Dec":	2},
 {"Num":	"979",	"Code":	"MXV",	"Dec":	2},
 {"Num":	"458",	"Code":	"MYR",	"Dec":	2},
 {"Num":	"943",	"Code":	"MZN",	"Dec":	2},
 {"Num":	"516",	"Code":	"NAD",	"Dec":	2},
 {"Num":	"566",	"Code":	"NGN",	"Dec":	2},
 {"Num":	"558",	"Code":	"NIO",	"Dec":	2},
 {"Num":	"578",	"Code":	"NOK",	"Dec":	2},
 {"Num":	"524",	"Code":	"NPR",	"Dec":	2},
 {"Num":	"554",	"Code":	"NZD",	"Dec":	2},
 {"Num":	"512",	"Code":	"OMR",	"Dec":	3},
 {"Num":	"590",	"Code":	"PAB",	"Dec":	2},
 {"Num":	"604",	"Code":	"PEN",	"Dec":	2},
 {"Num":	"598",	"Code":	"PGK",	"Dec":	2},
 {"Num":	"608",	"Code":	"PHP",	"Dec":	2},
 {"Num":	"586",	"Code":	"PKR",	"Dec":	2},
 {"Num":	"985",	"Code":	"PLN",	"Dec":	2},
 {"Num":	"600",	"Code":	"PYG",	"Dec":	0},
 {"Num":	"634",	"Code":	"QAR",	"Dec":	2},
 {"Num":	"946",	"Code":	"RON",	"Dec":	2},
 {"Num":	"941",	"Code":	"RSD",	"Dec":	2},
 {"Num":	"643",	"Code":	"RUB",	"Dec":	2},
 {"Num":	"646",	"Code":	"RWF",	"Dec":	0},
 {"Num":	"682",	"Code":	"SAR",	"Dec":	2},
 {"Num":	"090",	"Code":	"SBD",	"Dec":	2},
 {"Num":	"690",	"Code":	"SCR",	"Dec":	2},
 {"Num":	"938",	"Code":	"SDG",	"Dec":	2},
 {"Num":	"752",	"Code":	"SEK",	"Dec":	2},
 {"Num":	"702",	"Code":	"SGD",	"Dec":	2},
 {"Num":	"654",	"Code":	"SHP",	"Dec":	2},
 {"Num":	"694",	"Code":	"SLL",	"Dec":	2},
 {"Num":	"706",	"Code":	"SOS",	"Dec":	2},
 {"Num":	"968",	"Code":	"SRD",	"Dec":	2},
 {"Num":	"728",	"Code":	"SSP",	"Dec":	2},
 {"Num":	"930",	"Code":	"STN",	"Dec":	2},
 {"Num":	"222",	"Code":	"SVC",	"Dec":	2},
 {"Num":	"760",	"Code":	"SYP",	"Dec":	2},
 {"Num":	"748",	"Code":	"SZL",	"Dec":	2},
 {"Num":	"764",	"Code":	"THB",	"Dec":	2},
 {"Num":	"972",	"Code":	"TJS",	"Dec":	2},
 {"Num":	"934",	"Code":	"TMT",	"Dec":	2},
 {"Num":	"788",	"Code":	"TND",	"Dec":	3},
 {"Num":	"776",	"Code":	"TOP",	"Dec":	2},
 {"Num":	"949",	"Code":	"TRY",	"Dec":	2},
 {"Num":	"780",	"Code":	"TTD",	"Dec":	2},
 {"Num":	"901",	"Code":	"TWD",	"Dec":	2},
 {"Num":	"834",	"Code":	"TZS",	"Dec":	2},
 {"Num":	"980",	"Code":	"UAH",	"Dec":	2},
 {"Num":	"800",	"Code":	"UGX",	"Dec":	0},
 {"Num":	"840",	"Code":	"USD",	"Dec":	2},
 {"Num":	"997",	"Code":	"USN",	"Dec":	2},
 {"Num":	"940",	"Code":	"UYI",	"Dec":	0},
 {"Num":	"858",	"Code":	"UYU",	"Dec":	2},
 {"Num":	"927",	"Code":	"UYW",	"Dec":	4},
 {"Num":	"860",	"Code":	"UZS",	"Dec":	2},
 {"Num":	"928",	"Code":	"VES",	"Dec":	2},
 {"Num":	"704",	"Code":	"VND",	"Dec":	0},
 {"Num":	"548",	"Code":	"VUV",	"Dec":	0},
 {"Num":	"882",	"Code":	"WST",	"Dec":	2},
 {"Num":	"950",	"Code":	"XAF",	"Dec":	0},
 {"Num":	"961",	"Code":	"XAG",	"Dec":	null},
 {"Num":	"959",	"Code":	"XAU",	"Dec":	null},
 {"Num":	"955",	"Code":	"XBA",	"Dec":	null},
 {"Num":	"956",	"Code":	"XBB",	"Dec":	null},
 {"Num":	"957",	"Code":	"XBC",	"Dec":	null},
 {"Num":	"958",	"Code":	"XBD",	"Dec":	null},
 {"Num":	"951",	"Code":	"XCD",	"Dec":	2},
 {"Num":	"960",	"Code":	"XDR",	"Dec":	null},
 {"Num":	"952",	"Code":	"XOF",	"Dec":	0},
 {"Num":	"964",	"Code":	"XPD",	"Dec":	null},
 {"Num":	"953",	"Code":	"XPF",	"Dec":	0},
 {"Num":	"962",	"Code":	"XPT",	"Dec":	null},
 {"Num":	"994",	"Code":	"XSU",	"Dec":	null},
 {"Num":	"963",	"Code":	"XTS",	"Dec":	null},
 {"Num":	"965",	"Code":	"XUA",	"Dec":	null},
 {"Num":	"999",	"Code":	"XXX",	"Dec":	null},
 {"Num":	"886",	"Code":	"YER",	"Dec":	2},
 {"Num":	"710",	"Code":	"ZAR",	"Dec":	2},
 {"Num":	"967",	"Code":	"ZMW",	"Dec":	2},
 {"Num":	"932",	"Code":	"ZWL",	"Dec":	2}    
 ];
 
 var countryCode=[
 {"Alpha2":	"AF",	"Alpha3":	"AFG",	"Num":	"004"},
 {"Alpha2":	"AX",	"Alpha3":	"ALA",	"Num":	"248"},
 {"Alpha2":	"AL",	"Alpha3":	"ALB",	"Num":	"008"},
 {"Alpha2":	"DZ",	"Alpha3":	"DZA",	"Num":	"012"},
 {"Alpha2":	"AS",	"Alpha3":	"ASM",	"Num":	"016"},
 {"Alpha2":	"AD",	"Alpha3":	"AND",	"Num":	"020"},
 {"Alpha2":	"AO",	"Alpha3":	"AGO",	"Num":	"024"},
 {"Alpha2":	"AI",	"Alpha3":	"AIA",	"Num":	"660"},
 {"Alpha2":	"AQ",	"Alpha3":	"ATA",	"Num":	"010"},
 {"Alpha2":	"AG",	"Alpha3":	"ATG",	"Num":	"028"},
 {"Alpha2":	"AR",	"Alpha3":	"ARG",	"Num":	"032"},
 {"Alpha2":	"AM",	"Alpha3":	"ARM",	"Num":	"051"},
 {"Alpha2":	"AW",	"Alpha3":	"ABW",	"Num":	"533"},
 {"Alpha2":	"AU",	"Alpha3":	"AUS",	"Num":	"036"},
 {"Alpha2":	"AT",	"Alpha3":	"AUT",	"Num":	"040"},
 {"Alpha2":	"AZ",	"Alpha3":	"AZE",	"Num":	"031"},
 {"Alpha2":	"BS",	"Alpha3":	"BHS",	"Num":	"044"},
 {"Alpha2":	"BH",	"Alpha3":	"BHR",	"Num":	"048"},
 {"Alpha2":	"BD",	"Alpha3":	"BGD",	"Num":	"050"},
 {"Alpha2":	"BB",	"Alpha3":	"BRB",	"Num":	"052"},
 {"Alpha2":	"BY",	"Alpha3":	"BLR",	"Num":	"112"},
 {"Alpha2":	"BE",	"Alpha3":	"BEL",	"Num":	"056"},
 {"Alpha2":	"BZ",	"Alpha3":	"BLZ",	"Num":	"084"},
 {"Alpha2":	"BJ",	"Alpha3":	"BEN",	"Num":	"204"},
 {"Alpha2":	"BM",	"Alpha3":	"BMU",	"Num":	"060"},
 {"Alpha2":	"BT",	"Alpha3":	"BTN",	"Num":	"064"},
 {"Alpha2":	"BO",	"Alpha3":	"BOL",	"Num":	"068"},
 {"Alpha2":	"BQ",	"Alpha3":	"BES",	"Num":	"535"},
 {"Alpha2":	"BA",	"Alpha3":	"BIH",	"Num":	"070"},
 {"Alpha2":	"BW",	"Alpha3":	"BWA",	"Num":	"072"},
 {"Alpha2":	"BV",	"Alpha3":	"BVT",	"Num":	"074"},
 {"Alpha2":	"BR",	"Alpha3":	"BRA",	"Num":	"076"},
 {"Alpha2":	"IO",	"Alpha3":	"IOT",	"Num":	"086"},
 {"Alpha2":	"BN",	"Alpha3":	"BRN",	"Num":	"096"},
 {"Alpha2":	"BG",	"Alpha3":	"BGR",	"Num":	"100"},
 {"Alpha2":	"BF",	"Alpha3":	"BFA",	"Num":	"854"},
 {"Alpha2":	"BI",	"Alpha3":	"BDI",	"Num":	"108"},
 {"Alpha2":	"CV",	"Alpha3":	"CPV",	"Num":	"132"},
 {"Alpha2":	"KH",	"Alpha3":	"KHM",	"Num":	"116"},
 {"Alpha2":	"CM",	"Alpha3":	"CMR",	"Num":	"120"},
 {"Alpha2":	"CA",	"Alpha3":	"CAN",	"Num":	"124"},
 {"Alpha2":	"KY",	"Alpha3":	"CYM",	"Num":	"136"},
 {"Alpha2":	"CF",	"Alpha3":	"CAF",	"Num":	"140"},
 {"Alpha2":	"TD",	"Alpha3":	"TCD",	"Num":	"148"},
 {"Alpha2":	"CL",	"Alpha3":	"CHL",	"Num":	"152"},
 {"Alpha2":	"CN",	"Alpha3":	"CHN",	"Num":	"156"},
 {"Alpha2":	"CX",	"Alpha3":	"CXR",	"Num":	"162"},
 {"Alpha2":	"CC",	"Alpha3":	"CCK",	"Num":	"166"},
 {"Alpha2":	"CO",	"Alpha3":	"COL",	"Num":	"170"},
 {"Alpha2":	"KM",	"Alpha3":	"COM",	"Num":	"174"},
 {"Alpha2":	"CD",	"Alpha3":	"COD",	"Num":	"180"},
 {"Alpha2":	"CG",	"Alpha3":	"COG",	"Num":	"178"},
 {"Alpha2":	"CK",	"Alpha3":	"COK",	"Num":	"184"},
 {"Alpha2":	"CR",	"Alpha3":	"CRI",	"Num":	"188"},
 {"Alpha2":	"CI",	"Alpha3":	"CIV",	"Num":	"384"},
 {"Alpha2":	"HR",	"Alpha3":	"HRV",	"Num":	"191"},
 {"Alpha2":	"CU",	"Alpha3":	"CUB",	"Num":	"192"},
 {"Alpha2":	"CW",	"Alpha3":	"CUW",	"Num":	"531"},
 {"Alpha2":	"CY",	"Alpha3":	"CYP",	"Num":	"196"},
 {"Alpha2":	"CZ",	"Alpha3":	"CZE",	"Num":	"203"},
 {"Alpha2":	"DK",	"Alpha3":	"DNK",	"Num":	"208"},
 {"Alpha2":	"DJ",	"Alpha3":	"DJI",	"Num":	"262"},
 {"Alpha2":	"DM",	"Alpha3":	"DMA",	"Num":	"212"},
 {"Alpha2":	"DO",	"Alpha3":	"DOM",	"Num":	"214"},
 {"Alpha2":	"EC",	"Alpha3":	"ECU",	"Num":	"218"},
 {"Alpha2":	"EG",	"Alpha3":	"EGY",	"Num":	"818"},
 {"Alpha2":	"SV",	"Alpha3":	"SLV",	"Num":	"222"},
 {"Alpha2":	"GQ",	"Alpha3":	"GNQ",	"Num":	"226"},
 {"Alpha2":	"ER",	"Alpha3":	"ERI",	"Num":	"232"},
 {"Alpha2":	"EE",	"Alpha3":	"EST",	"Num":	"233"},
 {"Alpha2":	"SZ",	"Alpha3":	"SWZ",	"Num":	"748"},
 {"Alpha2":	"ET",	"Alpha3":	"ETH",	"Num":	"231"},
 {"Alpha2":	"FK",	"Alpha3":	"FLK",	"Num":	"238"},
 {"Alpha2":	"FO",	"Alpha3":	"FRO",	"Num":	"234"},
 {"Alpha2":	"FJ",	"Alpha3":	"FJI",	"Num":	"242"},
 {"Alpha2":	"FI",	"Alpha3":	"FIN",	"Num":	"246"},
 {"Alpha2":	"FR",	"Alpha3":	"FRA",	"Num":	"250"},
 {"Alpha2":	"GF",	"Alpha3":	"GUF",	"Num":	"254"},
 {"Alpha2":	"PF",	"Alpha3":	"PYF",	"Num":	"258"},
 {"Alpha2":	"TF",	"Alpha3":	"ATF",	"Num":	"260"},
 {"Alpha2":	"GA",	"Alpha3":	"GAB",	"Num":	"266"},
 {"Alpha2":	"GM",	"Alpha3":	"GMB",	"Num":	"270"},
 {"Alpha2":	"GE",	"Alpha3":	"GEO",	"Num":	"268"},
 {"Alpha2":	"DE",	"Alpha3":	"DEU",	"Num":	"276"},
 {"Alpha2":	"GH",	"Alpha3":	"GHA",	"Num":	"288"},
 {"Alpha2":	"GI",	"Alpha3":	"GIB",	"Num":	"292"},
 {"Alpha2":	"GR",	"Alpha3":	"GRC",	"Num":	"300"},
 {"Alpha2":	"GL",	"Alpha3":	"GRL",	"Num":	"304"},
 {"Alpha2":	"GD",	"Alpha3":	"GRD",	"Num":	"308"},
 {"Alpha2":	"GP",	"Alpha3":	"GLP",	"Num":	"312"},
 {"Alpha2":	"GU",	"Alpha3":	"GUM",	"Num":	"316"},
 {"Alpha2":	"GT",	"Alpha3":	"GTM",	"Num":	"320"},
 {"Alpha2":	"GG",	"Alpha3":	"GGY",	"Num":	"831"},
 {"Alpha2":	"GN",	"Alpha3":	"GIN",	"Num":	"324"},
 {"Alpha2":	"GW",	"Alpha3":	"GNB",	"Num":	"624"},
 {"Alpha2":	"GY",	"Alpha3":	"GUY",	"Num":	"328"},
 {"Alpha2":	"HT",	"Alpha3":	"HTI",	"Num":	"332"},
 {"Alpha2":	"HM",	"Alpha3":	"HMD",	"Num":	"334"},
 {"Alpha2":	"VA",	"Alpha3":	"VAT",	"Num":	"336"},
 {"Alpha2":	"HN",	"Alpha3":	"HND",	"Num":	"340"},
 {"Alpha2":	"HK",	"Alpha3":	"HKG",	"Num":	"344"},
 {"Alpha2":	"HU",	"Alpha3":	"HUN",	"Num":	"348"},
 {"Alpha2":	"IS",	"Alpha3":	"ISL",	"Num":	"352"},
 {"Alpha2":	"IN",	"Alpha3":	"IND",	"Num":	"356"},
 {"Alpha2":	"ID",	"Alpha3":	"IDN",	"Num":	"360"},
 {"Alpha2":	"IR",	"Alpha3":	"IRN",	"Num":	"364"},
 {"Alpha2":	"IQ",	"Alpha3":	"IRQ",	"Num":	"368"},
 {"Alpha2":	"IE",	"Alpha3":	"IRL",	"Num":	"372"},
 {"Alpha2":	"IM",	"Alpha3":	"IMN",	"Num":	"833"},
 {"Alpha2":	"IL",	"Alpha3":	"ISR",	"Num":	"376"},
 {"Alpha2":	"IT",	"Alpha3":	"ITA",	"Num":	"380"},
 {"Alpha2":	"JM",	"Alpha3":	"JAM",	"Num":	"388"},
 {"Alpha2":	"JP",	"Alpha3":	"JPN",	"Num":	"392"},
 {"Alpha2":	"JE",	"Alpha3":	"JEY",	"Num":	"832"},
 {"Alpha2":	"JO",	"Alpha3":	"JOR",	"Num":	"400"},
 {"Alpha2":	"KZ",	"Alpha3":	"KAZ",	"Num":	"398"},
 {"Alpha2":	"KE",	"Alpha3":	"KEN",	"Num":	"404"},
 {"Alpha2":	"KI",	"Alpha3":	"KIR",	"Num":	"296"},
 {"Alpha2":	"KP",	"Alpha3":	"PRK",	"Num":	"408"},
 {"Alpha2":	"KR",	"Alpha3":	"KOR",	"Num":	"410"},
 {"Alpha2":	"KW",	"Alpha3":	"KWT",	"Num":	"414"},
 {"Alpha2":	"KG",	"Alpha3":	"KGZ",	"Num":	"417"},
 {"Alpha2":	"LA",	"Alpha3":	"LAO",	"Num":	"418"},
 {"Alpha2":	"LV",	"Alpha3":	"LVA",	"Num":	"428"},
 {"Alpha2":	"LB",	"Alpha3":	"LBN",	"Num":	"422"},
 {"Alpha2":	"LS",	"Alpha3":	"LSO",	"Num":	"426"},
 {"Alpha2":	"LR",	"Alpha3":	"LBR",	"Num":	"430"},
 {"Alpha2":	"LY",	"Alpha3":	"LBY",	"Num":	"434"},
 {"Alpha2":	"LI",	"Alpha3":	"LIE",	"Num":	"438"},
 {"Alpha2":	"LT",	"Alpha3":	"LTU",	"Num":	"440"},
 {"Alpha2":	"LU",	"Alpha3":	"LUX",	"Num":	"442"},
 {"Alpha2":	"MO",	"Alpha3":	"MAC",	"Num":	"446"},
 {"Alpha2":	"MK",	"Alpha3":	"MKD",	"Num":	"807"},
 {"Alpha2":	"MG",	"Alpha3":	"MDG",	"Num":	"450"},
 {"Alpha2":	"MW",	"Alpha3":	"MWI",	"Num":	"454"},
 {"Alpha2":	"MY",	"Alpha3":	"MYS",	"Num":	"458"},
 {"Alpha2":	"MV",	"Alpha3":	"MDV",	"Num":	"462"},
 {"Alpha2":	"ML",	"Alpha3":	"MLI",	"Num":	"466"},
 {"Alpha2":	"MT",	"Alpha3":	"MLT",	"Num":	"470"},
 {"Alpha2":	"MH",	"Alpha3":	"MHL",	"Num":	"584"},
 {"Alpha2":	"MQ",	"Alpha3":	"MTQ",	"Num":	"474"},
 {"Alpha2":	"MR",	"Alpha3":	"MRT",	"Num":	"478"},
 {"Alpha2":	"MU",	"Alpha3":	"MUS",	"Num":	"480"},
 {"Alpha2":	"YT",	"Alpha3":	"MYT",	"Num":	"175"},
 {"Alpha2":	"MX",	"Alpha3":	"MEX",	"Num":	"484"},
 {"Alpha2":	"FM",	"Alpha3":	"FSM",	"Num":	"583"},
 {"Alpha2":	"MD",	"Alpha3":	"MDA",	"Num":	"498"},
 {"Alpha2":	"MC",	"Alpha3":	"MCO",	"Num":	"492"},
 {"Alpha2":	"MN",	"Alpha3":	"MNG",	"Num":	"496"},
 {"Alpha2":	"ME",	"Alpha3":	"MNE",	"Num":	"499"},
 {"Alpha2":	"MS",	"Alpha3":	"MSR",	"Num":	"500"},
 {"Alpha2":	"MA",	"Alpha3":	"MAR",	"Num":	"504"},
 {"Alpha2":	"MZ",	"Alpha3":	"MOZ",	"Num":	"508"},
 {"Alpha2":	"MM",	"Alpha3":	"MMR",	"Num":	"104"},
 {"Alpha2":	"NA",	"Alpha3":	"NAM",	"Num":	"516"},
 {"Alpha2":	"NR",	"Alpha3":	"NRU",	"Num":	"520"},
 {"Alpha2":	"NP",	"Alpha3":	"NPL",	"Num":	"524"},
 {"Alpha2":	"NL",	"Alpha3":	"NLD",	"Num":	"528"},
 {"Alpha2":	"NC",	"Alpha3":	"NCL",	"Num":	"540"},
 {"Alpha2":	"NZ",	"Alpha3":	"NZL",	"Num":	"554"},
 {"Alpha2":	"NI",	"Alpha3":	"NIC",	"Num":	"558"},
 {"Alpha2":	"NE",	"Alpha3":	"NER",	"Num":	"562"},
 {"Alpha2":	"NG",	"Alpha3":	"NGA",	"Num":	"566"},
 {"Alpha2":	"NU",	"Alpha3":	"NIU",	"Num":	"570"},
 {"Alpha2":	"NF",	"Alpha3":	"NFK",	"Num":	"574"},
 {"Alpha2":	"MP",	"Alpha3":	"MNP",	"Num":	"580"},
 {"Alpha2":	"NO",	"Alpha3":	"NOR",	"Num":	"578"},
 {"Alpha2":	"OM",	"Alpha3":	"OMN",	"Num":	"512"},
 {"Alpha2":	"PK",	"Alpha3":	"PAK",	"Num":	"586"},
 {"Alpha2":	"PW",	"Alpha3":	"PLW",	"Num":	"585"},
 {"Alpha2":	"PS",	"Alpha3":	"PSE",	"Num":	"275"},
 {"Alpha2":	"PA",	"Alpha3":	"PAN",	"Num":	"591"},
 {"Alpha2":	"PG",	"Alpha3":	"PNG",	"Num":	"598"},
 {"Alpha2":	"PY",	"Alpha3":	"PRY",	"Num":	"600"},
 {"Alpha2":	"PE",	"Alpha3":	"PER",	"Num":	"604"},
 {"Alpha2":	"PH",	"Alpha3":	"PHL",	"Num":	"608"},
 {"Alpha2":	"PN",	"Alpha3":	"PCN",	"Num":	"612"},
 {"Alpha2":	"PL",	"Alpha3":	"POL",	"Num":	"616"},
 {"Alpha2":	"PT",	"Alpha3":	"PRT",	"Num":	"620"},
 {"Alpha2":	"PR",	"Alpha3":	"PRI",	"Num":	"630"},
 {"Alpha2":	"QA",	"Alpha3":	"QAT",	"Num":	"634"},
 {"Alpha2":	"RE",	"Alpha3":	"REU",	"Num":	"638"},
 {"Alpha2":	"RO",	"Alpha3":	"ROU",	"Num":	"642"},
 {"Alpha2":	"RU",	"Alpha3":	"RUS",	"Num":	"643"},
 {"Alpha2":	"RW",	"Alpha3":	"RWA",	"Num":	"646"},
 {"Alpha2":	"BL",	"Alpha3":	"BLM",	"Num":	"652"},
 {"Alpha2":	"SH",	"Alpha3":	"SHN",	"Num":	"654"},
 {"Alpha2":	"KN",	"Alpha3":	"KNA",	"Num":	"659"},
 {"Alpha2":	"LC",	"Alpha3":	"LCA",	"Num":	"662"},
 {"Alpha2":	"MF",	"Alpha3":	"MAF",	"Num":	"663"},
 {"Alpha2":	"PM",	"Alpha3":	"SPM",	"Num":	"666"},
 {"Alpha2":	"VC",	"Alpha3":	"VCT",	"Num":	"670"},
 {"Alpha2":	"WS",	"Alpha3":	"WSM",	"Num":	"882"},
 {"Alpha2":	"SM",	"Alpha3":	"SMR",	"Num":	"674"},
 {"Alpha2":	"ST",	"Alpha3":	"STP",	"Num":	"678"},
 {"Alpha2":	"SA",	"Alpha3":	"SAU",	"Num":	"682"},
 {"Alpha2":	"SN",	"Alpha3":	"SEN",	"Num":	"686"},
 {"Alpha2":	"RS",	"Alpha3":	"SRB",	"Num":	"688"},
 {"Alpha2":	"SC",	"Alpha3":	"SYC",	"Num":	"690"},
 {"Alpha2":	"SL",	"Alpha3":	"SLE",	"Num":	"694"},
 {"Alpha2":	"SG",	"Alpha3":	"SGP",	"Num":	"702"},
 {"Alpha2":	"SX",	"Alpha3":	"SXM",	"Num":	"534"},
 {"Alpha2":	"SK",	"Alpha3":	"SVK",	"Num":	"703"},
 {"Alpha2":	"SI",	"Alpha3":	"SVN",	"Num":	"705"},
 {"Alpha2":	"SB",	"Alpha3":	"SLB",	"Num":	"090"},
 {"Alpha2":	"SO",	"Alpha3":	"SOM",	"Num":	"706"},
 {"Alpha2":	"ZA",	"Alpha3":	"ZAF",	"Num":	"710"},
 {"Alpha2":	"GS",	"Alpha3":	"SGS",	"Num":	"239"},
 {"Alpha2":	"SS",	"Alpha3":	"SSD",	"Num":	"728"},
 {"Alpha2":	"ES",	"Alpha3":	"ESP",	"Num":	"724"},
 {"Alpha2":	"LK",	"Alpha3":	"LKA",	"Num":	"144"},
 {"Alpha2":	"SD",	"Alpha3":	"SDN",	"Num":	"729"},
 {"Alpha2":	"SR",	"Alpha3":	"SUR",	"Num":	"740"},
 {"Alpha2":	"SJ",	"Alpha3":	"SJM",	"Num":	"744"},
 {"Alpha2":	"SE",	"Alpha3":	"SWE",	"Num":	"752"},
 {"Alpha2":	"CH",	"Alpha3":	"CHE",	"Num":	"756"},
 {"Alpha2":	"SY",	"Alpha3":	"SYR",	"Num":	"760"},
 {"Alpha2":	"TW",	"Alpha3":	"TWN",	"Num":	"158"},
 {"Alpha2":	"TJ",	"Alpha3":	"TJK",	"Num":	"762"},
 {"Alpha2":	"TZ",	"Alpha3":	"TZA",	"Num":	"834"},
 {"Alpha2":	"TH",	"Alpha3":	"THA",	"Num":	"764"},
 {"Alpha2":	"TL",	"Alpha3":	"TLS",	"Num":	"626"},
 {"Alpha2":	"TG",	"Alpha3":	"TGO",	"Num":	"768"},
 {"Alpha2":	"TK",	"Alpha3":	"TKL",	"Num":	"772"},
 {"Alpha2":	"TO",	"Alpha3":	"TON",	"Num":	"776"},
 {"Alpha2":	"TT",	"Alpha3":	"TTO",	"Num":	"780"},
 {"Alpha2":	"TN",	"Alpha3":	"TUN",	"Num":	"788"},
 {"Alpha2":	"TR",	"Alpha3":	"TUR",	"Num":	"792"},
 {"Alpha2":	"TM",	"Alpha3":	"TKM",	"Num":	"795"},
 {"Alpha2":	"TC",	"Alpha3":	"TCA",	"Num":	"796"},
 {"Alpha2":	"TV",	"Alpha3":	"TUV",	"Num":	"798"},
 {"Alpha2":	"UG",	"Alpha3":	"UGA",	"Num":	"800"},
 {"Alpha2":	"UA",	"Alpha3":	"UKR",	"Num":	"804"},
 {"Alpha2":	"AE",	"Alpha3":	"ARE",	"Num":	"784"},
 {"Alpha2":	"GB",	"Alpha3":	"GBR",	"Num":	"826"},
 {"Alpha2":	"UM",	"Alpha3":	"UMI",	"Num":	"581"},
 {"Alpha2":	"US",	"Alpha3":	"USA",	"Num":	"840"},
 {"Alpha2":	"UY",	"Alpha3":	"URY",	"Num":	"858"},
 {"Alpha2":	"UZ",	"Alpha3":	"UZB",	"Num":	"860"},
 {"Alpha2":	"VU",	"Alpha3":	"VUT",	"Num":	"548"},
 {"Alpha2":	"VE",	"Alpha3":	"VEN",	"Num":	"862"},
 {"Alpha2":	"VN",	"Alpha3":	"VNM",	"Num":	"704"},
 {"Alpha2":	"VG",	"Alpha3":	"VGB",	"Num":	"092"},
 {"Alpha2":	"VI",	"Alpha3":	"VIR",	"Num":	"850"},
 {"Alpha2":	"WF",	"Alpha3":	"WLF",	"Num":	"876"},
 {"Alpha2":	"EH",	"Alpha3":	"ESH",	"Num":	"732"},
 {"Alpha2":	"YE",	"Alpha3":	"YEM",	"Num":	"887"},
 {"Alpha2":	"ZM",	"Alpha3":	"ZMB",	"Num":	"894"},
 {"Alpha2":	"ZW",	"Alpha3":	"ZWE",	"Num":	"716"}
 ];
 
 
 //#endregion


// function lowering(x){
//   x.toLowerCase()
//   return x;
// }

var chai = require('chai');
var expect = require("chai").expect;
var should = require('chai').should();
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const SendPayoutRequest_Schema = require('../../schema-mapping/sendPayoutRequest_Schema');
const sendPayoutRequest_first='../../apigee-mapping-scripts/send-payout-to-psp-request-mapping-part-1';
const sendPayoutRequest_second='../../apigee-mapping-scripts/send-payout-to-psp-request-mapping-part-2';
const sendPayoutRequest_third='../../apigee-mapping-scripts/send-payout-to-psp-request-mapping-part-3.js';

var sinon = require('sinon');
const { error } = require('console');

var contextVars = {};

global.context = {
getVariable: function(variable) {},
setVariable: function(variable, value) {}
};
global.crypto={
  getSHA256:function(variable){}
}

global._sha256={
  update:function(){},
  digest:function(){}
}

var contextGetVariableMethod, contextSetVariableMethod,cryptoGetSHA256,_sha256Update,_sha256digest;

module.exports = {
  cases:function(value,i){
        describe('Row no. for the transaction cases :-' + (1+i), () =>{

             before(async function(){
                contextGetVariableMethod = sinon.stub(context, 'getVariable');
                cryptoGetSHA256 = sinon.stub(crypto, 'getSHA256');
                _sha256Update=sinon.stub(_sha256,'update');
                _sha256digest=sinon.stub(_sha256,'digest');
                contextSetVariableMethod = sinon.stub(context, 'setVariable').callsFake(
                    function(a, b) {
                        contextVars[a] = b;}
                    );           

                SendPayoutRequest_Schema.request.payload=value;
              });

              after(async function(){
                contextGetVariableMethod.restore();
                contextSetVariableMethod.restore();
                cryptoGetSHA256.restore();
                _sha256Update.restore();
                _sha256digest.restore();
              });
          
              it('Statement Narrative is correct', (done) =>{

                  contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  cryptoGetSHA256.withArgs().returns(module.exports={
                      update:function (){},
                      digest:function (){return "12345678654sdfghj"}});
                  _sha256Update.withArgs().returns();
                  _sha256digest.withArgs().returns();
                  loadJS(sendPayoutRequest_first);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                  loadJS(sendPayoutRequest_second);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);

                  if("transactionDetail" in SendPayoutRequest_Schema.request){
                     if("statementNarrative" in SendPayoutRequest_Schema.request.transactionDetail){
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryStatementNarrative"]).to.equal(SendPayoutRequest_Schema.request.transactionDetail.statementNarrative)
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryStatementNarrative"]).to.be.not.undefined;
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryStatementNarrative"]).to.be.not.equal('');
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryStatementNarrative"]).is.not.null;
                    }else{
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryStatementNarrative"]).to.be.undefined;
                    }
                  }
                  done();
              }).timeout(5000);


              it('PayoutId',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  cryptoGetSHA256.withArgs().returns(module.exports={
                      update:function (){},
                      digest:function (){return "12345678654sdfghj"}});
                  _sha256Update.withArgs().returns();
                  _sha256digest.withArgs().returns();
                  loadJS(sendPayoutRequest_first);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                  loadJS(sendPayoutRequest_second);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  if('transactionDetail' in SendPayoutRequest_Schema.request){
                    if('payoutId' in SendPayoutRequest_Schema.request.transactionDetail){
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantTransactionReference"]).to.equal(SendPayoutRequest_Schema.request.transactionDetail.payoutId);
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantTransactionReference"]).to.be.not.undefined;
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantTransactionReference"]).to.be.not.equal('');
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantTransactionReference"]).is.not.null;
                    }else{
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantTransactionReference"]).to.be.undefined;
                    }
                  }


                    done();
              }).timeout(5000);

              it('DestinationAmount',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  cryptoGetSHA256.withArgs().returns(module.exports={
                      update:function (){},
                      digest:function (){return "12345678654sdfghj"}});
                  _sha256Update.withArgs().returns();
                  _sha256digest.withArgs().returns();
                  loadJS(sendPayoutRequest_first);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                  loadJS(sendPayoutRequest_second);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);

                  if('transactionDetail' in SendPayoutRequest_Schema.request){
                    if('destinationAmount' in SendPayoutRequest_Schema.request.transactionDetail && 'destinationCurrencyCode' in SendPayoutRequest_Schema.request.transactionDetail){
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:amount"]).to.equal(parseAmount(SendPayoutRequest_Schema.request.transactionDetail.destinationAmount , SendPayoutRequest_Schema.request.transactionDetail.destinationCurrencyCode));
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:amount"]).to.be.not.undefined;
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:amount"]).to.be.not.equal('');
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:amount"]).is.not.null;
                    }
                    else{
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:amount"]).to.be.undefined;
                    }
                  }



                    done();
              }).timeout(5000);

              it('DestinationCurrencyCode',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  cryptoGetSHA256.withArgs().returns(module.exports={
                      update:function (){},
                      digest:function (){return "12345678654sdfghj"}});
                  _sha256Update.withArgs().returns();
                  _sha256digest.withArgs().returns();
                  loadJS(sendPayoutRequest_first);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                  loadJS(sendPayoutRequest_second);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);

                  if('transactionDetail' in SendPayoutRequest_Schema.request){
                    if('destinationCurrencyCode' in SendPayoutRequest_Schema.request.transactionDetail){
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:currency"]).to.be.equal(getCurrencyCode(SendPayoutRequest_Schema.request.transactionDetail.destinationCurrencyCode));
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:currency"]).to.be.not.undefined;
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:currency"]).to.be.not.equal('');
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:currency"]).is.not.null;
                    
                    }
                    else{
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:beneficiaryAmount"]["ns1:currency"]).to.be.undefined;
                    }
                  }

                    done();

              }).timeout(5000);


              it('SettlementAmount',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  cryptoGetSHA256.withArgs().returns(module.exports={
                      update:function (){},
                      digest:function (){return "12345678654sdfghj"}});
                  _sha256Update.withArgs().returns();
                  _sha256digest.withArgs().returns();
                  loadJS(sendPayoutRequest_first);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                  loadJS(sendPayoutRequest_second);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);

                  if('transactionDetail' in SendPayoutRequest_Schema.request){
                    if('settlementAmount' in SendPayoutRequest_Schema.request.transactionDetail && 'settlementCurrencyCode' in SendPayoutRequest_Schema.request.transactionDetail){
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:amount"]).to.equal(parseAmount(SendPayoutRequest_Schema.request.transactionDetail.settlementAmount , SendPayoutRequest_Schema.request.transactionDetail.settlementCurrencyCode));
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:amount"]).to.be.not.undefined;
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:amount"]).to.be.not.equal('');
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:amount"]).is.not.null
                    }
                    else{
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:amount"]).to.be.undefined;
                    }
                  }



                    done();
              }).timeout(5000);


              it('SettlementCurrencyCode for PAYOUT REQUEST AMOUNT',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  cryptoGetSHA256.withArgs().returns(module.exports={
                      update:function (){},
                      digest:function (){return "12345678654sdfghj"}});
                  _sha256Update.withArgs().returns();
                  _sha256digest.withArgs().returns();
                  loadJS(sendPayoutRequest_first);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                  loadJS(sendPayoutRequest_second);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);

                  if('transactionDetail' in SendPayoutRequest_Schema.request){
                    if('settlementCurrencyCode' in SendPayoutRequest_Schema.request.transactionDetail){

                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:currency"]).to.equal(getCurrencyCode(SendPayoutRequest_Schema.request.transactionDetail.settlementCurrencyCode));
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:currency"]).to.be.not.undefined;
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:currency"]).to.be.not.equal('');
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:currency"]).is.not.null;                      
                    }
                    else{
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutRequestAmount"]["ns1:currency"]).to.be.undefined;
                    }
                  }

                  done();

              }).timeout(5000);


              it('SettlementCurrencyCode for BENEFICIARY AMOUNT INFORMATION',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  cryptoGetSHA256.withArgs().returns(module.exports={
                      update:function (){},
                      digest:function (){return "12345678654sdfghj"}});
                  _sha256Update.withArgs().returns();
                  _sha256digest.withArgs().returns();
                  loadJS(sendPayoutRequest_first);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                  contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                  loadJS(sendPayoutRequest_second);
                  var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                  if('transactionDetail' in SendPayoutRequest_Schema.request){
                    if('settlementCurrencyCode' in SendPayoutRequest_Schema.request.transactionDetail){


                expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:payoutCurrency"]).to.equal(getCurrencyCode(SendPayoutRequest_Schema.request.transactionDetail.settlementCurrencyCode));
                expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:payoutCurrency"]).to.be.not.undefined;
                expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:payoutCurrency"]).to.be.not.equal('');
                expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:payoutCurrency"]).is.not.null;
                  }
                  else{
                    expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:beneficiaryAmountInformation"]["ns13:payoutCurrency"]).to.be.undefined;

                  }
                }

                done();
              }).timeout(5000);



              it('PayoutSpeed',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                cryptoGetSHA256.withArgs().returns(module.exports={
                    update:function (){},
                    digest:function (){return "12345678654sdfghj"}});
                _sha256Update.withArgs().returns();
                _sha256digest.withArgs().returns();
                loadJS(sendPayoutRequest_first);
                var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                loadJS(sendPayoutRequest_second);
                var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                console.log(SendPayoutRequest_Schema.request)
                // console.log(JSON.stringify(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:serviceLevel"]))
                // console.log((SendPayoutRequest_Schema.request.transactionDetail.payoutSpeed).toLowerCase())

                if('transactionDetail' in SendPayoutRequest_Schema.request){
                  if('payoutSpeed' in SendPayoutRequest_Schema.request.transactionDetail){
                    if((SendPayoutRequest_Schema.request.transactionDetail.payoutSpeed) == 'premium'){
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:serviceLevel"]).to.equal('express');
                    }
                    else{
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:serviceLevel"]).to.equal(SendPayoutRequest_Schema.request.transactionDetail.payoutSpeed)
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:serviceLevel"]).to.be.not.undefined;
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:serviceLevel"]).to.be.not.equal('');
                      expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:serviceLevel"]).is.not.null;
                    }

                  }else{
                    expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:serviceLevel"]).to.equal('standard')
                  }
                }



                done();

              }).timeout(5000);


              it('TransactionIdentifier',(done)=>{
                contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                cryptoGetSHA256.withArgs().returns(module.exports={
                    update:function (){},
                    digest:function (){return "12345678654sdfghj"}});
                _sha256Update.withArgs().returns();
                _sha256digest.withArgs().returns();
                loadJS(sendPayoutRequest_first);
                var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
                contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
                loadJS(sendPayoutRequest_second);
                var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
                
                if('transactionDetail' in SendPayoutRequest_Schema.request){
                  if('transactionIdentifier' in SendPayoutRequest_Schema.request.transactionDetail){
                    expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantUserIdentity"]).to.equal("12345678654sdfghj");
                    expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantUserIdentity"]).to.be.not.undefined;
                    expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantUserIdentity"]).to.be.not.equal('');
                    expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantUserIdentity"]).is.not.null;

                  }
                  else{
                    expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:merchantUserIdentity"]).to.be.undefined;
                  }
                }

                done();


              }).timeout(5000);


              // it('PurposeOfPayment',(done)=>{
              //   contextGetVariableMethod.withArgs("request.content").returns(JSON.stringify(SendPayoutRequest_Schema.request));
              //   cryptoGetSHA256.withArgs().returns(module.exports={
              //       update:function (){},
              //       digest:function (){return "12345678654sdfghj"}});
              //   _sha256Update.withArgs().returns();
              //   _sha256digest.withArgs().returns();
              //   loadJS(sendPayoutRequest_first);
              //   var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
              //   contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
              //   contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
              //   loadJS(sendPayoutRequest_second);
              //   var latestRequest =JSON.parse(contextVars["private.earthportRequest"]);
              //   contextGetVariableMethod.withArgs("private.originalRequest").returns(JSON.stringify(SendPayoutRequest_Schema.request));
              //   contextGetVariableMethod.withArgs("private.earthportRequest").returns(JSON.stringify(latestRequest));
              //   loadJS(sendPayoutRequest_third);
              //  var latestRequest =JSON.parse(contextVars["request.content"]);
              //   if('transactionDetail' in SendPayoutRequest_Schema.request){
              // // if('purposeOfPayment' in SendPayoutRequest_Schema.request.transactionDetail){
              // //       expect(latestRequest.parameters["ns13:createOrUpdateUserAddBeneficiaryBankAccountAndPayout"]["ns13:payoutDetails"]).to.be.an('array').that.contains.something.like([{"ns8:key": "PURPOSE_OF_PAYMENT","ns8:value":SendPayoutRequest_Schema.request.transactionDetail.purposeOfPayment}]);
                  
              // var filter = 
                
              // //       //gotta work on else case as well 
                  
              // //   }
              // }
              

              //   done();

              // }).timeout(5000);
          
          })
        }
  }



//#region function to remove the require file cache 

function loadJS(fileName) {
  //ensure js can be included without error
 var errorThrown = false;
 try {
   requireUncached(fileName);
 } catch (e) {
   console.log(e.stack);
   errorThrown = true;
 }
 expect(errorThrown).to.equal(false);
}

// node.js caches modules that is imported using 'require'
// this utility function prevents caching between it() functions - don't forget that variables are global in our javascript file
function requireUncached(module) {
 delete require.cache[require.resolve(module)];
 return require(module);
}

