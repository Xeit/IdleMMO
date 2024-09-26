var DataToSave = "";

function addData(DataToAdd)
{
	DataToSave += "|";
	DataToSave += DataToAdd;
}

function bakeACookie() 
{
	const fileName = "v1";
	DataToSave = fileName;

	gatherPlayerData();
	
	localStorage.setItem("v1", DataToSave);
}

function eatCookie(cname) 
{
	if(localStorage.getItem("v1") !== null)
	{
		readPlayerData();
	}
}

function gatherPlayerData()
{
	addData("playerLevel");
	addData(playerLevel);

	addData("playerXp");
	addData(playerXp);

	addData("playerRequiredXp");
	addData(playerRequiredXp);
	
	addData("playerGold");
	addData(playerGold);
	
	addData("playerHealth");
	addData(playerHealth);
	
	addData("playerMaxHealth");
	addData(playerMaxHealth);

	addData("playerMana");
	addData(playerMana);
	
	addData("playerMaxMana");
	addData(playerMaxMana);
	
	addData("playerExhaustion");
	addData(playerExhaustion);
	
	addData("playerMaxExhaustion");
	addData(playerMaxExhaustion);
	
	addData("playerStrength");
	addData(playerStrength);
	
	addData("playerStrengthXP");
	addData(playerStrengthXP);
	
	addData("playerStrengthRequiredXP");
	addData(playerStrengthRequiredXP);
	
	addData("playerDexterity");
	addData(playerDexterity);
	
	addData("playerDexterityXP");
	addData(playerDexterityXP);
	
	addData("playerDexterityRequiredXP");
	addData(playerDexterityRequiredXP);
	
	addData("playerStamina");
	addData(playerStamina);
	
	addData("playerStaminaXP");
	addData(playerStaminaXP);
	
	addData("playerStaminaRequiredXP");
	addData(playerStaminaRequiredXP);
	
	addData("playerIntelligence");
	addData(playerIntelligence);
	
	addData("playerIntelligenceXP");
	addData(playerIntelligenceXP);
	
	addData("playerIntelligenceRequiredXP");
	addData(playerIntelligenceRequiredXP);
	
	addData("playerWeaponSlot");
	addData(playerWeaponSlot);
	
	addData("playerHelmetSlot");
	addData(playerHelmetSlot);
	
	addData("playerBodyArmourSlot");
	addData(playerBodyArmourSlot);
	
	addData("playerGlovesSlot");
	addData(playerGlovesSlot);
	
	addData("playerBootsSlot");
	addData(playerBootsSlot);
}

function readPlayerData()
{

}
