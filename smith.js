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
		SmithNewItemSlot(player.weaponSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithHelmet").click(function()
	{
		SmithNewItemSlot(player.helmetSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithBodyArmour").click(function()
	{
		SmithNewItemSlot(player.bodyArmourSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithGloves").click(function()
	{
		SmithNewItemSlot(player.glovesSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithBoots").click(function()
	{
		SmithNewItemSlot(player.bootsSlot);
		SmithUpdatePanelInfo();
	});
	$("#smithInfo_upgradeButton").click(function()
	{
		SmithTryToUpgradeItem();
		SmithUpdateButtonsInfo();
		SmithUpdatePanelInfo();
	});
}

function SmithUpdateButtonsInfo()
{
	if(player.weaponSlot !== undefined)
	{
		$("#smithWeapon_upgradeLevel").text("+" + player.weaponSlot.itemUpgradeLevel);
		$("#smithWeapon_rarity").text(player.weaponSlot.itemRarity.toUpperCase());
		$("#smithWeapon_pitty").text(player.weaponSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(player.weaponSlot) + " PITTY");
	}
	if(player.helmetSlot !== undefined)
	{
		$("#smithHelmet_upgradeLevel").text("+" + player.helmetSlot.itemUpgradeLevel);
		$("#smithHelmet_rarity").text(player.helmetSlot.itemRarity.toUpperCase());
		$("#smithHelmet_pitty").text(player.helmetSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(player.helmetSlot) + " PITTY");
	}
	if(player.bodyArmourSlot !== undefined)
	{
		$("#smithBodyArmour_upgradeLevel").text("+" + player.bodyArmourSlot.itemUpgradeLevel);
		$("#smithBodyArmour_rarity").text(player.bodyArmourSlot.itemRarity.toUpperCase());
		$("#smithBodyArmour_pitty").text(player.bodyArmourSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(player.bodyArmourSlot) + " PITTY");
	}
	if(player.glovesSlot !== undefined)
	{
		$("#smithGloves_upgradeLevel").text("+" + player.glovesSlot.itemUpgradeLevel);
		$("#smithGloves_rarity").text(player.glovesSlot.itemRarity.toUpperCase());
		$("#smithGloves_pitty").text(player.glovesSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(player.glovesSlot) + " PITTY");
	}
	if(player.bootsSlot !== undefined)
	{
		$("#smithBoots_upgradeLevel").text("+" + player.bootsSlot.itemUpgradeLevel);
		$("#smithBoots_rarity").text(player.bootsSlot.itemRarity.toUpperCase());
		$("#smithBoots_pitty").text(player.bootsSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(player.bootsSlot) + " PITTY");
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
		$("#smithInfo_pitty").text(smithCurrentItemSlot.itemUpgradePitty + "/" + SmithGetMaxPitty(smithCurrentItemSlot));

		if(smithCurrentItemSlot.itemUpgradePitty >= SmithGetMaxPitty(smithCurrentItemSlot))
		{
			$("#smithInfo_upgradeChance").text("100%");
		}
		else
		{
			$("#smithInfo_upgradeChance").text(SmithGetUpgradeChance(smithCurrentItemSlot) * 100 + "%");
		}

		if(SmithCanUpgradeItem())
		{
			$("#smithInfo_upgradeButton").prop('disabled', false);
			$("#smithInfo_upgradeButton").removeClass("smith_disabledButton");
			$("#smithInfo_upgradeButton").addClass("smith_enabledButton");

			if(smithCurrentItemSlot.itemUpgradePitty >= SmithGetMaxPitty(smithCurrentItemSlot))
			{
				$("#smithInfo_upgradeButton").text("PITTY");
			}
			else
			{
				$("#smithInfo_upgradeButton").text("UPGRADE");
			}
		}
		else
		{
			$("#smithInfo_upgradeButton").prop('disabled', true);
			$("#smithInfo_upgradeButton").removeClass("smith_enabledButton");
			$("#smithInfo_upgradeButton").addClass("smith_disabledButton");
			$("#smithInfo_upgradeButton").text("UPGRADE");
		}
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

		$("#smithInfo_upgradeButton").prop('disabled', true);
		$("#smithInfo_upgradeButton").removeClass("smith_enabledButton");
		$("#smithInfo_upgradeButton").addClass("smith_disabledButton");
		$("#smithInfo_upgradeButton").text("UPGRADE");
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

function SmithCanUpgradeItem()
{
	let bCanUpgradeItem = true;

	if(smithCurrentItemSlot instanceof Item)
	{
		let maxUpgradeLevel = 0;

		switch(smithCurrentItemSlot.itemRarity)
		{
			case ItemRarity.none:
				break;
			case ItemRarity.common:
				break;
			case ItemRarity.uncommon:
				maxUpgradeLevel = 2;
				break;
			case ItemRarity.magic:
				maxUpgradeLevel = 4;
				break;
			case ItemRarity.rare:
				maxUpgradeLevel = 6;
				break;
			case ItemRarity.mythic:
				maxUpgradeLevel = 8;
				break;
			case ItemRarity.legendary:
				maxUpgradeLevel = 10;
				break;
			default:
				break;
		}

		if(smithCurrentItemSlot.itemUpgradeLevel >= maxUpgradeLevel)
		{
			bCanUpgradeItem = false;
		}

		if(SmithGetUpgradeGoldCost() > player.playerGold)
		{
			bCanUpgradeItem = false;
		}
	}
	else
	{
		bCanUpgradeItem = false;
	}

	return bCanUpgradeItem;
}

function SmithTryToUpgradeItem()
{
	// Sanity checks
	if(!(smithCurrentItemSlot instanceof Item) || !SmithCanUpgradeItem())
	{
		return;
	}

	player.playerGold = player.playerGold - SmithGetUpgradeGoldCost();

	//Use pitty
	if(smithCurrentItemSlot.itemUpgradePitty >= SmithGetMaxPitty(smithCurrentItemSlot))
	{
		smithCurrentItemSlot.itemUpgradeLevel = smithCurrentItemSlot.itemUpgradeLevel + 1;
		smithCurrentItemSlot.itemUpgradePitty = 0;
		return;
	}

	const upgradeChance = SmithGetUpgradeChance(smithCurrentItemSlot);
	if(Math.random() <= upgradeChance)
	{
		//Upgraded
		smithCurrentItemSlot.itemUpgradeLevel = smithCurrentItemSlot.itemUpgradeLevel + 1;
		smithCurrentItemSlot.itemUpgradePitty = 0;
	}
	else
	{
		//lol, nope.
		smithCurrentItemSlot.itemUpgradePitty = smithCurrentItemSlot.itemUpgradePitty + 1;
	}
}
