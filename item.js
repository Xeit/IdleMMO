const ItemRarity = {
	none : "none",
	common: "common",
	uncommon: "uncommon",
	magic: "magic",
	rare: "rare",
	mythic: "mythic",
	legendary: "legendary"
 };

 const ItemSlot = {
	none: "none",
	weapon: "weapon",
	helmet: "helmet",
	body_armour: "body armour",
	gloves: "gloves",
	boots: "boots"
 }

class Item
{
	itemRarity = ItemRarity.none;
	itemSlot = ItemSlot.none;
	itemLevel = 0;
	itemName = "";
	itemUpgradeLevel = 0;
	itemUpgradePitty = 0;

	returnItemPower(bWithUpgrades) 
	{
		var itemPower = this.itemLevel;

		switch (this.itemRarity) {
			case ItemRarity.none:
				itemPower = 1;
				break;
			case ItemRarity.common:
				break;
			case ItemRarity.uncommon:
				itemPower = +(1.5 * itemPower).toFixed();
				break;
			case ItemRarity.magic:
				itemPower = +(2 * itemPower).toFixed();
				break;
			case ItemRarity.rare:
				itemPower = +(2.5 * itemPower).toFixed();
				break;
			case ItemRarity.mythic:
				itemPower = +(3.5 * itemPower).toFixed();
				break;
			case ItemRarity.legendary:
				itemPower = +(5 * itemPower).toFixed();
				break;
			default:
				break;
		}

		// Upgrade level 
		if(bWithUpgrades == true)
		{
			itemPower = +(itemPower + (itemPower * (0.1 * this.itemUpgradeLevel))).toFixed();
		}

		return itemPower;
	}
}

function ShowEquipmentWindow()
{
	$("#equipment_window").css("display", "block");
}

function HideEquipmentWindow()
{
	$("#equipment_window").css("display", "none");
}

function InitializeEquipment()
{
	updateEquipmentWindow();
}

function stopEquipment()
{
}

function generateItem(enemyLevel, enemyDifficulty)
{
	//itemPower
	var percentRoll = +(Math.random() * 100).toFixed();
	if(percentRoll < 15)
	{
		enemyLevel -= 2;
	}
	else if(percentRoll < 25)
	{
		enemyLevel -= 1;
	}
	else if(percentRoll < 75)
	{
		//enemyLevel stays the same
	}
	else if(percentRoll < 90)
	{
		enemyLevel += 1;
	}
	else
	{
		enemyLevel += 2;
	}

	//itemRarity
	var newItemRarity = ItemRarity.none;

	switch (enemyDifficulty) 
	{
		case EnemyDifficulty.easy:
			var rarityRoll = rollPosibility(6, 3, 1, 0);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.common, ItemRarity.uncommon, ItemRarity.magic, null);
			break;
		case EnemyDifficulty.medium:
			var rarityRoll = rollPosibility(20, 45, 30, 5);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.common, ItemRarity.uncommon, ItemRarity.magic, ItemRarity.rare);
			break;
		case EnemyDifficulty.hard:
			var rarityRoll = rollPosibility(6, 3, 1, 0);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.uncommon, ItemRarity.magic, ItemRarity.rare, null);
			break;
		case EnemyDifficulty.very_hard:
			var rarityRoll = rollPosibility(20, 45, 30, 5);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.uncommon, ItemRarity.magic, ItemRarity.rare, ItemRarity.mythic);
			break;
		case EnemyDifficulty.mini_boss:
			var rarityRoll = rollPosibility(20, 45, 30, 5);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.magic, ItemRarity.rare, ItemRarity.mythic, ItemRarity.legendary);
			break;
		case EnemyDifficulty.boss:
			var rarityRoll = rollPosibility(6, 3, 1, 0);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.rare, ItemRarity.mythic, ItemRarity.legendary, null);
			break;
		default:
			break;
	}

	//itemSlot
	var itemSlot = ItemSlot.none;
	var itemName = ""
	var itemTypeRoll = Math.round(Math.random() * 100);
	if(itemTypeRoll < 20)
	{
		itemSlot = ItemSlot.weapon;
	}
	else if(itemTypeRoll < 40)
	{
		itemSlot = ItemSlot.helmet;
	}
	else if(itemTypeRoll < 60)
	{
		itemSlot = ItemSlot.body_armour;
	}
	else if(itemTypeRoll < 80)
	{
		itemSlot = ItemSlot.gloves;
	}
	else
	{
		itemSlot = ItemSlot.boots;
	}

	itemName = newItemRarity + " " + itemSlot;

	let newItem = new Item();
	newItem.itemRarity = newItemRarity;
	newItem.itemSlot = itemSlot;
	newItem.itemLevel = enemyLevel;
	newItem.itemName = itemName;
	return (newItem);
}

function updateEquipmentWindow()
{
	if(player.weaponSlot instanceof Item)
	{
		const overlayColor = "radial-gradient(circle,rgba(255, 255, 255, 0) 20%, " + UIGetItemRarityColor(player.weaponSlot.itemRarity) + " 70%";
		$("#equipment_weapon_overlay").css("background", overlayColor);
		$("#equipment_weapon_name").css("color", UIGetItemRarityColor(player.weaponSlot.itemRarity));
		$("#equipment_weapon_name").text(player.weaponSlot.itemName);
		$("#equipment_weapon_level").text(player.weaponSlot.itemLevel);
		$("#equipment_weapon_power").text(player.weaponSlot.returnItemPower(true));
	}
	if(player.helmetSlot instanceof Item)
	{
		const overlayColor = "radial-gradient(circle,rgba(255, 255, 255, 0) 20%, " + UIGetItemRarityColor(player.helmetSlot.itemRarity) + " 70%";
		$("#equipment_helmet_overlay").css("background", overlayColor);
		$("#equipment_helmet_name").css("color", UIGetItemRarityColor(player.helmetSlot.itemRarity));
		$("#equipment_helmet_name").text(player.helmetSlot.itemName);
		$("#equipment_helmet_level").text(player.helmetSlot.itemLevel);
		$("#equipment_helmet_power").text(player.helmetSlot.returnItemPower(true));
	}
	if(player.bodyArmourSlot instanceof Item)
	{
		const overlayColor = "radial-gradient(circle,rgba(255, 255, 255, 0) 20%, " + UIGetItemRarityColor(player.bodyArmourSlot.itemRarity) + " 70%";
		$("#equipment_body_armour_overlay").css("background", overlayColor);
		$("#equipment_body_armour_name").css("color", UIGetItemRarityColor(player.bodyArmourSlot.itemRarity));
		$("#equipment_body_armour_name").text(player.bodyArmourSlot.itemName);
		$("#equipment_body_armour_level").text(player.bodyArmourSlot.itemLevel);
		$("#equipment_body_armour_power").text(player.bodyArmourSlot.returnItemPower(true));
	}
	if(player.glovesSlot instanceof Item)
	{
		const overlayColor = "radial-gradient(circle,rgba(255, 255, 255, 0) 20%, " + UIGetItemRarityColor(player.glovesSlot.itemRarity) + " 70%";
		$("#equipment_gloves_overlay").css("background", overlayColor);
		$("#equipment_gloves_name").css("color", UIGetItemRarityColor(player.glovesSlot.itemRarity));
		$("#equipment_gloves_name").text(player.glovesSlot.itemName);
		$("#equipment_gloves_level").text(player.glovesSlot.itemLevel);
		$("#equipment_gloves_power").text(player.glovesSlot.returnItemPower(true));
	}
	if(player.bootsSlot instanceof Item)
	{
		const overlayColor = "radial-gradient(circle,rgba(255, 255, 255, 0) 20%, " + UIGetItemRarityColor(player.bootsSlot.itemRarity) + " 70%";
		$("#equipment_boots_overlay").css("background", overlayColor);
		$("#equipment_boots_name").css("color", UIGetItemRarityColor(player.bootsSlot.itemRarity));
		$("#equipment_boots_name").text(player.bootsSlot.itemName);
		$("#equipment_boots_level").text(player.bootsSlot.itemLevel);
		$("#equipment_boots_power").text(player.bootsSlot.returnItemPower(true));
	}
}

function rollPosibility(firstWeight, secondWeight, thirdWeight, fourthWeight)
{
	let selectedRoll = 0;

	let fullWeight = firstWeight + secondWeight + thirdWeight + fourthWeight;

	let roll = Math.round(Math.random() * fullWeight);

	let bFinished = false;
	roll -= firstWeight;
	if(roll <= 0)
	{
		selectedRoll = 1;
		bFinished = true;
	}

	if(!bFinished)
	{
		roll -= secondWeight;
		if(roll <= 0)
		{
			selectedRoll = 2;
			bFinished = true;
		}
	}

	if(!bFinished)
	{
		roll -= thirdWeight;
		if(roll <= 0)
		{
			selectedRoll = 3;
			bFinished = true;
		}
	}
	
	if(!bFinished)
	{
		selectedRoll = 4;
		bFinished = true;
	}

	return selectedRoll;
}

//this function is basically glorified switch-case to not copy-paste too much
function selectCorrectRarity(selectedRarityNumber, firstRarity, secondRarity, thirdRarity, fourthRarity)
{
	let selectedRarity;
	switch(selectedRarityNumber)
	{
		case 1:
			selectedRarity = firstRarity;
			break;
		case 2:
			selectedRarity = secondRarity;
			break;
		case 3:
			selectedRarity = thirdRarity;
			break;
		case 4:
			selectedRarity = fourthRarity;
			break;
	}

	return selectedRarity;
}

function tryNewItem(newItem)
{
	var currentItemPower = 0;
	var bGotNewItem = false;
	
	switch (newItem.itemSlot) {
		case ItemSlot.weapon:
			if(player.weaponSlot instanceof Item)
			{
				currentItemPower = player.weaponSlot.returnItemPower(false);
			}
			if(newItem.returnItemPower(false) > currentItemPower)
			{
				player.weaponSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.boots:
			if(player.bootsSlot instanceof Item)
			{
				currentItemPower = player.bootsSlot.returnItemPower(false);
			}
			if(newItem.returnItemPower(false) > currentItemPower)
			{
				player.bootsSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.gloves:
			if(player.glovesSlot instanceof Item)
			{
				currentItemPower = player.glovesSlot.returnItemPower(false);
			}
			if(newItem.returnItemPower(false) > currentItemPower)
			{
				player.glovesSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.helmet:
			if(player.helmetSlot instanceof Item)
			{
				currentItemPower = player.helmetSlot.returnItemPower(false);
			}
			if(newItem.returnItemPower(false) > currentItemPower)
			{
				player.helmetSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.body_armour:
			if(player.bodyArmourSlot instanceof Item)
			{
				currentItemPower = player.bodyArmourSlot.returnItemPower(false);
			}
			if(newItem.returnItemPower(false) > currentItemPower)
			{
				player.bodyArmourSlot = newItem;
				bGotNewItem = true;
			}
			break;
		default:
			break;
	}

	if(bGotNewItem)
	{
		UIShowPopup("NewItem", currentItemPower, newItem);
	}

	return bGotNewItem;
}

function castObjectToItem(objectToCast)
{
	let returnItem = new Item();

	returnItem.itemRarity = objectToCast.itemRarity;
	returnItem.itemSlot = objectToCast.itemSlot;
	returnItem.itemLevel = objectToCast.itemLevel;
	returnItem.itemName = objectToCast.itemName;
	returnItem.itemUpgradeLevel = objectToCast.itemUpgradeLevel;
	returnItem.itemUpgradePitty = objectToCast.itemUpgradePitty;

	return returnItem;
}