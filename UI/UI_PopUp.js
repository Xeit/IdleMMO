function UIGenerateLevelUpContent()
{
	const popupContentInside = document.createElement("div");

	popupContentInside.append(UIDiv_ClassText("title", "Level Up!"));
	popupContentInside.append(UIDiv_Space());
	popupContentInside.append(UIDiv_Text("Unlocked:"));
	popupContentInside.append(UIDiv_Space());
	popupContentInside.append(UIDiv_Text("+3 Max Attributes"));

	switch(player.level)
	{
		case 2:
			popupContentInside.append(UIDiv_Text("Training Attributes!"));
			popupContentInside.append(UIDiv_Text("Monster Battles!"));
			popupContentInside.append(UIDiv_Text("Healing!"));
			popupContentInside.append(UIDiv_Text("Equipment!"));
			break;
		case 7:
			popupContentInside.append(UIDiv_Text("Smith (upgrading eq)!"));
			break;
		case 10:
			popupContentInside.append(UIDiv_Text("Shops!"));
			break;
		case 12:
			popupContentInside.append(UIDiv_Text("Dungeons!"));
			break;
		case 20:
			popupContentInside.append(UIDiv_Text("New Dungeon!"));
			break;
		case 25:
			popupContentInside.append(UIDiv_Text("New Dungeon!"));
			break;
		case 35:
			popupContentInside.append(UIDiv_Text("New Dungeon!"));
			break;
		case 40:
			popupContentInside.append(UIDiv_Text("New Dungeon!"));
			break;
		case 45:
			popupContentInside.append(UIDiv_Text("New Dungeon!"));
			break;
		case 48:
			popupContentInside.append(UIDiv_Text("New Dungeon!"));
			break;
		case 50:
			popupContentInside.append(UIDiv_Text("New Dungeon!"));
			break;
	}
	
	return popupContentInside;
}

function UIEquippedNewItem(oldItemPower, newItem)
{
	const popupContentInside = document.createElement("div");

	popupContentInside.append(UIDiv_ClassText("title", "New Item!"));
	popupContentInside.append(UIDiv_Space());
	
	if(newItem instanceof Item)
	{
		popupContentInside.append(UIDiv_Text("Base Power Up!"));

		const powerInfo = document.createElement("div");
		powerInfo.style.display = "flex";
		popupContentInside.append(powerInfo);
		powerInfo.append(UIDiv_ColorText("red", oldItemPower));
		powerInfo.append(UIDiv_Text(" -> "));
		powerInfo.append(UIDiv_ColorText("#00f000", newItem.returnItemPower(false)));

		popupContentInside.append(UIDiv_Text("Slot: " + newItem.itemSlot));
		popupContentInside.append(UIDiv_Text("ilvl: " + newItem.itemLevel));
		popupContentInside.append(UIDiv_ColorText(UIGetItemRarityColor(newItem.itemRarity), "Rarity: " + newItem.itemRarity));
	}

	return popupContentInside;
}