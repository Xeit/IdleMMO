var dataToSave = "";

function addData(dataToAdd)
{
	dataToSave += "|save|";
	dataToSave += dataToAdd;
}

function bakeACookie() 
{
	const fileName = "v1";
	dataToSave = fileName;

	gatherPlayerData();
	
	localStorage.setItem("v1", dataToSave);
}

function eatCookie(cname) 
{
	if(localStorage.getItem("v1") !== null)
	{
		var stringToRead = localStorage.getItem("v1");
		var arrayOfVariables = stringToRead.split("|save|");
		readPlayerData(arrayOfVariables);
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
	if(playerWeaponSlot != undefined)
	{
		addData(playerWeaponSlot.SerializeItem());
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerHelmetSlot");
	if(playerHelmetSlot != undefined)
	{
		addData(playerHelmetSlot.SerializeItem());
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerBodyArmourSlot");
	if(playerBodyArmourSlot != undefined)
	{
		addData(playerBodyArmourSlot.SerializeItem());
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerGlovesSlot");
	if(playerGlovesSlot != undefined)
	{
		addData(playerGlovesSlot.SerializeItem());
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerBootsSlot");
	if(playerBootsSlot != undefined)
	{
		addData(playerBootsSlot.SerializeItem());
	}
	else
	{
		addData("undefined");
	}
}

function readPlayerData(arrayOfVariables)
{
	if(arrayOfVariables[0] === "v1")
	{
		for(var i = 1; i < arrayOfVariables.length; i = i + 2)
		{
			if(arrayOfVariables[i] !== undefined)
			{
				var VariableName = arrayOfVariables[i];
				switch(VariableName)
				{
					case "playerLevel":
						playerLevel = +arrayOfVariables[i+1];
						break;
					case "playerXp":
						playerXp = +arrayOfVariables[i+1];
						break;
					case "playerRequiredXp":
						playerRequiredXp = +arrayOfVariables[i+1];
						break;
					case "playerGold":
						playerGold = +arrayOfVariables[i+1];
						break;
					case "playerHealth":
						playerHealth = +arrayOfVariables[i+1];
						break;
					case "playerMaxHealth":
						playerMaxHealth = +arrayOfVariables[i+1];
						break;
					case "playerMana":
						playerMana = +arrayOfVariables[i+1];
						break;
					case "playerMaxMana":
						playerMaxMana = +arrayOfVariables[i+1];
						break;
					case "playerExhaustion":
						playerExhaustion = +arrayOfVariables[i+1];
						break;
					case "playerMaxExhaustion":
						playerMaxExhaustion = +arrayOfVariables[i+1];
						break;
					case "playerStrength":
						playerStrength = +arrayOfVariables[i+1];
						break;
					case "playerStrengthXP":
						playerStrengthXP = +arrayOfVariables[i+1];
						break;
					case "playerStrengthRequiredXP":
						playerStrengthRequiredXP = +arrayOfVariables[i+1];
						break;
					case "playerDexterity":
						playerDexterity = +arrayOfVariables[i+1];
						break;
					case "playerDexterityXP":
						playerDexterityXP = +arrayOfVariables[i+1];
						break;
					case "playerDexterityRequiredXP":
						playerDexterityRequiredXP = +arrayOfVariables[i+1];
						break;
					case "playerStamina":
						playerStamina = +arrayOfVariables[i+1];
						break;
					case "playerStaminaXP":
						playerStaminaXP = +arrayOfVariables[i+1];
						break;
					case "playerStaminaRequiredXP":
						playerStaminaRequiredXP = +arrayOfVariables[i+1];
						break;
					case "playerIntelligence":
						playerIntelligence = +arrayOfVariables[i+1];
						break;
					case "playerIntelligenceXP":
						playerIntelligenceXP = +arrayOfVariables[i+1];
						break;
					case "playerIntelligenceRequiredXP":
						playerIntelligenceRequiredXP = +arrayOfVariables[i+1];
						break;
					case "playerWeaponSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							var itemString = arrayOfVariables[i+1];
							var itemArrayOfVariables = itemString.split("|item|");
							if(itemArrayOfVariables.length == 4)
							{
								var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
								playerWeaponSlot = recreatedItem;
							}
						}
						break;
					case "playerHelmetSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							var itemString = arrayOfVariables[i+1];
							var itemArrayOfVariables = itemString.split("|item|");
							if(itemArrayOfVariables.length == 4)
							{
								var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
								playerHelmetSlot = recreatedItem;
							}
						}
						break;
					case "playerBodyArmourSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							var itemString = arrayOfVariables[i+1];
							var itemArrayOfVariables = itemString.split("|item|");
							if(itemArrayOfVariables.length == 4)
							{
								var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
								playerBodyArmourSlot = recreatedItem;
							}
						}
						break;
					case "playerGlovesSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							var itemString = arrayOfVariables[i+1];
							var itemArrayOfVariables = itemString.split("|item|");
							if(itemArrayOfVariables.length == 4)
							{
								var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
								playerGlovesSlot = recreatedItem;
							}
						}
						break;
					case "playerBootsSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							var itemString = arrayOfVariables[i+1];
							var itemArrayOfVariables = itemString.split("|item|");
							if(itemArrayOfVariables.length == 4)
							{
								var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
								playerBootsSlot = recreatedItem;
							}
						}
						break;
					default:
						console.log("There was unexpected data when reading the save file, name of unexpected variable: " + VariableName); 
				}
			}
		}
	}
}
