var bIsInBattle = false;
var bIsEnemyAlive = false;

var enemyName = "Rat";
var enemyHealth = 10;
var enemyMaxHealth = 10;
var enemyDamage = 4;
var enemyLevel = 1;
var enemyXp = 1;
var enemyDifficulty = EnemyDifficulty.easy;

var currentZone = null;
var monsterCritOpacity = 0;
const monsterCritOpacityDecay = 0.07;
var itemDroppedOpacity = 0;
const itemDroppedOpacityDecay = 0.02;

function initializeBattle()
{
	for(var i = 0; i < battleZonesMap.length; i++)
	{
		//Please do not question this code, it's verbdose but it was late and I was drunk. :>

		let newZone = document.createElement("div");
		newZone.setAttribute("class", "battle_window_select_zone_element");

		let zoneName = document.createElement("span");
		zoneName.style.cssText = "width: 45%; display: flex; justify-content: center;";
		newZone.append(zoneName);

		let zoneNameText = document.createElement("div");
		zoneNameText.textContent = battleZonesMap[i].zoneName.toUpperCase();
		zoneName.append(zoneNameText);

		let levelInfo = document.createElement("span");
		levelInfo.textContent = battleZonesMap[i].levelsRange.toUpperCase();
		levelInfo.style.cssText = "width: 30%; display: flex; justify-content: center;";
		newZone.append(levelInfo);

		let clickableButton = document.createElement("span");
		clickableButton.style.cssText = "width: 25%; display: flex; justify-content: center;";
		newZone.append(clickableButton);

		let buttonDiv = document.createElement("div");
		clickableButton.append(buttonDiv);

		let buttonItself = document.createElement("button");
		let buttonId = battleZonesMap[i].zoneName + "Button";
		buttonItself.setAttribute("id", buttonId);
		buttonItself.textContent = "SELECT";
		buttonItself.setAttribute("zoneId", i);
		buttonDiv.append(buttonItself);

		buttonItself.onclick = function()
		{
			currentZone = battleZonesMap[buttonItself.getAttribute("zoneID")];
			switchToBattleWindow();
		};
		
		$("#select_zone_scrolling_list").append(newZone);

		$("#battle_window_stop_battle").click(function(){
			stopBattle();
			ShowBattleWindow();
			updateBattleHealth();
		})
	}
}

function tickBattle()
{
	if(bIsInBattle)
	{
		if(bIsEnemyAlive)
		{
			hitEnemy();
			if(bIsEnemyAlive)
			{
				playerTakeDamage(enemyDamage);
			}
			updateBattleHealth();
		}
		else
		{
			getNewEnemy();
		}
	}
}

function ShowBattleWindow()
{
	$("#battle_window").css("display", "flex");
	if(bIsInBattle == true)
	{
		$("#battle_window_battle").css("display", "flex");
		$("#battle_window_select_zone").css("display", "none");
	}
	else
	{
		$("#battle_window_battle").css("display", "none");
		$("#battle_window_select_zone").css("display", "flex");
	}
}

function HideBattleWindow()
{
	$("#battle_window").css("display", "none");
}

function stopBattle()
{
	bIsInBattle = false;
	bIsEnemyAlive = false;
	currentZone = null;
}

function startBattle()
{
	updateBattleHealth();
}

function getNewEnemy()
{
	var nextEnemy = null;
	if(currentZone != null)
	{
		var nextEnemy = getRandomMonsterFromBattleZone(currentZone);
	}

	if(nextEnemy != null)
	{
		enemyName = nextEnemy.enemyName;
		enemyMaxHealth = nextEnemy.enemyMaxHealth;
		enemyDamage = nextEnemy.enemyDamage;
		enemyLevel = nextEnemy.enemyLevel;
		enemyXp = nextEnemy.enemyXp;
		enemyDifficulty = nextEnemy.enemyDifficulty;

		$("#monster_battle_name").text(enemyName);
		enemyHealth = +enemyMaxHealth;
		bIsEnemyAlive = true;

		updateBattleHealth();
		updatePlayerInfo();
		updateMonsterInfo();
		DisplayCritChanceUI(enemyLevel);

		$("#battle_looking_for_enemy").css("display", "none");
		$("#battle_window_monster_data").css("display", "block");
	}
}

function hitEnemy()
{
	var playerDamage = playerGetAttackDamage(enemyLevel);
	
	enemyHealth -= +playerDamage;

	//Kill enemy
	if(enemyHealth <= 0)
	{
		bIsEnemyAlive = false;

		if(playerLevel > enemyLevel)
		{
			const levelDifference = playerLevel - enemyLevel;
			if(levelDifference < 10)
			{
				const xpPenaltyMultiplier = levelDifference * 0.1;
				const xpToAddAfterPenalty = enemyXp * (1 - xpPenaltyMultiplier);
				addPlayerXp(xpToAddAfterPenalty);
			}
		}
		else
		{
			addPlayerXp(enemyXp);
		}

		//Item drop
		var generatedNewItem = new Item();
		generatedNewItem = generateItem(enemyLevel, enemyDifficulty);
		var bGotNewItem = tryNewItem(generatedNewItem);
		updateEquipmentWindow();

		if(bGotNewItem)
		{
			UIItemDropped(generatedNewItem);
		}

		//Gold drop
		const goldDropRoll = Math.round((Math.random() * enemyLevel)) + enemyLevel;
		playerGold += +goldDropRoll;

		//Lower player quest exhaustion
		if(playerExhaustion > 0)
		{
			if(enemyLevel >= playerLevel)
			{
				playerExhaustion -= 5;
			}
			else if(enemyLevel >= playerLevel - 5)
			{
				playerExhaustion -= 3;
			}
			else if(enemyLevel >= playerLevel - 10)
			{
				playerExhaustion -= 2;
			}
			else if(enemyLevel >= playerLevel - 15)
			{
				playerExhaustion -= 1;
			}

			//Do not lower it if monster is 15 levels lower than player

			if(playerExhaustion < 0)
			{
				playerExhaustion = 0;
			}
		}
	}
}

function updateBattleHealth()
{
	const playerHealthPercentage = playerHealth / playerMaxHealth * 100;
	$("#player_battle_health").html("HP: " + playerHealthPercentage.toFixed() + "%");
	$("#battle_player_health_bar_inside").css("background-size", playerHealthPercentage + "%");
	$("#battle_player_health_bar_inside").css("background-repeat", "no-repeat");

	if(bIsEnemyAlive)
	{
		const enemyHealthPercentage = enemyHealth / enemyMaxHealth * 100;
		$("#monster_battle_health").html("HP: " + enemyHealthPercentage.toFixed() + "%");

		$("#battle_monster_health_bar_inside").css("background-size", enemyHealthPercentage + "%");
		$("#battle_monster_health_bar_inside").css("background-repeat", "no-repeat");
		$("#battle_player_crit_chance").css("display", "block");
	}
	else
	{
		$("#battle_looking_for_enemy").css("display", "inline-block");
		$("#battle_window_monster_data").css("display", "none");
		$("#battle_player_crit_chance").css("display", "none");
	}
}

function updatePlayerInfo()
{
	let critChance = Math.round((playerDexterity / (enemyLevel * 3 * 2)) * 100);
	if(critChance > 100)
	{
		critChance = 100;
	}

	let critChanceString = "Crit chance: " + critChance + "%";
	$("#battle_player_crit_chance").html(critChanceString);
}

function updateMonsterInfo()
{
	$("#battle_monster_level").html("Lvl: " + enemyLevel);
	$("#battle_monster_difficulty").html("Difficulty: " + GetEnemyDifficultyName(enemyDifficulty));
}

function switchToBattleWindow()
{
	bIsInBattle = true;
	$("#battle_window_battle").css("display", "flex");
	$("#battle_window_select_zone").css("display", "none");
	$("#battle_data").css("display", "flex");
}