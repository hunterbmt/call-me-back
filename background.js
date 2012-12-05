function autoSendSmsIfNotAnswer(dest,msg){
	var app_id = localStorage['app_id']
	var access_token = localStorage['access_token']
	var txn_ref = localStorage['txn_ref']
	if(isEmpty(app_id)|| isEmpty(access_token)||isEmpty(txn_ref)){
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
					 sendSmsMsg(dest,msg);
				}
			}
		}
	});
}
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse){
        if(request.func == "autoSendSms") {
			setTimeout(function(){
				autoSendSmsIfNotAnswer(request.dest,request.msg);
			},60000);
		}
    }
);