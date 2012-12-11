function sendVoiceMsg(dest, lang, msg) {
    showLoadingIndicator();
    var app_id = localStorage['app_id']
    var access_token = localStorage['access_token']
    if (isEmpty(app_id) || isEmpty(access_token)) {
        return false;
    };
    var msg_str = '<speech language="' + lang + '">' + msg + '</speech>'
    var data = {
        app_id: app_id,
        access_token: access_token,
        msg: msg_str,
        dest: dest
    };
    var is_private = localStorage['is_private_number']
    if (is_private != undefined && is_private != 'false') {
        data.caller_id = "private";
    }
    $.ajax({
        type: "POST",
        url: "https://secure.hoiio.com/open/ivr/start/dial",
        data: data,
        success: function (result) {
            if (result.status == 'success_ok') {
                setStatus('Your message has been sent successfull');
                localStorage['txn_ref'] = result.txn_ref;
            } else {
                if (status == 'error_msg_cannot_convert_text') {
                    setStatus("Can't send your voice message", true);
                    $('#sendSMSMsg').show();
                }

            }
            hideLoadingIndicator();
        }
    });
}

function sendSmsMsg(dest, msg) {
    showLoadingIndicator();
    var app_id = localStorage['app_id']
    var access_token = localStorage['access_token']
    if (isEmpty(app_id) || isEmpty(access_token)) {
        return false;
    };
    $.ajax({
        type: "POST",
        url: "https://secure.hoiio.com/open/sms/send",
        data: ({
            app_id: app_id,
            access_token: access_token,
            msg: msg,
            dest: dest
        }),
        success: function (result) {
            if (result.status == 'success_ok') {
                setStatus('Your message has been sent successfull');
            } else {
                setStatus("Can't send your SMS message", true);
            }
            hideLoadingIndicator();
        }
    });
}

function setStatus(msg, isError) {
    isError = typeof isError !== 'undefined' ? isError : false;
    if (isError) {
        $('#status').addClass('text-error');
    } else {
        $('#status').addClass('text-success');
    }
    $('#status').html(msg);
    $('#status').show().delay(5000).fadeOut('fast');
}

function showLoadingIndicator() {
    $('#btnSendLabel').hide();
    $('#btnSendLoading').show();
}

function hideLoadingIndicator() {
    $('#btnSendLabel').show();
    $('#btnSendLoading').hide();
}