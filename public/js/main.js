var FindInPage = function (id, tag){
      var targetNode = document.getElementById(id) || document.body;
      var hiliteTag = tag || "EM";
      var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
      var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
      var wordColor = [];
      var colorIdx = 0;
      var matchRegex = "";
      var openLeft = false;
      var openRight = false;
      this.count=0;
          this.setMatchType = function(type){
               switch(type)
               {
                 case "left":
                   this.openLeft = false;
                   this.openRight = true;
                   break;
                 case "right":
                   this.openLeft = true;
                   this.openRight = false;
                   break;
                 case "open":
                   this.openLeft = this.openRight = true;
                   break;
                 default:
                   this.openLeft = this.openRight = false;
               }
        };

        this.setRegex = function(input)
        {
          input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");
          var re = "(" + input + ")";
          if(!this.openLeft) re = "\\b" + re;
          if(!this.openRight) re = re + "\\b";
          matchRegex = new RegExp(re, "i");
        };

       this.getRegex = function()
       {
         var retval = matchRegex.toString();
         retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
         retval = retval.replace(/\|/g, " ");
         return retval;
       };

  // recursively apply word highlighting
       this.hiliteWords = function(node)
       { var nv,regs;
         if(node === undefined || !node) return;
         if(!matchRegex) return;
         if(skipTags.test(node.nodeName)) return;

         if(node.hasChildNodes()) {
           for(var i=0; i < node.childNodes.length; i++)
             this.hiliteWords(node.childNodes[i]);
         }
         if(node.nodeType == 3) { // NODE_TEXT
           if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
             if(!wordColor[regs[0].toLowerCase()]) {
               wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
             }

             var match = document.createElement(hiliteTag);
             match.appendChild(document.createTextNode(regs[0]));
             match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
             match.style.fontStyle = "inherit";
             match.style.color = "#000";

             var after = node.splitText(regs.index);
             after.nodeValue = after.nodeValue.substring(regs[0].length);
             node.parentNode.insertBefore(match, after);
             this.count++;
           }
         };

       };

        // remove highlighting
       this.remove = function()
       {
        var el;
         var arr = document.getElementsByTagName(hiliteTag);
         while(arr.length && (el = arr[0])) {
           var parent = el.parentNode;
           parent.replaceChild(el.firstChild, el);
           parent.normalize();
         }
       };

         // start highlighting at target node
       this.apply = function(input)
       {
         this.remove();
         if(input === undefined || !input) return;
         this.setRegex(input);
         this.hiliteWords(targetNode);
       };
};

/*recaptcha callback functions*/
var expCallback = function() {
      grecaptcha.reset();
};

var captcha_callback = function() {
      grecaptcha.render('captchaElement', {
         'sitekey': '6LeBbxoTAAAAAGAGml3_iU_KTiU2i1-Cy8prS_ru',
         'expired-callback': expCallback
       });
};
/*recaptcha callback functions end*/


var Captcha={
    LoadCaptcha:function(){
          if($('#captchaSciprt') != undefined) {
                $("#captchaSciprt").remove();
           }
       var po = document.createElement('script');
           po.id='captchaSciprt';
           po.type = 'text/javascript';
           po.src = 'https://www.google.com/recaptcha/api.js?onload=captcha_callback&render=explicit';
           po.async;
           po.defer;
       var s = document.getElementsByTagName('script')[0];
       s.parentNode.insertBefore(po, s);
    },
    CaptchaElm:".g-recaptcha",
    init:function(){
        var this_=this;
        var interval_=setInterval(function(){
                    var elm_=$(this_.CaptchaElm);
                   if(elm_.length){
                           this_.RenderCaptcha();
                           clearInterval(interval_);
                    }
         },200);
    },
    RenderCaptcha:function(){
       window['___grecaptcha_cfg'] = {};
       window['__google_recaptcha_client'] = true;
       var po = document.createElement('script');
       po.type = 'text/javascript';
       po.src = 'https://www.gstatic.com/recaptcha/api2/r20150909142036/recaptcha__en_gb.js';
      var s = document.getElementsByTagName('script')[0];
       s.parentNode.insertBefore(po, s);

    }

};


var DisableFunctions={
  DisablePrint:function(){
     var fileref=document.createElement("link");

        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", "/styles/noprint.css");
        fileref.setAttribute("media", "print");

        if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
  },
  DisableCopyPaste:function(){
     $('body').bind('copy paste cut drag drop', function (e) {
                      e.preventDefault();
     });
  },
  DisableWriteClick:function(){
     $("body").on("contextmenu",function(){
       return false;
    });
  },
  Init:function(){
    var that=this;
      that.DisableCopyPaste();
      that.DisablePrint();
      that.DisableWriteClick();
  }
};


var StartDatePicker=function(id){

 $(id).datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: '-100:+0'
  });

};

var MakeReadOnly = function(id){
  $(id).keydown(function(e){
        e.preventDefault();
   });
};


var Calander ={
  Month:[1,2,3,4,5,6,7,8,9,10,11,12] ,
  Today:new Date(),
  Range:50,
  GetMonthsArray:function(){
       var that = this;
       return that.Month;
  },
  GenrateDays:function(month){
    var days=[];
    for(var i=1;i<=31;i++){
      days.push(i);
    }

    if(month){

      }
      else{
             return days;
      }
  },
  GenrateForwardYears:function(years, getLastTwoDigits){
    var that=this;
    var forYears = years || 10;
    var currentYear= that.Today.getFullYear();
    if(getLastTwoDigits){
      currentYear = parseInt(currentYear.toString().substr(2,2));
    }
    var ForwardYears=[];
    var limit = currentYear + forYears;
    for(var i=currentYear;i<=limit;i++){
         ForwardYears.push(i);
    }
    return ForwardYears;
  },
  GenrateYears:function(){
    var that=this;
    var currentYear= that.Today.getFullYear();
    var Age=currentYear-16;
    var backYears=[];

    for(var i=Age;i>=Age-that.Range;i--){
         backYears.push(i);
    }
    return backYears;
  },
  CurrernYear:function(){
     return this.Today.getFullYear();
  }
};

var ExamTimer={
 Init:function(TimeLimit, TimerElement , TargetElement ){
    var nearLimit = parseInt((TimeLimit*5)/100);
    var timer = TimeLimit, minutes, seconds,
    elem_=$(TimerElement),
    text_,
    timer_= setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(elem_.length){
                  elem_.html("Timer: "+minutes + ":" + seconds);
         }
        if(timer<=nearLimit){
          elem_.css('color','red');
        }
        if (--timer < 0) {
            clearInterval(timer_);
            $(TargetElement).attr('timeout',true);
            $(TargetElement).click();
        }
    }, 1000);
 },
};

var GetMessageOnContinueBtn={
  NoQuestionSelected:'Oops! You must answer all questions in order to move forward.',
  OnQuiz:function(q , isFinalExamPage){
    var that = this;
    for (var i = 0; i < q.length; i++){
          if (!q[i].selectedAnswer) {
                if(isFinalExamPage){}
                else{
                   return that.NoQuestionSelected;
                }
          }
    }
    return "Please select 'Submit Quiz' in order to continue.";
  },
  OnSecurityQuestion:function(security,isFinalExamPage){
      var that = this;
          if (!security.selected) {
                if(isFinalExamPage){}
                else{
                   return that.NoQuestionSelected;
                }
          }
    return "Please select 'Submit' in order to continue.";
  }
};

var Helpers = Helpers || {
  CheckIfcorrect:function(id,correctArry){
   var result=false;
      for(var i=0;i<correctArry.length;i++){
        if(correctArry[i]._id == id){
            result=true ;
        }
      }
      return result;
  },
  ExistInArray : function(Arry,item){
     return (Arry.indexOf(item) != -1);
  },
  Stripquotes:function (a) {
      if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
         return a.substr(1, a.length-2);
      }
     return a;
  },
 findNoOfchunks : function(chunkSize,totalRecords){
           var temp =Math.ceil(totalRecords/chunkSize);
           var chunks=[];

           for(var i=0;i<temp;i++){
             chunks.push(i);
           }

           return chunks;
 },

 IsInternetExplorer:function(){
     var ua = window.navigator.userAgent;
     var msie = ua.indexOf("MSIE ");
     // If Internet Explorer, return true;
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  {
           return true;
        }
       else  {
          return false;
       }
  },

	ValidateEmail:function(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }

	},

	Show:function(elm_){

		elm_.removeClass("none");
	},

	Hide:function(elm_){

		elm_.addClass("none");
	},

Disable:function(elm_){

     elm_.attr('disabled','disabled');

},

Enable:function(elm_){

     elm_.removeAttr('disabled');


},



Guid: function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
},

PutFocus:function(elm_){

	elm_.focus();
},

HasAttribute:function(elm_,attr_){

var attr=elm_.attr(attr_);

return typeof attr !== typeof undefined && attr !== false;


},

GetParameterByName:function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
},


IsObject:function(obj_){

	return obj_ !== null && typeof obj_ === 'object';
},
Pad:function (str, max) {
  var that = this;
  str = str.toString();
  return str.length < max ? that.Pad("0" + str, max) : str;
},

ConverToMDY:function(mongoDate){
  var that = this;
  var date =  new Date(mongoDate);
  var finalDate= that.Pad((date.getMonth() + 1),2) + '/' + that.Pad(date.getDate(),2) + '/' +  date.getFullYear();
  return finalDate;
},

ConvertToSlug:function (Text)
{
     if (Text.search("/")) {
        Text =Text.replace(/\//g, "-");
     }

    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
},
LoadingIcon:{
      Keys:{37: 1, 38: 1, 39: 1, 40: 1},
      PreventDefault:function (e) {
             e = e || window.event;
            if (e.preventDefault)
              e.preventDefault();
              e.returnValue = false;
      },
      PreventDefaultForScrollKeys:function (e) {
          if (Keys[e.keyCode]) {
               preventDefault(e);
               return false;
          }
      },
     DisableScroll:function () {
      var that=this;
         if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', that.PreventDefault, false);
         window.onwheel = that.PreventDefault; // modern standard
         window.onmousewheel = document.onmousewheel = that.PreventDefault; // older browsers, IE
         window.ontouchmove  = that.PreventDefault; // mobile
        document.onkeydown  = that.PreventDefaultForScrollKeys;
        $('body').addClass('noscroll');
     },
     EnableScroll:function () {
      var that=this;
      $('body').removeClass('noscroll');
            if (window.removeEventListener)
                  window.removeEventListener('DOMMouseScroll', that.PreventDefault, false);
                  window.onmousewheel = document.onmousewheel = null;
                  window.onwheel = null;
                  window.ontouchmove = null;
                  document.onkeydown = null;
     },
     Init:function(){
      var that=this;
       window.scrollTo(0, 0);
        var docHeight = $(window).height();
        $("body").append("<div id='overlay'><img src='/js/loader/loading_spinner.gif' style='position: fixed;top: 46%;left: 46%;' height='100' width='100'/></div>");

       $("#overlay")
      .height(docHeight)
      .css({
         'opacity' : 0.6,
         'position': 'absolute',
         'top': 0,
         'left': 0,
         'background-color': 'black',
         'width': '100%',
         'z-index': 5000
      });

        that.DisableScroll();
     },
     Stop:function(){
          var that=this;
        if($("#overlay").length){
          that.EnableScroll();
          $("#overlay").remove();
        }
     }

},

};


var ModalAlert=ModalAlert || {

	Error:function(message_,title_){


		this.SetupModal(AlertMessage.GetContent(message_,"danger"),title_);
	},

	Success:function(message_,title_){

		this.SetupModal(AlertMessage.GetContent(message_,"success"),title_);
	},
  Info:function(message_,title_){
     this.SetupModal(AlertMessage.GetContent(message_,"info"),title_);
  },

	SetupModal: function(message_, title_) {


		var id_=Helpers.Guid(),
		customModal='<div class="modal fade" id="'+id_+'" role="dialog" ><div class="modal-dialog" style="z-index: 10000"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+title_+'</h4></div><div class="modal-body"><p>'+message_+'</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div> </div>';
    title_ = title_?title_:"Alert";

		$('body').append(customModal);

		$("#"+id_).modal();

		$("#"+id_).on('hidden.bs.modal', function () {

		$(this).remove();

    		});

		return $("#"+id_);


	},



};

var AlertMessage = AlertMessage || {

AlertBoxClass:"app-alert-box",
PutBox:function(elm_,message_,type_){

this.RemoveBox(elm_);

this.CreateBox(elm_,message_,type_);


},

CreateBox:function(elm_,message_,type_){

var content_=this.GetContent(message_,type_);

elm_.prepend(content_);

return elm_;

},

GetContent:function(message_,type_){

return '<div class="alert alert-'+type_+' '+ this.AlertBoxClass+'" role="alert"> '+message_+'</div>';

},

RemoveBox:function(elm_){

var Abox_=elm_.find("."+this.AlertBoxClass);

if(Abox_.length){

	Abox_.remove();
}

},

};
