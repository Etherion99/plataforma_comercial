var categoryFilter = $('#category-filter');

function fillFilter(filter){
    if(filter.val() !== '' && filter.val() !== '0')
        filter.addClass('filter-selected');
    else
        filter.removeClass('filter-selected');
}

function loadCategories(){
    var group = $(this).val();

    categoryFilter.html($('<option>', {value: '0', text: 'Categoría'}));

    if(group !== '0')
        $.get('/api/categories/group/' + group, {}, function(data){
            data.map((option) => categoryFilter.append($('<option>', {value: option.id, text: option.name})));

            categoryFilter.prop('disabled', false);
            fillFilter(categoryFilter);
        });
    else{
        categoryFilter.prop('disabled', true);
        fillFilter(categoryFilter);
    }
}

$(document).ready(function(){
    categoryFilter.change(loadCategories);
});
