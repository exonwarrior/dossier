App.Armor = DS.Model.extend({
	name: DS.attr('string'),
	stats: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});