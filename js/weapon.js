App.Weapon = DS.Model.extend({
	name: DS.attr('string'),
	//skill: DS.hasMany('rank'),
	skill: '1',
	damage: DS.attr('number'),
	range: DS.attr('number'),
	crit: DS.attr('number'),
	special: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});