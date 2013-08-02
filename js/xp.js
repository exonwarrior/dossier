App.XP = DS.Model.extend({
	source: DS.attr('string'),
	amount: DS.attr('number'),
	character: DS.belongsTo('App.Character')
});