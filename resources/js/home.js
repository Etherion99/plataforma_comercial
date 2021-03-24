var categoryFilter = $('#category-filter'), groupFilter = $('#group-filter'), filters = $('.filter');

function fillFilter(filter){
    if(filter.val() !== '')
        filter.addClass('filter-selected');
    else
        filter.removeClass('filter-selected');

    filter.niceSelect('update');
}

function loadCategories(){
    var group = $(this).val();

    categoryFilter.html($('<option>', {value: '', text: 'Categoría'}));

    if(group !== '')
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

$(document).ready(function(){
    groupFilter.change(loadCategories);

    filters.change(function (){
        fillFilter($(this));
    });


});
