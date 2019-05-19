$(function(){

    var $content = $('.content');
    var $loadContent = $('.load-content');

    if(window.location.hash !== ''){
      $('.panel, .panel-button').removeClass('active');
      $(window.location.hash).addClass('active');
    }else{
      $('#home').addClass('active');
    }

    var showMainContent = function(){
      $loadContent.hide();
      $content.show();
    }

    var hideMainContent = function(){
      $content.hide();
      $loadContent.show();
    }

    var changeHash = function(id){
      window.location.hash = id;
    }

    var loadPage = function(url){
      hideMainContent();
      $.get(url, function(data){
      	var content = data.documentElement.innerHTML;
      	$loadContent.html(content);
      });
    }

    $('.panel-button').on('click', function(){
      var id = $(this).data('id');
      changeHash(id);
      if(id === "demo"){
        loadPage('views/plugins/stepPassword.html');
      }else{
        showMainContent();
        $('.panel, .panel-button').removeClass('active');
        $('#' + id).addClass('active');
        $(this).addClass('active');
      }

    });

});
