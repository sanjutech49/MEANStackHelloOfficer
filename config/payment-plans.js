var plans = {
	"course": {
      value: 'course',
      text: 'Pay for Course ($19.95)',
      chargeValue:19.95
    },
    "resubmit": {
      value: 'resubmit',
      text: 'Resubmit My Certificate ($14.95)',
      chargeValue:14.95
    }
};

module.exports=function(){
	return plans;
};