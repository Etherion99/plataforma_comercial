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

    if (group !== '0')
        $.get('/api/categories/group/' + group, {}, function (data) {
            data.map((option) => categoryFilter.append($('<option>', {value: option.id, text: option.name})));

            categoryFilter.prop('disabled', false);
            fillFilter(categoryFilter);
            categoryFilter.niceSelect('update');
        });
    else {
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
            inSearchResults.html('');

            for (let result of data)
                fillResult(result);

            if(showingResults && data.length === 0 || !showingResults && data.length !== 0)
                searchResults.slideToggle();
            
            showingResults = data.length!==0;
        });
    } else {
        searchResults.slideUp();
        inSearchResults.html('');
    }
}

function fillResult(result) {
    let col = $('<div>', {
        'class': 'col'
    }).html(
        $('<div>', {
            'class': 'row g-0 bg-light position-relative'
        }).append(
            $('<div>', {
                'class': 'col-md-3 mb-md-0 p-md-4'
            }).html(
                $('<img>', {
                    'class': 'w-100 rounded-circle',
                    'src': 'https://picsum.photos/200?q=' + parseInt(Math.random() * 10)
                })
            )
        ).append(
            $('<div>', {
                'class': 'col-md-6 p-4 ps-md-0'
            }).append(
                $('<h5>', {
                    'class': 'mt-0'
                }).text(result.name)
            ).append(
                $('<p>').text(result.category.name)
            )
        )
    )

    inSearchResults.append(col);
}

function activateSearch(){
    clearTimeout(searchCompany);
    searchCompany = setTimeout(search, 1000);
}

$(document).ready(function () {
    groupFilter.change(loadCategories);

    searchResults.hide();

    searchBar.blur(function(){searchResults.slideUp()});

    searchBar.focus(activateSearch);

    filters.change(function () {
        fillFilter($(this));
    });

    searchBar.keyup(activateSearch)
});
