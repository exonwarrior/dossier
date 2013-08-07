var App = Ember.Application.create();

App.Router.map(function(){
	this.resource('characters',function(){
		this.resource('character',{path: ':character_id'});
	});
});

// App.Store = DS.Store.extend({
// 	revision: 13,
// 	adapter: 'DS.FixtureAdapter'
// });

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'App.LSAdapter',
  init: function(){
    this._super();
    this.loadMany(App.Skill, App.skillsArray);
  }
});

App.LSAdapter = DS.LSAdapter.extend({
  namespace: 'charactersheet-emberjs'
});



////// Stub data store fixture adapter ///////
// App.Store = DS.Store.extend({
//     revision: 12,
//     //adapter: 'DS.RESTAdapter',
//     adapter: DS.FixtureAdapter.extend({
//         queryFixtures: function(fixtures, query, type) {
//             console.log(query);
//             console.log(type);
//             return fixtures.filter(function(item) {
//                 for(var prop in query) {
//                     if( item[prop] != query[prop]) {
//                         return false;
//                     }
//                 }
//                 return true;
//             });
//         }
//     })
// });

App.skillList = function(){
	App.Skill.find().getEach('id');
};
App.generalSkillList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
App.combatSkillList = [22,23,24,25,26];
App.knowledgeSkillList = [27,28,29,30,31,32];