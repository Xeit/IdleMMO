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
		readPlayerDataDepricated(arrayOfVariables);
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
	if(playerWeaponSlot !== undefined)
	{
		addData(JSON.stringify(playerWeaponSlot));
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerHelmetSlot");
	if(playerHelmetSlot !== undefined)
	{
		addData(JSON.stringify(playerHelmetSlot));
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerBodyArmourSlot");
	if(playerBodyArmourSlot !== undefined)
	{
		addData(JSON.stringify(playerBodyArmourSlot));
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerGlovesSlot");
	if(playerGlovesSlot !== undefined)
	{
		addData(JSON.stringify(playerGlovesSlot));
	}
	else
	{
		addData("undefined");
	}
	
	addData("playerBootsSlot");
	if(playerBootsSlot !== undefined)
	{
		addData(JSON.stringify(playerBootsSlot));
	}
	else
	{
		addData("undefined");
	}

	addData("playerHealthPotions");
	addData(playerHealthPotions);

	addData("playerHealthPotionUsePercent");
	addData(playerHealthPotionUsePercent);

	addData("playerBuffList");
	addData(serializeBuffList());
}

function serializeBuffList()
{
	var buffsString = "";

	for(var i = 1; i <= playerBuffList.length; i = i + 1)
	{
		if(playerBuffList[i-1] instanceof PlayerBuff)
		{
			buffsString += playerBuffList[i-1].serializeBuff();
	
			if(playerBuffList.length > 1 && i != playerBuffList.length)
			{
				buffsString += "|buffList|";
			}
		}
	}

	return buffsString;
}

function readPlayerDataDepricated(arrayOfVariables)
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
							try
							{
								const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
								let recreatedItem = new Item();
								Object.assign(recreatedItem, retrivedJSON);
								if(recreatedItem instanceof Item)
								{
									playerWeaponSlot = recreatedItem;
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
									playerWeaponSlot = recreatedItem;
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
									playerHelmetSlot = recreatedItem;
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
									playerHelmetSlot = recreatedItem;
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
									playerBodyArmourSlot = recreatedItem;
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
									playerBodyArmourSlot = recreatedItem;
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
									playerGlovesSlot = recreatedItem;
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
									playerGlovesSlot = recreatedItem;
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
									playerBootsSlot = recreatedItem;
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
									playerBootsSlot = recreatedItem;
								}
							}
						}
						break;
					case "playerHealthPotions":
						playerHealthPotions = +arrayOfVariables[i+1];
						break;
					case "playerHealthPotionUsePercent":
						playerHealthPotionUsePercent = +arrayOfVariables[i+1];
						break;
					case "playerBuffList":
						readPlayerBuffList(arrayOfVariables[i+1]);
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
							try
							{
								const retrivedJSON = JSON.parse(arrayOfVariables[i+1]);
								let recreatedItem = new Item();
								Object.assign(recreatedItem, retrivedJSON);
								if(recreatedItem instanceof Item)
								{
									playerWeaponSlot = recreatedItem;
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
									playerWeaponSlot = recreatedItem;
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
									playerHelmetSlot = recreatedItem;
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
									playerHelmetSlot = recreatedItem;
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
									playerBodyArmourSlot = recreatedItem;
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
									playerBodyArmourSlot = recreatedItem;
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
									playerGlovesSlot = recreatedItem;
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
									playerGlovesSlot = recreatedItem;
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
									playerBootsSlot = recreatedItem;
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
									playerBootsSlot = recreatedItem;
								}
							}
						}
						break;
					case "playerHealthPotions":
						playerHealthPotions = +arrayOfVariables[i+1];
						break;
					case "playerHealthPotionUsePercent":
						playerHealthPotionUsePercent = +arrayOfVariables[i+1];
						break;
					case "playerBuffList":
						readPlayerBuffList(arrayOfVariables[i+1]);
						break;
					default:
						console.log("There was unexpected data when reading the save file, name of unexpected variable: " + VariableName); 
				}
			}
		}
	}
}

function readPlayerBuffList(buffListString)
{
	const arrayOfBuffs = buffListString.split("|buffList|");

	if(arrayOfBuffs.length == 1 && arrayOfBuffs[0] == "")
	{
		return;
	}

	for(var i = 0; i < arrayOfBuffs.length; i = i + 1)
	{
		const arrayOfBuffParameters = arrayOfBuffs[i].split("|buff|");
		if(arrayOfBuffParameters.length == 6)
		{
			var recreatedBuff = new PlayerBuff(arrayOfBuffParameters[0], arrayOfBuffParameters[1], arrayOfBuffParameters[2], arrayOfBuffParameters[3], arrayOfBuffParameters[4], arrayOfBuffParameters[5]);
			playerBuffList.push(recreatedBuff);
		}
		else
		{
			console.log("Incorrect amount of buff parameters in saveSystem.js readPlayerBuffList(buffListString)");
		}
	}
}