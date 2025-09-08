class Dungeon
{
	constructor(name, monsterNames, averageTeammateItemLevel, dungeonDifficulty, recommendedLevel)
	{
		this.name = name;
		this.enemyWaves = monsterNames; // Should be array 2d of monster names
		this.averageTeammateItemLevel = averageTeammateItemLevel;
		this.dungeonDifficulty = dungeonDifficulty; // Probably will be from 1 to 100, works against player mechanics and gameKnowledge

		this.recommendedLevel = recommendedLevel;
	}
}

const AllyRole = {
	none: "none",
	tank: "tank",
	healer: "healer",
	dps: "dps"
};

class Ally
{
	role = AllyRole.none;
	itemLevel = 1;
	totalExperience = 1;
	currentHealth = 100;
	maxHealth = 100;
}

var dungeonCurrentWave = 0;
var dungeonSelectedDungeonID = 0;
var dungeonGeneratedAllies = new Array();
const dungeonsMap = new Array();

dungeonsMap.push(
	new Dungeon("Testing Dungeon", 
	[
		["Rat", "Rat"],
		["Rat", "Rat", "Fox", "Rat", "Rat"]
	],
	110, 15, 20)
);

function initializeDungeon()
{
	createDungeonsHtml();
	
	$("#dungeonWindow_startDebugDungeon").click(function()
	{
		$("#dungeonWindow_selectDungeon").css("display", "none");
		$("#dungeonWindow_insideDungeon").css("display", "flex");
	})
}

function showDungeonWindow()
{
	$("#dungeonWindow").css("display", "flex");
	$("#dungeonWindow_selectDungeon").css("display", "flex");
	$("#dungeonWindow_insideDungeon").css("display", "none");
}

function hideDungeonWindow()
{
	$("#dungeonWindow").css("display", "none");
}

function createDungeonsHtml()
{
	let numberOfRows = Math.ceil(dungeonsMap.length / 3);
	let nrOfDungeonLocationsAdded = 0;

	for(let i = 0; i < numberOfRows; i++)
	{
		let newRow = document.createElement("div");
		newRow.setAttribute("class", "dungeon_dungeonSelect_Row");

		$("#dungeonWindow_selectDungeon").append(newRow);

		for(let j = 0; j < 3; j++)
		{
			let newLocation = document.createElement("div");
			newLocation.setAttribute("class", "dungeon_dungeonSelect_location");

			if(nrOfDungeonLocationsAdded < player.dungeonStatistics.nrOfUnlockedDungeons && nrOfDungeonLocationsAdded < dungeonsMap.length)
			{
				let divSpace1 = document.createElement("div");
				let divDungeonName = document.createElement("div");
				let divSpace2 = document.createElement("div");
				let divRecommendedILvl = document.createElement("div");
				let divDungeonExperience = document.createElement("div");
				let divSpace3 = document.createElement("div");
				let buttonStartDungeon = document.createElement("button");

				divSpace1.setAttribute("class", "space");
				divDungeonName.setAttribute("style", "font-size: x-large;");
				divDungeonName.textContent = dungeonsMap[i].name;
				divSpace2.setAttribute("class", "space");
				divRecommendedILvl.textContent = "Recommended lvl: 20+";
				divDungeonExperience.textContent = "Experience: 0/100";
				divSpace3.setAttribute("class", "space");
				buttonStartDungeon.textContent = "START";
				buttonStartDungeon.onclick = function()
				{
					$("#dungeonWindow_selectDungeon").css("display", "none");
					$("#dungeonWindow_insideDungeon").css("display", "flex");
					startDungeon(i);
				}

				newLocation.append(divSpace1);
				newLocation.append(divDungeonName);
				newLocation.append(divSpace2);
				newLocation.append(divRecommendedILvl);
				newLocation.append(divDungeonExperience);
				newLocation.append(divSpace3);
				newLocation.append(buttonStartDungeon);

				nrOfDungeonLocationsAdded = nrOfDungeonLocationsAdded + 1;
			}

			newRow.append(newLocation);
		}
	}
}

function dungeonGenerateAlly(allyRole, dungeonID)
{
	let NewAlly = new Ally()

	// Ally Role
	NewAlly.role = allyRole;

	// Ally item level
	rarityPower = 2 + Math.random() * 1.5; // From 2 to 3.5 (magic to mythic)
	const numberOfItems = 5;
	NewAlly.itemLevel = Math.round(dungeonsMap[dungeonID].recommendedLevel * rarityPower * numberOfItems);

	// Ally health
	NewAlly.maxHealth = 100 + (10 * (dungeonsMap[dungeonID].recommendedLevel - 1));

	switch (allyRole)
	{
		case AllyRole.tank:
			NewAlly.maxHealth = NewAlly.maxHealth * 1.5;
			break;
		case AllyRole.healer:
			NewAlly.maxHealth = NewAlly.maxHealth * 0.7;
			break;
		default:
			break;
	}
	NewAlly.maxHealth = Math.round(NewAlly.maxHealth);
	NewAlly.currentHealth = NewAlly.maxHealth;

	// Ally experience in dungeons
	let minimalExperience = 0;
	switch (allyRole)
	{
		case AllyRole.tank:
		case AllyRole.healer:
			minimalExperience = dungeonsMap[dungeonID].dungeonDifficulty * 0.7;
			break;
		case AllyRole.dps:
			minimalExperience = dungeonsMap[dungeonID].dungeonDifficulty * 0.4;
			break;
		default:
			break;
	}
	NewAlly.totalExperience = Math.round(minimalExperience + dungeonsMap[dungeonID].dungeonDifficulty * Math.random());

	return NewAlly;
}

function startDungeon(dungeonID)
{
	dungeonCurrentWave = 0;
	dungeonSelectedDungeonID = dungeonID;

	dungeonGeneratedAllies = new Array();
	dungeonGeneratedAllies.push(dungeonGenerateAlly(AllyRole.tank, dungeonID));
	dungeonGeneratedAllies.push(dungeonGenerateAlly(AllyRole.healer, dungeonID));
	dungeonGeneratedAllies.push(dungeonGenerateAlly(AllyRole.dps, dungeonID));
	dungeonGeneratedAllies.push(dungeonGenerateAlly(AllyRole.dps, dungeonID));
}