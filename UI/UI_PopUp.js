function UIGenerateLevelUpContent()
{
	const popupContentInside = document.createElement("div");

	popupContentInside.append(UIDiv_ClassTextGenerator("title", "Level Up!"));
	popupContentInside.append(UIDiv_SpaceGenerator());
	popupContentInside.append(UIDiv_TextGenerator("Unlocked:"));
	popupContentInside.append(UIDiv_SpaceGenerator());
	popupContentInside.append(UIDiv_TextGenerator("+3 Max Attributes"));

	switch(player.level)
	{
		case 2:
			popupContentInside.append(UIDiv_TextGenerator("Training Attributes!"));
			popupContentInside.append(UIDiv_TextGenerator("Monster Battles!"));
			popupContentInside.append(UIDiv_TextGenerator("Healing!"));
			popupContentInside.append(UIDiv_TextGenerator("Equipment!"));
			break;
		case 7:
			popupContentInside.append(UIDiv_TextGenerator("Smith (upgrading eq)!"));
			break;
		case 10:
			popupContentInside.append(UIDiv_TextGenerator("Shops!"));
			break;
		case 12:
			popupContentInside.append(UIDiv_TextGenerator("Dungeons!"));
			break;
		case 20:
			popupContentInside.append(UIDiv_TextGenerator("New Dungeon!"));
			break;
		case 25:
			popupContentInside.append(UIDiv_TextGenerator("New Dungeon!"));
			break;
		case 35:
			popupContentInside.append(UIDiv_TextGenerator("New Dungeon!"));
			break;
		case 40:
			popupContentInside.append(UIDiv_TextGenerator("New Dungeon!"));
			break;
		case 45:
			popupContentInside.append(UIDiv_TextGenerator("New Dungeon!"));
			break;
		case 48:
			popupContentInside.append(UIDiv_TextGenerator("New Dungeon!"));
			break;
		case 50:
			popupContentInside.append(UIDiv_TextGenerator("New Dungeon!"));
			break;
	}
	
	return popupContentInside;
}