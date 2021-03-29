var navPrev = $('#nav-prev'), navNext = $('#nav-next'), navFinish = $('#nav-finish');

var page = 0;
const lastPage = 3;
var validations = [];

function initValidations(){
    $.getJSON('../json/signup_validations.json', function (data){
        validations = data;
    })
}

function navigate(change){
    if(change > 0 && validatePage() || change <= 0){
        $('.form-container[data-id=' + page + ']').slideUp(function (){
            page += change;

            $('.form-container[data-id=' + page + ']').slideDown();

            validateNav();
        });
    }
}

function validateNav(){
    console.log(page);

    if(page === 0){
        navPrev.hide();
    }else{
        navPrev.show();
    }

    if(page === lastPage){
        navNext.hide();
        navFinish.show();
    }else{
        navNext.show();
        navFinish.hide();
    }

    $('.form-step').removeClass('filled');

    for(let i = 0; i <= page; i++){
        $('.form-step[data-id=' + i + ']').addClass('filled');
    }
}

function validatePage(){
    let validation = validations[page];
    console.log(validation);
    let res = true;

    for(let rule of validation){
        let element = $('#'+rule['id']);

        if(rule['required'] && !validateRequired(element, rule['type']))
            res = false;
    }

    return res;
}

function validateRequired(element, type){
    let res = true;

    switch (type){
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

function finish(){

}

$(document).ready(function (){
    initValidations();
    navigate(0);

    navNext.click(function (){
        navigate(1);
    });

    navPrev.click(function (){
        navigate(-1);
    });

    navFinish.click();
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
    })
});
