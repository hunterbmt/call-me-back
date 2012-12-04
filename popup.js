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
  var msg = $('#inputMsg').val()
  sendVoiceMsg(destNumber,lang,msg)
  var checked = $('#enable_send_sms_if_not_answer:checked').val();
  if($('#enable_send_sms_if_not_answer').is('hide') == false &&checked != undefined){
	setTimeout(function(){
        autoSendSmsIfNotAnswer();
    },30000);
  }
 }
 function sendSMSOnClick(){
  var destNumber = $('#inputNumber').val();
  var msg = $('#inputMsg').val();
  sendSmsMsg(destNumber,msg);
 }