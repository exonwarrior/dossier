var App = Ember.Application.create();

App.register('controller:rank',App.RankController,{singleton: false });

App.Router.map(function(){
	this.resource('characters',function(){
		this.resource('character',{path: ':character_id'});
	});
});

App.CharactersRoute = Ember.Route.extend({
	model: function(){
		return App.Character.find();
	}
});

App.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('characters');
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


App.CharacterController = Ember.ObjectController.extend({
	totalXP: function(){
		return this.get('xp').getEach('amount').reduce(function(accum,item) {
			return accum + item;
		},0);
	}.property('xp.@each.amount'),

	editCharacter: function(){
		this.set('isEditing', true);
	},
	saveCharacter: function(){
		this.set('isEditing', false);
		this.get('model').save();
	},
	deleteCharacter: function(){
		var character = this.get('model');
		character.deleteRecord();
		character.save();
		this.transitionToRoute('characters');
		//alert("This is kind of broken");
	},
	baseSoak: function(){
		return this.get('brawn');
	}.property('brawn'),
	currentSoak: function(){
		return parseInt(this.get('baseSoak')) + parseInt(this.get('soakMod'));
	}.property('baseSoak', 'soakMod'),
	soakMod: 0,
	addToSoak: function(amount){
		var newSoakMod = this.get('soakMod') + amount;
		if(newSoakMod == 0){
			this.set('soakModded', false);
		}
		else if(newSoakMod < 0){
			this.set('soakModded', true);
			this.set('soakModdedPref', '');
		}
		else{
			this.set('soakModded', true);
			this.set('soakModdedPref', '+');
		}
		this.set('soakMod', newSoakMod);
	},
	addDice: function(amount, type){
		var current = this.get('boostSetbackDice');
		var newCurrent = "";
		if(amount > 0){
			for(var i = 0; i < amount; i++){
				//find the first instance of this letter
				var index = current.indexOf(type);
				if(index == -1){
					index = 0;
				}
				//split the string into two parts, before that letter, and after that letter (including that letter)
				var firstPart = current.substr(0, index);
				var secondPart = current.substr(index);
				//insert the new letter between
				newCurrent = firstPart + type + secondPart;
			}
		}
		else if(amount < 0){
			for(var i = 0; i > amount; i--){
				//find and replace one instance of the character
				newCurrent = current.replace(new RegExp(type), '');
			}
		}
		this.set('boostSetbackDice', newCurrent);
	},
	addToStat: function(stat, amount){
		var current = this.get(stat);
		var newValue = current + amount;
		this.set(stat, newValue);
	},
	increaseRank: function(skill, amount){

	}
});

Ember.Handlebars.helper('dice',function(value,options) {
	var string = "";
	var diceURLs = {
		p : "img/dice/proficiencyDie.png",
		a : "img/dice/abilityDie.png",
		d : "img/dice/difficultyDie.png",
		c : "img/dice/challengeDie.png",
		b : "img/dice/boostDie.png",
		s : "img/dice/setbackDie.png",
		f : "img/dice/forceDie.png"
	};
	try{
		var array = value.split("");
			for(var i = 0; i < array.length; i++){
			var item = array[i];
			array[i] = "<img src='"+ diceURLs[item] +"' class='die'>";
		}
		return new Handlebars.SafeString('<span class="dicePool">'+array.join("")+'</span>');
	}
	catch(err){
		return "";
	}
	
});

App.RankController = Ember.ObjectController.extend({
	char: null,
	needs: "character",
	charBinding: "controllers.character",
	dicePool: function(){
		var attrib = this.get("char." + this.get("skill.characteristic"));
		var rank = this.get('rank');
		var largest = Math.max(attrib,rank);
		var smallest = Math.min(attrib,rank);
		var string = "";
		for(var a = 0; a<largest;a++){
			string += "a";
		}
		for(var p = 0; p<smallest;p++){
			string = string.replace("a","p");
		}
		return string;
	}.property('rank','skill.characteristic','char.cunning', 'char.brawn', 'char.agility', 'char.intellect', 'char.willpower', 'char.presence')
});


App.Store = DS.Store.extend({
	revision: 13,
	adapter: 'DS.FixtureAdapter'
});


App.Skill = DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	characteristic: DS.attr('string'),
	rank: DS.hasMany('App.Rank')
});

App.Rank = DS.Model.extend({
	rank: DS.attr('number'),
	skill: DS.belongsTo('App.Skill'),
	character: DS.belongsTo('App.Character', {inverse: 'skills'}),
	type: DS.belongsTo('App.SkillTypes'),
	/*weapons: DS.hasMany('App.Weapon')*/
});

App.InventoryItem = DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});

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

App.Armor = DS.Model.extend({
	name: DS.attr('string'),
	stats: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});

App.Criticalinjury = DS.Model.extend({
	name: DS.attr('string'),
	severity: DS.attr('string'),
	result: DS.attr('string'),
	character: DS.belongsTo('app.character')
});

App.XP = DS.Model.extend({
	source: DS.attr('string'),
	amount: DS.attr('number'),
	character: DS.belongsTo('App.Character')
});

App.Motivation = DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});

App.Obligation = DS.Model.extend({
	type: DS.attr('string'),
	magnitude: DS.attr('number'),
	details: DS.attr('string'),
	character: DS.belongsTo('App.Character')
});


App.Character = DS.Model.extend({
  species: DS.attr('string'),
  career: DS.attr('string'),
  gender: DS.attr('string'),
  age: DS.attr('number'),
  height: DS.attr('number'),
  hair: DS.attr('string'),
  eyes: DS.attr('string'),
  notableFeatures: DS.attr('string'),
  build: DS.attr('string'),
  playerName: DS.attr('string'),
  name: DS.attr('string'),
  woundsCurrent: DS.attr('number'),
  woundsThreshold: DS.attr('number'),
  strainCurrent: DS.attr('number'),
  strainThreshold: DS.attr('number'),
  defenseMelee: DS.attr('number'),
  defenseRanged: DS.attr('number'),
  boostSetbackDice: DS.attr('string'),
  brawn: DS.attr('number'),
  agility: DS.attr('number'),
  intellect: DS.attr('number'),
  cunning: DS.attr('number'),
  willpower: DS.attr('number'),
  presence: DS.attr('number'),
  portraitURL: DS.attr('string'),
  skills: DS.hasMany('App.Rank'),
  generalSkills: DS.hasMany('App.Rank'),
  combatSkills: DS.hasMany('App.Rank'),
  knowledgeSkills: DS.hasMany('App.Rank'),
  credits: DS.attr('number'),
  inventory: DS.hasMany('App.InventoryItem'),
  weapons: DS.hasMany('App.Weapon'),
  armor: DS.hasMany('App.Armor'),
  criticalInjuries: DS.hasMany('App.Criticalinjury'),
  xp: DS.hasMany('App.XP'),
  availableXP: DS.attr('number'),
  motivation: DS.hasMany('App.Motivation'),
  obligation: DS.hasMany('App.Obligation')
});

App.skillList = function(){
	App.Skill.find().getEach('id');
	}
App.generalSkillList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
App.combatSkillList = [22,23,24,25,26];
App.knowledgeSkillList = [27,28,29,30,31,32];


App.InventoryItem.FIXTURES = [{
	id: 1,
	name: "Thingy of Thinginess",
	description: "Now with extra thinginess!",
	character: 1
}];

App.Weapon.FIXTURES = [{
	name: "Giant Flaming Rubber Chicken",
	skill: '1',
	damage: 3,
	range: 2,
	crit: 3,
	special: "Sets shit on fire",
	character: '1',
	id: 1
}];


App.Armor.FIXTURES = [{
	name: "Flimsy Tofu Hauberk",
	stats: "5 or something",
	character: '1',
	id: 1
}];


App.Criticalinjury.FIXTURES = [{
	name: "Severed Arm",
	severity: "Pretty damn severe",
	result: "You suck at things",
	character: '1',
	id: 1
}];


App.XP.FIXTURES = [{
	source: "7/28/13 session",
	amount: 20,
	character: '1',
	id: 1
}];


App.Motivation.FIXTURES = [{
	name: "Love for your mother",
	description: "Your mother was a bothan spy and so you love her and want to be a bothan spy,too.",
	id: 1,
	character: 1
}];


App.Obligation.FIXTURES = [{
	type: "Addiction",
	magnitude: 10,
	details: "Suffers from an overwhelming sex addiction",
	id: 1,
	character: 1
}];


App.Skill.FIXTURES = [
{
	id: 0,
	name: "Astrogation (Int)",
	description: "",
	type: 1,
	characteristic: "intellect"
},
{
	id: 1,
	name: "Athletics (Br)",
	description: "",
	type: 1,
	characteristic: "brawn"
},
{
	id: 2,
	name: "Charm (Pr)",
	description: "",
	type: 1,
	characteristic: "presence"
},
{
	id: 3,
	name: "Coercion (Will)",
	description: "",
	type: 1,
	characteristic: "willpower"
},
{
	id: 4,
	name: "Computers (Int)",
	description: "",
	type: 1,
	characteristic: "intellect"
},
{
	id: 5,
	name: "Cool (Pr)",
	description: "",
	type: 1,
	characteristic: "presence"
},
{
	id: 6,
	name: "Coordination (Ag)",
	description: "",
	type: 1,
	characteristic: "agility"
},
{
	id: 7,
	name: "Deception (Cun)",
	description: "",
	type: 1,
	characteristic: "cunning"
},
{
	id: 8,
	name: "Discipline (Will)",
	description: "",
	type: 1,
	characteristic: "willpower"
},
{
	id: 9,
	name: "Leadership (Pr)",
	description: "",
	type: 1,
	characteristic: "presence"
},
{
	id: 10,
	name: "Mechanics (Int)",
	description: "",
	type: 1,
	characteristic: "intellect"
},
{
	id: 11,
	name: "Medicine (Int)",
	description: "",
	type: 1,
	characteristic: "intellect"
},
{
	id: 12,
	name: "Negotiation (Pr)",
	description: "",
	type: 1,
	characteristic: "presence"
},
{
	id: 13,
	name: "Perception (Cun)",
	description: "",
	type: 1,
	characteristic: "cunning"
},
{
	id: 14,
	name: "Piloting - Planetary (Ag)",
	description: "",
	type: 1,
	characteristic: "agility"
},
{
	id: 15,
	name: "Piloting - Space (Ag)",
	description: "",
	type: 1,
	characteristic: "agility"
},
{
	id: 16,
	name: "Resilience (Br)",
	description: "",
	type: 1,
	characteristic: "brawn"
},
{
	id: 17,
	name: "Skulduggery (Cun)",
	description: "",
	type: 1,
	characteristic: "cunning"
},
{
	id: 18,
	name: "Stealth (Ag)",
	description: "",
	type: 1,
	characteristic: "agility"
},
{
	id: 19,
	name: "Streetwise (Cun)",
	description: "",
	type: 1,
	characteristic: "cunning"
},
{
	id: 20,
	name: "Survival (Cun)",
	description: "",
	type: 1,
	characteristic: "cunning"
},
{
	id: 21,
	name: "Vigilance (Will)",
	description: "",
	type: 1,
	characteristic: "willpower"
},
{
	id: 22,
	name: "Brawl (Br)",
	description: "",
	type: 2,
	characteristic: "brawn"
},
{
	id: 23,
	name: "Gunnery (Ag)",
	description: "",
	type: 2,
	characteristic: "agility"
},
{
	id: 24,
	name: "Melee (Br)",
	description: "",
	type: 2,
	characteristic: "brawn"
},
{
	id: 25,
	name: "Ranged - Light (Ag)",
	description: "",
	type: 2,
	characteristic: "agility"
},
{
	id: 26,
	name: "Ranged - Heavy (Ag)",
	description: "",
	type: 2,
	characteristic: "agility"
},
{
	id: 27,
	name: "Core Worlds (Int)",
	description: "",
	type: 3,
	characteristic: "intellect"
},
{
	id: 28,
	name: "Education (Int)",
	description: "",
	type: 3,
	characteristic: "intellect"
},
{
	id: 29,
	name: "Lore (Int)",
	description: "",
	type: 3,
	characteristic: "intellect"
},
{
	id: 30,
	name: "Outer Rim (Int)",
	description: "",
	type: 3,
	characteristic: "intellect"
},
{
	id: 31,
	name: "Underworld (Int)",
	description: "",
	type: 3,
	characteristic: "intellect"
},
{
	id: 32,
	name: "Xenology (Int)",
	description: "",
	type: 3,
	characteristic: "intellect"
}];


App.Character.FIXTURES = [{
	id: 1,
	species: "Human",
	career: "Smuggler",
	gender: "Male",
	age: "43",
	height: "230",
	hair: "None",
	eyes: "Green",
	notableFeatures: "Ugly",
	build: "Chubby",
	playerName: "Justin",
	name: "Wharrlgrrbl",
	woundsCurrent: 1,
	woundsThreshold: 11,
	strainCurrent: 0,
	strainThreshold: 10,
	defenseMelee: 3,
	defenseRanged: 3,
	soak: 6,
	boostSetbackDice: "bs",
	brawn: 3,
	agility: 2,
	intellect: 3,
	cunning: 3,
	willpower: 1,
	presence: 3,
	portraitURL: "http://placekitten.com/200/200",
	skills: App.skillList,
	generalSkills: App.generalSkillList,
	combatSkills: App.combatSkillList,
	knowledgeSkills:  App.knowledgeSkillList,
	customSkills: [],
	inventory: [1],
	weapons: [1],
	armor: [1],
	criticalInjuries: [1],
	xp: [1],
	availableXP: 20,
	motivation: [1],
	obligation: [1]
},
{
	id: 2,
	species: "Human",
	career: "Pilot",
	gender: "Female",
	age: "34",
	height: "280",
	hair: "Blonde",
	eyes: "Green",
	notableFeatures: "Loud",
	build: "Smelly",
	playerName: "Bryce",
	name: "Pants McGee",
	woundsCurrent: 4,
	woundsThreshold: 12,
	strainCurrent: 2,
	strainThreshold: 9,
	defenseMelee: 2,
	defenseRanged: 4,
	soak: 5,
	boostSetbackDice: "bs",
	brawn: 2,
	agility: 3,
	intellect: 1,
	cunning: 5,
	willpower: 2,
	presence: 1,
	portraitURL: "http://placekitten.com/200/200",
	skills: App.skillList,
	generalSkills: App.generalSkillList,
	combatSkills: App.combatSkillList,
	knowledgeSkills:  App.knowledgeSkillList,
	customSkills: [],
	inventory: [],
	criticalInjuries: []
}];

App.Rank.FIXTURES = [
{
	id: 1,
	character: '1',
	skill: '1',
	rank: 2
},
{
	id: 2,
	character: '1',
	skill: '2',
	rank: 0,
},
{
	id: 3,
	character: '1',
	skill: '3',
	rank: 0,
},
{
	id: 4,
	character: '1',
	skill: '4',
	rank: 2,
},
{
	id: 5,
	character: '1',
	skill: '5',
	rank: 0,
},
{
	id: 6,
	character: '1',
	skill: '6',
	rank: 0,
},
{
	id: 7,
	character: '1',
	skill: '7',
	rank: 1,
},
{
	id: 8,
	character: '1',
	skill: '8',
	rank: 1,
},
{
	id: 9,
	character: '1',
	skill: '9',
	rank: 1,
},
{
	id: 10,
	character: '1',
	skill: '10',
	rank: 1,
},
{
	id: 11,
	character: '1',
	skill: '11',
	rank: 1,
},
{
	id: 12,
	character: '1',
	skill: '12',
	rank: 1,
},
{
	id: 13,
	character: '1',
	skill: '13',
	rank: 1,
},
{
	id: 14,
	character: '1',
	skill: '14',
	rank: 1,
},
{
	id: 15,
	character: '1',
	skill: '15',
	rank: 1,
},
{
	id: 16,
	character: '1',
	skill: '16',
	rank: 1,
},
{
	id: 17,
	character: '1',
	skill: '17',
	rank: 1,
},
{
	id: 18,
	character: '1',
	skill: '18',
	rank: 1,
},
{
	id: 19,
	character: '1',
	skill: '19',
	rank: 1,
},
{
	id: 20,
	character: '1',
	skill: '20',
	rank: 1,
},
{
	id: 21,
	character: '1',
	skill: '21',
	rank: 1,
},
{
	id: 22,
	character: '1',
	skill: '22',
	rank: 1,
},
{
	id: 23,
	character: '1',
	skill: '23',
	rank: 1,
},
{
	id: 24,
	character: '1',
	skill: '24',
	rank: 1,
},
{
	id: 25,
	character: '1',
	skill: '25',
	rank: 1,
},
{
	id: 26,
	character: '1',
	skill: '26',
	rank: 1,
},
{
	id: 27,
	character: '1',
	skill: '27',
	rank: 1,
},
{
	id: 28,
	character: '1',
	skill: '28',
	rank: 1,
},
{
	id: 29,
	character: '1',
	skill: '29',
	rank: 1,
},
{
	id: 30,
	character: '1',
	skill: '30',
	rank: 1,
},
{
	id: 31,
	character: '1',
	skill: '31',
	rank: 1,
},
{
	id: 32,
	character: '1',
	skill: '32',
	rank: 1,
}
];

