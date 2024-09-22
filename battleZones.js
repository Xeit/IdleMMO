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