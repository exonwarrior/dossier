var App = Ember.Application.create();



App.Router.map(function(){
	this.resource('characters',function(){
		this.resource('character',{path: ':character_id'});
	});
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



App.Store = DS.Store.extend({
	revision: 13,
	adapter: 'DS.FixtureAdapter'
});

App.skillList = function(){
	App.Skill.find().getEach('id');
	}
App.generalSkillList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
App.combatSkillList = [22,23,24,25,26];
App.knowledgeSkillList = [27,28,29,30,31,32];

