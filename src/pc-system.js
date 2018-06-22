var d_array = [
    { month: 'January', days: 31 },
    { month: 'Febr0ary', days: 29 },
    { month: 'March', days: 31 },
    { month: 'April', days: 30 },
    { month: 'May', days: 31 },
    { month: 'June', days: 30 },
    { month: 'July', days: 31 },
    { month: 'August', days: 31 },
    { month: 'Septhember', days: 30 },
    { month: 'October', days: 31 },
    { month: 'November', days: 30 },
    { month: 'December', days: 31 },
];




$('.nic-validate-btn').click(function() {
    $('.nic-validate-error').html('');
    $('.nic-birthday').html('');
    $('.nic-gender').html('');
    var nicNumber = $('.nic-validate').val();
    if (validation(nicNumber)) {
        console.log(nicNumber);
        var extracttedData = extractData(nicNumber);
        var days = extracttedData.dayList;
        var findedData = findDayANDGender(days, d_array);

        var month = findedData.month;
        var year = extracttedData.year;
        var day = findedData.day;
        var gender = findedData.gender;
        var bday = day + '-' + month + '-' + year;
        var birthday = new Date(bday.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var birthday = getFormattedDate(birthday);
        $('.nic-birthday').html('BirthDay:' + birthday);
        $('.nic-gender').html('Gender:' + gender);

    } else {
        $('.nic-validate-error').html('You Entered NIC Number Is wrong');
    }
});

$('.nic-clear-btn').click(function() {
    $('.nic-validate-error').html('');
    $('.nic-birthday').html('');
    $('.nic-gender').html('');
    $('.nic-validate').val('');
});

function findDayANDGender(days, d_array) {
    var dayList = days;
    var month = '';
    var result = { day: '', month: '', gender: '' };


    if (dayList < 500) {
        result.gender = 'Male';
    } else {
        result.gender = 'Female';
        dayList = dayList - 500;
    }

    for (var i = 0; i < d_array.length; i++) {
        if (d_array[i]['days'] < dayList) {
            dayList = dayList - d_array[i]['days'];
        } else {
            month = d_array[i]['month'];
            break;
        }
    }
    result.day = dayList;
    result.month = month;
    return result;
}

function extractData(nicNumber) {
    var nicNumber = nicNumber;
    var result = { year: '', dayList: '', character: '' };

    if (nicNumber.length === 10) {
        result.year = nicNumber.substr(0, 2);
        result.dayList = nicNumber.substr(2, 3);
        result.character = nicNumber.substr(9, 10);
    } else if (nicNumber.length === 12) {
        result.year = nicNumber.substr(0, 4);
        result.dayList = nicNumber.substr(4, 3);
        result.character = 'no';
    }
    return result;
}


function validation(nicNumber) {
    var result = false;
    if (nicNumber.length === 10 && !isNaN(nicNumber.substr(0, 9)) && isNaN(nicNumber.substr(9, 1).toLowerCase()) && ['x', 'v'].includes(nicNumber.substr(9, 1).toLowerCase())) {
        result = true;
    } else if (nicNumber.length === 12 && !isNaN(nicNumber)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}