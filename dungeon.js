var bSelectedDungeon = false;
var dungeonPullTimer = 20;
var dungeonCurrentWave = 0;
var dungeonCurrentWaveEnemies = new Array();
var dungeonSelectedDungeonID = 0;
var dungeonGeneratedAllies = new Map();
function initializeDungeon()
{
	dungeonCreateSelectDungeonHtml();
}

function tickDungeon()
{
	if (bSelectedDungeon)
	{
		if (dungeonTickTankPullTimerFinished())
		{
			dungeonGeneratedAllies.forEach(ally =>
			{
				if (ally instanceof Ally)
				{
					ally.allyLogic();
				}
			});

			dungeonPlayerLogic();
			dungeonEnemiesLogic();
			dungeonCheckWaveEnd();
		}
		else
		{
			dungeonHealParty();
		}

		dungeonRefreshAlliesStatus();
		dungeonRefreshAlliesHealth();
		dungeonRefreshEnemiesHealth();
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
	$("#dungeonWindow_selectDungeon").empty();

	const numberOfRows = Math.ceil(dungeonsMap.length / 3);
	let nrOfDungeonLocationsAdded = 0;

	for (let i = 0; i < numberOfRows; i++)
	{
		let newRow = document.createElement("div");
		newRow.setAttribute("class", "dungeon_dungeonSelect_Row");

		$("#dungeonWindow_selectDungeon").append(newRow);

		for (let j = 0; j < 3; j++)
		{
			let newLocation = document.createElement("div");
			newLocation.setAttribute("class", "dungeon_dungeonSelect_location");

			if (nrOfDungeonLocationsAdded < dungeonsMap.length)
			{
				let divSpace1 = document.createElement("div");
				let divDungeonName = document.createElement("div");
				let divSpace2 = document.createElement("div");
				let divRecommendedILvl = document.createElement("div");
				let divDungeonExperience = document.createElement("div");
				let divSpace3 = document.createElement("div");
				let divSpace4 = document.createElement("div");
				let buttonStartDungeon = document.createElement("button");

				divSpace1.setAttribute("class", "space");
				divSpace4.setAttribute("class", "space");
				divDungeonName.setAttribute("style", "font-size: x-large;");
				divDungeonName.textContent = dungeonsMap[i * 3 + j].name;
				divSpace2.setAttribute("class", "space");
				divRecommendedILvl.textContent = "Recommended lvl: " + dungeonsMap[i * 3 + j].recommendedLevel + "+";
				// TODO: One day this will be implemented
				//divDungeonExperience.textContent = "Experience: 0/100";
				divSpace3.setAttribute("class", "space");
				buttonStartDungeon.textContent = "START";
				buttonStartDungeon.onclick = function ()
				{
					$("#dungeonWindow_selectDungeon").css("display", "none");
					$("#dungeonWindow_insideDungeon").css("display", "flex");
					dungeonStartDungeon(i * 3 + j);
				}

				newLocation.append(divSpace1);
				newLocation.append(divSpace4);
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

	for (let i = 0; i < numberOfRows; i++)
	{
		let rowOfEnemies = document.createElement("div");
		rowOfEnemies.setAttribute("class", "dungeon_dungeonSelect_Row");
		$("#dungeonWindow_insideDungeon_enemies").append(rowOfEnemies);

		for (let j = 0; j < 5 && enemiesAlreadyCreated < currentWave.length; j++, enemiesAlreadyCreated++)
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

			let enemySquareSpacer = document.createElement("div");
			enemySquareSpacer.style.width = "2px";
			rowOfEnemies.append(enemySquareSpacer);
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

	consoleLogDebug("Tank health: " + tankHealthPercent, "debugDungeon");
	consoleLogDebug("Healer health: " + healerHealthPercent, "debugDungeon");
	consoleLogDebug("Player health: " + playerHealthPercent, "debugDungeon");
	consoleLogDebug("DPS2 health: " + dps2HealthPercent, "debugDungeon");
	consoleLogDebug("DPS3 health: " + dps3HealthPercent, "debugDungeon");

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
		$("#dungeon_" + key + "Status").removeAttr("class");
		if (value.health <= 0)
		{
			$("#dungeon_" + key + "Status").text("Dead");
		}
		else if (value.health < value.maxHealth && dungeonPullTimer > 0)
		{
			$("#dungeon_" + key + "Status").text("Healing");
		}
		else
		{
			$("#dungeon_" + key + "Status").text("");
			$("#dungeon_" + key + "Status").addClass("space");
		}
	}

	//Same for player character
	$("#dungeon_playerStatus").removeAttr("class");
	if (player.health <= 0)
	{
		$("#dungeon_playerStatus").text("Dead");
	}
	else if (player.health < player.maxHealth && dungeonPullTimer > 0)
	{
		$("#dungeon_playerStatus").text("Healing");
	}
	else
	{
		$("#dungeon_playerStatus").text("");
		$("#dungeon_playerStatus").addClass("space");
	}

	// Tank timer takes priority anyway :,)
	if (dungeonPullTimer > 0)
	{
		$("#dungeon_tankStatus").removeAttr("class");
		$("#dungeon_tankStatus").text("Pull in: " + dungeonPullTimer);
	}
}

function dungeonRefreshEnemiesHealth()
{
	for (let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
	{
		let healthPercent = (dungeonCurrentWaveEnemies[i].health / dungeonCurrentWaveEnemies[i].maxHealth * 100);

		healthPercent = Math.max(0, Math.min(100, healthPercent));
		const enemyHealthPercent = healthPercent.toFixed() + "%";

		consoleLogDebug("Enemy " + i + " health: " + dungeonCurrentWaveEnemies[i].health + "/" + dungeonCurrentWaveEnemies[i].maxHealth + " = " + enemyHealthPercent, "debugDungeon");

		$("#dungeon_enemyHealth_" + i).css("width", enemyHealthPercent);
	}
}

function dungeonGenerateAlly(allyTag, allyRole, dungeonID)
{
	const dungeon = dungeonsMap[dungeonID];

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
	let rarityPower = 2 + Math.random() * 1.2; // From 2 to 3.2 (magic to under mythic)

	if (dungeon.dungeonDifficulty >= 75)
	{
		rarityPower = 3.5 + Math.random() * 1.5; // From 3.5 to 5 (mythic to legendary)
	}
	else if (dungeon.dungeonDifficulty >= 50)
	{
		rarityPower = 2.8 + Math.random() * 1; // From 2.8 to 3.8 (above rare to above mythic)
	}
	else if (dungeon.dungeonDifficulty >= 25)
	{
		rarityPower = 2.5 + Math.random() * 1; // From 2.5 to 3.5 (rare to mythic)
	}

	const numberOfItems = 5;
	NewAlly.itemPower = Math.round(dungeon.recommendedLevel * rarityPower * numberOfItems);

	// Ally health
	NewAlly.maxHealth = 100 + (10 * (dungeon.recommendedLevel - 1));

	switch (allyRole)
	{
		case AllyRole.tank:
			NewAlly.maxHealth = NewAlly.maxHealth * 2.5;
			break;
		case AllyRole.healer:
			NewAlly.maxHealth = NewAlly.maxHealth * 0.8;
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
			minimalExperience = dungeon.dungeonDifficulty * 0.7;
			break;
		case AllyRole.dps:
			minimalExperience = dungeon.dungeonDifficulty * 0.4;
			break;
		default:
			break;
	}
	NewAlly.totalExperience = Math.round(minimalExperience + dungeon.dungeonDifficulty * Math.random());

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
	player.dungeonEnemyID = -1;

	const currentWave = dungeonsMap[dungeonSelectedDungeonID].enemyWaves[dungeonCurrentWave];
	for (let i = 0; i < currentWave.length; i++)
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

	dungeonGeneratedAllies.forEach(ally =>
	{
		if (ally instanceof Ally)
		{
			ally.enemyTargetID = -1;
		}
	});

	dungeonCreateEnemiesHtml();
	dungeonRefreshAlliesPower();
}

function dungeonEnemiesSelectTarget()
{
	for (let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
	{
		// Check if current target is dead
		if (dungeonCurrentWaveEnemies[i].targetTag != "none")
		{
			if (dungeonCurrentWaveEnemies[i].targetTag == "player")
			{
				if (player.health <= 0)
				{
					dungeonCurrentWaveEnemies[i].targetTag = "none";
				}
			}
			else
			{
				if (dungeonGeneratedAllies.get(dungeonCurrentWaveEnemies[i].targetTag).health <= 0)
				{
					dungeonCurrentWaveEnemies[i].targetTag = "none";
				}
			}
		}

		function randomPullTarget()
		{
			let numberRolled = Math.random() * 100;
			if (numberRolled < 80)
			{
				dungeonCurrentWaveEnemies[i].targetTag = "tank";
			}
			else if (numberRolled < 85)
			{
				dungeonCurrentWaveEnemies[i].targetTag = "healer";
			}
			else if (numberRolled < 90)
			{
				dungeonCurrentWaveEnemies[i].targetTag = "player";
			}
			else if (numberRolled < 95)
			{
				dungeonCurrentWaveEnemies[i].targetTag = "dps2";
			}
			else
			{
				dungeonCurrentWaveEnemies[i].targetTag = "dps3";
			}
		}

		if (dungeonCurrentWaveEnemies[i].targetTag == "none")
		{
			// This is target select before pull of wave
			randomPullTarget();

			// if character dead then change target
			let bCharacterDead = true;
			let numberOfTries = 0;
			while(bCharacterDead)
			{
				randomPullTarget();

				if (dungeonCurrentWaveEnemies[i].targetTag == "player")
				{
					if (player.health > 0)
					{
						bCharacterDead = false;
					}
				}
				else
				{
					if (dungeonGeneratedAllies.get(dungeonCurrentWaveEnemies[i].targetTag).isAlive())
					{
						bCharacterDead = false;
					}
				}

				numberOfTries = numberOfTries + 1;
				if(numberOfTries > 5)
				{
					//Target first not dead or give up
					dungeonGeneratedAllies.forEach(ally =>
					{
						if (ally instanceof Ally)
						{
							if(ally.isAlive())
							{
								dungeonCurrentWaveEnemies[i].targetTag = ally.tag;
							}
						}
					});

					bCharacterDead = false;
				}
			}
		}
		else
		{
			// You need to check if one of the heroes is targetting the enemy 
			// then roll the chance for swapping target for that ally
			// if heroes attacking the enemy was a tank then there should be 100% to swap

			// also somehow there should be always be a chance for starting to attack healer.
			
			let bSwappedTarget = false;
			dungeonGeneratedAllies.forEach(ally => 
			{
				if (!bSwappedTarget && ally.isAlive() && ally.enemyTargetID == i)
				{
					if (ally.role == AllyRole.tank)
					{
						dungeonCurrentWaveEnemies[i].targetTag = ally.tag;
						bSwappedTarget = true;
					}
					else
					{
						if ((Math.random() * 100) < 20)
						{
							dungeonCurrentWaveEnemies[i].targetTag = ally.tag;
							bSwappedTarget = true;
						}
					}
				}
			});

			if (!bSwappedTarget)
			{
				const randomRoll = Math.random() * 100;

				if (randomRoll < 5)
				{
					//Target healer
					dungeonGeneratedAllies.forEach(ally =>
					{
						if (ally.role == AllyRole.healer)
						{
							dungeonCurrentWaveEnemies[i].targetTag = ally.tag;
						}
					});
				}
				else if (randomRoll < 10)
				{
					//Target any1
					const newTarget = Math.round(Math.random() * (dungeonGeneratedAllies.size - 1));
					let currentAllyID = 0;
					dungeonGeneratedAllies.forEach(ally =>
					{
						if (ally instanceof Ally)
						{
							if (newTarget == currentAllyID)
							{
								dungeonCurrentWaveEnemies[i].targetTag = ally.tag;
							}
							else
							{
								currentAllyID = currentAllyID + 1;
							}
						}
					});
				}
			}
		}

		if(dungeonCurrentWaveEnemies[i].targetTag !== undefined)
		{
			$("#dungeon_enemyTarget_" + i).text("TARGET: " + dungeonCurrentWaveEnemies[i].targetTag.toUpperCase());
		}
	}
}

function dungeonTickTankPullTimerFinished()
{
	let bIsTimerFinished = false;
	if (dungeonPullTimer > 0)
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
		if (value.health < value.maxHealth)
		{
			value.health = value.health + Math.round(value.maxHealth * 0.08);
		}

		if (value.health > value.maxHealth)
		{
			value.health = value.maxHealth;
		}
	}

	//This is for player
	tickHealing();
}

function dungeonEnemiesLogic()
{
	// Maybe different functions depending on role of a MOB?

	// Attack here
	dungeonEnemiesAttack();


	// Select targets here
	dungeonEnemiesSelectTarget();
}

function dungeonEnemiesAttack()
{
	for (let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
	{
		if (dungeonCurrentWaveEnemies[i].isAlive())
		{
			if (dungeonCurrentWaveEnemies[i].targetTag == "player")
			{
				if (player.health > 0)
				{
					playerTakeDamage(dungeonCurrentWaveEnemies[i].damage);
				}
			}
			else if (dungeonCurrentWaveEnemies[i].targetTag != "none")
			{
				let targetAlly = dungeonGeneratedAllies.get(dungeonCurrentWaveEnemies[i].targetTag);
				if (targetAlly.health > 0)
				{
					targetAlly.health = targetAlly.health - dungeonCurrentWaveEnemies[i].damage;
				}
			}
		}
	}
}

function dungeonPlayerLogic()
{
	if (player.dungeonEnemyID == -1 || !dungeonCurrentWaveEnemies[player.dungeonEnemyID].isAlive())
	{
		dungeonPlayerFindTarget();
	}
	dungeonPlayerHitEnemy();
}

function dungeonPlayerFindTarget()
{
	let bossID = -1;
	let targetedHealerID = -1;

	for (let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
	{
		if (dungeonCurrentWaveEnemies[i].isAlive())
		{
			if (dungeonCurrentWaveEnemies[i].targetTag == "player")
			{
				player.dungeonEnemyID = i;
				return;
			}

			if (dungeonCurrentWaveEnemies[i].isBoss)
			{
				bossID = i;
			}
		}
	}

	if (bossID != -1)
	{
		player.dungeonEnemyID = bossID;
	}

	if (player.dungeonEnemyID != -1)
	{
		// We got one of the preferred targets, we can return.
		return;
	}
	else
	{
		// We select random target. We try to get alive target 3 times then we just take first alive.
		for (let i = 0; i < 3; i++)
		{
			let randomEnemyID = Math.round(Math.random() * (dungeonCurrentWaveEnemies.length - 1));
			if (dungeonCurrentWaveEnemies[randomEnemyID].isAlive())
			{
				player.dungeonEnemyID = randomEnemyID;
				return;
			}
		}

		for (let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
		{
			if (dungeonCurrentWaveEnemies[i].isAlive())
			{
				player.dungeonEnemyID = i;
				return;
			}
		}
	}
}

function dungeonPlayerHitEnemy()
{
	consoleLogDebug("Enemy targeted by Player ID: " + player.dungeonEnemyID, "debugDungeon");
	if (player.dungeonEnemyID != -1 && dungeonCurrentWaveEnemies[player.dungeonEnemyID].isAlive())
	{
		consoleLogDebug("Enemy health before player attack: " + dungeonCurrentWaveEnemies[player.dungeonEnemyID].health, "debugDungeon");
		dungeonCurrentWaveEnemies[player.dungeonEnemyID].health = dungeonCurrentWaveEnemies[player.dungeonEnemyID].health - playerGetAttackDamage(player.level);
		consoleLogDebug("Enemy health after player attack: " + dungeonCurrentWaveEnemies[player.dungeonEnemyID].health, "debugDungeon");
	}
}

function dungeonCheckWaveEnd()
{
	let bAllEnemiesDead = true;
	for (let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
	{
		if(dungeonCurrentWaveEnemies[i].isAlive())
		{
			bAllEnemiesDead = false;
			break;
		}
	}

	if (bAllEnemiesDead)
	{
		dungeonCurrentWave++;
		if (dungeonCurrentWave < dungeonsMap[dungeonSelectedDungeonID].enemyWaves.length)
		{
			dungeonStartNewWave();
		}
		else
		{
			dungeonReceiveRewards();
			hideDungeonWindow();
			newPlayerTask(PlayerTasks.none);
		}
	}
}

function dungeonReceiveRewards()
{
	const dungeon = dungeonsMap[dungeonSelectedDungeonID];
	let rewardDifficulty = EnemyDifficulty.hard;

	if (dungeon.dungeonDifficulty >= 75)
	{
		rewardDifficulty = EnemyDifficulty.boss;
	}
	else if (dungeon.dungeonDifficulty >= 50)
	{
		rewardDifficulty = EnemyDifficulty.mini_boss;
	}
	else if (dungeon.dungeonDifficulty >= 25)
	{
		rewardDifficulty = EnemyDifficulty.very_hard;
	}

	// Generate 2 items bcs why not?
	for(let i = 0; i < 2; i++)
	{
		const newItem = generateItem(dungeon.recommendedLevel, rewardDifficulty);
		
		consoleLogDebug("Dungeon Finished! Reward: " + newItem.itemName);
		
		if(tryNewItem(newItem))
		{
			consoleLogDebug("Equipped new item!");
		}
		else
		{
			consoleLogDebug("Item discarded.");
		}
	}
}
