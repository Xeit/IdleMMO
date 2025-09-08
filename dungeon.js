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

const AllyRole = {
	none: "none",
	tank: "tank",
	healer: "healer",
	dps: "dps"
};

class Ally
{
	role = AllyRole.none;
	itemPower = 1;
	totalExperience = 1;
	health = 100;
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
		["Rat", "Rat", "Fox", "Rat", "Rat", "Rat", "Rat"]
	],
	110, 15, 20)
);

function initializeDungeon()
{
	dungeonCreateSelectDungeonHtml();
	
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

function dungeonCreateSelectDungeonHtml()
{
	const numberOfRows = Math.ceil(dungeonsMap.length / 3);
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

function dungeonCreateEnemiesHtml()
{
	$("#dungeonWindow_insideDungeon_enemies").empty();

	const currentWave = dungeonsMap[dungeonSelectedDungeonID].enemyWaves[dungeonCurrentWave];
	const numberOfRows = Math.ceil(currentWave.length / 5);
	let enemiesAlreadyCreated = 0;
	
	for(let i = 0; i < numberOfRows; i++)
	{
		let rowOfEnemies = document.createElement("div");
		rowOfEnemies.setAttribute("class", "dungeon_dungeonSelect_Row");
		$("#dungeonWindow_insideDungeon_enemies").append(rowOfEnemies);

		for(let j = 0; j < 5 && enemiesAlreadyCreated < currentWave.length; j++, enemiesAlreadyCreated++)
		{
			let enemySquare = document.createElement("div");
			enemySquare.setAttribute("class", "dungeonWindow_insideDungeon_enemySquare");
			enemySquare.setAttribute("id", ("dungeon_enemySquare_" + j));
			rowOfEnemies.append(enemySquare);

			let divSpace1 = document.createElement("div");
			divSpace1.setAttribute("class", "space");
			enemySquare.append(divSpace1);

			let enemyName = document.createElement("div");
			enemyName.setAttribute("id", ("dungeon_enemyName_" + j));
			enemyName.textContent = currentWave[j];
			enemySquare.append(enemyName);

			let divSpace2 = document.createElement("div");
			divSpace2.setAttribute("class", "space");
			enemySquare.append(divSpace2);

			let enemyHealthBarOutside = document.createElement("div");
			enemyHealthBarOutside.setAttribute("class", "dungeon_hpBarOutside");
			enemySquare.append(enemyHealthBarOutside);

			let enemyHealthBarInside = document.createElement("div");
			enemyHealthBarInside.setAttribute("class", "dungeon_hpBarInside");
			enemyHealthBarInside.setAttribute("id", ("dungeon_enemyHealth_" + j));
			enemyHealthBarOutside.append(enemyHealthBarInside);

			let divSpace3 = document.createElement("div");
			divSpace3.setAttribute("class", "space");
			enemySquare.append(divSpace3);

			let enemyTarget = document.createElement("div");
			enemyTarget.setAttribute("id", ("dungeon_enemyTarget_" + j));
			enemyTarget.textContent = "TARGET: TANK";
			enemySquare.append(enemyTarget);
		}
	}
}

function dungeonRefreshAlliesPower()
{
	$("#dungeon_tankPower").text("POWER: " + dungeonGeneratedAllies[0].itemPower);
	$("#dungeon_healerPower").text("POWER: " + dungeonGeneratedAllies[1].itemPower);
	$("#dungeon_playerPower").text("POWER: " + playerGetTotalItemPower());
	$("#dungeon_dps2Power").text("POWER: " + dungeonGeneratedAllies[2].itemPower);
	$("#dungeon_dps3Power").text("POWER: " + dungeonGeneratedAllies[3].itemPower);
}

function dungeonRefreshAlliesHealth()
{
	const tankHealthPercent = (dungeonGeneratedAllies[0].health / dungeonGeneratedAllies[0].maxHealth * 100).toFixed() + "%";
	const healerHealthPercent = (dungeonGeneratedAllies[1].health / dungeonGeneratedAllies[1].maxHealth * 100).toFixed() + "%";
	const playerHealthPercent = (player.health / player.maxHealth * 100).toFixed() + "%";
	const dps2HealthPercent = (dungeonGeneratedAllies[2].health / dungeonGeneratedAllies[2].maxHealth * 100).toFixed() + "%";
	const dps3HealthPercent = (dungeonGeneratedAllies[3].health / dungeonGeneratedAllies[3].maxHealth * 100).toFixed() + "%";
	
	consoleLogDebug("Tank health: " + tankHealthPercent);
	consoleLogDebug("Healer health: " + healerHealthPercent);
	consoleLogDebug("Player health: " + playerHealthPercent);
	consoleLogDebug("DPS2 health: " + dps2HealthPercent);
	consoleLogDebug("DPS3 health: " + dps3HealthPercent);

	$("#dungeon_tankHealth").css("width", tankHealthPercent);
	$("#dungeon_healerHealth").css("width", healerHealthPercent);
	$("#dungeon_playerHealth").css("width", playerHealthPercent);
	$("#dungeon_dps2Health").css("width", dps2HealthPercent);
	$("#dungeon_dps3Health").css("width", dps3HealthPercent);
}

function dungeonGenerateAlly(allyRole, dungeonID)
{
	let NewAlly = new Ally()

	// Ally Role
	NewAlly.role = allyRole;

	// Ally item level
	rarityPower = 2 + Math.random() * 1.5; // From 2 to 3.5 (magic to mythic)
	const numberOfItems = 5;
	NewAlly.itemPower = Math.round(dungeonsMap[dungeonID].recommendedLevel * rarityPower * numberOfItems);

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
	NewAlly.health = NewAlly.maxHealth;

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

	dungeonCreateEnemiesHtml();
	dungeonRefreshAlliesPower();
	dungeonRefreshAlliesHealth();
}