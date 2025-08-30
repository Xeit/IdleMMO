var smithCurrentItemSlot = undefined;

function ShowSmithWindow()
{
	SmithUpdateButtonsInfo();
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
	});
	$("#smithHelmet").click(function()
	{
		SmithNewItemSlot(playerHelmetSlot);
	});
	$("#smithBodyArmour").click(function()
	{
		SmithNewItemSlot(playerBodyArmourSlot);
	});
	$("#smithGloves").click(function()
	{
		SmithNewItemSlot(playerGlovesSlot);
	});
	$("#smithBoots").click(function()
	{
		SmithNewItemSlot(playerBootsSlot);
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