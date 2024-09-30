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

	constructor (itemRarity, itemSlot, itemLevel, itemName)
	{
		this.itemRarity = itemRarity;
		this.itemSlot = itemSlot;
		this.itemLevel = itemLevel;
		this.itemName = itemName;
	}

	returnItemPower() 
	{
		var itemPower = this.itemLevel;

		switch (this.itemRarity) {
			case ItemRarity.none:
				itemPower = 1;
			case ItemRarity.common:
				break;
			case ItemRarity.uncommon:
				itemPower += 1;
				break;
			case ItemRarity.magic:
				itemPower += 2;
				break;
			case ItemRarity.rare:
				itemPower += 3;
				break;
			case ItemRarity.mythic:
				itemPower += 5;
				break;
			case ItemRarity.legendary:
				itemPower += 10;
				break;
			default:
				break;
		}

		return itemPower;
	}

	SerializeItem()
	{
		var serializedString = this.itemRarity + "|item|";
		serializedString += this.itemSlot + "|item|";
		serializedString += this.itemLevel + "|item|";
		serializedString += this.itemName;
		
		return serializedString;
	}
}

function stopEquipment()
{
	$("#equipment_window").css("display", "none");
}

function startEquipment()
{
	updateEquipmentWindow();
	$("#equipment_window").css("display", "block");
}

function generateItem(enemyLevel)
{
	//itemPower
	var percentRoll = +(Math.random() * 100).toFixed();
	if(percentRoll < 50)
	{
		enemyLevel -= 2;
	}
	else if(percentRoll < 75)
	{
		enemyLevel -= 1;
	}
	else if(percentRoll < 90)
	{
		//enemyLevel stays the same
	}
	else if(percentRoll < 98)
	{
		enemyLevel += 1;
	}
	else
	{
		enemyLevel += 2;
	}

	//itemRarity
	var newItemRarity = ItemRarity.none;
	var rarityRoll = +(Math.random() * 1000).toFixed();
	if(rarityRoll < 700)
		newItemRarity = ItemRarity.common;
	else if(rarityRoll < 900)
		newItemRarity = ItemRarity.uncommon;
	else if(rarityRoll < 950)
		newItemRarity = ItemRarity.magic;
	else if(rarityRoll < 985)
		newItemRarity = ItemRarity.rare;
	else if(rarityRoll < 999)
		newItemRarity = ItemRarity.mythic;
	else
		newItemRarity = ItemRarity.legendary;

	//itemSlot
	var itemSlot = ItemSlot.none;
	var itemName = ""
	var itemTypeRoll = +(Math.random() * 100).toFixed();
	if(itemTypeRoll < 10)
	{
		itemSlot = ItemSlot.weapon;
	}
	else
	{
		var itemSlotRoll = +(Math.random() * 100).toFixed();
		if(itemSlotRoll < 25)
		{
			itemSlot = ItemSlot.helmet;
		}
		else if(itemSlotRoll < 50)
		{
			itemSlot = ItemSlot.body_armour;
		}
		else if(itemSlotRoll < 75)
		{
			itemSlot = ItemSlot.gloves;
		}
		else
		{
			itemSlot = ItemSlot.boots;
		}
	}
	itemName = newItemRarity + " " + itemSlot;

	return (new Item(newItemRarity, itemSlot, enemyLevel, itemName));
}

function updateEquipmentWindow()
{
	if(playerWeaponSlot != null)
	{
		$("#equipment_weapon_name").text(playerWeaponSlot.itemName);
		$("#equipment_weapon_power").text(playerWeaponSlot.returnItemPower());
	}
	if(playerHelmetSlot != null)
	{
		$("#equipment_helmet_name").text(playerHelmetSlot.itemName);
		$("#equipment_helmet_power").text(playerHelmetSlot.returnItemPower());
	}
	if(playerBodyArmourSlot != null)
	{
		$("#equipment_body_armour_name").text(playerBodyArmourSlot.itemName);
		$("#equipment_body_armour_power").text(playerBodyArmourSlot.returnItemPower());
	}
	if(playerGlovesSlot != null)
	{
		$("#equipment_gloves_name").text(playerGlovesSlot.itemName);
		$("#equipment_gloves_power").text(playerGlovesSlot.returnItemPower());
	}
	if(playerBootsSlot != null)
	{
		$("#equipment_boots_name").text(playerBootsSlot.itemName);	
		$("#equipment_boots_power").text(playerBootsSlot.returnItemPower());
	}
}

function tryNewItem(newItem)
{
	var currentItemPower = 0;
	
	switch (newItem.itemSlot) {
		case ItemSlot.weapon:
			if(playerWeaponSlot != null)
			{
				currentItemPower = playerWeaponSlot.returnItemPower();
			}
			if(newItem.returnItemPower() > currentItemPower)
			{
				playerWeaponSlot = newItem;
			}
			break;
		case ItemSlot.boots:
			if(playerBootsSlot != null)
			{
				currentItemPower = playerBootsSlot.returnItemPower();
			}
			if(newItem.returnItemPower() > currentItemPower)
			{
				playerBootsSlot = newItem;
			}
			break;
		case ItemSlot.gloves:
			if(playerGlovesSlot != null)
			{
				currentItemPower = playerGlovesSlot.returnItemPower();
			}
			if(newItem.returnItemPower() > currentItemPower)
			{
				playerGlovesSlot = newItem;
			}
			break;
		case ItemSlot.helmet:
			if(playerHelmetSlot != null)
			{
				currentItemPower = playerHelmetSlot.returnItemPower();
			}
			if(newItem.returnItemPower() > currentItemPower)
			{
				playerHelmetSlot = newItem;
			}
			break;
		case ItemSlot.body_armour:
			if(playerBodyArmourSlot != null)
			{
				currentItemPower = playerBodyArmourSlot.returnItemPower();
			}
			if(newItem.returnItemPower() > currentItemPower)
			{
				playerBodyArmourSlot = newItem;
			}
			break;
		default:
			break;
	}
}