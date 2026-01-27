var dataToSave = "";

function initializeBakery()
{
	const fileInput = document.getElementById('fileInput');
	fileInput.addEventListener('change', (e) => {
		const file = e.target.files && e.target.files[0];
		if (file) 
		{
			loadDriveCookie(file);
		}
	});

	const exportButton = document.getElementById('exportButton');
	exportButton.addEventListener('click', (e) => {
		bakeDriveCookie();
	});
}

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
						player.level = +arrayOfVariables[i+1];
						player.playerUnlockFunctionsUntilLevel();
						break;
					case "playerXp":
						player.xp = +arrayOfVariables[i+1];
						break;
					case "playerRequiredXp":
						player.requiredXp = +arrayOfVariables[i+1];
						break;
					case "playerGold":
						player.gold = +arrayOfVariables[i+1];
						break;
					case "playerHealth":
						player.health = +arrayOfVariables[i+1];
						break;
					case "playerMaxHealth":
						player.maxHealth = +arrayOfVariables[i+1];
						break;
					case "playerMana":
						player.mana = +arrayOfVariables[i+1];
						break;
					case "playerMaxMana":
						player.maxMana = +arrayOfVariables[i+1];
						break;
					case "playerExhaustion":
						player.exhaustion = +arrayOfVariables[i+1];
						break;
					case "playerMaxExhaustion":
						player.maxExhaustion = +arrayOfVariables[i+1];
						break;
					case "playerStrength":
						player.strength = +arrayOfVariables[i+1];
						break;
					case "playerStrengthXP":
						player.strengthXP = +arrayOfVariables[i+1];
						break;
					case "playerDexterity":
						player.dexterity = +arrayOfVariables[i+1];
						break;
					case "playerDexterityXP":
						player.dexterityXP = +arrayOfVariables[i+1];
						break;
					case "playerStamina":
						player.stamina = +arrayOfVariables[i+1];
						break;
					case "playerStaminaXP":
						player.staminaXP = +arrayOfVariables[i+1];
						break;
					case "playerIntelligence":
						player.intelligence = +arrayOfVariables[i+1];
						break;
					case "playerIntelligenceXP":
						player.intelligenceXP = +arrayOfVariables[i+1];
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
									var recreatedItem = new Item();

									recreatedItem.itemRarity = itemArrayOfVariables[0];
									recreatedItem.itemSlot = itemArrayOfVariables[1];
									recreatedItem.enemyLevel = itemArrayOfVariables[2];
									recreatedItem.itemName = itemArrayOfVariables[3];

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
									var recreatedItem = new Item();

									recreatedItem.itemRarity = itemArrayOfVariables[0];
									recreatedItem.itemSlot = itemArrayOfVariables[1];
									recreatedItem.enemyLevel = itemArrayOfVariables[2];
									recreatedItem.itemName = itemArrayOfVariables[3];

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
									var recreatedItem = new Item();

									recreatedItem.itemRarity = itemArrayOfVariables[0];
									recreatedItem.itemSlot = itemArrayOfVariables[1];
									recreatedItem.enemyLevel = itemArrayOfVariables[2];
									recreatedItem.itemName = itemArrayOfVariables[3];

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
									var recreatedItem = new Item();

									recreatedItem.itemRarity = itemArrayOfVariables[0];
									recreatedItem.itemSlot = itemArrayOfVariables[1];
									recreatedItem.enemyLevel = itemArrayOfVariables[2];
									recreatedItem.itemName = itemArrayOfVariables[3];

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
									var recreatedItem = new Item();

									recreatedItem.itemRarity = itemArrayOfVariables[0];
									recreatedItem.itemSlot = itemArrayOfVariables[1];
									recreatedItem.enemyLevel = itemArrayOfVariables[2];
									recreatedItem.itemName = itemArrayOfVariables[3];

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
								player.playerValidateStats();
								player.playerUnlockFunctionsUntilLevel();
								player.playerFixItems();
								UIClearAllButtonHighlights();
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

function loadDriveCookie(fileContent)
{
	consoleLogDebug("Trying a cookie from drive :D");

	if (fileContent.type.startsWith('application/json') || fileContent.name.toLowerCase().endsWith('.json')) 
	{
		try 
		{
			let fileReader = new FileReader();
			let unsplitText;
			fileReader.onload = function() {
				unsplitText = fileReader.result;
				var arrayOfVariables = unsplitText.split("|save|");
				readPlayerData(arrayOfVariables);
			};
			fileReader.readAsText(fileContent);
		}
		catch (err) 
		{
			consoleLogDebug("Invalid JSON: " + err);
		}
	}
	else 
	{
		consoleLogDebug("Failed eating a drive cookie :C");
	}
}

function bakeDriveCookie()
{
	const fileName = "NOTMMO_STILLRPG_SAVEFILE.json";

	const fileContent = dataToSave;
	const file = new Blob([fileContent], { type: 'application/json' });

	const a = document.createElement('a');
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}
