var categoryFilter = $('#category-filter'), groupFilter = $('#group-filter'), filters = $('.filter'), searchBar = $('#search-bar');
var inSearchResults = $('#in-search-results');

var searchCompany;

function fillFilter(filter){
    if(filter.val() !== '')
        filter.addClass('filter-selected');
    else
        filter.removeClass('filter-selected');

    filter.niceSelect('update');
}

function loadCategories(){
    var group = $(this).val();

    categoryFilter.html($('<option>', {value: '0', text: 'Categoría'}));

    if(group !== '0')
        $.get('/api/categories/group/' + group, {}, function(data){
            data.map((option) => categoryFilter.append($('<option>', {value: option.id, text: option.name})));

            categoryFilter.prop('disabled', false);
            fillFilter(categoryFilter);
            categoryFilter.niceSelect('update');
        });
    else{
        categoryFilter.prop('disabled', true);
        fillFilter(categoryFilter);
    }
}

function search(){
    let text = searchBar.val();
    let group = groupFilter.val();
    let category = categoryFilter.val();

    if(text !== ''){
        category = category === '0' ? group : category;

        $.get('/api/companies/' + category + '/search/' + text, function(data){
            console.log(data);

            inSearchResults.html('');

            for(let result of data){
                fillResult(result);
            }

            /*searchResults.html(data);

            searchResult.click(function(){
                window.location.href = '/empresa/' + $(this).attr('id').split('-')[2];
            });*/
        });
    }else{
        inSearchResults.html('');
    }
}
/*<div class="col">
                                    <div class="row g-0 bg-light position-relative">
                                        <div class="col-md-3 mb-md-0 p-md-4">
                                            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png"
                                                 class="w-100 rounded-circle" alt="...">
                                        </div>
                                        <div class="col-md-6 p-4 ps-md-0">
                                            <h5 class="mt-0">Company name</h5>
                                            <p>Category....</p>
                                            <a href="#" class="stretched-link">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>*/
function fillResult(result){
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

$(document).ready(function(){
    groupFilter.change(loadCategories);

    filters.change(function (){
        fillFilter($(this));
    });

    searchBar.keyup(function (){
        clearTimeout(searchCompany);
        searchCompany = setTimeout(search, 1000);
    })
});
