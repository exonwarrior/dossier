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