$(function(){
  var stepPassword = function(){
    console.log('init password validation step');

    var $passwordInput = $('#passwordInput');
    var $passwordInputVal = $passwordInput.val();
    var successTick = 'fa-check';
    var unsuccessTick = 'fa-times';
    var passwordMinLength = 8;

    /*construct dom to display step password*/
    var constructDom = function(){
        $passwordInput.after($('<div>',{
            id:'containerStepValidation',
            class: 'row'
        }).append($('<div>',{
            text: 'Etape de validation de mot de passe',
            class: 'col-xs-12'
        })).append($('<div>', {
            id: 'passwordStepLength',
            html: '<span class="password-step-tick fas fa-times"></span>' + 'minimum 8 caratères',
            class: 'col-xs-12 col-sm-6 step-label'
        })).append($('<div>', {
            id: 'passwordStepNumber',
            html: '<span class="password-step-tick fas fa-times"></span>' + 'contient un chiffre',
            class: 'col-xs-12 col-sm-6 step-label'
        })).append($('<div>', {
            id: 'passwordStepLetter',
            html: '<span class="password-step-tick fas fa-times"></span>' + 'contient une lettre',
            class: 'col-xs-12 col-sm-6 step-label'
        })).append($('<div>', {
            id: 'passwordStepCapital',
            html: '<span class="password-step-tick fas fa-times"></span>' + 'contient une majuscule',
            class: 'col-xs-12 col-sm-6 step-label'
        })));
    }

    /*change tick el in green if step is valide*/
    var checkedStep = function($tickContainer){
        $tickContainer.find('.password-step-tick').removeClass(unsuccessTick).addClass(successTick);
    }

    /*change tick el in black if step is not valide*/
    var uncheckedStep = function($tickContainer){
        $tickContainer.find('.password-step-tick').removeClass(successTick).addClass(unsuccessTick);
    }

    /*
     * method check if condition is
     * exemple => $selector = "#selector" and regexp = /[A-Z]/
    */
    var check = function($selector, regexp){
        var $iconStep = $($selector);
        if(regexp.test($passwordInput.val())){
            checkedStep($iconStep);
        }else{
            uncheckedStep($iconStep);
        }
    }

    /*check if password contains one letter*/
    var checkLetter = function(){
        check('#passwordStepLetter', /[a-z]/);
    }

    /*check if password contains one number*/
    var checkNumber = function(){
        check('#passwordStepNumber', /\d+/);
    }

    /*check if password contains one capital letter*/
    var checkCapital = function(){
        check('#passwordStepCapital', /[A-Z]/);
    }

    /*check if password contains 8 or more charaters*/
    var checkLength = function(){
        var $iconStepLength = $('#passwordStepLength');
        if($passwordInput.val().length >= passwordMinLength){
            checkedStep($iconStepLength);
        }else{
            uncheckedStep($iconStepLength);
        }
    }

    /*verify all status step*/
    var checkAllStep = function(){
        checkLetter();
        checkCapital();
        checkNumber();
        checkLength();
    }

        // Public methods

    // Events
    $passwordInput.on('keyup', function(){
        checkAllStep();
    });

    // Init
    constructDom();

    /*style*/
    $('.step-label').css('font-size', '14px');
    $('.password-step-tick ').css('vertical-align', 'middle');
  }

  // Public methods

  // Events

  // Init
  stepPassword();
});
