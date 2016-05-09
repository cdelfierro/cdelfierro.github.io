$(function() {
    $('.list-group-item').on('click', function() {
        $('.glyphicon-change', this)
            .toggleClass('glyphicon-menu-right')
            .toggleClass('glyphicon-menu-down');
    });
});
