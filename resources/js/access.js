var navPrev = $('#nav-prev'), navNext = $('#nav-next'), navFinish = $('#nav-finish'), group = $('#group'),
    category = $('#category'), department = $('#department'), municipality = $('#municipality');

var page = 0;
const lastPage = 3;
var daySchedules = [{}, {}, {}, {}, {}, {}, {}];
var validations = [];
var uniqueId = 0;

var phonesModel = {};
var phonesId = 0;
var phoneTypes = {
    1: { name: 'Fijo', icons: ['fas fa-phone'] },
    2: { name: 'Celular', icons: ['fas fa-mobile-alt'] },
    3: { name: 'Whatsapp', icons: ['fab fa-whatsapp'] },
    4: { name: 'Llamadas y Whatsapp', icons: ['fas fa-mobile-alt', 'fab fa-whatsapp'] }
}

function loadCategories(){
    let groupId = $(this).val();

    category.html($('<option>', {value: '', text: 'Seleccione'}));

    if (groupId !== ''){
        category.append($('#categories-optgroup-' + groupId).clone());

        category.prop('disabled', false);
        category.niceSelect('update');
    }else {
        category.prop('disabled', true);
        category.niceSelect('update');
    }
}

function loadMunicipalities(){
    let departmentId = $(this).val();

    municipality.html($('<option>', {value: '', text: 'Seleccione'}));

    if (departmentId !== ''){
        municipality.append($('#municipalities-optgroup-' + departmentId).clone());

        municipality.prop('disabled', false);
        municipality.niceSelect('update');
    }else {
        municipality.prop('disabled', true);
        municipality.niceSelect('update');
    }
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
        navFinish.hide();
    }

    $('.form-step').removeClass('filled');

    for(let i = 0; i <= page; i++)
        $('.form-step[data-id=' + i + ']').addClass('filled');
}

function validatePage() {
    let validation = validations[page];
    let res = true;

    for (let rule of validation) {
        if (rule['required'] && !validateRequired(rule['id'], rule['type'], rule['message']))
            res = false;
    }

    return res;
}

function validateRequired(id, type, message) {
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
                case 'phones':
                    res = Object.keys(phonesModel).length > 0;
                    break;
            }
            break;
    }

    let alert = element.closest('.form-group').find('.form-input-alert');
    console.log(message);

    alert.text(message);
    alert.toggle(!res);

    return res;
}

function finish() {
    let data = new FormData();

    data.append('logo', $('#logo')[0].files[0]);

    let companyData = {
        name: $('#name').val(),
        category_id: $('#category').val(),
        description: $('#description').val(),
        delivery: $('#delivery').val(),
        pack_id: $('#pack').val()
    }

    data.append('company_data', JSON.stringify(companyData));

    let paymentMethods = [];

    $('.payment-method').each(function(){
        if($(this).prop('checked'))
            paymentMethods.push($(this).val());
    });

    let schedules = [];

    for(let dayKey in daySchedules){
        let day = daySchedules[dayKey];
        let keys = Object.keys(day);

        for(let key of keys){
            let schedule = day[key];

            schedule['day'] = dayKey;

            schedules.push(schedule);
        }
    }

    let phones = [];

    for(let phoneKey of Object.keys(phonesModel)){
        let phone = phonesModel[phoneKey];
        phones.push({ number: phone.number, phone_type_id: phone.type });
    }

    let addresses = [];

    addresses.push({
        municipality_id: $('#municipality').val(),
        text: $('#address').val()
    });

    let socialNetworks = [];

    $('.social-network input').each(function (){
       if($(this).val() !== '') socialNetworks.push({ url: $(this).val(), social_network_id: $(this).attr('data-id') });
    });

    let otherData = {
        payment_methods: paymentMethods,
        schedules: schedules,
        phones: phones,
        addresses: addresses,
        social_networks: socialNetworks
    }

    data.append('other_data', JSON.stringify(otherData));

    $('.photos-form .input-photo').each(function (index){
        if ($(this)[0].files && $(this)[0].files[0]){
            data.append('gallery[]', $(this)[0].files[0]);
            console.log(index);
        }
    });

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
            'id': 'start'
        }).text(result.start)
    ).append(
        $('<span>', {
            'id': 'end',
            'class': 'ml-2'
        }).text(result.end)
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
    console.log($('#day-' + day));

    daySchedules[day][uniqueId] = {start: result.start, end: result.end};

    $('#'+idToFill).find('.delete-hour').click(function(){
        removeSchedules(idToFill);
        $('#'+idToFill).remove();
    });

    uniqueId++;
}

function validateHours() {
    const day = $('#select-days').val();
    console.log("selector ", day);
    let hours = {
        start: $('#select-first-hour').val(),
        end: $('#select-last-hour').val()
    };
    let can = true;
    let message;

    const f2 = new Date('01/01/2020 ' + hours.end).getTime();
    const i2 = new Date('01/01/2020 ' + hours.start).getTime();

    if (hours.end!=='' && hours.start!==''){
        if (f2>i2){
            console.log(day);
            console.log(daySchedules);
            for(let index of Object.keys(daySchedules[day])){
                const f1 = new Date('01/01/2020 ' + daySchedules[day][index].end).getTime();
                const i1 = new Date('01/01/2020 ' + daySchedules[day][index].start).getTime();
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
        $('#add-schedule-modal').modal('hide');
        fillSchedule(hours, day);
        clearAddScheduleModal();
    }else{
        $('#messageSchedule').text(message);
        $('#alertScheduleModal').slideDown();
    }
}

function clearAddScheduleModal(){
    $('#select-first-hour').val('');
    $('#select-last-hour').val('');
    $('#select-days').val('0');
    $('#select-days').niceSelect('update');
}

function addPhone(){
    let phone = {
        number: $('#phone-number').val(),
        type: $('#phone-type').val(),
    };

    if($('#phone-number').val() !== '' && $('#phone-type').val() !== ''){
        if(addPhoneValidation(phone)){
            $('#alertPhoneModal').slideUp();

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
            phonesModel[phonesId] = phone;

            $('#' + idHtml).find('.delete-phone').click(function (){
                removePhone(idHtml);
            });

            phonesId++;

            clearAddPhonemodal();
        }else{
            $('#messagePhone').text('Este número ya ha sido registrado')
            $('#alertPhoneModal').slideDown();
        }
    }else{
        $('#messagePhone').text('Ingresa el número y selecciona el tipo')
        $('#alertPhoneModal').slideDown();
    }
}

function addPhoneValidation(newPhone){
    for(let index of Object.keys(phonesModel))
        if(phonesModel[index].number === newPhone.number) return false;

    return true;
}

function removePhone(id){
    $('#' + id).remove();
    delete phonesModel[id.split('-')[1]];
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

        reader.readAsDataURL(input.files[0]);
    }else{
        $('.photo[data-id='+ id +']').css('background-image', 'none');
        $('.photo[data-id='+ id +'] i').show();
    }
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

    navFinish.click(finish);

    group.change(loadCategories);
    department.change(loadMunicipalities);

    $('#closeAlertScheduleModal').click(function(){$('#alertScheduleModal').slideUp()});

    $('#add-schedule').click(validateHours);

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
