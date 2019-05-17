var Page = Class.extend({

    init: function (listBlocks, properties, model) {
        var me = this;
        this.$container = $('#corePage');
        this.$eventContainer = $('#eventContainer');

        $.extend(this, JSON.parse($('#dataGlobal').text()));
        this.shortCountry = this.country.replace('co.', '');
        this.appPath = contextInfo != null && contextInfo.ApplicationPath != null && contextInfo.ApplicationPath != '' ? contextInfo.ApplicationPath : '';
        this.screenSize = _LaRedoute.getScreenType();
        $(window).on('resize', function() {
            me.screenSize = _LaRedoute.getScreenType();
            me.$container.trigger('page.size.change');
        });
        this.isMobile = this.screenSize === 1;
        this.isTablet = this.screenSize > 1 && this.screenSize < 4;
        this.isDesktop = this.screenSize === 4;
        this.tracking = {};
        $.extend(this.tracking, window.wa_data);

        this.asyncBlocs = {};
        this.postInitCb = [];
        this.state = 'init';
        if (this.appPath === '/') this.appPath = '';
        this.urlSuffixe = (contextInfo != null && contextInfo.IsSingleURLResponsive != null && contextInfo.IsSingleURLResponsive == true) || (this.appPath === '/m') ? '.aspx' : '';
        this.lang = this.getLang();

        if (typeof properties === varType.fn) properties.apply(this);

        if (window.defaultBlocsAlreadyLoaded === undefined) {
            this.defaultListBlocks = JSON.parse($('#dataDefaultListBlocks').text());
            if (typeof listBlocks === 'object') this.Blocs = $.extend(this.defaultListBlocks, listBlocks);
            else this.Blocs = this.defaultListBlocks;
            window.defaultBlocsAlreadyLoaded = 'loaded';
        } else if (typeof listBlocks === 'object') {
            this.Blocs = listBlocks;
        } else {
            this.Blocs = {};
        }
        delete this.defaultListBlocks;

        // var
        //     jsPageName = window.jsPageName[this.pageType],
        //     model = 'Model' + jsPageName,
        //     Model = window[model],
        //     tracking = 'Tracking' + jsPageName,
        //     Tracking = window[tracking];
        // this.Model = typeof Model === varType.fn ? new Model(model, properties) : new window.Model('Generic', properties);
        // this.Tracking = typeof Tracking === varType.fn ? new Tracking(this.Model) : new window.Tracking(this.Model);
        
        var Model = window[model];
        this.Model = typeof Model === varType.fn ? new Model(model, properties) : new window.Model('Generic', properties);

        // console.log('Page - ctor : ' + window.location);

        if (typeof this.Blocs === 'object') {
            var i = 0;
            for (i in this.Blocs) {
                if (this.Blocs[i].indexOf(',') !== -1) {
                    this.asyncBlocs[i] = this.Blocs[i];
                } else {
                    try {
                        this.Blocs[i] = new window[this.Blocs[i]](this, this.Blocs[i]);
                        this.Blocs[i].isLoaded();
                    } catch (e) {
                        console.error('Page.ctor : can\'t create blocs instance ' + i + ' for page ' + window.location.pathname + ' [' + e.message +']');
                    }
                }
            }
        }

        $(window).on('load', function(){
            for (i in me.asyncBlocs) {
                // console.log('==> async UiBloc ' + i);
                var bloc = me.asyncBlocs[i].split(',')[0];
                me.Blocs[i] = new window[bloc](me, bloc);
                me.Blocs[i].isLoaded();
            }

            me.postInitCb.forEach(function(e){
                e.cb.call(me, e.params);
            });

            me.state = 'ready';
        });
    },
    PushPostInitCallback: function(cb, params) {
        if (typeof cb === 'function') {
            if (this.state === 'init') {
                this.postInitCb.push({cb : cb, params: params});
            } else cb.call(this, params);
        }
    },
    waitForBlockLoad: function(blockName, context, callback, callbackParams) {
        var me = this;
        if (typeof blockName !== 'string' || typeof callback !== 'function') {
            return;
        }

        var bloc = this.Blocs[blockName];
        if ($.inArray(typeof bloc, ['object', 'undefined']) > -1) {
            return callback.apply(context, callbackParams);
        } else if (typeof bloc === 'string') {
            bloc = bloc.replace(',async', ''); // fix for async bloc
            this.$container.on(bloc + '.loaded', function() {
                return callback.apply(context, callbackParams);
            });
        }
    },
    Update: function () {
        for (i in this.Blocs) {
            this.Blocs[i].Update();
        }
    },
    DisplayErrorMessage: function (buttonSelector, errorMessage, css) {
        css = css === undefined ? 'default' : css;
        var selector, $elem;
        if (typeof buttonSelector === 'string') {
            selector = buttonSelector;
            $elem = $(selector);
        } else {
            $elem = buttonSelector;
            selector = $elem.selector;
        }
        if ($elem.prev('.error-tooltip').length === 0) {
            $('<div>', {
                class: 'error-tooltip ' + css,
                html: errorMessage
            }).insertBefore(selector);
        }
        else {
            var $errorBlock = $elem.prev('.error-tooltip');

            $errorBlock.removeClass().addClass('error-tooltip ' + css);
            $errorBlock.find('span').text('errorMessage');
            $errorBlock.slideDown(300);
        }
    },
    HideErrorMessage: function (buttonSelector) {
        var $elem;
        if (typeof buttonSelector === 'string') $elem = $(buttonSelector);
        else $elem = buttonSelector;
        $elem.prev('.error-tooltip').slideUp(300);
    },
    DisplayPopOverMessage: function (elementSelector, message, customDuration, customPosition) {

        $(elementSelector).attr('data-toggle', 'popover').popover({
            html: true,
            trigger: 'manual',
            placement: customPosition !== undefined ? customPosition : 'top',
            content: message
        }).popover('toggle');

        setTimeout(function () {
            $(elementSelector).popover('hide');
        }, customDuration !== undefined ? customDuration : 4000);
    },
    HidePopOverMessage: function (elementSelector) {
        $(elementSelector).popover('hide');
    },
    GetCurrentPage: function() {
        return $('body').data('pagename');
    },
    getLang: function () {
        return this.countryCode.substring(0, 2);
    },
    isSite: function (siteId) {
        return this.siteId == siteId;
    },
    isSiteBE: function () {
        return this.isSite(Utils.Enum.SiteId.BE);
    },
    isSiteCH: function () {
        return this.isSite(Utils.Enum.SiteId.CH);
    },
    isSiteCOM: function () {
        return this.isSite(Utils.Enum.SiteId.COM);
    },
    isSiteES: function () {
        return this.isSite(Utils.Enum.SiteId.ES);
    },
    isSiteFR: function () {
        return this.isSite(Utils.Enum.SiteId.FR);
    },
    isSiteIT: function () {
        return this.isSite(Utils.Enum.SiteId.IT);
    },
    isSitePL: function () {
        return this.isSite(Utils.Enum.SiteId.PL);
    },
    isSitePT: function () {
        return this.isSite(Utils.Enum.SiteId.PT);
    },
    isSiteRU: function () {
        return this.isSite(Utils.Enum.SiteId.RU);
    },
    isSiteUK: function () {
        return this.isSite(Utils.Enum.SiteId.UK);
    },
    isLoaded: function() {
        window.$eventContainer.trigger(pageEvent.loaded);
    }
});

var UiBloc = Class.extend({
    init: function(page, name, parent) {
        this.Page = page;
        this.Name = name || 'Unnamed UI Bloc';
        if (page) {
            this.Model = page.Model;
        }
        if (typeof parent === 'object') this.Parent = parent;

        // console.log('UiBloc -  ctor : ' + this.Name);
    },
    isLoaded: function() {
        this.Page.$container.trigger(this.Name + '.loaded');
        window.$eventContainer.trigger(this.Name + '.loaded');
    }
});

var Model = Class.extend({
    init: function(name, properties) {
        var model = this;

        model.Name = name;
        $.extend(model, JSON.parse($('#mainModel').text()));
        model.siteName = window.siteName[model.site];

        if (typeof properties === varType.obj) $.extend(model, properties);

        model.$container = $('#corePage');
        model.$eventContainer = $('#eventContainer');
    }
});

// var Tracking = Class.extend({
//     init: function(model) {

//     }
// });

(function(global, $) {
    'use strict';

    global.onBlockLoad = function(blockName, method) {
        var
            args = Array.prototype.slice.call(arguments, 2),
            applyFunction = function() {
                var fn = global._page.Blocs[blockName][method];
                if (typeof fn === varType.fn)
                    return fn.apply(global._page.Blocs[blockName], args);
                else {
                    console.error('the method _page.Blocs.' + blockName + '.' + method + ' doesn\'t exist');
                    return false;
                }
            };

        if (typeof global._page === varType.obj) {
            if (typeof global._page.Blocs[blockName] === varType.obj) {
                return applyFunction();
            } else if (typeof global._page.Blocs[blockName] === varType.str) {
                global.$eventContainer.on(blockEvent[blockName + 'Loaded'], function() {
                    return applyFunction();
                });
            } else {
                console.error('the block _page.Blocs.' + blockName + ' doesn\'t exist');
                return false;
            }
        } else {
            global.$eventContainer.on(pageEvent.loaded, function() {
                return applyFunction();
            });
        }
    };
})(window, jQuery);