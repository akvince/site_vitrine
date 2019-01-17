$(function(){

    if(window.location.hash !== ''){
      $('.panel').removeClass('active');
      $(window.location.hash).addClass('active');
    }else{
      $('#home').addClass('active');
    }

    $('.panel-button').on('click', function(){
      id = $(this).data('id');
      $('.panel').removeClass('active');
      $('#' + id).addClass('active');
      window.location.hash = id;
    });

});
