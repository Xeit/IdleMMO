class ZoneEnemyWeight
{
	constructor(enemyName, encounterWeight)
	{
		this.enemyName = enemyName;
		this.encounterWeight = encounterWeight;
	}
}

const zoneCellars =
{
	zoneName: "Cellars",
	levelRange: "1-3",
	monsters: [new ZoneEnemyWeight("Rat", 96), new ZoneEnemyWeight("Big Rat", 4)],
	description: "A cellar filled with rats. Cliche."
}