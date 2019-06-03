'use strict';

class StepPassword {
  constructor() {
    this.$passwordInput = document.getElementById('passwordInput');
    this.successTick = 'fa-check';
    this.unsuccessTick = 'fa-times';
    this.passwordMinLength = 8;
    this.constructDom();
    // Events
    this.$passwordInput.addEventListener('keyup', () => {
        this.checkAllStep();
    });
    /*style*/
    const $stepLabel = document.getElementsByClassName('step-label');
    const $passwordStepTick = document.getElementsByClassName('password-step-tick');
    Array.from($stepLabel).forEach(element => element.style.fontSize = '14px');
    Array.from($passwordStepTick).forEach(element => element.style.verticalAlign = 'middle');
  }

  /*construct dom to display step password*/
  constructDom(){
      this.$passwordInput.insertAdjacentHTML('afterend', '<div id="containerStepValidation" class="row"></div>');
      const $containerStepValidation = document.getElementById('containerStepValidation');
      $containerStepValidation.insertAdjacentHTML('beforeend', '<div class="col-xs-12">Etape de validation de mot de passe</div>');
      $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepLength" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'minimum 8 caratères</div>');
      $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepNumber" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'contient un chiffre</div>');
      $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepLetter" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'contient une lettre</div>');
      $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepCapital" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'contient une majuscule</div>');
  }

  /*change tick el in green if step is valide*/
  checkedStep($tickContainer){
      const $tick = $tickContainer.getElementsByClassName('password-step-tick')[0];
      $tick.classList.remove(this.unsuccessTick);
      $tick.classList.add(this.successTick);
  }

  /*change tick el in black if step is not valide*/
   uncheckedStep($tickContainer){
      const $tick = $tickContainer.getElementsByClassName('password-step-tick')[0];
      $tick.classList.remove(this.successTick);
      $tick.classList.add(this.unsuccessTick);
  }

  /*
   * method check if condition is
   * exemple => $selector = "#selector" and regexp = /[A-Z]/
  */
   check(selector, regexp){
      const $iconStep = document.getElementById(selector);
      if(regexp.test(this.$passwordInput.value)){
          this.checkedStep($iconStep);
      }else{
          this.uncheckedStep($iconStep);
      }
  }

  /*check if password contains one letter*/
  checkLetter(){
      this.check('passwordStepLetter', /[a-z]/);
  }

  /*check if password contains one number*/
  checkNumber(){
      this.check('passwordStepNumber', /\d+/);
  }

  /*check if password contains one capital letter*/
  checkCapital(){
      this.check('passwordStepCapital', /[A-Z]/);
  }

  /*check if password contains 8 or more charaters*/
  checkLength(){
      const $iconStepLength = document.getElementById('passwordStepLength');
      if(this.$passwordInput.value.length >= this.passwordMinLength){
          this.checkedStep($iconStepLength);
      }else{
          this.uncheckedStep($iconStepLength);
      }
  }

  /*verify all status step*/
  checkAllStep(){
      this.checkLetter();
      this.checkCapital();
      this.checkNumber();
      this.checkLength();
  }

}
