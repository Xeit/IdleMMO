//Player data
var currentTask = PlayerTasks.none;

var playerLevel = 1;
var playerXp = 0;
var playerRequiredXp = 50;
var playerHealth = 100;
var playerMaxHealth = 100;
var playerMana = 100;
var playerMaxMana = 100;
var playerStrength = 1;
var playerDexterity = 1;
var playerStamina = 1;
var playerIntelligence = 1;
var playerExhaustion = 0;
var playerMaxExhaustion = 50;

var playerStrengthXP = 0;
var playerDexterityXP = 0;
var playerStaminaXP = 0;
var playerIntelligenceXP = 0;
var playerStrengthRequiredXP = 50;
var playerDexterityRequiredXP = 50;
var playerStaminaRequiredXP = 50;
var playerIntelligenceRequiredXP = 50;

var playerWeaponSlot;
var playerHelmetSlot;
var playerBodyArmourSlot;
var playerGlovesSlot;
var playerBootsSlot;

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
}
