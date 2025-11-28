const EnemyDifficulty =
{
	easy: 1,
	medium: 1.5,
	hard: 2,
	very_hard: 3,
	mini_boss: 5,
	boss: 10
};

function GetEnemyDifficultyName(enemyDifficulty)
{
	switch(enemyDifficulty)
	{
		case "none":
			return "none/error";
		case EnemyDifficulty.easy:
			return "easy";
		case EnemyDifficulty.medium:
			return "medium";
		case EnemyDifficulty.hard:
			return "hard";
		case EnemyDifficulty.very_hard:
			return "very hard";
		case EnemyDifficulty.mini_boss:
			return "mini boss";
		case EnemyDifficulty.boss:
			return "boss";
	}
}

class Enemy
{
	constructor(enemyName, enemyLevel, enemyDiff)
	{
		this.enemyName = enemyName;
		this.enemyLevel = enemyLevel;
		this.enemyDifficulty = enemyDiff;
		this.enemyXp = +(enemyLevel * enemyDiff).toFixed();
		this.enemyMaxHealth = +(enemyLevel * 12 * enemyDiff).toFixed();
		this.enemyDamage = +(enemyLevel * 2.5 * enemyDiff).toFixed();
	}
}

class DungeonEnemy
{
	name;
	health;
	maxHealth;
	damage;
	xp;
	targetTag = "none";
	isBoss = false;

	isAlive()
	{
		if(this.health > 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

const enemyMap = new Map();

enemyMap.set("Rat", new Enemy("Rat", 1, EnemyDifficulty.easy));
enemyMap.set("Big Rat", new Enemy("Big Rat", 3, EnemyDifficulty.medium));
enemyMap.set("Huge Bee", new Enemy("Huge Bee", 2, EnemyDifficulty.easy));
enemyMap.set("Fox", new Enemy("Fox", 4, EnemyDifficulty.easy));
enemyMap.set("Wolf", new Enemy("Wolf", 6, EnemyDifficulty.medium));
enemyMap.set("Bat", new Enemy("Bat", 5, EnemyDifficulty.easy));
enemyMap.set("Scary Bat", new Enemy("Scary Bat", 8, EnemyDifficulty.easy));
enemyMap.set("Guard Dog", new Enemy("Guard Dog", 7, EnemyDifficulty.easy));
enemyMap.set("Bandit Grunt", new Enemy("Bandit Grunt", 9, EnemyDifficulty.medium));
enemyMap.set("Bandit Leader", new Enemy("Bandit Leader", 11, EnemyDifficulty.hard));
enemyMap.set("Kobold Scout", new Enemy("Kobold Scout", 12, EnemyDifficulty.easy));
enemyMap.set("Kobold Warrior", new Enemy("Kobold Warrior", 14, EnemyDifficulty.medium));
enemyMap.set("Kobold Shaman", new Enemy("Kobold Shaman", 15, EnemyDifficulty.hard));
enemyMap.set("Mountain Goat", new Enemy("Mountain Goat", 15, EnemyDifficulty.easy));
enemyMap.set("Snow Wolf", new Enemy("Snow Wolf", 18, EnemyDifficulty.medium));
enemyMap.set("Stone Golem", new Enemy("Stone Golem", 22, EnemyDifficulty.hard));
enemyMap.set("Skeleton Warrior", new Enemy("Skeleton Warrior", 20, EnemyDifficulty.easy));
enemyMap.set("Plague Rat", new Enemy("Plague Rat", 23, EnemyDifficulty.medium));
enemyMap.set("Jungle Spider", new Enemy("Jungle Spider", 25, EnemyDifficulty.medium));
enemyMap.set("Poison Dart Frog", new Enemy("Poison Dart Frog", 28, EnemyDifficulty.medium));
enemyMap.set("Temple Guardian", new Enemy("Temple Guardian", 33, EnemyDifficulty.hard));
enemyMap.set("Swamp Lurker", new Enemy("Swamp Lurker", 27, EnemyDifficulty.easy));
enemyMap.set("Drowned Zombie", new Enemy("Drowned Zombie", 30, EnemyDifficulty.medium));
enemyMap.set("Haunted Armor", new Enemy("Haunted Armor", 34, EnemyDifficulty.easy));
enemyMap.set("Vampire Thrall", new Enemy("Vampire Thrall", 37, EnemyDifficulty.medium));
enemyMap.set("Castle Wraith", new Enemy("Castle Wraith", 39, EnemyDifficulty.hard));
enemyMap.set("Restless Spirit", new Enemy("Restless Spirit", 37, EnemyDifficulty.medium));
enemyMap.set("Banshee", new Enemy("Banshee", 41, EnemyDifficulty.very_hard));
enemyMap.set("Sand Scorpion", new Enemy("Sand Scorpion", 42, EnemyDifficulty.easy));
enemyMap.set("Desert Bandit", new Enemy("Desert Bandit", 44, EnemyDifficulty.medium));
enemyMap.set("Mummy", new Enemy("Mummy", 45, EnemyDifficulty.hard));
enemyMap.set("Corrupted Dryad", new Enemy("Corrupted Dryad", 44, EnemyDifficulty.medium));
enemyMap.set("Shadow Wolf", new Enemy("Shadow Wolf", 47, EnemyDifficulty.hard));
enemyMap.set("Dark Treant", new Enemy("Dark Treant", 47, EnemyDifficulty.very_hard));
enemyMap.set("Cultist Acolyte", new Enemy("Cultist Acolyte", 25, EnemyDifficulty.easy));
enemyMap.set("Dark Priest", new Enemy("Dark Priest", 32, EnemyDifficulty.easy));
enemyMap.set("Demon Spawn", new Enemy("Demon Spawn", 49, EnemyDifficulty.very_hard));
enemyMap.set("Gladiator", new Enemy("Gladiator", 48, EnemyDifficulty.hard));
enemyMap.set("Arena Beast", new Enemy("Arena Beast", 49, EnemyDifficulty.hard));
enemyMap.set("Champion of the Pit", new Enemy("Champion of the Pit", 50, EnemyDifficulty.very_hard));
enemyMap.set("Minotaur", new Enemy("Minotaur", 50, EnemyDifficulty.very_hard));
enemyMap.set("Stone Gargoyle", new Enemy("Stone Gargoyle", 50, EnemyDifficulty.hard));
enemyMap.set("Labyrinth Watcher", new Enemy("Labyrinth Watcher", 51, EnemyDifficulty.mini_boss));
enemyMap.set("Night Stalker", new Enemy("Night Stalker", 51, EnemyDifficulty.very_hard));
enemyMap.set("Dark Knight", new Enemy("Dark Knight", 50, EnemyDifficulty.hard));
enemyMap.set("Abyssal Beast", new Enemy("Abyssal Beast", 52, EnemyDifficulty.mini_boss));
enemyMap.set("TEST", new Enemy("TEST", 30, EnemyDifficulty.hard));
