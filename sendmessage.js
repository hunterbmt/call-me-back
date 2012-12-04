function sendVoiceMsg(dest,lang,msg){
  var app_id = localStorage['app_id']
  var access_token = localStorage['access_token']
  if(app_id == undefined || app_id.length < 1|| access_token == undefined || access_token.length<1 ){
	return;
  };
  var msg_str = '<speech language="'+lang+'">'+msg+'</speech>'
  var data = {
			app_id : app_id,
			access_token:access_token,
			msg: msg_str,
			dest :dest
		};
  var is_private = localStorage['is_private_number']
  if (is_private != undefined && is_private !='false'){
	data.push({caller_id:"private"});
  }
  $.ajax({
		type : "POST",
		url : "https://secure.hoiio.com/open/ivr/start/dial",
		data : data,
		success : function(result) {
			if (result.status == 'success_ok') {
				$('#status').addClass('alert-success');
				$('#status').html('Your message has been sent successfull');
				localStorage['txn_ref'] = result.txn_ref;
			} else {
				if(status == 'error_msg_cannot_convert_text'){
					$('#status').addClass('alert-error');
					$('#status').html("Can't send your voice message");
					$('#sendSMSMsg').show();
				}
				
			}
			$('#status').show().delay(5000).fadeOut('fast');
		}
  });
}
function sendSmsMsg(dest,msg){
  var app_id = localStorage['app_id']
  var access_token = localStorage['access_token']
  if(app_id == undefined || app_id.length < 1|| access_token == undefined || access_token.length<1 ){
	return;
  };
  $.ajax({
		type : "POST",
		url : "https://secure.hoiio.com/open/sms/send",
		data : ({
			app_id : app_id,
			access_token:access_token,
			msg: msg,
			dest :dest
		}),
		success : function(result) {
			if (result.status == 'success_ok') {
				$('#status').addClass('alert-success');
				$('#status').html('Your message has been sent successfull');
			} else {
				$('#status').addClass('alert-error');
				$('#status').html("Can't send your SMS message");
			}
			$('#status').show().delay(5000).fadeOut('fast');
		}
  });
}
function autoSendSmsIfNotAnswer(){
	var app_id = localStorage['app_id']
	var access_token = localStorage['access_token']
	var txn_ref = localStorage['txn_ref']
	if(app_id == undefined || app_id.length < 1|| access_token == undefined || access_token.length<1 || txn_ref == undefined || txn_ref.length < 1){
		return;
	};
	
	$.ajax({
		type : "POST",
		url : "https://secure.hoiio.com/open/voice/query_status",
		data : ({
			app_id : app_id,
			access_token:access_token,
			txn_ref: txn_ref
		}),
		success : function(result) {
			if (result.status == 'success_ok') {
				if(result.call_status_dest1 !='answered'){
					sendSMSOnClick();
				}
			}
		}
  });
}