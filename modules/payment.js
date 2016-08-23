var payment = require('../config/payment')();
var AuthorizeNet = require('authorize-net');

var client = new AuthorizeNet({
      API_LOGIN_ID: payment.login_id,
      TRANSACTION_KEY: payment.transaction_key,
      testMode: payment.testMode
});


var getOrder = function(amt, discount){
  var newamt = discount ? (amt - discount) : amt;
  return {amount:newamt};
};

var getCardDetails = function(data){
   return {
          creditCardNumber: data.ccn,
          expirationMonth: data.month,
          expirationYear: data.year,
          cvv2: data.cvc_number
    };
};

var getUserDetails = function(data){
  return {
      customerFirstName:data.first_name,
      customerLastName:data.last_name,
      billingAddress: data.street,
      billingCity: data.city,
      billingState: data.state,
      billingZip: data.zipcode,
      billingCountry: data.country,
      shippingFirstName: data.first_name,
      shippingLastName: data.last_name,
      shippingAddress: data.street,
      shippingCity: data.city,
      shippingState: data.state,
      shippingZip: data.zipcode,
      shippingCountry: data.country
    };

};

module.exports = function(data, discount, callback) {

    var order = getOrder(data.amount, discount);
    var creditCard = getCardDetails(data);
    var prospect = getUserDetails(data); 

    client.submitTransaction(order, creditCard, prospect).then(function(transaction){
      transaction.data = data;
      transaction.data.discount = discount;
      return callback(transaction, null);
    })
    .catch(function(err) {
      return callback(null, err);
    });
};
