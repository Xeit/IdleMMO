class Dungeon
{
	constructor(name, monsterNames, dungeonDifficulty, recommendedLevel)
	{
		this.name = name;
		this.enemyWaves = monsterNames; // Should be array 2d of monster names
		this.dungeonDifficulty = dungeonDifficulty; // Probably will be from 1 to 100, works against player mechanics and gameKnowledge

		this.recommendedLevel = recommendedLevel;
	}
}

const dungeonsMap = new Array();

function unlockDungeons(playerLevel)
{
	switch(playerLevel)
	{
		case 12:
			dungeonsMap.push(
				new Dungeon("City Sewers",
					[
						["Sewer Rat", "Goblin Thief", "Sewer Rat"],
						["Sewer Rat", "GobRat", "GobRat", "GobRat", "Sewer Rat", "Sewer Rat", "Sewer Rat"],
						["Sewer Rat", "GobRat", "Boss GobRat", "GobRat", "Sewer Rat", "Vile GobRat"],
					],
					10, 17)
			);
			break;
		case 20:
			dungeonsMap.push(
				new Dungeon("Bandit's Lair",
					[
						["Big Rat", "Big Rat", "Fox", "Big Rat", "Big Rat"],
						["Huge Bee", "Huge Bee", "Fox", "Huge Bee", "Huge Bee", "Huge Bee"]
					],
					25, 25)
			);
			break;
		case 25:
			dungeonsMap.push(
				new Dungeon("Poisonous Forest",
					[
						["Rat"],
						["Rat"]
					],
					40, 30)
			);
			break;
		case 35:
			dungeonsMap.push(
				new Dungeon("Swamp with Vampires",
					[
						["Rat"],
						["Rat"]
					],
					49, 37)
			);
			break;
		case 40:
			dungeonsMap.push(
				new Dungeon("Colosseum of Corruption",
					[
						["Rat"],
						["Rat"]
					],
					65, 43)
			);
			break;
		case 45:
			dungeonsMap.push(
				new Dungeon("Crimson Castle",
					[
						["Rat"],
						["Rat"]
					],
					74, 47)
			);
			break;
		case 48:
			dungeonsMap.push(
				new Dungeon("Plague City",
					[
						["Rat"],
						["Rat"]
					],
					85, 50)
			);
			break;
		case 50:
			dungeonsMap.push(
				new Dungeon("Tower of Corruption",
					[
						["Rat"],
						["Rat"]
					],
					100, 50)
			);
			break;
		default:
			break;
	}
	dungeonCreateSelectDungeonHtml();
}
