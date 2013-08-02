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