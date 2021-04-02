var navPrev = $('#nav-prev'), navNext = $('#nav-next'), navFinish = $('#nav-finish');

var page = 0;
const lastPage = 3;
var daySchedules = [{}, {}, {}, {}, {}, {}, {}]; //JSON.parse("[{\"0\":{\"horaInicio\":\"08:00\",\"horaFinal\":\"10:00\"}},{},{\"1\":{\"horaInicio\":\"12:00\",\"horaFinal\":\"15:00\"},\"2\":{\"horaInicio\":\"16:00\",\"horaFinal\":\"18:30\"}},{},{},{},{}]");// [{}, {}, {}, {}, {}, {}, {}];
var validations = [];
var uniqueId = 0;

var phones = {};
var phonesId = 0;
var phoneTypes = {
    1: { name: 'Fijo', icons: ['fas fa-phone'] },
    2: { name: 'Celular', icons: ['fas fa-mobile-alt'] },
    3: { name: 'Whatsapp', icons: ['fab fa-whatsapp'] },
    4: { name: 'Llamadas y Whatsapp', icons: ['fas fa-mobile-alt', 'fab fa-whatsapp'] }
}

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
        //navFinish.hide();
    }

    $('.form-step').removeClass('filled');

    for(let i = 0; i <= page; i++)
        $('.form-step[data-id=' + i + ']').addClass('filled');
}

function validatePage() {
    let validation = validations[page];
    let res = true;

    for (let rule of validation) {
        if (rule['required'] && !validateRequired(rule['id'], rule['type']))
            res = false;
    }

    return res;
}

function validateRequired(id, type) {
    let element = $('#' + id);
    let res = true;

    switch (type) {
        case 'text':
        case 'dropdown':
            res = element.val() !== '';
            break;
        case 'file':
            res = element[0].files && element[0].files[0]
            break;
        case 'checkbox':
            res = false;

            element.find('input[type=checkbox').each(function(){
                if($(this).prop('checked')){
                    res = true;
                    return false;
                }
            });
            break;
        case 'special':
            switch (id){
                case 'schedules':
                    res = false;
                    for(let schedule of daySchedules)
                        if(Object.keys(schedule).length > 0){
                            res = true;
                            break;
                        }
                    break;
            }
            break;
    }

    console.log(type);
    console.log(res);

    let alert = element.closest('.form-group').find('.form-input-alert');

    alert.text('Campo obligatorio');
    alert.toggle(!res);

    return res;
}

function finish() {
    let data = new FormData();

    $('.photos-form .input-photo').each(function (){
        if ($(this)[0].files && $(this)[0].files[0]){
            data.append('gallery[]', $(this)[0].files[0]);
        }
    });

    let logo = $('#logo');

    if(logo[0].files && logo[0].files[0])
        data.append('logo', logo[0].files[0]);

    let paymentMethods = [];

    $('.payment-method').each(function(){
        if($(this).prop('checked'))
            paymentMethods.push($(this).val());
    });

    let companyData = {
        name: $('#name').val(),
        category_id: $('#category').val(),
        description: $('#description').val(),
        delivery: $('#delivery').val(), /*,
        schedules: daySchedules,
        department: $('#department').val(),
        municipality: $('#municipality').val(),
        address: $('#address').val(),
        phones: phones*/
    }

    data.append('company_data', JSON.stringify(companyData));

    let otherData = {
        payment_methods: paymentMethods,

    }

    $.ajax({
        url: signupURL,
        method: 'POST',
        data: data,
        contentType: false,
        cache: false,
        processData: false
    });
}

function removeSchedules(result){
    const resultSplit = result.split('-');
    const day = parseInt(resultSplit[1]);
    const id = parseInt(resultSplit[2]);
    delete daySchedules[day][id];
}

function fillSchedule(result, day) {
    let idToFill = 'horario-'+day+'-'+uniqueId;
    let horario = $('<div>', {
        'class': 'badge-custom d-flex align-items-center',
        'id': idToFill
    }).append(
        $('<span>', {
            'id': 'horaInicio'
        }).text(result.horaInicio)
    ).append(
        $('<span>', {
            'id': 'horaFinal',
            'class': 'ml-2'
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
    );

    $('#day-' + day).append(horario);

    daySchedules[day][uniqueId] = {horaInicio: result.horaInicio, horaFinal: result.horaFinal};
    console.log(JSON.stringify(daySchedules));

    $('#'+idToFill).find('.delete-hour').click(function(){
        removeSchedules(idToFill);
        $('#'+idToFill).remove();
    });

    uniqueId++;
}

function validateHours() {
    const day = $('#select-days').val();
    let hoursToSend = {
        horaInicio: $('#select-first-hour').val(),
        horaFinal: $('#select-last-hour').val()
    }
    let can = true;
    let message;
    const f2 = new Date('01/01/2020 ' + hoursToSend.horaFinal).getTime();
    const i2 = new Date('01/01/2020 ' + hoursToSend.horaInicio).getTime();
    if (hoursToSend.horaFinal!=='' && hoursToSend.horaInicio!==''){
        if (f2>i2){
            for(let index of Object.keys(daySchedules[day])){
                const f1 = new Date('01/01/2020 ' + daySchedules[day][index].horaFinal).getTime();
                const i1 = new Date('01/01/2020 ' + daySchedules[day][index].horaInicio).getTime();
                if(i2<f1 && f2>i1){
                    can = false;
                    message="Hay algún horario que se está cruzando";
                }
            }
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

function addPhone(){
    let phone = {
        number: $('#phone-number').val(),
        type: $('#phone-type').val(),
    };

    if(addPhoneValidation(phone)){
        let idHtml = 'phone-' + phonesId;

        let iconsHtml = $('<span>');

        for(let icon of phoneTypes[phone.type].icons)
            iconsHtml.append($('<i>', {
                class: icon + ' ml-2'
            }))

        let phoneHtml = $('<div>', {
            class: 'badge-custom d-flex align-items-center',
            id: idHtml
        }).append(
            iconsHtml
        ).append(
            $('<span>', {
                class: 'ml-3'
            }).text(phone.number)
        ).append(
            $('<button>', {
                'type': 'button',
                'class': 'close ml-4 delete-phone'
            }).html(
                $('<i>', {
                    'class': 'fas fa-trash-alt'
                })
            )
        );

        $('#phones').append(phoneHtml);
        phones[phonesId] = phone;

        $('#' + idHtml).find('.delete-phone').click(function (){
           removePhone(idHtml);
        });

        phonesId++;

        console.log(phones);

        clearAddPhonemodal();
    }else{
        console.log('invalid');
    }
}

function addPhoneValidation(newPhone){
    for(let index of Object.keys(phones))
        if(phones[index].number === newPhone.number) return false;

    return true;
}

function removePhone(id){
    $('#' + id).remove();
    delete phones[id.split('-')[1]];
}

function clearAddPhonemodal(){
    $('#add-phone-modal').modal('hide');

    $('#phone-number').val('');
    $('#phone-type').val('');
    $('#phone-type').niceSelect('update');
}

function pickPhoto(id){
    $('input[type=file][data-id=' + id +']').click();
}

function updatePreview(input){
    let id = input.getAttribute('data-id');

    if(input.files && input.files[0]){
        let reader = new FileReader();

        reader.onload = function (event){
            $('.photo[data-id='+ id +']').css('background-image', 'url(\"' + event.target.result + '\")');
            $('.photo[data-id='+ id +'] i').hide();
        }

        reader.readAsDataURL(input.files[0])
    }else{
        $('.photo[data-id='+ id +']').css('background-image', 'none');
        $('.photo[data-id='+ id +'] i').show();
    }
}

$(document).ready(function () {
    uniqueId = 0;
    initValidations();
    navigate(0);

    $('.form-container[data-id=' + 0 + ']').slideUp(function () {
        $('.form-container[data-id=' + 1 + ']').slideDown();
    });

    page = 1;

    navNext.click(function () {
        navigate(1);
    });

    navPrev.click(function () {
        navigate(-1);
    });

    navFinish.click(finish);

    $('#closeAlertScheduleModal').click(function(){$('#alertScheduleModal').slideUp()});

    $('#exampleModal #send-hour').click(validateHours);

    //phones
    $('#add-phone').click(addPhone);

    //photos
    $('.photo').click(function (){
        pickPhoto($(this).attr('data-id'));
    });

    $('.input-photo').change(function(){
        updatePreview(this);
    });
});
