function updateProgressBar()
{
	var fillPercent = (timeFromLastTick / 1000 * 100) + "%";

	if(timeFromLastTick <= 100)
	{
		fillPercent = "2%";
	}

	$("#tick_progress_inside").css("width", fillPercent);
}

function updateInfoPanel()
{
	$("#player_info_level").text(playerLevel);

	const playerXpPercent = (playerXp / playerRequiredXp * 100).toFixed(2) + "%";
	$("#player_info_xp").text(playerXpPercent);
	$("#XP.player_info_element").css("background-size", playerXpPercent + " 100%");
	$("#XP.player_info_element").css("background-repeat", "no-repeat");

	const playerHealthPercent = (playerHealth / playerMaxHealth * 100).toFixed() + "%";
	$("#player_info_health").text(playerHealthPercent);
	$("#HP.player_info_element").css("background-size", playerHealthPercent + " 100%");
	$("#HP.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_health_potions").text(playerHealthPotions);
	
	const playerManaPercent = (playerMana / playerMaxMana * 100).toFixed() + "%";
	$("#player_info_mana").text(playerManaPercent);
	$("#MANA.player_info_element").css("background-size", playerManaPercent + " 100%");
	$("#MANA.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_gold").text(playerGold);
	
	const maxSkillsLvl = playerLevel * 3;
	$("#player_info_strength").text(playerStrength + "/" + maxSkillsLvl);
	const playerSTRPercent = (playerStrength / maxSkillsLvl * 100).toFixed() + "%";
	$("#STR.player_info_element").css("background-size", playerSTRPercent + " 100%");
	$("#STR.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_dexterity").text(playerDexterity + "/" + maxSkillsLvl);
	const playerDEXPercent = (playerDexterity / maxSkillsLvl * 100).toFixed() + "%";
	$("#DEX.player_info_element").css("background-size", playerDEXPercent + " 100%");
	$("#DEX.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_stamina").text(playerStamina + "/" + maxSkillsLvl);
	const playerSTAPercent = (playerStamina / maxSkillsLvl * 100).toFixed() + "%";
	$("#STA.player_info_element").css("background-size", playerSTAPercent + " 100%");
	$("#STA.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_intelligence").text(playerIntelligence + "/" + maxSkillsLvl);
	const playerINTPercent = (playerIntelligence / maxSkillsLvl * 100).toFixed() + "%";
	$("#INT.player_info_element").css("background-size", playerINTPercent + " 100%");
	$("#INT.player_info_element").css("background-repeat", "no-repeat");
	
	const playerEXHPercent = (playerExhaustion / playerMaxExhaustion * 100).toFixed() + "%";
	$("#player_info_exhaustion").text(playerEXHPercent);
	$("#EXH.player_info_element").css("background-size", playerEXHPercent + " 100%");
	$("#EXH.player_info_element").css("background-repeat", "no-repeat");
}

function UIDecayCritOpacity()
{
	if(monsterCritOpacity > 0)
	{
		monsterCritOpacity = monsterCritOpacity - monsterCritOpacityDecay;
		$("#battle_monster_crit").css("opacity", monsterCritOpacity);
	}
}

function UIPlayerCrited()
{
	monsterCritOpacity = 1;
	$("#battle_monster_crit").css("opacity", monsterCritOpacity);
}

function UIDecayItemDropped()
{
	if(itemDroppedOpacity > 0)
	{
		itemDroppedOpacity = itemDroppedOpacity - itemDroppedOpacityDecay;
		$("#battle_window_drops").css("opacity", itemDroppedOpacity)
	}
}

function UIItemDropped(generatedNewItem)
{
	if(generatedNewItem instanceof Item)
	{
		itemDroppedOpacity = 1;
		$("#battle_window_drops").css("opacity", itemDroppedOpacity);
		$("#battle_window_drops_name").text(generatedNewItem.itemName);
		$("#battle_window_drops_rarity").text("Rarity: " + generatedNewItem.itemRarity);
		$("#battle_window_drops_slot").text("Slot: " + generatedNewItem.itemSlot);
		$("#battle_window_drops_power").text("iLvl: " + generatedNewItem.itemLevel + " Power: " + generatedNewItem.returnItemPower());
	}
}

function DisplayCritChanceUI(againstEnemyLevel)
{
	var playerDisplayedCritChance = Math.round(playerDexterity / (againstEnemyLevel * 3 * 2) * 100);
	if(playerDisplayedCritChance > 100)
	{
		playerDisplayedCritChance = 100;
	}
	$("#battle_player_crit_chance").text("Crit chance: " + playerDisplayedCritChance + "%");
}
