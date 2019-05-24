$(function(){

    const $content = document.getElementsByClassName('content');
    const $loadContent = document.getElementsByClassName('load-content');
    const $panelButton = document.getElementsByClassName('panel-button');

    if(window.location.hash !== ''){
      $('.panel, .panel-button').removeClass('active');
      $(window.location.hash).addClass('active');
    }else{
      $('#home').addClass('active');
    }

    const showMainContent = () => {
      $loadContent.hidden = true;
      $content.hidden = false;
    }

    const hideMainContent = () => {
      $content.hidden = true;
      $loadContent.hidden = false;
    }

    const changeHash = (id) => {
      window.location.hash = id;
    }

    Array.from($panelButton).forEach(function(element) {
      element.addEventListener('click', (el) => {
        var id = el.currentTarget.getAttribute('data-id');
        changeHash(id);
        if(id === "demo"){
          window.location.href = 'views/demo.html';
        }else{
          showMainContent();
          $('.panel, .panel-button').removeClass('active');
          $('#' + id).addClass('active');
          $(this).addClass('active');
        }
      });
    });

});
