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
	constructor(enemyName, enemyLevel, enemyDiff)
	{
		this.enemyName = enemyName;
		this.enemyLevel = enemyLevel;
		this.enemyDifficulty = enemyDiff;
		this.enemyXp = +(enemyLevel * 2 * enemyDiff).toFixed();
		this.enemyMaxHealth = +(enemyLevel * 15 * enemyDiff).toFixed();
		this.enemyDamage = +(enemyLevel * 4 * enemyDiff).toFixed();

		switch (enemyDiff) 
		{
			case EnemyDifficulty.easy:
				this.chanceOfDroppingItem = 10;
				break;
			case EnemyDifficulty.medium:
				this.chanceOfDroppingItem = 15;
				break;
			case EnemyDifficulty.hard:
				this.chanceOfDroppingItem = 25;
				break;
			case EnemyDifficulty.very_hard:
				this.chanceOfDroppingItem = 35;
				break;
			case EnemyDifficulty.mini_boss:
				this.chanceOfDroppingItem = 75;
				break;
			case EnemyDifficulty.boss:
				this.chanceOfDroppingItem = 100;
				break;
			default:
				break;
		}
	}
}

const enemyMap = new Map();

enemyMap.set("Rat", new Enemy("Rat", 1, EnemyDifficulty.easy));
enemyMap.set("Big Rat", new Enemy("Big Rat", 3, EnemyDifficulty.medium));
enemyMap.set("Huge Bee", new Enemy("Huge Bee", 2, EnemyDifficulty.easy));
enemyMap.set("Fox", new Enemy("Fox", 4, EnemyDifficulty.easy));
enemyMap.set("Wolf", new Enemy("Wolf", 8, EnemyDifficulty.medium));
enemyMap.set("Bat", new Enemy("Bat", 3, EnemyDifficulty.easy));
enemyMap.set("Scary Bat", new Enemy("Scary Bat", 5, EnemyDifficulty.easy));