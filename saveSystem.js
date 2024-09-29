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
		var StringToRead = localStorage.getItem("v1");
		var ArrayOfVariables = StringToRead.split("|");
		readPlayerData(ArrayOfVariables);
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

function readPlayerData(ArrayOfVariables)
{
	if(ArrayOfVariables[0] === "v1")
	{
		for(var i = 1; i < ArrayOfVariables.length; i = i + 2)
		{
			if(ArrayOfVariables[i] !== undefined)
			{
				var VariableName = ArrayOfVariables[i];
				switch(VariableName)
				{
					case "playerLevel":
						playerLevel = +ArrayOfVariables[i+1];
						break;
					case "playerXp":
						playerXp = +ArrayOfVariables[i+1];
						break;
					case "playerRequiredXp":
						playerRequiredXp = +ArrayOfVariables[i+1];
						break;
					case "playerGold":
						playerGold = +ArrayOfVariables[i+1];
						break;
					case "playerHealth":
						playerHealth = +ArrayOfVariables[i+1];
						break;
					case "playerMaxHealth":
						playerMaxHealth = +ArrayOfVariables[i+1];
						break;
					case "playerMana":
						playerMana = +ArrayOfVariables[i+1];
						break;
					case "playerMaxMana":
						playerMaxMana = +ArrayOfVariables[i+1];
						break;
					case "playerExhaustion":
						playerExhaustion = +ArrayOfVariables[i+1];
						break;
					case "playerMaxExhaustion":
						playerMaxExhaustion = +ArrayOfVariables[i+1];
						break;
					case "playerStrength":
						playerStrength = +ArrayOfVariables[i+1];
						break;
					case "playerStrengthXP":
						playerStrengthXP = +ArrayOfVariables[i+1];
						break;
					case "playerStrengthRequiredXP":
						playerStrengthRequiredXP = +ArrayOfVariables[i+1];
						break;
					case "playerDexterity":
						playerDexterity = +ArrayOfVariables[i+1];
						break;
					case "playerDexterityXP":
						playerDexterityXP = +ArrayOfVariables[i+1];
						break;
					case "playerDexterityRequiredXP":
						playerDexterityRequiredXP = +ArrayOfVariables[i+1];
						break;
					case "playerStamina":
						playerStamina = +ArrayOfVariables[i+1];
						break;
					case "playerStaminaXP":
						playerStaminaXP = +ArrayOfVariables[i+1];
						break;
					case "playerStaminaRequiredXP":
						playerStaminaRequiredXP = +ArrayOfVariables[i+1];
						break;
					case "playerIntelligence":
						playerIntelligence = +ArrayOfVariables[i+1];
						break;
					case "playerIntelligenceXP":
						playerIntelligenceXP = +ArrayOfVariables[i+1];
						break;
					case "playerIntelligenceRequiredXP":
						playerIntelligenceRequiredXP = +ArrayOfVariables[i+1];
						break;
					case "playerWeaponSlot":
						playerWeaponSlot = ArrayOfVariables[i+1];
						break;
					case "playerHelmetSlot":
						playerHelmetSlot = ArrayOfVariables[i+1];
						break;
					case "playerBodyArmourSlot":
						playerBodyArmourSlot = ArrayOfVariables[i+1];
						break;
					case "playerGlovesSlot":
						playerGlovesSlot = ArrayOfVariables[i+1];
						break;
					case "playerBootsSlot":
						playerBootsSlot = ArrayOfVariables[i+1];
						break;
					default:
						console.log("There was unexpected data when reading the save file, name of unexpected variable: " + VariableName); 
				}
			}
		}
	}
}
