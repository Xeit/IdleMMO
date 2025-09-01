class Player
{
	//Level
	playerLevel = 1;
	playerXp = 0;
	playerRequiredXp = 50;

	//Spendables
	playerGold = 0;
	playerHealth = 100;
	playerMaxHealth = 100;
	playerMana = 100;
	playerMaxMana = 100;
	playerExhaustion = 0;
	playerMaxExhaustion = 50;

	playerUnlockFunctionsUntilLevel()
	{
		for(let i = 0; i <= this.playerLevel; i++)
		{
			PlayerUnlockFunctions(i);
		}
	}
}

var player = new Player()

//Player data
var currentTask = PlayerTasks.none;
var currentOpenWindow = PlayerTasks.none;

//Player
var playerStrength = 1;
var playerStrengthXP = 0;
var playerStrengthRequiredXP = 50;
var playerDexterity = 1;
var playerDexterityXP = 0;
var playerDexterityRequiredXP = 50;
var playerStamina = 1;
var playerStaminaXP = 0;
var playerStaminaRequiredXP = 50;
var playerIntelligence = 1;
var playerIntelligenceXP = 0;
var playerIntelligenceRequiredXP = 50;

//Equipment slots
var playerWeaponSlot = undefined;
var playerHelmetSlot = undefined;
var playerBodyArmourSlot = undefined;
var playerGlovesSlot = undefined;
var playerBootsSlot = undefined;

//Inventory
var playerHealthPotions = 0;
var playerHealthPotionUsePercent = 50;

//Buffs
var playerBuffList = [];

//Debug
var levelBreeze = false;

function addPlayerXp(xpToAdd)
{
	//This is current level cap
	if(player.playerLevel < 50)
	{
		player.playerXp += +xpToAdd;
		if(player.playerXp >= +player.playerRequiredXp)
		{
			playerLevelUp();
		}
	}
}

function playerLevelUp()
{
	player.playerLevel += 1;
	player.playerXp = 0;
	player.playerRequiredXp = +(0.25 * (player.playerLevel + (300 * 2 * ((player.playerLevel - 1) / 4))) + 50).toFixed();

	player.playerMaxHealth = 100 + (10 * (player.playerLevel - 1));
	player.playerMaxMana = 100 + (10 * (player.playerLevel - 1));
	player.playerMaxExhaustion = 50 + (5 * (player.playerLevel - 1));

	healPlayerToMax();

	PlayerUnlockFunctions(player.playerLevel);
}

function playerGetArmourValue()
{
	var armourValue = 0;

	if(playerHelmetSlot instanceof Item)
	{
		armourValue += playerHelmetSlot.returnItemPower(true);
	}
	if(playerBodyArmourSlot instanceof Item)
	{
		armourValue += playerBodyArmourSlot.returnItemPower(true);
	}
	if(playerGlovesSlot instanceof Item)
	{
		armourValue += playerGlovesSlot.returnItemPower(true);
	}
	if(playerBootsSlot instanceof Item)
	{
		armourValue += playerBootsSlot.returnItemPower(true);
	}

	return armourValue;
}

function playerHealPlayer(hpToAdd)
{
	player.playerHealth += +hpToAdd;
	if(player.playerHealth > player.playerMaxHealth)
	{
		player.playerHealth = player.playerMaxHealth;
	}
}

function playerTakeDamage(monsterDamageNumber)
{	
	monsterDamageNumber = +(monsterDamageNumber - Math.floor(playerStamina / 2));
	monsterDamageNumber -= +Math.floor(playerGetArmourValue() / 2);

	monsterDamageNumber -= +getTotalBuffsWithType(BuffType.defense);

	if(monsterDamageNumber < 1)
	{
		monsterDamageNumber = 1;
	}

	player.playerHealth -= +monsterDamageNumber;

	if(player.playerHealth <= 0)
	{
		player.playerHealth = 0;
		newPlayerTask(PlayerTasks.healing);
	}
	else if((((player.playerHealth / player.playerMaxHealth) * 100) < playerHealthPotionUsePercent) && playerHealthPotions > 0)
	{
		//Use potion if under % health specified by player
		playerHealthPotions -= 1;
		const healthToHeal = +Math.floor(player.playerMaxHealth / 2);
		playerHealPlayer(healthToHeal);
	}
}

function playerGetAttackDamage(againstEnemyLevel)
{
	var playerDamageToDeal = 0;
	
	playerDamageToDeal = +playerStrength;
	if(playerWeaponSlot instanceof Item)
	{
		playerDamageToDeal += +playerWeaponSlot.returnItemPower(true);
	}

	const critRoll = +(Math.random() * againstEnemyLevel * 3 * 2).toFixed(); //50% crit chance with max dex for enemy on same level
	if(critRoll < playerDexterity)
	{
		//This is crit
		playerDamageToDeal = playerDamageToDeal * 2;
		UIPlayerCrited();
	}

	playerDamageToDeal += +getTotalBuffsWithType(BuffType.damage);

	return playerDamageToDeal;
}

function PlayerResetPlayer()
{
	player = new Player();

	//Player data
	currentTask = PlayerTasks.none;
	currentOpenWindow = PlayerTasks.none;

	//Player
	playerStrength = 1;
	playerStrengthXP = 0;
	playerStrengthRequiredXP = 50;
	playerDexterity = 1;
	playerDexterityXP = 0;
	playerDexterityRequiredXP = 50;
	playerStamina = 1;
	playerStaminaXP = 0;
	playerStaminaRequiredXP = 50;
	playerIntelligence = 1;
	playerIntelligenceXP = 0;
	playerIntelligenceRequiredXP = 50;

	//Equipment slots
	playerWeaponSlot = undefined;
	playerHelmetSlot = undefined;
	playerBodyArmourSlot = undefined;
	playerGlovesSlot = undefined;
	playerBootsSlot = undefined;

	//Inventory
	playerHealthPotions = 0;
	playerHealthPotionUsePercent = 50;

	//Buffs
	playerBuffList = [];
}

function PlayerUnlockFunctions(levelToUnlock)
{
	switch(levelToUnlock)
	{
		case 0:
			//Quests
			break;
		case 2:
			$("#battleButton").css("display", "block");
			$("#recoverHealthButton").css("display", "block");
			$("#trainingButton").css("display", "block");
			break;
		case 5:
			$("#equipmentButton").css("display", "block");
			break;
		case 10:
			$("#smithButton").css("display", "block");
		case 15:
			$("#shopButton").css("display", "block");
			break;
	}
}

function StartDebug()
{
	levelBreeze = true;
}
