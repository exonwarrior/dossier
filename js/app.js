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

App.EditTextView = Ember.TextField.extend({
  insertNewline: function () {
    this.get('controller').acceptChanges();
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