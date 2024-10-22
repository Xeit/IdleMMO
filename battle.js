var bIsInBattle = false;
var bIsEnemyAlive = false;

var enemyName = "Rat";
var enemyHealth = 10;
var enemyMaxHealth = 10;
var enemyDamage = 4;
var enemyLevel = 1;
var enemyXp = 1;
var chanceOfDroppingItem = 15;

var currentZone = null;

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

function stopBattle()
{
	$("#battle_window").css("display", "none");
	$("#battle_window_battle").css("display", "none");
	$("#battle_window_select_zone").css("display", "flex");
	$("#battle_data").css("display", "none");
	bIsInBattle = false;
	bIsEnemyAlive = false;
	currentZone = null;
}

function startBattle()
{
	updateBattleHealth();

	$("#battle_window").css("display", "flex");
	$("#battle_window_select_zone").css("display", "flex");
	$("#battle_window_battle").css("display", "flex");
	$("#battle_data").css("display", "none");
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
		chanceOfDroppingItem = nextEnemy.chanceOfDroppingItem;

		$("#monster_battle_name").text(enemyName);
		enemyHealth = +enemyMaxHealth;
		bIsEnemyAlive = true;
		updateBattleHealth();
		$("#battle_looking_for_enemy").css("display", "none");
		$("#battle_window_monster_data").css("display", "inline-block");
	}
}

function hitEnemy()
{
	var playerDamage = +playerStrength;
	if(typeof(playerWeaponSlot) == Item)
	{
		playerDamage += +playerWeaponSlot.returnItemPower();
	}

	const critRoll = +(Math.random() * enemyLevel * 3 * 2).toFixed(); //50% crit chance with max dex
	if(critRoll < playerDexterity)
	{
		//This is crit
		playerDamage = playerDamage * 2;
	}

	enemyHealth -= +playerDamage;

	//Kill enemy
	if(enemyHealth <= 0)
	{
		bIsEnemyAlive = false;

		if(playerLevel > enemyLevel)
		{
			const levelDifference = playerLevel - enemyLevel;
			if(levelDifference < 5)
			{
				const xpPenaltyMultiplier = levelDifference * 0.2;
				const xpToAddAfterPenalty = enemyXp * (1 - xpPenaltyMultiplier);
				addPlayerXp(xpToAddAfterPenalty);
			}
		}
		else
		{
			addPlayerXp(enemyXp);
		}

		//Item drop
		const itemDropRoll = +(Math.random() * 100).toFixed();
		if(itemDropRoll < chanceOfDroppingItem)
		{
			var generatedNewItem = new Item();
			generatedNewItem = generateItem(enemyLevel);
			tryNewItem(generatedNewItem);
			updateEquipmentWindow();
			//Add new "Attack" and "Defensive" in left UI?
		}

		//Gold drop
		const goldDropRoll = Math.round((Math.random() * enemyLevel)) + enemyLevel;
		playerGold += +goldDropRoll;

		//Lower player quest exhaustion
		if(playerExhaustion > 0)
		{
			if(playerExhaustion < 3)
			{
				playerExhaustion = 0;
			}
			else
			{
				playerExhaustion -= +3;
			}
		}
	}
}

function updateBattleHealth()
{
	const playerHealthPercentage = playerHealth / playerMaxHealth * 100;
	$("#player_battle_health").html("HP: " + playerHealthPercentage.toFixed() + "%");

	if(bIsEnemyAlive)
	{
		const enemyHealthPercentage = enemyHealth / enemyMaxHealth * 100;
		$("#monster_battle_health").html("HP: " + enemyHealthPercentage.toFixed() + "%");
	}
	else
	{
		$("#battle_looking_for_enemy").css("display", "inline-block");
		$("#battle_window_monster_data").css("display", "none");
	}
}

function switchToBattleWindow()
{
	bIsInBattle = true;
	$("#battle_window_battle").css("display", "flex");
	$("#battle_window_select_zone").css("display", "none");
	$("#battle_data").css("display", "flex");
}