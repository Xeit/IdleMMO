//Player data
var currentTask = PlayerTasks.none;

//Level
var playerLevel = 1;
var playerXp = 0;
var playerRequiredXp = 50;

//Spendables
var playerGold = 0;
var playerHealth = 100;
var playerMaxHealth = 100;
var playerMana = 100;
var playerMaxMana = 100;
var playerExhaustion = 0;
var playerMaxExhaustion = 50;

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
var playerWeaponSlot;
var playerHelmetSlot;
var playerBodyArmourSlot;
var playerGlovesSlot;
var playerBootsSlot;

//Inventory
var playerHealthPotions = 0;

function addPlayerXp(xpToAdd)
{
	//This is current level cap
	if(playerLevel < 50)
	{
		playerXp += +xpToAdd;
		if(playerXp >= +playerRequiredXp)
		{
			playerLevelUp();
		}
	}
}

function playerLevelUp()
{
	playerLevel += 1;
	playerXp = 0;
	playerRequiredXp = +(0.25 * (playerLevel - 1 + (300 * 2 * ((playerLevel - 1) / 7))) + 50).toFixed();

	playerMaxHealth = 100 + (10 * (playerLevel - 1));
	playerMaxMana = 100 + (10 * (playerLevel - 1));
	playerMaxExhaustion = 50 + (5 * (playerLevel - 1));

	healPlayerToMax();
}

function playerGetArmourValue()
{
	var armourValue = 0;

	armourValue += playerHelmetSlot.returnItemPower();
	armourValue += playerBodyArmourSlot.returnItemPower();
	armourValue += playerGlovesSlot.returnItemPower();
	armourValue += playerBootsSlot.returnItemPower();

	return armourValue;
}

function playerHealPlayer(hpToAdd)
{
	playerHealth += +hpToAdd;
	if(playerHealth > playerMaxHealth)
	{
		playerHealth = playerMaxHealth;
	}
}

function playerTakeDamage(monsterDamageNumber)
{	
	monsterDamageNumber = +(monsterDamageNumber - Math.floor(playerStamina / 2));
	monsterDamageNumber -= +Math.floor(playerGetArmourValue() / 2);

	if(monsterDamageNumber < 1)
	{
		monsterDamageNumber = 1;
	}

	playerHealth -= +monsterDamageNumber;

	if(playerHealth <= 0)
	{
		playerHealth = 0;
		newPlayerTask(PlayerTasks.healing);
	}
	else if(playerHealth < (playerMaxHealth / 2) && playerHealthPotions > 0)
	{
		//Use potion if under 50% health
		playerHealthPotions -= 1;
		const healthToHeal = +Math.floor(playerMaxHealth / 2);
		playerHealPlayer(healthToHeal);
	}
}