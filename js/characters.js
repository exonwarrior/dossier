App.CharactersRoute = Ember.Route.extend({
	model: function(){
		return App.Character.find();
	}
});

App.CharactersController = Ember.ArrayController.extend({
	anyEditing: function(){

	},
	createCharacter: function(){
		var character = App.Character.createRecord({
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
			inventory: [],
			weapons: [],
			armor: [],
			criticalInjuries: [],
			xp: [],
			availableXP: 0,
			motivation: [],
			obligation: []
		});

		character.save().then(function(response){
			App.Skill.find().then(function(records){
				// records.forEach(function(item, index){
				// 	console.log(item, index);
				// });
				records.forEach(function(item, index){
					//console.log("HI");
					//Throwing an "uncommitted" error. Need to fix. 
					var newRank = character.get('skills').createRecord({
						skill: item,
						rank: 0
						// character: character
					});

					
					switch(newRank.get('skill.type')){
						case '1':
							character.get('generalSkills').addObject(newRank);
							break;
						case '2':
							character.get('combatSkills').addObject(newRank);
							break;
						case '3':
							character.get('knowledgeSkills').addObject(newRank);
							break;
					}
					
					
					// newRank.save();
				});
			});
		});
			
		

		
		
		
	}
});