class Enemy
{
	constructor(enemyName, enemyLevel, enemyXp, enemyMaxHealth, enemyDamage, chanceOfDroppingItem)
	{
		this.enemyName = enemyName;
		this.enemyLevel = enemyLevel;
		this.enemyXp = enemyXp;
		this.enemyMaxHealth = enemyMaxHealth;
		this.enemyDamage = enemyDamage;
		this.chanceOfDroppingItem = chanceOfDroppingItem;
	}
}

const enemyMap = new Map();

enemyMap.set("Rat", new Enemy("Rat", 1, 1, 10, 3, 15));
enemyMap.set("Big Rat", new Enemy("Big Rat", 3, 5, 30, 6, 60));