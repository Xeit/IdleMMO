class ZoneEnemyWeight
{
	constructor(enemyName, encounterWeight)
	{
		this.enemyName = enemyName;
		this.encounterWeight = encounterWeight;
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

const zoneCellars =
{
	zoneName: "Cellars",
	levelRange: "1-3",
	monsters: [new ZoneEnemyWeight("Rat", 96), new ZoneEnemyWeight("Big Rat", 4)],
	description: "A cellar filled with rats. Cliche."
}

const zoneForest =
{
	zoneName: "Forest",
	levelRange: "2-8",
	monsters: [new ZoneEnemyWeight("Huge Bee", 80), 
		new ZoneEnemyWeight("Fox", 10),
		new ZoneEnemyWeight("Wolf", 5)],
	description: "Forest filled with wild animals. Btw you just hit a beehive."
}