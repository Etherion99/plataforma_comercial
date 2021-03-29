var navPrev = $('#nav-prev'), navNext = $('#nav-next'), navFinish = $('#nav-finish');

var page = 0;
const lastPage = 3;


function next(){
    page++;
    validateNav();
}

function previous(){
    page--;
    validateNav();
}

function finish(){

}

function validateNav(){
    console.log(page);

    if(page === 0){
        navPrev.hide();
        navFinish.hide();
    }else if(page === lastPage){
        navNext.hide();
    }
}

function validatePage(){

}

$(document).ready(function (){
    validateNav();

    navNext.click(next);
    navPrev.click(previous);
    navFinish.click()
});
