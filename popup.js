document.addEventListener('DOMContentLoaded', function () {
    bindEvent();
    openOptionPageIfConfigEmpty();
});

function bindEvent() {
    $('#optionBtn').click(function () {
        chrome.tabs.create({
            'url': chrome.extension.getURL("options.html")
        }, function (tab) {

            chrome.extension.sendRequest({
                func: "addRemoveTab",
                tabId: tab.id
            });
        });
    });
    $('#sendSMSMsg').click(function () {
        sendSMSOnClick();
    });
    $('#sendBtn').click(function () {
        sendSMSOnClick();
    });
    $('#enable_voice_msg').change(function () {
        $('#sendBtn').unbind('click');
        var checked = $('#enable_voice_msg:checked').val();
        if (checked != undefined) {
            $('#languageDiv').show();
            $('#enable_send_sms_if_not_answer_row').show();
            $('#sendBtn').click(function () {
                sendOnClick();
            });
        } else {
            $('#languageDiv').hide()
            $('#enable_send_sms_if_not_answer_row').hide();
            $('#sendBtn').click(function () {
                sendSMSOnClick();
            });
        }
    });
}

function openOptionPageIfConfigEmpty() {
    if (localStorage['is_open_optiontab'] != 'true') {
        if (isEmpty(localStorage['app_id']) || isEmpty(localStorage['access_token'])) {
            $('#optionBtn').click();
            localStorage['is_open_optiontab'] = true;
        }
    }
}

function sendOnClick() {
    var destNumber = $('#inputNumber').val();
    var lang = $('#inputLanguage option:selected').val();
    var msg = $('#inputMsg').val();

    if (!checkMaxLength(msg, 500)) {
        setStatus("Your message is empty or more than 500 chars", true);
        return;
    }

    if (!validPhoneNumber(destNumber)) {
        setStatus("Invalid Phone Number format", true);
        return;
    }

    var result = sendVoiceMsg(destNumber, lang, msg)

    if (result == false) {
        setStatus("Missing AppID or Access Token. Please make sure you configured them in option page", true);
        return;
    }

    var checked = $('#enable_send_sms_if_not_answer:checked').val();

    if ($('#enable_send_sms_if_not_answer').is('hide') == false && checked != undefined) {
        chrome.extension.sendRequest({
            func: "autoSendSms",
            dest: destNumber,
            msg: msg
        });
    }
}

function sendSMSOnClick() {
    var destNumber = $('#inputNumber').val();
    var msg = $('#inputMsg').val();
    if (!checkMaxLength(msg, 450)) {
        setStatus("Your message is empty or more than 450 chars", true);
        return;
    }

    if (!validPhoneNumber(destNumber)) {
        setStatus("Invalid Phone Number format", true);
        return;
    }

    var result = sendSmsMsg(destNumber, msg);

    if (result == false) {
        setStatus("Missing AppID or Access Token. Please make sure you configured them in option page", true);
    }

}