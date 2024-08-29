const EnemyDifficulty =
{
	easy: 1,
	medium: 1.5,
	hard: 2,
	very_hard: 3,
	mini_boss: 5,
	boss: 10
};

class Enemy
{
	constructor(enemyName, enemyLevel, chanceOfDroppingItem, enemyDiff)
	{
		this.enemyName = enemyName;
		this.enemyLevel = enemyLevel;
		this.enemyDifficulty = enemyDiff;
		this.enemyXp = +(enemyLevel * 2 * enemyDiff).toFixed();
		this.enemyMaxHealth = +(enemyLevel * 15 * enemyDiff).toFixed();
		this.enemyDamage = +(enemyLevel * 4 * enemyDiff).toFixed();
		this.chanceOfDroppingItem = chanceOfDroppingItem;
	}
}

const enemyMap = new Map();

enemyMap.set("Rat", new Enemy("Rat", 1, 15, EnemyDifficulty.easy));
enemyMap.set("Big Rat", new Enemy("Big Rat", 3, 60, EnemyDifficulty.medium));