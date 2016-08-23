var keys = {
	"development": {
		"login_id": "8282tYedSXbq",
		"transaction_key": "23ZU6V9y23bvh3hW",
		"testMode":true
	},
	"production": {
		"login_id": "98NJud97r",
		"transaction_key": "6q8Brmw7RN7842KU",
		"testMode":false
	}
};

module.exports=function(){
	return process.env.NODE_ENV != "production" ? keys.development : keys.production;
};