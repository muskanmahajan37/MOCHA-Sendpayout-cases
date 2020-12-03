module.exports = {
 
    request:{
        "originatorDetail": {
            "bankId": 416584,
            "bankCountryCode": "840",
            "originatorId": "CAIDCode77765",
            "originatorName": "VPL Postman Test",
            "originatorCustomerName": "Star Bucks",
            "bankName": "Bank of America",
            "bankBIC":"1234567",
            "address": {
                "addressLine": "Times Square–42nd Street",
                "stateOrProvinceCode": "NY",
                "postalCode": "10001",
                "country": "USA"
            },
            "merchantCategoryCode": "6012"
        },
        "serviceProviderDetail": {
            "routingId": "4655710020000018"
        },
        "transactionDetail": {
            "payoutId":"{{payoutId}}",
            "destinationAmount": 3000,
            "destinationCurrencyCode":"356",
            "settlementAmount": 3000,
            "settlementCurrencyCode": "840",
            "settlementDate": "0227",
            "transactionIdentifier": "300114521002125",
            "retrievalReferenceNumber":123456789,
            "transmissionDateTime": "2020-04-17T18:04:07.000Z",
            "systemTraceAuditNumber": "444555",
            "amount": 2000,
            "transactionCurrencyCode": "978",
            "localTransactionDateTime": "10-06-2019 12:04:59",
            "businessApplicationId": "FD",
            "payoutSpeed": "standard",
            "statementNarrative": "Advance payment",
            "purposeOfPayment":"ISTRAD"
        },
        "recipientDetail": {
            "type": "C",
            "fullName":"Visa",
            "firstName": "Jessica",
            "lastName": "smith",
            "companyName": "Company of India",
            "cityOfBirth": "IND",
            "countryOfBirth": "IND",
            "dateOfBirth": "2020-02-27",
            "identificationList": [],       
            "additionalData":[],     
            "contactNumber": "2345678909",
            "contactEmail": "jessica@visa.com",
            "address": {
                "addressLine1": "123 Main St",
                "addressLine2": "Lane 1",
                "addressLine3": "Apt 101",
                "city": "Jaipur",
                "country": "IND",
                "postalCode":"optional",
                "province":"optional"
            },
            "payoutMethod": "B",
            "bank": {
                "bankName": "AXIS BANK",
                "accountName": "Money Market",
                "accountNumberType": "DEFAULT",
                "accountNumber": "643401505732",
                "bankCodeType": "DEFAULT",
                "bankCode": "ICIC0006650",
                "accountNumberSuffix":"12",
                "accountType": "2",
                "branchCode": "94706",
                "countryCode": "IND",
                "currencyCode": "INR",
                "BIC":"COKMM890"
            }
        },
        "senderDetail": {
            "type": "C",
            "fullName":"Earthport",
            "firstName": "Jessica",
            "lastName": "smith",
            "companyName": "Company of India",
            "cityOfBirth": "IND",
            "countryOfBirth": "IND",
            "dateOfBirth": "2020-02-27",
            "identificationList": [],
            "additionalData":[],
            "contactNumber": "2345678909",
            "contactEmail": "employee@visa.com",
            "sourceOfIncome":"employemet",
            "beneficiaryRelationship":"optional",
            "senderReferenceNumber":"34536789056",
            "address":{
                "addressLine1": "Street 2",
                "addressLine2": "Lane 2",
                "addressLine3": "Apt 202",
                "city": "San Francisco",
                "country": "USA",
                "postalCode": "78759",
                "province": "CA"
            }
        },    
    set payload (data){
            // console.log(data);

      data.OD_bankId!=""?this.originatorDetail.bankId=data.OD_bankId:delete this.originatorDetail.bankdId;
      data.OD_bankCountryCode!=""?this.originatorDetail.bankCountryCode=data.OD_bankCountryCode:delete this.originatorDetail.bankCountryCode;
      data.OD_originatorId!=""?this.originatorDetail.originatorId=data.OD_originatorId:delete this.originatorDetail.originatorId;
      data.OD_originatorName!=""?this.originatorDetail.originatorName=data.OD_originatorName:delete this.originatorDetail.originatorName;
      data.OD_bankName!=""?this.originatorDetail.bankName=data.OD_bankName:delete this.originatorDetail.bankName;
      data.OD_originatorCustomerName!=""?this.originatorDetail.originatorCustomerName=data.OD_originatorCustomerName:delete this.originatorDetail.originatorCustomerName;
      data.OD_bankBIC!=""?this.originatorDetail.bankBIC=data.OD_bankBIC:delete this.originatorDetail.bankBIC;
      data.OD_address_addressLine!=""?this.originatorDetail.address.addressLine=data.OD_address_addressLine:delete this.originatorDetail.address.addressLine;
      data.OD_address_stateOrProvinceCode!=""?this.originatorDetail.address.stateOrProvinceCode=data.OD_address_stateOrProvinceCode:delete this.originatorDetail.address.stateOrProvinceCode;
      data.OD_address_postalCode!=""?this.originatorDetail.address.postalCode=data.OD_address_postalCode:delete this.originatorDetail.address.postalCode;
      data.OD_address_country!=""?this.originatorDetail.address.country=data.OD_address_country:delete this.originatorDetail.address.country;
      data.OD_merchantCategoryCode!=""?this.originatorDetail.merchantCategoryCode=data.OD_merchantCategoryCode:delete this.originatorDetail.merchantCategoryCode;

      data.SPD_routingId!=""?this.serviceProviderDetail.routingId=data.SPD_routingId:delete this.serviceProviderDetail.routingId;

      data.TD_payoutId!=""?this.transactionDetail.payoutId=data.TD_payoutId:delete this.transactionDetail.payoutId;
      data.TD_destinationAmount!=""?this.transactionDetail.destinationAmount=data.TD_destinationAmount:delete this.transactionDetail.destinationAmount;
      data.TD_destinationCurrencyCode!=""?this.transactionDetail.destinationCurrencyCode=data.TD_destinationCurrencyCode:delete this.transactionDetail.destinationCurrencyCode;
      data.TD_settlementAmount!=""?this.transactionDetail.settlementAmount=data.TD_settlementAmount:delete this.transactionDetail.settlementAmount;
      data.TD_settlementDate!=""?this.transactionDetail.settlementDate=data.TD_settlementDate:delete this.transactionDetail.settlementDate;
      data.TD_transactionIdentifier!=""?this.transactionDetail.transactionIdentifier=data.TD_transactionIdentifier:delete this.transactionDetail.transactionIdentifier;
      data.TD_retrievalReferenceNumber!=""?this.transactionDetail.retrievalReferenceNumber=data.TD_retrievalReferenceNumber:delete this.transactionDetail.retrievalReferenceNumber;
      data.TD_systemTraceAuditNumber!=""?this.transactionDetail.systemTraceAuditNumber=data.TD_systemTraceAuditNumber:delete this.transactionDetail.systemTraceAuditNumber;
      data.TD_amount!=""?this.transactionDetail.amount=data.TD_amount:delete this.transactionDetail.amount;
      data.TD_transactionCurrencyCode!=""?this.transactionDetail.transactionCurrencyCode=data.TD_transactionCurrencyCode:delete this.transactionDetail.transactionCurrencyCode;
      data.TD_localTransactionDateTime!=""?this.transactionDetail.localTransactionDateTime=data.TD_localTransactionDateTime:delete this.transactionDetail.localTransactionDateTime;
      data.TD_businessApplicationId!=""?this.transactionDetail.businessApplicationId=data.TD_businessApplicationId:delete this.transactionDetail.businessApplicationId;
      data.TD_statementNarrative!=""?this.transactionDetail.statementNarrative=data.TD_statementNarrative:delete this.transactionDetail.statementNarrative;
      data.TD_purposeOfPayment!=""?this.transactionDetail.purposeOfPayment=data.TD_purposeOfPayment:delete this.transactionDetail.purposeOfPayment;
      data.TD_payoutSpeed!=""?this.transactionDetail.payoutSpeed=data.TD_payoutSpeed:delete this.transactionDetail.payoutSpeed;

      data.RD_type!=""?this.recipientDetail.type = data.RD_type:delete this.recipientDetail.type;


// //#region additionalData
// RD_additionalData_name=data.RD_additionalData_name.split("-");

// if (Array.isArray(RD_additionalData_name)) {
//   RD_additionalData_name_Length=RD_additionalData_name.length;

//   for(var i=0;i<RD_additionalData_name_Length;i++){

//       if(typeof this.recipientDetail.additionalData[i] !== 'object'){
//           this.recipientDetail.additionalData[i]={};
//       }
      
//       this.recipientDetail.additionalData[i].name="dummy_Name";
//       RD_additionalData_name[i]!=""?this.recipientDetail.additionalData[i].name=RD_additionalData_name[i]:delete this.recipientDetail.additionalData[i].name;
//   }
// }

// RD_additionalData_value=data.RD_additionalData_value.split("-");

// if (Array.isArray(RD_additionalData_value)) {
//   RD_additionalData_value_Length=RD_additionalData_value.length;
  

//   for(var i=0;i<RD_additionalData_value_Length;i++){
//       if(typeof this.recipientDetail.additionalData[i] !== 'object'){
//           this.recipientDetail.additionalData[i]={};
//       }
//       this.recipientDetail.additionalData[i].value="dummy_value";
//       RD_additionalData_value[i]!=""?this.recipientDetail.additionalData[i].value=RD_additionalData_value[i]:delete this.recipientDetail.additionalData[i].value;
//   }
// }

// //delete additionalData if its objects are empty
// if("additionalData" in this.recipientDetail){
//   ADlength=this.recipientDetail.additionalData.length;
//   if(ADlength === 1){
//       if(this.recipientDetail.additionalData[0].name === undefined && this.recipientDetail.additionalData[0].value ===undefined){
//           console.log(this.recipientDetail.additionalData[0].name);
//           delete this.recipientDetail.additionalData;
//       }

//   }

// }

// //#endregion

//#region  identificationList
RD_identList_idType=data.RD_identList_idType.split("-");

if (Array.isArray(RD_identList_idType)) {
    RD_idType_Length=RD_identList_idType.length;

    for(var i=0;i<RD_idType_Length;i++){
      if(typeof this.recipientDetail.identificationList[i] !== 'object'){
         this.recipientDetail.identificationList[i]={};
      }
      this.recipientDetail.identificationList[i].idType="dummy_idType";
      RD_identList_idType[i]!=""?this.recipientDetail.identificationList[i].idType=RD_identList_idType[i]:delete this.recipientDetail.identificationList[i].idType;
    }
}

RD_identList_idName=data.RD_identList_idName.split("-");

if(Array.isArray(RD_identList_idName)){
  RD_idName_Length=RD_identList_idName.length;

  for(var i=0;i<RD_idName_Length;i++){
      if(typeof this.recipientDetail.identificationList[i] !== 'object'){
          this.recipientDetail.identificationList[i]={};
      }
      this.recipientDetail.identificationList[i].idName="dummy_idName";
      RD_identList_idName[i]!=""?this.recipientDetail.identificationList[i].idName=RD_identList_idName[i]:delete this.recipientDetail.identificationList[i].idName;
    }
}

RD_identList_idNumber=data.RD_identList_idNumber.split("-");

if(Array.isArray(RD_identList_idNumber)){
  RD_identList_idNumber_Length=RD_identList_idNumber.length;

  for(var i=0;i<RD_identList_idNumber_Length;i++){
      if(typeof this.recipientDetail.identificationList[i] !== 'object'){
          this.recipientDetail.identificationList[i]={};
      }
      this.recipientDetail.identificationList[i].idNumber="dummy_idNumber";
      RD_identList_idNumber[i]!=""?this.recipientDetail.identificationList[i].idNumber=RD_identList_idNumber[i]:delete this.recipientDetail.identificationList[i].idNumber;
    }
}

RD_identList_idIssueCountry=data.RD_identList_idIssueCountry.split("-");

if(Array.isArray(RD_identList_idIssueCountry)){
  RD_identList_idIssueCountry_Length=RD_identList_idIssueCountry.length;

  for(var i=0;i<RD_identList_idIssueCountry_Length;i++){
      if(typeof this.recipientDetail.identificationList[i] !== 'object'){
          this.recipientDetail.identificationList[i]={};
      }
      this.recipientDetail.identificationList[i].idIssueCountry="dummy_idNumber";
      RD_identList_idIssueCountry[i]!=""?this.recipientDetail.identificationList[i].idIssueCountry=RD_identList_idIssueCountry[i]:delete this.recipientDetail.identificationList[i].idIssueCountry;
    }
}

if("identificationList" in this.recipientDetail){
  identListLength=this.recipientDetail.identificationList.length;
  
  if(identListLength === 1){
      if(this.recipientDetail.identificationList[0].idType === undefined && this.recipientDetail.identificationList[0].idName === undefined && this.recipientDetail.identificationList[0].idNumber === undefined && this.recipientDetail.identificationList[0].idIssueCountry === undefined){
          delete this.recipientDetail.identificationList;
      }
  }
}

//#endregion
      
   
    //   data.RD_identList_idType!=""?this.recipientDetail.idType=data.RD_identList_idType:delete this.recipientDetail.idType;
    //   data.RD_identList_idName!=""?this.recipientDetail.idNumber=data.RD_identList_idName:delete this.recipientDetail.idNumber;
    //   data.RD_identList_idNumber!=""?this.recipientDetail.idIssueCountry = data.RD_identList_idNumber:delete this.recipientDetail.idIssueCountry;
    //   data.RD_identList_idIssueCountry!=""?this.recipientDetail.idIssueCountry = data.RD_identList_idIssueCountry:delete this.recipientDetail.idIssueCountry;

      data.RD_contactNumber!=""?this.recipientDetail.contactNumber=data.RD_contactNumber:delete this.recipientDetail.contactNumber;
      data.RD_contactEmail!=""?this.recipientDetail.contactEmail=data.RD_contactEmail:delete this.recipientDetail.contactEmail;
      data.RD_fullName!=""?this.recipientDetail.fullName = data.RD_fullName:delete this.recipientDetail.fullName
      data.RD_firstName!=""?this.recipientDetail.firstName=data.RD_firstName:delete this.recipientDetail.firstName;
      data.RD_lastName!=""?this.recipientDetail.lastName=data.RD_lastName:delete this.recipientDetail.lastName;
      data.RD_cityOfBirth!=""?this.recipientDetail.cityOfBirth=data.RD_cityOfBirth:delete this.recipientDetail.cityOfBirth;
      data.RD_countryOfBirth!=""?this.recipientDetail.countryOfBirth=data.RD_countryOfBirth:delete this.recipientDetail.countryOfBirth;
      data.RD_dateOfBirth!=""?this.recipientDetail.dateOfBirth=data.RD_dateOfBirth:delete this.recipientDetail.dateOfBirth;
      data.RD_companyName!=""?this.recipientDetail.companyName=data.RD_companyName:delete this.recipientDetail.companyName;

      data.RD_address_addressLine1!=""?this.recipientDetail.address.addressLine1 = data.RD_address_addressLine1:delete this.recipientDetail.address.addressLine1;
      data.RD_address_addressLine2!=""?this.recipientDetail.address.addressLine2 = data.RD_address_addressLine2:delete this.recipientDetail.address.addressLine2;
      data.RD_address_addressLine3!=""?this.recipientDetail.address.addressLine3 = data.RD_address_addressLine3:delete this.recipientDetail.address.addressLine3;
      data.RD_address_city!=""?this.recipientDetail.address.city = data.RD_address_city:delete this.recipientDetail.address.city;
      data.RD_address_country!=""?this.recipientDetail.address.country = data.RD_address_country:delete this.recipientDetail.address.country;
      data.RD_address_postalCode!=""?this.recipientDetail.address.postalCode = data.RD_address_postalCode:delete this.recipientDetail.address.postalCode;
      data.RD_address_province!=""?this.recipientDetail.address.province =data.RD_address_province:delete this.recipientDetail.address.province;


      data.RD_bank_bankName!=""?this.recipientDetail.bank.bankName = data.RD_bank_bankName:delete this.recipientDetail.bank.bankName;
      data.RD_bank_accountName!=""?this.recipientDetail.bank.accountName = data.RD_bank_accountName:delete this.recipientDetail.bank.accountName;
      data.RD_bank_accountNumberType!=""?this.recipientDetail.bank.accountNumberType = data.RD_bank_accountNumberType:delete this.recipientDetail.bank.accountNumberType;
      data.RD_bank_accountNumber!=""?this.recipientDetail.bank.accountNumber = data.RD_bank_accountNumber:delete this.recipientDetail.bank.accountNumber;
 
      data.RD_bank_accountNumberSuffix!=""?this.recipientDetail.bank.accountNumberSuffix = data.RD_bank_accountNumberSuffix:delete this.recipientDetail.bank.accountNumberSuffix;
 
      data.RD_bank_accountType!=""?this.recipientDetail.bank.accountType = data.RD_bank_accountType:delete this.recipientDetail.bank.accountType;
      data.RD_bank_countryCode!=""?this.recipientDetail.bank.countryCode = data.RD_bank_countryCode:delete this.recipientDetail.bank.countryCode;
      data.RD_bank_BIC!=""?this.recipientDetail.bank.BIC = data.RD_bank_BIC:delete this.recipientDetail.bank.BIC;
      data.RD_bank_bankCodeType!=""?this.recipientDetail.bank.bankCodeType = data.RD_bank_bankCodeType:delete this.recipientDetail.bank.bankCodeType;
      data.RD_bank_bankCode!=""?this.recipientDetail.bank.bankCode = data.RD_bank_bankCode:delete this.recipientDetail.bank.bankCode;
      data.RD_bank_branchCode!=""?this.recipientDetail.bank.branchCode = data.RD_bank_branchCode:delete this.recipientDetail.bank.branchCode;
      data.RD_bank_currencyCode!=""?this.recipientDetail.bank.currencyCode = data.RD_bank_currencyCode:delete this.recipientDetail.bank.currencyCode;


      data.SD_type!=""?this.senderDetail.type = data.SD_type:delete this.senderDetail.type;
      data.SD_fullName!=""?this.senderDetail.fullName = data.SD_fullName: delete this.senderDetail.fullName;
      data.SD_firstName!=""?this.senderDetail.firstName = data.SD_firstName:delete this.senderDetail.firstName;
      data.SD_lastName!=""?this.senderDetail.lastName = data.SD_lastName:delete this.senderDetail.lastName;
      data.SD_companyName!=""?this.senderDetail.companyName = data.SD_companyName:delete this.senderDetail.companyName;
      data.SD_cityOfBirth!=""?this.senderDetail.cityOfBirth = data.SD_cityOfBirth:delete this.senderDetail.cityOfBirth;
      data.SD_countryOfBirth!=""?this.senderDetail.countryOfBirth = data.SD_countryOfBirth:delete this.senderDetail.countryOfBirth;
      data.SD_dateOfBirth!=""?this.senderDetail.dateOfBirth = data.SD_dateOfBirth:delete this.senderDetail.dateOfBirth;
    
    
//     //#region additionalData
//     SD_additionalData_name=data.SD_additionalData_name.split("-");

//     if (Array.isArray(SD_additionalData_name)) {
//       SD_additionalData_name_Length=SD_additionalData_name.length;

//       for(var i=0;i<SD_additionalData_name_Length;i++){

//           if(typeof this.senderDetail.additionalData[i] !== 'object'){
//               this.senderDetail.additionalData[i]={};
//           }
          
//           this.senderDetail.additionalData[i].name="dummy_Name";
//           SD_additionalData_name[i]!=""?this.senderDetail.additionalData[i].name=SD_additionalData_name[i]:delete this.senderDetail.additionalData[i].name;
//       }
//   }

//     SD_additionalData_value=data.SD_additionalData_value.split("-");

//     if (Array.isArray(SD_additionalData_value)) {
//       SD_additionalData_value_Length=SD_additionalData_value.length;
      

//       for(var i=0;i<SD_additionalData_value_Length;i++){
//           if(typeof this.senderDetail.additionalData[i] !== 'object'){
//               this.senderDetail.additionalData[i]={};
//           }
//           this.senderDetail.additionalData[i].value="dummy_value";
//           SD_additionalData_value[i]!=""?this.senderDetail.additionalData[i].value=SD_additionalData_value[i]:delete this.senderDetail.additionalData[i].value;
//       }
//   }

//   //delete additionalData if its objects are empty
//   if("additionalData" in this.senderDetail){
//       ADlength=this.senderDetail.additionalData.length;
//       if(ADlength === 1){
//           if(this.senderDetail.additionalData[0].name === undefined && this.senderDetail.additionalData[0].value ===undefined){
//               console.log(this.senderDetail.additionalData[0].name);
//               delete this.senderDetail.additionalData;
//           }

//       }

//   }

//   //#endregion

    //#region  identificationList
    SD_identList_idType=data.SD_identList_idType.split("-");

    if (Array.isArray(SD_identList_idType)) {
        SD_idType_Length=SD_identList_idType.length;

        for(var i=0;i<SD_idType_Length;i++){
          if(typeof this.senderDetail.identificationList[i] !== 'object'){
             this.senderDetail.identificationList[i]={};
          }
          this.senderDetail.identificationList[i].idType="dummy_idType";
          SD_identList_idType[i]!=""?this.senderDetail.identificationList[i].idType=SD_identList_idType[i]:delete this.senderDetail.identificationList[i].idType;
        }
    }

    SD_identList_idName=data.SD_identList_idName.split("-");

    if(Array.isArray(SD_identList_idName)){
      SD_idName_Length=SD_identList_idName.length;

      for(var i=0;i<SD_idName_Length;i++){
          if(typeof this.senderDetail.identificationList[i] !== 'object'){
              this.senderDetail.identificationList[i]={};
          }
          this.senderDetail.identificationList[i].idName="dummy_idName";
          SD_identList_idName[i]!=""?this.senderDetail.identificationList[i].idName=SD_identList_idName[i]:delete this.senderDetail.identificationList[i].idName;
        }
    }

    SD_identList_idNumber=data.SD_identList_idNumber.split("-");

    if(Array.isArray(SD_identList_idNumber)){
      SD_identList_idNumber_Length=SD_identList_idNumber.length;

      for(var i=0;i<SD_identList_idNumber_Length;i++){
          if(typeof this.senderDetail.identificationList[i] !== 'object'){
              this.senderDetail.identificationList[i]={};
          }
          this.senderDetail.identificationList[i].idNumber="dummy_idNumber";
          SD_identList_idNumber[i]!=""?this.senderDetail.identificationList[i].idNumber=SD_identList_idNumber[i]:delete this.senderDetail.identificationList[i].idNumber;
        }
    }

    SD_identList_idIssueCountry=data.SD_identList_idIssueCountry.split("-");

    if(Array.isArray(SD_identList_idIssueCountry)){
      SD_identList_idIssueCountry_Length=SD_identList_idIssueCountry.length;

      for(var i=0;i<SD_identList_idIssueCountry_Length;i++){
          if(typeof this.senderDetail.identificationList[i] !== 'object'){
              this.senderDetail.identificationList[i]={};
          }
          this.senderDetail.identificationList[i].idIssueCountry="dummy_idNumber";
          SD_identList_idIssueCountry[i]!=""?this.senderDetail.identificationList[i].idIssueCountry=SD_identList_idIssueCountry[i]:delete this.senderDetail.identificationList[i].idIssueCountry;
        }
    }

   if("identificationList" in this.senderDetail){
      identListLength=this.senderDetail.identificationList.length;
      
      if(identListLength === 1){
          if(this.senderDetail.identificationList[0].idType === undefined && this.senderDetail.identificationList[0].idName === undefined && this.senderDetail.identificationList[0].idNumber === undefined && this.senderDetail.identificationList[0].idIssueCountry === undefined){
              delete this.senderDetail.identificationList;
          }
      }
   }

  //#endregion

    
    
      //   data.SD_identList_idType!=""?this.senderDetail.companyName = data.senderDetail_companyName:delete this.senderDetail.companyName;
    //   data.SD_identList_idName!=""?this.senderDetail.idNumber = data.senderDetail_idNumber:delete this.senderDetail.idNumber;
    //   data.SD_identList_idNumber!=""?this.senderDetail.idIssueCountry = data.senderDetail_idIssueCountry:delete this.senderDetail.idIssueCountry;
    //   data.SD_identList_idIssueCountry!=""?this.senderDetail.idIssueCountry = data.senderDetail_idIssueCountry:delete this.senderDetail.idIssueCountry;

      data.SD_contactNumber!=""?this.senderDetail.contactNumber = data.SD_contactNumber:delete this.senderDetail.contactNumber;
      data.SD_contactEmail!=""?this.senderDetail.contactEmail = data.SD_contactEmail:delete this.senderDetail.contactEmail;
      data.SD_sourceOfIncome!=""?this.senderDetail.sourceOfIncome = data.SD_sourceOfIncome:delete this.senderDetail.sourceOfIncome;
      data.SD_beneficiaryRelationship!=""?this.senderDetail.beneficiaryRelationship = data.SD_beneficiaryRelationship:delete this.senderDetail.beneficiaryRelationship;
      data.SD_senderReferenceNumber!=""?this.senderDetail.senderReferenceNumber = data.SD_senderReferenceNumber:delete this.senderDetail.senderReferenceNumber;

      data.SD_address_addressLine1!=""?this.senderDetail.address.addressLine1 = data.SD_address_addressLine1:delete this.senderDetail.address.addressLine1;
      data.SD_address_addressLine2!=""?this.senderDetail.address.addressLine2 = data.SD_address_addressLine2:delete this.senderDetail.address.addressLine2;
      data.SD_address_addressLine3!=""?this.senderDetail.address.addressLine3 = data.SD_address_addressLine3:delete this.senderDetail.address.addressLine3;
      data.SD_address_city!=""?this.senderDetail.address.city = data.SD_address_city:delete this.senderDetail.address.city;
      data.SD_address_country!=""?this.senderDetail.address.country = data.SD_address_country:delete this.senderDetail.address.country;
      data.SD_address_postalCode!=""?this.senderDetail.address.postalCode = data.SD_address_postalCode:delete this.senderDetail.address.postalCode;
      data.SD_address_province!=""?this.senderDetail.address.province = data.SD_address_province:delete this.senderDetail.address.province;
     
    }
  }
}




