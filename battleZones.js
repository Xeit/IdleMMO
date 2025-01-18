class ZoneEnemyWeight
{
	constructor(enemyName, encounterWeight)
	{
		this.enemyName = enemyName;
		this.encounterWeight = encounterWeight;
	}
}

class	BattleZone
{
	constructor(zoneName, levelsRange, monsters, description)
	{
		this.zoneName = zoneName;
		this.levelsRange = levelsRange;
		this.monsters = monsters;
		this.description = description;
	}
}

function getRandomMonsterFromBattleZone(selectedZone)
{
	var totalEnemyWeight = 0;
	const arrayOfEnemyWeights = [];
	
	selectedZone.monsters.forEach((zoneEnemyWeight, index) => 
	{
		totalEnemyWeight += +zoneEnemyWeight.encounterWeight;
		arrayOfEnemyWeights.push(zoneEnemyWeight.encounterWeight);
	});
	
	var nextEnemy = null;

	var enemyRoll = +(Math.random() * totalEnemyWeight).toFixed();
	for (let it = 0; it < arrayOfEnemyWeights.length; ++it)
	{
		enemyRoll -= +arrayOfEnemyWeights[it];
		if(enemyRoll <= 0)
		{
			nextEnemy = enemyMap.get(selectedZone.monsters[it].enemyName);
			break;
		}
	}

	return nextEnemy;
}

const battleZonesMap = new Array();

battleZonesMap.push(new BattleZone("Cellars", "1-3", [new ZoneEnemyWeight("Rat", 96), new ZoneEnemyWeight("Big Rat", 4)], "A cellar filled with rats. Cliche."));
battleZonesMap.push(new BattleZone("Forest", "2-8", [new ZoneEnemyWeight("Huge Bee", 80), new ZoneEnemyWeight("Fox", 10), new ZoneEnemyWeight("Wolf", 5)], "Forest filled with wild animals. Btw you just hit a beehive."));
battleZonesMap.push(new BattleZone("Bat Cave", "3-6", [new ZoneEnemyWeight("Bat", 50), new ZoneEnemyWeight("Scary Bat", 50)], "Standard cave. It's filled with bat family."));
battleZonesMap.push(new BattleZone("Bandit Hideout", "7-11", [new ZoneEnemyWeight("Guard Dog", 20), new ZoneEnemyWeight("Bandit Grunt", 5), new ZoneEnemyWeight("Bandit Leader", 1)], "Hideout of fearsome bandits."));
battleZonesMap.push(new BattleZone("Kobold Caves", "12-15", [new ZoneEnemyWeight("Kobold Scout", 50), new ZoneEnemyWeight("Kobold Warrior", 20), new ZoneEnemyWeight("Kobold Shaman", 5)], "A maze of tunnels crawling with pesky kobolds. They're territorial."));
battleZonesMap.push(new BattleZone("Mountain Pass", "15-22", [new ZoneEnemyWeight("Mountain Goat", 50), new ZoneEnemyWeight("Snow Wolf", 20), new ZoneEnemyWeight("Stone Golem", 10)], "A cold, windy pass. Wolves and worse lurk in the snow."));
battleZonesMap.push(new BattleZone("Catacombs", "20-23", [new ZoneEnemyWeight("Skeleton Warrior", 50), new ZoneEnemyWeight("Plague Rat", 15)], "Ancient burial grounds full of monsters."));
battleZonesMap.push(new BattleZone("Jungle Temple", "25-33", [new ZoneEnemyWeight("Jungle Spider", 50), new ZoneEnemyWeight("Poison Dart Frog", 50), new ZoneEnemyWeight("Temple Guardian", 10)], "A forgotten temple deep in the jungle."));
battleZonesMap.push(new BattleZone("Flooded Ruins", "27-30", [new ZoneEnemyWeight("Swamp Lurker", 50), new ZoneEnemyWeight("Drowned Zombie", 25)], "Submerged ruins hiding drowned horrors."));
battleZonesMap.push(new BattleZone("Abandoned Castle", "34-39", [new ZoneEnemyWeight("Haunted Armor", 50), new ZoneEnemyWeight("Vampire Thrall", 25), new ZoneEnemyWeight("Castle Wraith", 10)], "An old castle haunted by restless spirits."));
battleZonesMap.push(new BattleZone("Cursed Village", "37-41", [new ZoneEnemyWeight("Restless Spirit", 25), new ZoneEnemyWeight("Banshee", 3)], "A very old village cursed by even older witch."));
battleZonesMap.push(new BattleZone("Desert Ruins", "42-45", [new ZoneEnemyWeight("Sand Scorpion", 50), new ZoneEnemyWeight("Desert Bandit", 25), new ZoneEnemyWeight("Mummy", 10)], "Shifting sands reveal ancient tombs... and what's inside."));
battleZonesMap.push(new BattleZone("Corrupted Forest", "44-47", [new ZoneEnemyWeight("Corrupted Dryad", 50), new ZoneEnemyWeight("Shadow Wolf", 30), new ZoneEnemyWeight("Dark Treant", 5)], "Forest corrupted by unknown powers."));
battleZonesMap.push(new BattleZone("Cult Hideout", "25-49", [new ZoneEnemyWeight("Cultist Acolyte", 50), new ZoneEnemyWeight("Dark Priest", 50), new ZoneEnemyWeight("Demon Spawn", 5)], "Dark rituals, darker intentions. Tread lightly."));
battleZonesMap.push(new BattleZone("Colosseum", "48-50", [new ZoneEnemyWeight("Gladiator", 10), new ZoneEnemyWeight("Arena Beast", 10), new ZoneEnemyWeight("Champion of the Pit", 1)], "Where heroes like You try to become legends."));
battleZonesMap.push(new BattleZone("Giant Labyrinth", "50-50+", [new ZoneEnemyWeight("Minotaur", 40), new ZoneEnemyWeight("Stone Gargoyle", 50), new ZoneEnemyWeight("Labyrinth Watcher", 1)], "A massive labyrinth. Hope you brought a map, and a sword."));
battleZonesMap.push(new BattleZone("Outpost of Darkness", "50-50+", [new ZoneEnemyWeight("Night Stalker", 40), new ZoneEnemyWeight("Dark Knight", 60), new ZoneEnemyWeight("Abyssal Beast", 2)], "Scouts from Dark Legion."));
