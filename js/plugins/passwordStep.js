'use strict';

class stepPassword {
  constructor() {
    console.log('init password validation step');

    var $passwordInput = document.getElementById('passwordInput');
    var $passwordInputVal = $passwordInput.value;
    var successTick = 'fa-check';
    var unsuccessTick = 'fa-times';
    var passwordMinLength = 8;

    /*construct dom to display step password*/
    var constructDom = function(){
        $passwordInput.insertAdjacentHTML('afterend', '<div id="containerStepValidation" class="row"></div>');
        var $containerStepValidation = document.getElementById('containerStepValidation');
        $containerStepValidation.insertAdjacentHTML('beforeend', '<div class="col-xs-12">Etape de validation de mot de passe</div>');
        $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepLength" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'minimum 8 caratères</div>');
        $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepNumber" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'contient un chiffre</div>');
        $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepLetter" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'contient une lettre</div>');
        $containerStepValidation.insertAdjacentHTML('beforeend', '<div id="passwordStepCapital" class="col-xs-12 col-sm-6 step-label"><span class="password-step-tick fas fa-times"></span>' + 'contient une majuscule</div>');
    }

    /*change tick el in green if step is valide*/
    var checkedStep = function($tickContainer){
        const $tick = $tickContainer.getElementsByClassName('password-step-tick')
        $tick[0].classList.remove(unsuccessTick)
        $tick[0].classList.add(successTick);
    }

    /*change tick el in black if step is not valide*/
    var uncheckedStep = function($tickContainer){
        const $tick = $tickContainer.getElementsByClassName('password-step-tick')
        $tick[0].classList.remove(successTick)
        $tick[0].classList.add(unsuccessTick);
    }

    /*
     * method check if condition is
     * exemple => $selector = "#selector" and regexp = /[A-Z]/
    */
    var check = function(selector, regexp){
        const $iconStep = document.getElementById(selector);
        if(regexp.test($passwordInput.value)){
            checkedStep($iconStep);
        }else{
            uncheckedStep($iconStep);
        }
    }

    /*check if password contains one letter*/
    var checkLetter = function(){
        check('passwordStepLetter', /[a-z]/);
    }

    /*check if password contains one number*/
    var checkNumber = function(){
        check('passwordStepNumber', /\d+/);
    }

    /*check if password contains one capital letter*/
    var checkCapital = function(){
        check('passwordStepCapital', /[A-Z]/);
    }

    /*check if password contains 8 or more charaters*/
    var checkLength = function(){
        const $iconStepLength = document.getElementById('passwordStepLength');
        if($passwordInput.value.length >= passwordMinLength){
            checkedStep($iconStepLength);
        }else{
            uncheckedStep($iconStepLength);
        }
    }

    /*verify all status step*/
    const checkAllStep = function(){
        checkLetter();
        checkCapital();
        checkNumber();
        checkLength();
    }

        // Public methods

    // Events
    $passwordInput.addEventListener('keyup', function(){
        checkAllStep();
    });

    // Init
    constructDom();

    /*style*/
    const $stepLabel = document.getElementsByClassName('step-label');
    const $passwordStepTick = document.getElementsByClassName('password-step-tick');
    Array.from($stepLabel).forEach(function(element) {
        var $this = element;
        $this.style.fontSize = '14px';
    });
    Array.from($passwordStepTick).forEach(function(element) {
        var $this = element;
        $this.style.verticalAlign = 'middle';
    });
  }

}
