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
		let itemPower = this.itemLevel;

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
	$("#equipment_backpack_helmet_equip_button").click(function()
	{
		[player.helmetSlot, player.backpackHelmetSlot] = [player.backpackHelmetSlot, player.helmetSlot];
		updateEquipmentWindow();
	});
	$("#equipment_backpack_bodyArmour_equip_button").click(function()
	{
		[player.bodyArmourSlot, player.backpackBodyArmourSlot] = [player.backpackBodyArmourSlot, player.bodyArmourSlot];
		updateEquipmentWindow();
	});
	$("#equipment_backpack_gloves_equip_button").click(function()
	{
		[player.glovesSlot, player.backpackGlovesSlot] = [player.backpackGlovesSlot, player.glovesSlot];
		updateEquipmentWindow();
	});
	$("#equipment_backpack_boots_equip_button").click(function()
	{
		[player.bootsSlot, player.backpackBootsSlot] = [player.backpackBootsSlot, player.bootsSlot];
		updateEquipmentWindow();
	});
	$("#equipment_backpack_weapon_equip_button").click(function()
	{
		[player.weaponSlot, player.backpackWeaponSlot] = [player.backpackWeaponSlot, player.weaponSlot];
		updateEquipmentWindow();
	});

	updateEquipmentWindow();
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
			var rarityRoll = rollPosibility(20, 45, 30, 6);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.uncommon, ItemRarity.magic, ItemRarity.rare, ItemRarity.mythic);
			break;
		case EnemyDifficulty.mini_boss:
			var rarityRoll = rollPosibility(20, 45, 30, 3);
			newItemRarity = selectCorrectRarity(rarityRoll, ItemRarity.magic, ItemRarity.rare, ItemRarity.mythic, ItemRarity.legendary);
			break;
		case EnemyDifficulty.boss:
			var rarityRoll = rollPosibility(6, 3, 2, 0);
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

function equipmentBindInfoOnEnter(divToHover, itemSlot)
{
	$(divToHover).mouseenter(function()
	{
		const popup = document.createElement("div");
		document.body.appendChild(popup);

		popup.setAttribute("class", "pop_up");
		popup.style.animation = "fadeInFromNone 0.5s ease-in";

		if(itemSlot instanceof Item)
		{
			if(itemSlot.itemSlot == ItemSlot.weapon)
			{
				popup.append(UIDiv_Text("Damage with buffs: " + playerGetMaxDamageNoCrit()));
			}
			else
			{
				popup.append(UIDiv_Text("Total armor value: " + (+playerGetArmourValue() + (+getTotalBuffsWithType(BuffType.defense)))));
			}
		}
		
		popup.style.pointerEvents = "none";
		
		$(this).data("info_popup", popup);
	});
}

function updateEquipmentWindow()
{
	function updateEquipmentSlot(itemSlot, htmlSlotString)
	{
		if(itemSlot instanceof Item)
		{
			const overlayColor = "radial-gradient(circle,rgba(255, 255, 255, 0) 20%, " + UIGetItemRarityColor(itemSlot.itemRarity) + " 70%";
			$("#equipment_"+htmlSlotString+"_overlay").css("background", overlayColor);
			$("#equipment_"+htmlSlotString+"_name").css("color", UIGetItemRarityColor(itemSlot.itemRarity));
			$("#equipment_"+htmlSlotString+"_name").text(itemSlot.itemName);
			$("#equipment_"+htmlSlotString+"_level").text(itemSlot.itemLevel);
			$("#equipment_"+htmlSlotString+"_base_power").text(itemSlot.returnItemPower(false));
			$("#equipment_"+htmlSlotString+"_total_power").text(itemSlot.returnItemPower(true));

			UIClearHoverEvents("#equipment_slot_info_"+htmlSlotString);
			equipmentBindInfoOnEnter("#equipment_slot_info_"+htmlSlotString, itemSlot);
			UIBindRemovalOfInfoPopup("#equipment_slot_info_"+htmlSlotString);
		}
		else
		{
			$("#equipment_"+htmlSlotString+"_overlay").css("background", "#000000");
			$("#equipment_"+htmlSlotString+"_name").css("color", UIGetItemRarityColor(ItemRarity.none));
			$("#equipment_"+htmlSlotString+"_name").text("None");
			$("#equipment_"+htmlSlotString+"_level").text("0");
			$("#equipment_"+htmlSlotString+"_base_power").text("0");
			$("#equipment_"+htmlSlotString+"_total_power").text("0");

			UIClearHoverEvents("#equipment_slot_info_"+htmlSlotString);
		}
	}

	// Equipped
	updateEquipmentSlot(player.weaponSlot, "weapon");
	updateEquipmentSlot(player.helmetSlot, "helmet");
	updateEquipmentSlot(player.bodyArmourSlot, "bodyArmour");
	updateEquipmentSlot(player.glovesSlot, "gloves");
	updateEquipmentSlot(player.bootsSlot, "boots");

	// Backpack
	updateEquipmentSlot(player.backpackHelmetSlot, "backpack_helmet");
	updateEquipmentSlot(player.backpackBodyArmourSlot, "backpack_bodyArmour");
	updateEquipmentSlot(player.backpackGlovesSlot, "backpack_gloves");
	updateEquipmentSlot(player.backpackBootsSlot, "backpack_boots");
	updateEquipmentSlot(player.backpackWeaponSlot, "backpack_weapon");
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
	
	function ShouldSwapItems(mainItemSlot, betterBaseSlot, itemToTest)
	{
		let betterBaseItemPower = 0;
		let newItemPower = 0;

		if(mainItemSlot instanceof Item)
		{
			currentItemPower = mainItemSlot.returnItemPower(false);
		}

		if(betterBaseSlot instanceof Item)
		{
			betterBaseItemPower = betterBaseSlot.returnItemPower(false);
		}

		if(itemToTest instanceof Item)
		{
			newItemPower = itemToTest.returnItemPower(false);
		}

		if(newItemPower > currentItemPower && newItemPower > betterBaseItemPower)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	switch (newItem.itemSlot)
	{
		case ItemSlot.weapon:
			if(ShouldSwapItems(player.weaponSlot, player.backpackWeaponSlot, newItem))
			{
				player.backpackWeaponSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.boots:
			if(ShouldSwapItems(player.bootsSlot, player.backpackBootsSlot, newItem))
			{
				player.backpackBootsSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.gloves:
			if(ShouldSwapItems(player.glovesSlot, player.backpackGlovesSlot, newItem))
			{
				player.backpackGlovesSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.helmet:
			if(ShouldSwapItems(player.helmetSlot, player.backpackHelmetSlot, newItem))
			{
				player.backpackHelmetSlot = newItem;
				bGotNewItem = true;
			}
			break;
		case ItemSlot.body_armour:
			if(ShouldSwapItems(player.bodyArmourSlot, player.backpackBodyArmourSlot, newItem))
			{
				player.backpackBodyArmourSlot = newItem;
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
