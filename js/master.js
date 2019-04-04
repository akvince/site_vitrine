$(function(){

    if(window.location.hash !== ''){
      $('.panel, .panel-button').removeClass('active');
      $(window.location.hash).addClass('active');
    }else{
      $('#home').addClass('active');
    }

    $('.panel-button').on('click', function(){
      id = $(this).data('id');

      $('#' + id).addClass('active');
      window.location.hash = id;
    });

});
