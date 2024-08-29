var bIsInBattle = false;

var bIsEnemyAlive = false;

var enemyName = "Rat";
var enemyHealth = 10;
var enemyMaxHealth = 10;
var enemyDamage = 4;
var enemyLevel = 1;
var enemyXp = 1;
var chanceOfDroppingItem = 15;

function tickBattle()
{
	if(bIsInBattle)
	{
		if(bIsEnemyAlive)
		{
			hitEnemy();
			if(bIsEnemyAlive)
			{
				hitPlayer();
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
	bIsInBattle = false;
	bIsEnemyAlive = false;
}

function startBattle()
{
	bIsInBattle = true;
	if(!bIsEnemyAlive)
	{
		getNewEnemy();
	}
	updateBattleHealth();

	$("#battle_window").css("display", "flex");
}

function getNewEnemy()
{
	var nextEnemy = getRandomMonsterFromBattleZone(zoneCellars);

	if(nextEnemy != null)
	{
		enemyName = nextEnemy.enemyName;
		enemyMaxHealth = nextEnemy.enemyMaxHealth;
		enemyDamage = nextEnemy.enemyDamage;
		enemyLevel = nextEnemy.enemyLevel;
		enemyXp = nextEnemy.enemyXp;
		chanceOfDroppingItem = nextEnemy.chanceOfDroppingItem;

		$("#monster_battle_name").text(enemyName);
	}

	enemyHealth = +enemyMaxHealth;
	bIsEnemyAlive = true;
	updateBattleHealth();
	$("#battle_looking_for_enemy").css("display", "none");
	$("#battle_window_monster_data").css("display", "inline-block");
}

function hitEnemy()
{
	var playerDamage = +playerStrength;
	if(playerWeaponSlot != null)
	{
		playerDamage += +playerWeaponSlot.returnItemPower();
	}
	enemyHealth -= +playerDamage;

	//Kill enemy
	if(enemyHealth <= 0)
	{
		bIsEnemyAlive = false;

		addPlayerXp(enemyXp);

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

function hitPlayer()
{
	var monsterDamage = +(enemyDamage - Math.floor(playerStamina / 2));

	//Gear calculations 
	//(in future might be smart to make function to call from item or player to get total armour but who cares for now xD)
	if(playerHelmetSlot != null)
	{
		monsterDamage -= +Math.floor(playerHelmetSlot.returnItemPower() / 2);
	}
	if(playerBodyArmourSlot != null)
	{
		monsterDamage -= +Math.floor(playerBodyArmourSlot.returnItemPower() / 2);
	}
	if(playerGlovesSlot != null)
	{
		monsterDamage -= +Math.floor(playerGlovesSlot.returnItemPower() / 2);
	}
	if(playerBootsSlot != null)
	{
		monsterDamage -= +Math.floor(playerBootsSlot.returnItemPower() / 2);
	}


	if(monsterDamage < 1)
	{
		monsterDamage = 1;
	}

	playerHealth -= +monsterDamage;

	if(playerHealth <= 0)
	{
		playerHealth = 0;
		newPlayerTask(PlayerTasks.healing);
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