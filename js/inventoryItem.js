App.InventoryItem = DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});

App.InventoryItemController = App.ItemController.extend({
	
});