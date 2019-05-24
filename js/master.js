'use strict';

class masterJs {
  constructor() {
    const $content = document.getElementsByClassName('content');
    const $loadContent = document.getElementsByClassName('load-content');
    const $panelButton = document.getElementsByClassName('panel-button');
    const $panel = document.getElementsByClassName('panel');
    const $home = document.getElementById('home');

    const removePanelClass = () => {
      Array.from($panelButton).forEach(function(element) {
        element.classList.remove('active');
      });
      Array.from($panel).forEach(function(element) {
        element.classList.remove('active');
      });
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

    if(window.location.hash !== ''){
      removePanelClass();
      document.getElementById(window.location.hash.split('#')[1]).classList.add('active');
    }else{
      $home.classList.add('active');
    }

    Array.from($panelButton).forEach(function(element) {
      element.addEventListener('click', (el) => {
        var $this = el.currentTarget;
        var id = $this.getAttribute('data-id');
        changeHash(id);
        if(id === "demo"){
          window.location.href = 'views/demo.html';
        }else{
          showMainContent();
          removePanelClass();
          document.getElementById(id).classList.add('active');
          $this.classList.add('active');
        }
      });
    });
  }

};
