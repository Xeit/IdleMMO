var dataToSave = "";

function addData(dataToAdd)
{
	dataToSave += "|save|";
	dataToSave += dataToAdd;
}

function bakeACookie() 
{
	const fileName = "v2";
	dataToSave = fileName;

	gatherPlayerData();
	
	localStorage.setItem("v2", dataToSave);
}

function eatCookie(cname) 
{
	if(localStorage.getItem("v1") !== null)
	{
		var stringToRead = localStorage.getItem("v1");
		var arrayOfVariables = stringToRead.split("|save|");
		DEPRECATED_readPlayerData(arrayOfVariables);
		localStorage.removeItem("v1");
	}
	if(localStorage.getItem("v2") !== null)
	{
		var stringToRead = localStorage.getItem("v2");
		var arrayOfVariables = stringToRead.split("|save|");
		readPlayerData(arrayOfVariables);
	}
}

function gatherPlayerData()
{
	addData("player")
	addData(JSON.stringify(player))
}

function DEPRECATED_readPlayerData(arrayOfVariables)
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
						player.playerLevel = +arrayOfVariables[i+1];
						player.playerUnlockFunctionsUntilLevel();
						break;
					case "playerXp":
						player.playerXp = +arrayOfVariables[i+1];
						break;
					case "playerRequiredXp":
						player.playerRequiredXp = +arrayOfVariables[i+1];
						break;
					case "playerGold":
						player.playerGold = +arrayOfVariables[i+1];
						break;
					case "playerHealth":
						player.playerHealth = +arrayOfVariables[i+1];
						break;
					case "playerMaxHealth":
						player.playerMaxHealth = +arrayOfVariables[i+1];
						break;
					case "playerMana":
						player.playerMana = +arrayOfVariables[i+1];
						break;
					case "playerMaxMana":
						player.playerMaxMana = +arrayOfVariables[i+1];
						break;
					case "playerExhaustion":
						player.playerExhaustion = +arrayOfVariables[i+1];
						break;
					case "playerMaxExhaustion":
						player.playerMaxExhaustion = +arrayOfVariables[i+1];
						break;
					case "playerStrength":
						player.playerStrength = +arrayOfVariables[i+1];
						break;
					case "playerStrengthXP":
						player.playerStrengthXP = +arrayOfVariables[i+1];
						break;
					case "playerDexterity":
						player.playerDexterity = +arrayOfVariables[i+1];
						break;
					case "playerDexterityXP":
						player.playerDexterityXP = +arrayOfVariables[i+1];
						break;
					case "playerStamina":
						player.playerStamina = +arrayOfVariables[i+1];
						break;
					case "playerStaminaXP":
						player.playerStaminaXP = +arrayOfVariables[i+1];
						break;
					case "playerIntelligence":
						player.playerIntelligence = +arrayOfVariables[i+1];
						break;
					case "playerIntelligenceXP":
						player.playerIntelligenceXP = +arrayOfVariables[i+1];
						break;
					case "playerWeaponSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							try
							{
								const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
								let recreatedItem = new Item();
								Object.assign(recreatedItem, retrivedJSON);
								if(recreatedItem instanceof Item)
								{
									player.weaponSlot = recreatedItem;
								}
							}
							catch (e)
							{
								// TODO: Remove this in the future, this is depricated
								var itemString = arrayOfVariables[i+1];
								var itemArrayOfVariables = itemString.split("|item|");
								if(itemArrayOfVariables.length == 4)
								{
									var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
									player.weaponSlot = recreatedItem;
								}
							}
						}
						break;
					case "playerHelmetSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							try
							{
								const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
								let recreatedItem = new Item();
								Object.assign(recreatedItem, retrivedJSON);
								if(recreatedItem instanceof Item)
								{
									player.helmetSlot = recreatedItem;
								}
							}
							catch (e)
							{
								// TODO: Remove this in the future, this is depricated
								var itemString = arrayOfVariables[i+1];
								var itemArrayOfVariables = itemString.split("|item|");
								if(itemArrayOfVariables.length == 4)
								{
									var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
									player.helmetSlot = recreatedItem;
								}
							}
						}
						break;
					case "playerBodyArmourSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							try
							{
								const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
								let recreatedItem = new Item();
								Object.assign(recreatedItem, retrivedJSON);
								if(recreatedItem instanceof Item)
								{
									player.bodyArmourSlot = recreatedItem;
								}
							}
							catch (e)
							{
								// TODO: Remove this in the future, this is depricated
								var itemString = arrayOfVariables[i+1];
								var itemArrayOfVariables = itemString.split("|item|");
								if(itemArrayOfVariables.length == 4)
								{
									var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
									player.bodyArmourSlot = recreatedItem;
								}
							}
						}
						break;
					case "playerGlovesSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							try
							{
								const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
								let recreatedItem = new Item();
								Object.assign(recreatedItem, retrivedJSON);
								if(recreatedItem instanceof Item)
								{
									player.glovesSlot = recreatedItem;
								}
							}
							catch (e)
							{
								// TODO: Remove this in the future, this is depricated
								var itemString = arrayOfVariables[i+1];
								var itemArrayOfVariables = itemString.split("|item|");
								if(itemArrayOfVariables.length == 4)
								{
									var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
									player.glovesSlot = recreatedItem;
								}
							}
						}
						break;
					case "playerBootsSlot":
						if(arrayOfVariables[i+1] != "undefined")
						{
							try
							{
								const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
								let recreatedItem = new Item();
								Object.assign(recreatedItem, retrivedJSON);
								if(recreatedItem instanceof Item)
								{
									player.bootsSlot = recreatedItem;
								}
							}
							catch (e)
							{
								// TODO: Remove this in the future, this is depricated
								var itemString = arrayOfVariables[i+1];
								var itemArrayOfVariables = itemString.split("|item|");
								if(itemArrayOfVariables.length == 4)
								{
									var recreatedItem = new Item(itemArrayOfVariables[0], itemArrayOfVariables[1], itemArrayOfVariables[2], itemArrayOfVariables[3]);
									player.bootsSlot = recreatedItem;
								}
							}
						}
						break;
					case "playerHealthPotions":
						player.healthPotions = +arrayOfVariables[i+1];
						break;
					case "playerHealthPotionUsePercent":
						player.healthPotionUsePercent = +arrayOfVariables[i+1];
						break;
					case "playerBuffList":
						break;
					default:
						console.log("There was unexpected data when reading the save file, name of unexpected variable: " + VariableName); 
				}
			}
		}
	}
}

function readPlayerData(arrayOfVariables)
{
	if(arrayOfVariables[0] === "v2")
	{
		for(var i = 1; i < arrayOfVariables.length; i = i + 2)
		{
			if(arrayOfVariables[i] !== undefined)
			{
				var VariableName = arrayOfVariables[i];
				switch(VariableName)
				{
					case "player":
						try
						{
							const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
							let recreatedPlayer = new Player();
							Object.assign(recreatedPlayer, retrivedJSON);
							if(recreatedPlayer instanceof Player)
							{
								player = recreatedPlayer;
								player.playerUnlockFunctionsUntilLevel();
							}
						}
						catch (e)
						{
						}
						break;
					default:
						console.log("There was unexpected data when reading the save file, name of unexpected variable: " + VariableName); 
				}
			}
		}
	}
}