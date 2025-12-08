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
						["Sewer Rat", "GobRat", "GobRat", "GobRat", "Sewer Rat", 
							"Sewer Rat", "Sewer Rat"],
						["Sewer Rat", "GobRat", "Boss GobRat", "GobRat", "Sewer Rat", 
							"Vile GobRat"],
					],
					10, 17)
			);
			break;
		case 20:
			dungeonsMap.push(
				new Dungeon("Bandit's Lair",
					[
						["Bandit Thug", "Bandit Hunter", "Bandit Hunter", "Bandit Hunter", "Bandit Thug",
							"Bandit Thug", "Bandit Thug"],
						["Bandit Hunter","Bandit Hunter","Bandit Hunter","Bandit Hunter","Bandit Hunter",
							"Trained Wolf","Slave Driver","Trained Wolf"],
						["Bandit Thug","Slave Driver","Bandit Leader","Slave Driver","Bandit Thug",
							"Bandit Thug","Bandit Thug","Bandit Thug"]
					],
					25, 25)
			);
			break;
		case 25:
			dungeonsMap.push(
				new Dungeon("Poisonous Forest",
					[
						["Poisonous Spider","Forest Slime","Poisonous Spider"],
						["Poisonous Spider","Poisonous Spider","Giant Spider","Poisonous Spider","Poisonous Spider",
							"Poisonous Spider","Poisonous Spider","Poisonous Spider","Poisonous Spider","Poisonous Spider"],
						["Giant Spider","Ogre","Spider Queen"]
					],
					40, 30)
			);
			break;
		case 35:
			dungeonsMap.push(
				new Dungeon("Swamp with Vampires",
					[
						["Toxic Slime","Vampyre Juvinate","Toxic Slime"],
						["Vampyre Juvinate","Vampyre Juvinate","Vampyre Juvinate","Blood Beast"],
						["Blood Beast","Lord Drakan","Blood Beast"]
					],
					49, 37)
			);
			break;
		case 40:
			dungeonsMap.push(
				new Dungeon("Colosseum of Corruption",
					[
						["Skeleton Gladiator","Undead Paladin","Skeleton Gladiator"],
						["Saber-tooth Tiger","War Elephant","War Elephant","War Elephant","Saber-tooth Tiger"],
						["Skeleton Archer","Undead Paladin","Skeleton Archer"],
						["Undead Paladin","Undead Paladin","Nightmare Gladiator","Undead Paladin","Undead Paladin"]
					],
					65, 43)
			);
			break;
		case 45:
			dungeonsMap.push(
				new Dungeon("Crimson Castle",
					[
						["Crimson Guard","Crimson Guard"],
						["Crimson Cavalier","Crimson Cavalier","Crimson Cavalier"],
						["Crimson Guard","Crimson Sharpshooter","Crimson Sharpshooter","Crimson Sharpshooter","Crimson Guard",
							"Crimson Guard","Crimson Guard","Crimson Guard","Crimson Guard","Crimson Guard"],
						["Crimson Paladin","Ruby Golem"]
					],
					74, 47)
			);
			break;
		case 48:
			dungeonsMap.push(
				new Dungeon("Plague City",
					[
						["Rat","Mutated Rat","Mutated Rat","Mutated Rat","Rat",
							"Mutated Rat","Mutated Dog","Mutated Dog","Mutated Rat"],
						["Mutated Dog","Corrupted Citizen","Corrupted Citizen","Mutated Dog"],
						["Corrupted Citizen","Witch","Corrupted Citizen"]
					],
					85, 50)
			);
			break;
		case 50:
			dungeonsMap.push(
				new Dungeon("Tower of Corruption",
					[
						["Coven Witch","Coven Witch","Coven Witch"],
						["Coven Witch","Crimson Sorcerer","Coven Witch"],
						["THE BBG"]
					],
					100, 50)
			);
			break;
		default:
			break;
	}
	dungeonCreateSelectDungeonHtml();
}
