App.Weapon = DS.Model.extend({
	name: DS.attr('string'),
	skill: DS.belongsTo('App.Rank'),
	damage: DS.attr('number'),
	range: DS.attr('number'),
	crit: DS.attr('number'),
	special: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});


App.WeaponController = Ember.ObjectController.extend({
	
});