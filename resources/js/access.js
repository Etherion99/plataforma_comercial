var navPrev = $('#nav-prev'), navNext = $('#nav-next'), navFinish = $('#nav-finish');

var page = 0;
const lastPage = 3;

function finish(){

}

function initNav(){

}

function navigate(change){
    $('.form-container[data-id=' + page + ']').slideUp(function (){
        page += change;

        $('.form-container[data-id=' + page + ']').slideDown();

        validateNav();
    });
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

}

$(document).ready(function (){
    navigate(1);

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
