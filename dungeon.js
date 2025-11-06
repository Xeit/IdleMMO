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

var bSelectedDungeon = false;
var dungeonPullTimer = 20;
var dungeonCurrentWave = 0;
var dungeonCurrentWaveEnemies = new Array();
var dungeonSelectedDungeonID = 0;
var dungeonGeneratedAllies = new Map();
const dungeonsMap = new Array();

dungeonsMap.push(
	new Dungeon("Testing Dungeon",
		[
			["Rat", "Rat"],
			["Rat", "Rat", "Fox", "Rat", "Rat", "Rat", "Rat"]
		],
		110, 15)
);

function initializeDungeon()
{
	dungeonCreateSelectDungeonHtml();
}

function tickDungeon()
{
	if(bSelectedDungeon)
	{
		if(dungeonTickTankPullTimerFinished())
		{
			dungeonTankLogic();
			dungeonHealerLogic();
			dungeonPlayerLogic();
			dungeonDps2Logic();
			dungeonDps3Logic();
			dungeonEnemiesLogic();
		}
		else
		{
			dungeonHealParty();
		}

		dungeonRefreshAlliesStatus();
		dungeonRefreshAlliesHealth();
	}
}

function showDungeonWindow()
{
	$("#dungeonWindow").css("display", "flex");
	$("#dungeonWindow_selectDungeon").css("display", "flex");
	$("#dungeonWindow_insideDungeon").css("display", "none");
}

function hideDungeonWindow()
{
	bSelectedDungeon = false;
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
					dungeonStartDungeon(i);
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
			enemySquare.setAttribute("id", ("dungeon_enemySquare_" + enemiesAlreadyCreated));
			rowOfEnemies.append(enemySquare);

			let divSpace1 = document.createElement("div");
			divSpace1.setAttribute("class", "space");
			enemySquare.append(divSpace1);

			let enemyName = document.createElement("div");
			enemyName.setAttribute("id", ("dungeon_enemyName_" + enemiesAlreadyCreated));
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
			enemyHealthBarInside.setAttribute("id", ("dungeon_enemyHealth_" + enemiesAlreadyCreated));
			enemyHealthBarOutside.append(enemyHealthBarInside);

			let divSpace3 = document.createElement("div");
			divSpace3.setAttribute("class", "space");
			enemySquare.append(divSpace3);

			let enemyTarget = document.createElement("div");
			enemyTarget.setAttribute("id", ("dungeon_enemyTarget_" + enemiesAlreadyCreated));
			enemyTarget.textContent = "";
			enemySquare.append(enemyTarget);
		}
	}
}

function dungeonRefreshAlliesPower()
{
	$("#dungeon_tankPower").text("POWER: " + dungeonGeneratedAllies.get("tank").itemPower);
	$("#dungeon_healerPower").text("POWER: " + dungeonGeneratedAllies.get("healer").itemPower);
	$("#dungeon_playerPower").text("POWER: " + playerGetTotalItemPower());
	$("#dungeon_dps2Power").text("POWER: " + dungeonGeneratedAllies.get("dps2").itemPower);
	$("#dungeon_dps3Power").text("POWER: " + dungeonGeneratedAllies.get("dps3").itemPower);
}

function dungeonRefreshAlliesHealth()
{
	const tankHealthPercent = (dungeonGeneratedAllies.get("tank").health / dungeonGeneratedAllies.get("tank").maxHealth * 100).toFixed() + "%";
	const healerHealthPercent = (dungeonGeneratedAllies.get("healer").health / dungeonGeneratedAllies.get("healer").maxHealth * 100).toFixed() + "%";
	const playerHealthPercent = (player.health / player.maxHealth * 100).toFixed() + "%";
	const dps2HealthPercent = (dungeonGeneratedAllies.get("dps2").health / dungeonGeneratedAllies.get("dps2").maxHealth * 100).toFixed() + "%";
	const dps3HealthPercent = (dungeonGeneratedAllies.get("dps3").health / dungeonGeneratedAllies.get("dps3").maxHealth * 100).toFixed() + "%";

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

function dungeonRefreshAlliesStatus()
{
	for (const [key, value] of dungeonGeneratedAllies) 
	{
		$("#dungeon_"+key+"Status").removeAttr("class");
		if(value.health <= 0)
		{
			$("#dungeon_"+key+"Status").text("Dead");
		}
		else if(value.health < value.maxHealth && dungeonPullTimer > 0)
		{
			$("#dungeon_"+key+"Status").text("Healing");
		}
		else
		{
			$("#dungeon_"+key+"Status").text("");
			$("#dungeon_"+key+"Status").addClass("space");
		}
	}

	//Same for player character
	$("#dungeon_playerStatus").removeAttr("class");
	if(player.health <= 0)
	{
		$("#dungeon_playerStatus").text("Dead");
	}
	else if(player.health < player.maxHealth && dungeonPullTimer > 0)
	{
		$("#dungeon_playerStatus").text("Healing");
	}
	else
	{
		$("#dungeon_playerStatus").text("");
		$("#dungeon_playerStatus").addClass("space");
	}

	// Tank timer takes priority anyway :,)
	if(dungeonPullTimer > 0)
	{
		$("#dungeon_tankStatus").removeAttr("class");
		$("#dungeon_tankStatus").text("Pull in: " + dungeonPullTimer);
	}
}

function dungeonGenerateAlly(allyTag, allyRole, dungeonID)
{
	let NewAlly = null;
	switch (allyRole)
	{
		case AllyRole.tank:
			NewAlly = new AllyTank();
			break;
		case AllyRole.healer:
			NewAlly = new AllyHealer();
			break;
		default:
			NewAlly = new AllyDPS();
			break;
	}

	// Ally Tag
	NewAlly.tag = allyTag;

	// Ally Role
	NewAlly.role = allyRole;

	// Ally item level
	const rarityPower = 2 + Math.random() * 1.5; // From 2 to 3.5 (magic to mythic)
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

function dungeonStartDungeon(dungeonID)
{
	bSelectedDungeon = true;
	dungeonCurrentWave = 0;
	dungeonSelectedDungeonID = dungeonID;

	dungeonGeneratedAllies = new Map();
	dungeonGeneratedAllies.set("tank", dungeonGenerateAlly("tank", AllyRole.tank, dungeonID));
	dungeonGeneratedAllies.set("healer", dungeonGenerateAlly("healer", AllyRole.healer, dungeonID));
	dungeonGeneratedAllies.set("dps2", dungeonGenerateAlly("dps2", AllyRole.dps, dungeonID));
	dungeonGeneratedAllies.set("dps3", dungeonGenerateAlly("dps3", AllyRole.dps, dungeonID));

	dungeonStartNewWave();
	dungeonCreateEnemiesHtml();
	dungeonRefreshAlliesPower();
	dungeonRefreshAlliesHealth();
}

function dungeonStartNewWave()
{
	dungeonCurrentWaveEnemies = new Array();
	dungeonPullTimer = 20;

	const currentWave = dungeonsMap[dungeonSelectedDungeonID].enemyWaves[dungeonCurrentWave];
	for(let i = 0; i < currentWave.length; i++)
	{
		let newDungeonEnemy = new DungeonEnemy();
		const foundEnemy = enemyMap.get(currentWave[i]);
		newDungeonEnemy.name = foundEnemy.enemyName;
		newDungeonEnemy.maxHealth = foundEnemy.enemyMaxHealth;
		newDungeonEnemy.health = foundEnemy.enemyMaxHealth;
		newDungeonEnemy.damage = foundEnemy.enemyDamage;
		newDungeonEnemy.xp = foundEnemy.xp;

		dungeonCurrentWaveEnemies.push(newDungeonEnemy);
	}

	dungeonCreateEnemiesHtml();
	dungeonRefreshAlliesPower();
}

function dungeonEnemiesSelectTarget()
{
	for(let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
	{
		let numberRolled = Math.random() * 100;
		if(numberRolled < 80)
		{
			dungeonCurrentWaveEnemies[i].targetTag = "tank";
			$("#dungeon_enemyTarget_"+i).text("TARGET: "+"TANK");
		}
		else if(numberRolled < 85)
		{
			dungeonCurrentWaveEnemies[i].targetTag = "healer";
			$("#dungeon_enemyTarget_"+i).text("TARGET: "+"HEALER");
		}
		else if(numberRolled < 90)
		{
			dungeonCurrentWaveEnemies[i].targetTag = "player";
			$("#dungeon_enemyTarget_"+i).text("TARGET: "+"YOU");
		}
		else if(numberRolled < 95)
		{
			dungeonCurrentWaveEnemies[i].targetTag = "dps2";
			$("#dungeon_enemyTarget_"+i).text("TARGET: "+"DPS2");
		}
		else
		{
			dungeonCurrentWaveEnemies[i].targetTag = "dps3";
			$("#dungeon_enemyTarget_"+i).text("TARGET: "+"DPS3");
		}

		// if character dead then change target
		if(dungeonCurrentWaveEnemies[i].targetTag == "player")
		{
			if(player.health <= 0)
			{
				i = i - 1;
			}
		}
		else
		{
			if(dungeonGeneratedAllies.get(dungeonCurrentWaveEnemies[i].targetTag).health <= 0)
			{
				i = i - 1;
			}
		}
	}
}

function dungeonTickTankPullTimerFinished()
{
	let bIsTimerFinished = false;
	if(dungeonPullTimer > 0)
	{
		dungeonPullTimer = dungeonPullTimer - 1;
	}
	else
	{
		bIsTimerFinished = true;
	}
	return bIsTimerFinished;
}

function dungeonHealParty()
{
	for (const [key, value] of dungeonGeneratedAllies) 
	{
		if(value.health < value.maxHealth)
		{
			value.health = value.health + Math.round(value.maxHealth * 0.06);
		}

		if(value.health > value.maxHealth)
		{
			value.health = value.maxHealth;
		}
	}

	//This is for player
	tickHealing();
}

function dungeonTankLogic()
{
	let tankAlly = dungeonGeneratedAllies.get("tank");
	if(tankAlly instanceof AllyTank)
	{
		tankAlly.allyLogic();
	}
}

function dungeonHealerLogic()
{
	// If 4 allies under 50% HP then cast Mass Heal (30% HP)

	// Else cast heal on ally with least amount of HP

}

function dungeonPlayerLogic()
{
	// Fight with random mob... Maybe we could add some sort of strategy mode?
}

function dungeonDps2Logic()
{
	// Fight with random mob
}

function dungeonDps3Logic()
{
	// Fight with random mob
}

function dungeonEnemiesLogic()
{
	// Maybe different functions depending on role of a MOB?

	// Attack here



	// Select targets here
	dungeonEnemiesSelectTarget();
}