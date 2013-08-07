App.Criticalinjury = DS.Model.extend({
	name: DS.attr('string'),
	severity: DS.attr('string'),
	result: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});