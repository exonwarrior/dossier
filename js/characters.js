App.CharactersRoute = Ember.Route.extend({
	model: function(){
		return App.Character.find();
	}
});

App.CharactersController = Ember.ArrayController.extend({
	createCharacter: function(){
		var character = App.Character.createRecord({
			isEditing: true,
			species: "<species>",
			career: "<career>",
			gender: "<gender>",
			age: "<age>",
			height: "<height>",
			hair: "<hair>",
			eyes: "<eyes>",
			notableFeatures: "<features>",
			build: "<build>",
			playerName: "<player>",
			name: "<name>",
			woundsCurrent: 0,
			woundsThreshold: 0,
			strainCurrent: 0,
			strainThreshold: 0,
			defenseMelee: 0,
			defenseRanged: 0,
			soak: 0,
			boostSetbackDice: "",
			brawn: 1,
			agility: 1,
			intellect: 1,
			cunning: 1,
			willpower: 1,
			presence: 1,
			portraitURL: "http://placekitten.com/200/200",
			skills: [],
			generalSkills: [],
			combatSkills: [],
			knowledgeSkills:  [],
			customSkills: [],
			inventory: [],
			weapons: [],
			armor: [],
			criticalInjuries: [],
			xp: [],
			availableXP: 0,
			motivation: [],
			obligation: []
		});
		character.save();	
	}
});