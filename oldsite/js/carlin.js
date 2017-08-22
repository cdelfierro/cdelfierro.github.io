$(function() {
    $('.list-group-item').on('click', function() {
        $('.fa-change', this)
            .toggleClass('fa-angle-right')
            .toggleClass('fa-angle-down');
    });
});
