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
	$("#player_info_level").text(player.level);

	const playerXpPercent = (player.xp / player.requiredXp * 100).toFixed(2) + "%";
	$("#player_info_xp").text(playerXpPercent);
	$("#XP.player_info_element").css("background-size", playerXpPercent + " 100%");
	$("#XP.player_info_element").css("background-repeat", "no-repeat");

	const playerHealthPercent = (player.health / player.maxHealth * 100).toFixed() + "%";
	$("#player_info_health").text(playerHealthPercent);
	$("#HP.player_info_element").css("background-size", playerHealthPercent + " 100%");
	$("#HP.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_health_potions").text(player.healthPotions);
	
	const playerManaPercent = (player.mana / player.maxMana * 100).toFixed() + "%";
	$("#player_info_mana").text(playerManaPercent);
	$("#MANA.player_info_element").css("background-size", playerManaPercent + " 100%");
	$("#MANA.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_gold").text(player.gold);
	
	const maxSkillsLvl = player.level * 3;
	$("#player_info_strength").text(player.strength + "/" + maxSkillsLvl);
	const playerSTRPercent = (player.strength / maxSkillsLvl * 100).toFixed() + "%";
	$("#STR.player_info_element").css("background-size", playerSTRPercent + " 100%");
	$("#STR.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_dexterity").text(player.dexterity + "/" + maxSkillsLvl);
	const playerDEXPercent = (player.dexterity / maxSkillsLvl * 100).toFixed() + "%";
	$("#DEX.player_info_element").css("background-size", playerDEXPercent + " 100%");
	$("#DEX.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_stamina").text(player.stamina + "/" + maxSkillsLvl);
	const playerSTAPercent = (player.stamina / maxSkillsLvl * 100).toFixed() + "%";
	$("#STA.player_info_element").css("background-size", playerSTAPercent + " 100%");
	$("#STA.player_info_element").css("background-repeat", "no-repeat");

	$("#player_info_intelligence").text(player.intelligence + "/" + maxSkillsLvl);
	const playerINTPercent = (player.intelligence / maxSkillsLvl * 100).toFixed() + "%";
	$("#INT.player_info_element").css("background-size", playerINTPercent + " 100%");
	$("#INT.player_info_element").css("background-repeat", "no-repeat");
	
	const playerEXHPercent = (player.exhaustion / player.maxExhaustion * 100).toFixed() + "%";
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
		$("#battle_window_drops_power").text("iLvl: " + generatedNewItem.itemLevel + " Power: " + generatedNewItem.returnItemPower(false));
	}
}

function DisplayCritChanceUI(againstEnemyLevel)
{
	var playerDisplayedCritChance = Math.round(player.dexterity / (againstEnemyLevel * 3 * 2) * 100);
	if(playerDisplayedCritChance > 100)
	{
		playerDisplayedCritChance = 100;
	}
	$("#battle_player_crit_chance").text("Crit chance: " + playerDisplayedCritChance + "%");
}

function UIDisplayNewTask(newTaskToDisplay)
{
	//Hide current task
	switch(currentOpenWindow)
	{
		case PlayerTasks.none:
			$("#empty_window").css("display", "none");
			break;
		case PlayerTasks.farming_monsters:
			HideBattleWindow();
			break;
		case PlayerTasks.healing:
			HideHealingWindow();
			break;
		case PlayerTasks.training:
			HideTrainingWindow();
			break;
		case PlayerTasks.equipment:
			HideEquipmentWindow();
			break;
		case PlayerTasks.questing:
			HideQuestingWindow();
			break;
		case PlayerTasks.shop:
			HideShopsWindow();
			break;
		case PlayerTasks.smith:
			HideSmithWindow();
			break;
		case PlayerTasks.dungeon:
			hideDungeonWindow();
			break;
	}

	//Start new task
	switch(newTaskToDisplay)
	{
		case PlayerTasks.none:
			$("#empty_window").css("display", "block");
			break;
		case PlayerTasks.farming_monsters:
			ShowBattleWindow();
			break;
		case PlayerTasks.healing:
			ShowHealingWindow();
			break;
		case PlayerTasks.training:
			ShowTrainingWindow();
			break;
		case PlayerTasks.equipment:
			ShowEquipmentWindow();
			break;
		case PlayerTasks.questing:
			ShowQuestingWindow();
			break;
		case PlayerTasks.shop:
			ShowShopsWindow();
			break;
		case PlayerTasks.smith:
			ShowSmithWindow();
			break;
		case PlayerTasks.dungeon:
			showDungeonWindow();
			break;
	}
}

function consoleLogDebug(text)
{
	if(debugGame == true)
	{
		console.log(text);
	}
}

function UIUpdateBuffInfoPanel()
{
	if(player.buffList.length > 0)
	{
		$("#player_info_buffs").css("display", "block");
	}
	else
	{
		$("#player_info_buffs").css("display", "none");
	}

	$("#player_info_buffs").empty();

	for(var i = 0; i < player.buffList.length; i = i + 1)
	{
		if(typeof(player.buffList[i] == PlayerBuff))
		{
			let buffMinutesLeft = Math.trunc(player.buffList[i].buffDuration / 60);
			let buffSecondsLeft = player.buffList[i].buffDuration - (buffMinutesLeft * 60);

			var buffDurationString = buffMinutesLeft.toString() + ':';
			if(buffSecondsLeft > 9)
			{
				buffDurationString += buffSecondsLeft.toString();
			}
			else
			{
				buffDurationString += '0' + buffSecondsLeft.toString();
			}

			let buffInfoElement = document.createElement("div");
			buffInfoElement.setAttribute("class", "player_info_element");
			buffInfoElement.textContent = player.buffList[i].buffName;

			let buffInfoDuration = document.createElement("span");
			buffInfoDuration.textContent = buffDurationString;
			buffInfoElement.append(buffInfoDuration);

			$("#player_info_buffs").append(buffInfoElement);
		}
	}
}
