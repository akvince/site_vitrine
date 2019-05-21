(function(global, $) {
    'use strict';

    global.UiPasswordValidationStep = UiBloc.extend({
        init: function (page, name) {
            var me = this;
            me._super(page, name);
            console.log('init password validation step');

            // Private properties
            var $passwordInput = $('#passwordInput');
            var $passwordInputVal = $passwordInput.val();
            var successTick = 'lr-icon-tick-success';
            var unsuccessTick = 'lr-icon-tick-unsuccess';
            var passwordMinLength = 8;

            // Public properties

            // DOM Picks

            // DOM building elements

            // DOM adjustments

            // Private methods
            /*construct dom to display step password*/
            var constructDom = function(){
                var labelPage = 'MobileV3_Common';
                $passwordInput.after($('<div>',{
                    id:'containerStepValidation',
                    class: 'margin-b row'
                }).append($('<div>',{
                    text: labels[labelPage]['TitleStepPassword'],
                    class: 'col-xs-12'
                })).append($('<div>', {
                    id: 'passwordStepLength',
                    html: '<span class="password-step-tick lr-icon-tick-unsuccess"></span>' + labels[labelPage]['LengthStepPassword'],
                    class: 'col-xs-12 col-sm-6 step-label'
                })).append($('<div>', {
                    id: 'passwordStepNumber',
                    html: '<span class="password-step-tick lr-icon-tick-unsuccess"></span>' + labels[labelPage]['NumberStepPassword'],
                    class: 'col-xs-12 col-sm-6 step-label'
                })).append($('<div>', {
                    id: 'passwordStepLetter',
                    html: '<span class="password-step-tick lr-icon-tick-unsuccess"></span>' + labels[labelPage]['LetterStepPassword'],
                    class: 'col-xs-12 col-sm-6 step-label'
                })).append($('<div>', {
                    id: 'passwordStepCapital',
                    html: '<span class="password-step-tick lr-icon-tick-unsuccess"></span>' + labels[labelPage]['CapitalStepPassword'],
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
    });
})(window, window.jQuery);
