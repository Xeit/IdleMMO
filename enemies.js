const EnemyDifficulty =
{
	easy: 1,
	medium: 1.5,
	hard: 2,
	very_hard: 2.5,
	mini_boss: 4,
	boss: 8
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
		this.enemyDamage = +(enemyLevel * 2 * enemyDiff).toFixed();
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

//Monster Zones
enemyMap.set("Rat", new Enemy("Rat", 1, EnemyDifficulty.easy));
enemyMap.set("Big Rat", new Enemy("Big Rat", 4, EnemyDifficulty.easy));

enemyMap.set("Huge Bee", new Enemy("Huge Bee", 2, EnemyDifficulty.easy));
enemyMap.set("Fox", new Enemy("Fox", 7, EnemyDifficulty.easy));
enemyMap.set("Wolf", new Enemy("Wolf", 5, EnemyDifficulty.medium));

enemyMap.set("Bat", new Enemy("Bat", 5, EnemyDifficulty.easy));
enemyMap.set("Scary Bat", new Enemy("Scary Bat", 7, EnemyDifficulty.medium));

enemyMap.set("Guard Dog", new Enemy("Guard Dog", 7, EnemyDifficulty.easy));
enemyMap.set("Bandit Grunt", new Enemy("Bandit Grunt", 9, EnemyDifficulty.medium));
enemyMap.set("Bandit Leader", new Enemy("Bandit Leader", 11, EnemyDifficulty.medium));

enemyMap.set("Kobold Scout", new Enemy("Kobold Scout", 12, EnemyDifficulty.medium));
enemyMap.set("Kobold Warrior", new Enemy("Kobold Warrior", 14, EnemyDifficulty.medium));
enemyMap.set("Kobold Shaman", new Enemy("Kobold Shaman", 15, EnemyDifficulty.medium));

enemyMap.set("Mountain Goat", new Enemy("Mountain Goat", 15, EnemyDifficulty.medium));
enemyMap.set("Stone Golem", new Enemy("Stone Golem", 17, EnemyDifficulty.hard));
enemyMap.set("Snow Wolf", new Enemy("Snow Wolf", 20, EnemyDifficulty.medium));

enemyMap.set("Skeleton Warrior", new Enemy("Skeleton Warrior", 20, EnemyDifficulty.medium));
enemyMap.set("Plague Rat", new Enemy("Plague Rat", 23, EnemyDifficulty.hard));

enemyMap.set("Jungle Spider", new Enemy("Jungle Spider", 25, EnemyDifficulty.medium));
enemyMap.set("Poison Dart Frog", new Enemy("Poison Dart Frog", 27, EnemyDifficulty.hard));
enemyMap.set("Temple Guardian", new Enemy("Temple Guardian", 30, EnemyDifficulty.hard));

enemyMap.set("Swamp Lurker", new Enemy("Swamp Lurker", 27, EnemyDifficulty.hard));
enemyMap.set("Drowned Zombie", new Enemy("Drowned Zombie", 31, EnemyDifficulty.hard));

enemyMap.set("Haunted Armor", new Enemy("Haunted Armor", 32, EnemyDifficulty.hard));
enemyMap.set("Vampire Thrall", new Enemy("Vampire Thrall", 35, EnemyDifficulty.hard));
enemyMap.set("Castle Wraith", new Enemy("Castle Wraith", 37, EnemyDifficulty.hard));

enemyMap.set("Restless Spirit", new Enemy("Restless Spirit", 37, EnemyDifficulty.very_hard));
enemyMap.set("Banshee", new Enemy("Banshee", 41, EnemyDifficulty.hard));

enemyMap.set("Sand Scorpion", new Enemy("Sand Scorpion", 42, EnemyDifficulty.hard));
enemyMap.set("Desert Bandit", new Enemy("Desert Bandit", 45, EnemyDifficulty.hard));
enemyMap.set("Mummy", new Enemy("Mummy", 43, EnemyDifficulty.very_hard));

enemyMap.set("Corrupted Dryad", new Enemy("Corrupted Dryad", 44, EnemyDifficulty.hard));
enemyMap.set("Shadow Wolf", new Enemy("Shadow Wolf", 47, EnemyDifficulty.hard));
enemyMap.set("Dark Treant", new Enemy("Dark Treant", 47, EnemyDifficulty.very_hard));

enemyMap.set("Cultist Acolyte", new Enemy("Cultist Acolyte", 46, EnemyDifficulty.hard));
enemyMap.set("Dark Priest", new Enemy("Dark Priest", 48, EnemyDifficulty.very_hard));
enemyMap.set("Demon Spawn", new Enemy("Demon Spawn", 49, EnemyDifficulty.very_hard));

enemyMap.set("Gladiator", new Enemy("Gladiator", 48, EnemyDifficulty.very_hard));
enemyMap.set("Arena Beast", new Enemy("Arena Beast", 49, EnemyDifficulty.very_hard));
enemyMap.set("Champion of the Pit", new Enemy("Champion of the Pit", 50, EnemyDifficulty.very_hard));

enemyMap.set("Minotaur", new Enemy("Minotaur", 50, EnemyDifficulty.very_hard));
enemyMap.set("Stone Gargoyle", new Enemy("Stone Gargoyle", 50, EnemyDifficulty.very_hard));
enemyMap.set("Labyrinth Watcher", new Enemy("Labyrinth Watcher", 51, EnemyDifficulty.mini_boss));

enemyMap.set("Night Stalker", new Enemy("Night Stalker", 51, EnemyDifficulty.very_hard));
enemyMap.set("Dark Knight", new Enemy("Dark Knight", 50, EnemyDifficulty.very_hard));
enemyMap.set("Abyssal Beast", new Enemy("Abyssal Beast", 52, EnemyDifficulty.mini_boss));

// Dungeon enemies
enemyMap.set("TEST", new Enemy("TEST", 15, EnemyDifficulty.hard));

// City Sewers - 17
enemyMap.set("Sewer Rat", new Enemy("Sewer Rat", 15, EnemyDifficulty.medium));
enemyMap.set("Goblin Thief", new Enemy("Goblin Thief", 17, EnemyDifficulty.medium));
enemyMap.set("GobRat", new Enemy("GobRat", 18, EnemyDifficulty.hard));
enemyMap.set("Vile GobRat", new Enemy("Vile GobRat", 18, EnemyDifficulty.hard));
enemyMap.set("Boss GobRat", new Enemy("Boss GobRat", 18, EnemyDifficulty.very_hard));

// Bandit's Lair - 25
enemyMap.set("Bandit Thug", new Enemy("Bandit Thug", 22, EnemyDifficulty.medium));
enemyMap.set("Bandit Hunter", new Enemy("Bandit Hunter", 23, EnemyDifficulty.medium));
enemyMap.set("Trained Wolf", new Enemy("Trained Wolf", 21, EnemyDifficulty.hard));
enemyMap.set("Slave Driver", new Enemy("Slave Driver", 24, EnemyDifficulty.very_hard));
enemyMap.set("Bandit Leader", new Enemy("Bandit Leader", 26, EnemyDifficulty.very_hard));

// Poisonous Forest - 30
enemyMap.set("Forest Slime", new Enemy("Forest Slime", 28, EnemyDifficulty.medium));
enemyMap.set("Poisonous Spider", new Enemy("Poisonous Spider", 32, EnemyDifficulty.easy));
enemyMap.set("Giant Spider", new Enemy("Giant Spider", 30, EnemyDifficulty.hard));
enemyMap.set("Ogre", new Enemy("Ogre", 32, EnemyDifficulty.very_hard));
enemyMap.set("Spider Queen", new Enemy("Spider Queen", 30, EnemyDifficulty.mini_boss));

// Swamp with Vampires - 37
enemyMap.set("Toxic Slime", new Enemy("Toxic Slime", 36, EnemyDifficulty.hard));
enemyMap.set("Vampyre Juvinate", new Enemy("Vampyre Juvinate", 38, EnemyDifficulty.very_hard));
enemyMap.set("Blood Beast", new Enemy("Blood Beast", 37, EnemyDifficulty.mini_boss));
enemyMap.set("Lord Drakan", new Enemy("Lord Drakan", 40, EnemyDifficulty.mini_boss));

// Colosseum of Corruption - 43
enemyMap.set("Skeleton Gladiator", new Enemy("Skeleton Gladiator", 41, EnemyDifficulty.hard));
enemyMap.set("War Elephant", new Enemy("War Elephant", 42, EnemyDifficulty.very_hard));
enemyMap.set("Saber-tooth Tiger", new Enemy("Saber-tooth Tiger", 41, EnemyDifficulty.very_hard));
enemyMap.set("Undead Paladin", new Enemy("Undead Paladin", 46, EnemyDifficulty.hard));
enemyMap.set("Nightmare Gladiator", new Enemy("Nightmare Gladiator", 47, EnemyDifficulty.very_hard));
enemyMap.set("Skeleton Archer", new Enemy("Skeleton Archer", 46, EnemyDifficulty.very_hard));

// Crimson Castle - 48
enemyMap.set("Crimson Guard", new Enemy("Crimson Guard", 48, EnemyDifficulty.medium));
enemyMap.set("Crimson Cavalier", new Enemy("Crimson Cavalier", 49, EnemyDifficulty.very_hard));
enemyMap.set("Crimson Sharpshooter", new Enemy("Crimson Sharpshooter", 50, EnemyDifficulty.very_hard));
enemyMap.set("Crimson Paladin", new Enemy("Crimson Paladin", 50, EnemyDifficulty.mini_boss));
enemyMap.set("Ruby Golem", new Enemy("Ruby Golem", 51, EnemyDifficulty.mini_boss));

// Plague City - 50
enemyMap.set("Mutated Rat", new Enemy("Mutated Rat", 50, EnemyDifficulty.very_hard));
enemyMap.set("Mutated Dog", new Enemy("Mutated Dog", 51, EnemyDifficulty.very_hard));
enemyMap.set("Corrupted Citizen", new Enemy("Corrupted Citizen", 49, EnemyDifficulty.mini_boss));
enemyMap.set("Witch", new Enemy("Witch", 50, EnemyDifficulty.boss));

// Tower of Corruption - 50+
enemyMap.set("Coven Witch", new Enemy("Coven Witch", 48, EnemyDifficulty.mini_boss));
enemyMap.set("Crimson Sorcerer", new Enemy("Crimson Sorcerer", 50, EnemyDifficulty.boss));
enemyMap.set("THE BBEG", new Enemy("THE BBEG", 75, EnemyDifficulty.boss));
enemyMap.get("THE BBEG").maxHealth = enemyMap.get("THE BBEG").maxHealth * 6;