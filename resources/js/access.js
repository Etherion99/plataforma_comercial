var navPrev = $('#nav-prev'), navNext = $('#nav-next'), navFinish = $('#nav-finish');

var page = 0;
const lastPage = 3;
var hoursToSend = {
    horaInicio: '',
    horaFinal: '',
    id:''
}
var daySchedules = [[], [], [], [], [], [], []];
var validations = [];
var uniqueId = 0;

function initValidations() {
    $.getJSON('../json/signup_validations.json', function (data) {
        validations = data;
    })
}

function navigate(change) {
    if (change > 0 && validatePage() || change <= 0) {
        $('.form-container[data-id=' + page + ']').slideUp(function () {
            page += change;

            $('.form-container[data-id=' + page + ']').slideDown();

            validateNav();
        });
    }
}

function validateNav() {
    console.log(page);

    if (page === 0) {
        navPrev.hide();
    } else {
        navPrev.show();
    }

    if (page === lastPage) {
        navNext.hide();
        navFinish.show();
    } else {
        navNext.show();
        navFinish.hide();
    }

    $('.form-step').removeClass('filled');

    for(let i = 0; i <= page; i++)
        $('.form-step[data-id=' + i + ']').addClass('filled');
}

function validatePage() {
    let validation = validations[page];
    console.log(validation);
    let res = true;

    for (let rule of validation) {
        let element = $('#' + rule['id']);

        if (rule['required'] && !validateRequired(element, rule['type']))
            res = false;
    }

    return res;
}

function validateRequired(element, type) {
    let res = true;

    switch (type) {
        case 'text':
        case 'dropdown':
            res = element.val() !== '';
            break;
    }

    let alert = element.closest('.form-group').find('.form-input-alert');

    alert.text('Campo obligatorio');
    alert.toggle(!res);

    return res;
}

function finish() {

}

function removeSchedules(result){
    const resultSplit = result.split('-');
    const day = parseInt(resultSplit[1]);
    daySchedules[day].forEach(element=>{
        if(element.id === result){
            const i = daySchedules[day].indexOf(element);
            daySchedules[day].splice( i, 1 );
        }
    })
}

function fillSchedule(result, day) {
    let idToFill = 'horario-'+day+'-'+uniqueId;
    let horarios = $('<div>', {
        'class': 'horario',
        'id': idToFill
    }).append(
        $('<div>', {
            'class': 'badge-custom',
            'id': 'horaInicio'
        }).text(result.horaInicio)
    ).append(
        $('<div>', {
            'class': 'badge-custom',
            'id': 'horaFinal'
        }).text(result.horaFinal)
    ).append(
        $('<button>', {
            'type': 'button',
            'class': 'close ml-15 delete-hour'
        }).html(
            $('<i>', {
                'class': 'fas fa-trash-alt'
            })
        )
    )
    $('#day-' + day).append(horarios);
    daySchedules[day].push({horaInicio: result.horaInicio, horaFinal: result.horaFinal, id: idToFill});
    $('#'+idToFill).find('.delete-hour').click(function(){
        removeSchedules(idToFill);
        $('#'+idToFill).remove();
    })
    uniqueId++;
}

function validateHours(day, hoursToSend) {
    let can = true;
    let message;
    const f2 = new Date('01/01/2020 ' + hoursToSend.horaFinal).getTime();
    const i2 = new Date('01/01/2020 ' + hoursToSend.horaInicio).getTime();
    if (hoursToSend.horaFinal!=='' && hoursToSend.horaInicio!==''){
        if (f2>i2){
            daySchedules[day].forEach(element=>{
                const f1 = new Date('01/01/2020 ' + element.horaFinal).getTime();
                const i1 = new Date('01/01/2020 ' + element.horaInicio).getTime();
                if(i2<f1 && f2>i1){
                    can = false;
                    message="Hay algún horario que se está cruzando";
                }
            });
        }else{
            can = false;
            message = "La hora final debe ser mayor que la inicial";
        }
    }else {
        can = false;
        message = 'Debe ingresar una hora final y una hora inicial';
    }
    if(can){
        $('#alertScheduleModal').slideUp();
        $('#send-hour').attr('data-dismiss', 'modal');
        fillSchedule(hoursToSend, day);
    }else{
        $('#send-hour').attr('data-dismiss', '');
        $('#alertScheduleModal #messageSchedule').text(message);
        $('#alertScheduleModal').slideDown();
    }
}

function afterClickSendHour() {
    const modal = $('#exampleModal');
    modal.find('.modal-title').text('New message to ' + 'Hello World');
    const day = modal.find('.modal-body #select-days').val()
    hoursToSend.horaInicio = modal.find('.modal-body #select-first-hour').val();
    hoursToSend.horaFinal = modal.find('.modal-body #select-last-hour').val();
    validateHours(day, hoursToSend);
}

$(document).ready(function () {
    uniqueId = 0;
    initValidations();
    navigate(0);

    navNext.click(function () {
        navigate(1);
    });

    navPrev.click(function () {
        navigate(-1);
    });

    navFinish.click();

    $('#closeAlertScheduleModal').click(function(){$('#alertScheduleModal').slideUp()});

    $('#exampleModal #send-hour').click(afterClickSendHour);
});
