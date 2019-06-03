'use strict';

const activeClass = 'active';

class DisplayPanel {
  constructor() {
    this.$content = document.getElementsByClassName('content');
    this.$panelButton = document.getElementsByClassName('panel-button');
    this.$panel = document.getElementsByClassName('panel');
    this.$home = document.getElementById('home');

    if(!['', '#demo'].includes(window.location.hash)){
      this.removePanelClass();
      document.getElementById(window.location.hash.split('#')[1]).classList.add(activeClass);
    }else{
      this.$home.classList.add(activeClass);
    }

    Array.from(this.$panelButton).forEach((element) => {
      element.addEventListener('click', (el) => {
        const $this = el.currentTarget;
        const id = $this.getAttribute('data-id');
        this.changeHash(id);
        if(id === "demo"){
          window.location.href = 'views/demo.html';
        }else{
          this.removePanelClass();
          document.getElementById(id).classList.add(activeClass);
          $this.classList.add(activeClass);
        }
      });
    });
  }

  removePanelClass(){
    Array.from(this.$panelButton).forEach((element) =>{
      element.classList.remove(activeClass);
    });
    Array.from(this.$panel).forEach((element) =>{
      element.classList.remove(activeClass);
    });
  }

  changeHash(id){
    window.location.hash = id;
  }

};
