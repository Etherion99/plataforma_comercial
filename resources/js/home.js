var categoryFilter = $('#category-filter'), groupFilter = $('#group-filter'), filters = $('.filter'),
    searchBar = $('#search-bar'), searchResults = $('#search-results');
var inSearchResults = $('#in-search-results');

var searchCompany, showingResults = false;

function fillFilter(filter) {
    if (filter.val() !== '0')
        filter.addClass('filter-selected');
    else
        filter.removeClass('filter-selected');

    filter.niceSelect('update');
}

function loadCategories() {
    var group = $(this).val();

    categoryFilter.html($('<option>', {value: '0', text: 'Categoría'}));

    if (group !== '0'){
        categoryFilter.append($('#categories-optgroup-' + group).clone());

        categoryFilter.prop('disabled', false);
        fillFilter(categoryFilter);
        categoryFilter.niceSelect('update');
    }else {
        categoryFilter.prop('disabled', true);
        fillFilter(categoryFilter);
    }
}

function search() {
    let text = searchBar.val();
    let group = groupFilter.val();
    let category = categoryFilter.val();

    if (text !== '') {
        category = category === '0' ? group : category;
        $.get('/api/companies/' + category + '/search/' + text, function (data) {
            if (data.length === 0){
                inSearchResults.html('No hay coincidencias con la búsqueda');
                searchResults.slideDown();
            }
            else if(!showingResults && data.length !== 0){
                inSearchResults.html('');
                for (let result of data)
                    fillResult(result);

                searchResults.slideToggle();
            }else{
                inSearchResults.html('');
                for (let result of data)
                    fillResult(result);
            }

            showingResults = true;
            console.log("showing ", showingResults);
        });
    } else {
        searchResults.slideUp(function (){
            inSearchResults.html('');
        });
        showingResults = false;
    }
}

function fillResult(result) {
    let col = $('<div>', {
        'class': 'col p-1'
    }).html(
        $('<div>', {
            'class': 'row g-0 position-relative'
        }).append(
            $('<div>', {
                'class': 'col-3 col-md-4 col-lg-3 mb-md-0'
            }).html(
                $('<a>', {
                    'href': viewCompanyURL.substr(0, viewCompanyURL.length-1) + result.id
                }).append(
                    $('<img>', {
                        'class': 'w-100 rounded-circle',
                        'src': 'https://picsum.photos/200?q=' + parseInt(Math.random() * 10)
                    })
                )
            )
        ).append(
            $('<div>', {
                'class': 'col-9 col-md-8 col-lg-9 ps-md-0'
            }).append(
                $('<h5>', {
                    'class': 'mt-0 font-weight-bold'
                }).append(
                    $('<a>', {
                        'href': viewCompanyURL.substr(0, viewCompanyURL.length-1) + result.id
                    }).text(result.name)
                )
            ).append(
                $('<p>').append(
                    $('<a>', {
                        'href': viewCategoryURL.substr(0, viewCategoryURL.length-1) + result.category.id
                    }).text(result.category.name)
                )
            )
        )
    )

    inSearchResults.append(col);
}

function activateSearch(){
    clearTimeout(searchCompany);
    searchCompany = setTimeout(search, 800);
}

$(document).ready(function () {
    groupFilter.change(loadCategories);

    searchResults.hide();

    filters.change(function () {
        fillFilter($(this));
    });

    searchBar.keyup(activateSearch);
    groupFilter.change(activateSearch);
    categoryFilter.change(activateSearch);

    //glider settings
    $('.category-section').each(function (index){
        new Glider(document.querySelector('#'+$(this).prop('id')+' .glider'), {
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: {
                prev: '#'+$(this).prop('id')+' .glider-prev',
                next: '#'+$(this).prop('id')+' .glider-next'
            }
        });

        if(index > 0){
            $(this).removeClass('show');
        }
    });
});
