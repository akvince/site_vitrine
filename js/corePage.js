var page = Class.extend({
	init: function(blocks, properties){
		console.log('Class');

	
	}
});

var UiBloc = Class.extend({
    init: function(page, name, parent) {
				console.log('UiBloc');
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
