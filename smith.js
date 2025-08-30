var smithCurrentItemSlot = undefined;

function ShowSmithWindow()
{
	SmithUpdateButtonsInfo();
	SmithUpdatePanelInfo();
	$("#smith_window").css("display", "flex");
}

function HideSmithWindow()
{
	$("#smith_window").css("display", "none");
	smithCurrentItemSlot = undefined;
}

function InitializeSmith()
{
	$("#smithWeapon").click(function()
	{
		SmithNewItemSlot(playerWeaponSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithHelmet").click(function()
	{
		SmithNewItemSlot(playerHelmetSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithBodyArmour").click(function()
	{
		SmithNewItemSlot(playerBodyArmourSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithGloves").click(function()
	{
		SmithNewItemSlot(playerGlovesSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithBoots").click(function()
	{
		SmithNewItemSlot(playerBootsSlot);
		SmithUpdatePanelInfo();
	});
}

function SmithUpdateButtonsInfo()
{
	if(playerWeaponSlot !== undefined)
	{
		$("#smithWeapon_upgradeLevel").text("+" + playerWeaponSlot.itemUpgradeLevel);
		$("#smithWeapon_rarity").text(playerWeaponSlot.itemRarity.toUpperCase());
		$("#smithWeapon_pitty").text(playerWeaponSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(playerWeaponSlot) + " PITTY");
	}
	if(playerHelmetSlot !== undefined)
	{
		$("#smithHelmet_upgradeLevel").text("+" + playerHelmetSlot.itemUpgradeLevel);
		$("#smithHelmet_rarity").text(playerHelmetSlot.itemRarity.toUpperCase());
		$("#smithHelmet_pitty").text(playerHelmetSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(playerHelmetSlot) + " PITTY");
	}
	if(playerBodyArmourSlot !== undefined)
	{
		$("#smithBodyArmour_upgradeLevel").text("+" + playerBodyArmourSlot.itemUpgradeLevel);
		$("#smithBodyArmour_rarity").text(playerBodyArmourSlot.itemRarity.toUpperCase());
		$("#smithBodyArmour_pitty").text(playerBodyArmourSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(playerBodyArmourSlot) + " PITTY");
	}
	if(playerGlovesSlot !== undefined)
	{
		$("#smithGloves_upgradeLevel").text("+" + playerGlovesSlot.itemUpgradeLevel);
		$("#smithGloves_rarity").text(playerGlovesSlot.itemRarity.toUpperCase());
		$("#smithGloves_pitty").text(playerGlovesSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(playerGlovesSlot) + " PITTY");
	}
	if(playerBootsSlot !== undefined)
	{
		$("#smithBoots_upgradeLevel").text("+" + playerBootsSlot.itemUpgradeLevel);
		$("#smithBoots_rarity").text(playerBootsSlot.itemRarity.toUpperCase());
		$("#smithBoots_pitty").text(playerBootsSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(playerBootsSlot) + " PITTY");
	}
}

function SmithUpdatePanelInfo()
{
	if(smithCurrentItemSlot instanceof Item)
	{
		$("#smithInfo_ILVL").text("iLvl: " + smithCurrentItemSlot.itemLevel);

		let temporaryItemWithNextUpgrade = new Item();
		Object.assign(temporaryItemWithNextUpgrade, smithCurrentItemSlot);
		temporaryItemWithNextUpgrade.itemUpgradeLevel = temporaryItemWithNextUpgrade.itemUpgradeLevel + 1;
		let additionalUpgradePower = temporaryItemWithNextUpgrade.returnItemPower(true) - smithCurrentItemSlot.returnItemPower(true);
		$("#smithInfo_Power").text("ITEM POWER: " + smithCurrentItemSlot.returnItemPower(true) + " (+" + additionalUpgradePower + ")");

		$("#smithInfo_itemRarity").text(smithCurrentItemSlot.itemRarity.toUpperCase());
		$("#smithInfo_itemSlot").text(smithCurrentItemSlot.itemSlot.toUpperCase());
		$("#smithInfo_itemUpgradeLevel").text("+ " + smithCurrentItemSlot.itemUpgradeLevel);
		$("#smithInfo_goldCost").text(SmithGetUpgradeGoldCost() + " G");
		$("#smithInfo_itemCost").text("NOTHING");
		$("#smithInfo_upgradeChance").text(SmithGetUpgradeChance(smithCurrentItemSlot) * 100 + "%");
		$("#smithInfo_pitty").text(smithCurrentItemSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(smithCurrentItemSlot));
	}
	else
	{
		$("#smithInfo_ILVL").text("NONE");
		$("#smithInfo_Power").text("");
		$("#smithInfo_itemRarity").text("NOTHING");
		$("#smithInfo_itemSlot").text("");
		$("#smithInfo_itemUpgradeLevel").text("");
		$("#smithInfo_goldCost").text("");
		$("#smithInfo_itemCost").text("");
		$("#smithInfo_upgradeChance").text("0%");
	}
}

function SmithGetMaxPitty(itemSlotToUse)
{
	let maxPitty = 0;
	if(itemSlotToUse instanceof Item)
	{
		switch(itemSlotToUse.itemRarity)
		{
			case ItemRarity.none:
				break;
			case ItemRarity.common:
				break;
			case ItemRarity.uncommon:
				maxPitty = 2;
				break;
			case ItemRarity.magic:
				maxPitty = 3;
				break;
			case ItemRarity.rare:
				maxPitty = 6;
				break;
			case ItemRarity.mythic:
				maxPitty = 11;
				break;
			case ItemRarity.legendary:
				maxPitty = 21;
				break;
			default:
				break;
		}
	}
	return maxPitty;
}

function SmithGetUpgradeChance(itemSlotToUse)
{
	let upgradeChance = 0;
	if(itemSlotToUse instanceof Item)
	{
		switch(itemSlotToUse.itemRarity)
		{
			case ItemRarity.none:
				break;
			case ItemRarity.common:
				break;
			case ItemRarity.uncommon:
				upgradeChance = 0.75;
				break;
			case ItemRarity.magic:
				upgradeChance = 0.5;
				break;
			case ItemRarity.rare:
				upgradeChance = 0.2;
				break;
			case ItemRarity.mythic:
				upgradeChance = 0.1;
				break;
			case ItemRarity.legendary:
				upgradeChance = 0.05;
				break;
			default:
				break;
		}
	}
	return upgradeChance;
}

function SmithNewItemSlot(itemSlotToUse)
{
	if(itemSlotToUse instanceof Item)
	{
		smithCurrentItemSlot = itemSlotToUse;
	}
}

function SmithGetUpgradeGoldCost()
{
	let goldCost = 0;
	if(smithCurrentItemSlot instanceof Item)
	{
		switch(smithCurrentItemSlot.itemRarity)
		{
			case ItemRarity.none:
				break;
			case ItemRarity.common:
				break;
			case ItemRarity.uncommon:
				goldCost = 250;
				break;
			case ItemRarity.magic:
				goldCost = 500;
				break;
			case ItemRarity.rare:
				goldCost = 1200;
				break;
			case ItemRarity.mythic:
				goldCost = 2500;
				break;
			case ItemRarity.legendary:
				goldCost = 5000;
				break;
			default:
				break;
		}

		goldCost = goldCost * (1 + smithCurrentItemSlot.itemUpgradeLevel);
	}

	return goldCost;
}