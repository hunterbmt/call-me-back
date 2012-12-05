document.addEventListener('DOMContentLoaded', function () { 
  bindEvent();
});
function bindEvent(){
	$('#optionBtn').click(function(){
		chrome.tabs.create({'url': chrome.extension.getURL("options.html")}, function(tab) {
		});
	});
	$('#sendSMSMsg').click(function(){
		sendSMSOnClick();
	});
	$('#sendBtn').click(function(){
		sendSMSOnClick();
	});
	$('#enable_voice_msg').change(function(){
		$('#sendBtn').unbind('click');
		var checked = $('#enable_voice_msg:checked').val();
		if (checked != undefined){
			$('#inputLanguage').removeAttr('disabled');
			$('#enable_send_sms_if_not_answer_row').show();
			$('#sendBtn').click(function(){
				sendOnClick();
			});
		}
		else{
			$('#inputLanguage').attr('disabled', 'disabled');
			$('#enable_send_sms_if_not_answer_row').hide();
			$('#sendBtn').click(function(){
				sendSMSOnClick();
			});
		}
	});
}
function sendOnClick(){
  var destNumber = $('#inputNumber').val();
  var lang = $('#inputLanguage option:selected').val();
  var msg = $('#inputMsg').val();
  
  if(!checkMaxLength(msg,500)){
	setStatus("Your message is empty or more than 500 chars",true);
	return;
  }
  
  if(!validPhoneNumber(destNumber)){
	setStatus("Invalid Phone Number format",true);
	return;
  }
  
  var result = sendVoiceMsg(destNumber,lang,msg)
  
  if(result == false){
	setStatus("Missing AppID or Access Token. Please make sure you configured them in option page",true);
	return;
  }
  
  var checked = $('#enable_send_sms_if_not_answer:checked').val();
  
  if($('#enable_send_sms_if_not_answer').is('hide') == false &&checked != undefined){
	chrome.extension.sendRequest({ func: "autoSendSms" ,dest:destNumber , msg:msg});
  }
 }
 function sendSMSOnClick(){
  var destNumber = $('#inputNumber').val();
  var msg = $('#inputMsg').val();
  if(!checkMaxLength(msg,450)){
	setStatus("Your message is empty or more than 450 chars",true);
	return;
  }
  
  if(!validPhoneNumber(destNumber)){
	setStatus("Invalid Phone Number format",true);
	return;
  }
  
  var result = sendSmsMsg(destNumber,msg);
  
  if(result == false){
	setStatus("Missing AppID or Access Token. Please make sure you configured them in option page",true);
  }
  
 }