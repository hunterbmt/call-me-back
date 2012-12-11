function openAccountSetting() {
    $('#accountsetting').show();
    $('#advancedsetting').hide();
}

function openAdvanceSetting() {
    $('#advancedsetting').show();
    $('#accountsetting').hide();
}
document.addEventListener('DOMContentLoaded', function () {
    loadUserSetting()
    bindEvent();
});

function loadUserSetting() {
    $('#inputAppId').val(localStorage['app_id'])
    $('#inputAccessToken').val(localStorage['access_token'])
    $('#inputMaxDuration').val(localStorage['max_duration'])
    if (localStorage['is_private_number'] == 'true') {
        $("#enable_private_number").prop('checked', true)
    }
}

function bindEvent() {
    $('#btn-accountsetting').click(function () {
        openAccountSetting()
    });
    $('#btn-advancedsetting').click(function () {
        openAdvanceSetting()
    });
    $('#inputAppId').focusout(function () {
        localStorage['app_id'] = $('#inputAppId').val();
    });
    $('#inputAccessToken').focusout(function () {
        localStorage['access_token'] = $('#inputAccessToken').val();
    });
    $('#enable_private_number').change(function () {
        var checked = $('#enable_private_number:checked').val();
        if (checked != undefined) {
            localStorage['is_private_number'] = true;
        } else {
            localStorage['is_private_number'] = false;
        }
    });
    $('#inputMaxDuration').focusout(function () {
        localStorage['max_duration'] = $('#inputMaxDuration').val();
    });
}