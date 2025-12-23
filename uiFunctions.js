function updateProgressBar()
{
	var fillPercent = (timeFromLastTick / 1000 * 100) + "%";

	if(timeFromLastTick <= 100)
	{
		fillPercent = "2%";
	}

	$("#tick_progress_inside").css("width", fillPercent);
}

function UIUpdateHPPotionsAmount()
{
	$("#player_info_health_potions").text(player.healthPotions);
}

function UIUpdateGold()
{
	$("#player_info_gold").text(player.gold);
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

	UIUpdateHPPotionsAmount();
	
	const playerManaPercent = (player.mana / player.maxMana * 100).toFixed() + "%";
	$("#player_info_mana").text(playerManaPercent);
	$("#MANA.player_info_element").css("background-size", playerManaPercent + " 100%");
	$("#MANA.player_info_element").css("background-repeat", "no-repeat");

	UIUpdateGold();
	
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
	//TODO: Fix regression that makes sometimes 2 tabs appear at once with something better than this
	$("#empty_window").css("display", "none");
	HideBattleWindow();
	HideHealingWindow();
	HideTrainingWindow();
	HideEquipmentWindow();
	HideQuestingWindow();
	HideShopsWindow();
	HideSmithWindow();
	hideDungeonWindow();
	HideFishingWindow();

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
		case PlayerTasks.fishing:
			ShowFishingWindow();
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

function UIShowPopup(ContentToGenerate, additionalStuff1, additionalStuff2)
{
	// Create popup elements
	const popup = document.createElement("div");
	document.body.appendChild(popup);

	const closeButton = document.createElement("button");
	popup.append(closeButton);

	// Set style for popup and close button
	popup.setAttribute("class", "pop_up");
	popup.style.animation="fadeInFromNone 0.7s ease-in"

	closeButton.setAttribute("class", "close_button");
	closeButton.textContent = "X";

	// Inside content for popup
	let popupContent;
	switch(ContentToGenerate)
	{
		case "LevelUp":
			popupContent = UIGenerateLevelUpContent();
			break;
		case "NewItem":
			popupContent = UIEquippedNewItem(additionalStuff1, additionalStuff2);
			break;
		case "FishCaught":
			popupContent = UIFishSold(additionalStuff1, additionalStuff2);
			break;
	}
	popup.append(popupContent);

	let timeoutId;
	const fadeTime = 1000; // 1 second fade
	const displayTime = 6000; // 6 seconds display

	function startFadeOut() 
	{
		const animationString = "fadeOutToNone " + fadeTime + "ms ease-out";

		popup.style.animation=animationString;
		timeoutId = setTimeout(() => 
		{
			if (popup.parentNode) 
			{
				popup.parentNode.removeChild(popup);
			}
		}, (fadeTime - 25)); // Hack to make it disappear properly on Windows?
	}

	function startTimer() 
	{
		timeoutId = setTimeout(startFadeOut, displayTime);
	}

	// Hover logic
	popup.addEventListener("mouseenter", () => 
	{
		clearTimeout(timeoutId);
		popup.style.animation="";
	});

	popup.addEventListener("mouseleave", () => 
	{
		startTimer();
	});

	// Close button logic
	closeButton.addEventListener("click", () => 
	{
		clearTimeout(timeoutId);
		if (popup.parentNode) 
		{
			popup.parentNode.removeChild(popup);
		}
	});
	
	// Initial timer (Start of the logic)
	startTimer();
}

function UIGetItemRarityColor(itemRarity)
{
	let color = "#ffffff";

	switch (itemRarity) 
	{
		case ItemRarity.none:
			break;
		case ItemRarity.common:
			break;
		case ItemRarity.uncommon:
			color = "#00f000ff";
			break;
		case ItemRarity.magic:
			color = "#00e0f0ff"
			break;
		case ItemRarity.rare:
			color = "#ff8800ff"
			break;
		case ItemRarity.mythic:
			color = "#9000f0ff"
			break;
		case ItemRarity.legendary:
			color = "#f00000ff"
			break;
		default:
			break;
	}

	return color;
}

function UIClearHoverEvents(divToClear)
{
	$(divToClear).unbind("mouseleave");
	$(divToClear).unbind("mouseenter");
	$(divToClear).unbind("mousemove");
}

function UIBindRemovalOfInfoPopup(divToBindTo)
{
	$(divToBindTo).mouseleave(function()
	{
		const popup = $(this).data("info_popup");
		if(popup)
		{
			popup.remove();
			$(this).removeData("info_popup");
		}
	});

	$(divToBindTo).mousemove(function(event)
	{
		const popup = $(this).data("info_popup");
		if(popup)
		{
			popup.style.left = event.pageX + "px";
			popup.style.top = (event.pageY + 40) + "px";
		}
	});
}

function UIGenerateInfoPopup(divToAddInfoEvents, arrayOfDivsToInsert)
{
	$(divToAddInfoEvents).mouseenter(function()
	{
		const popup = document.createElement("div");
		document.body.appendChild(popup);

		popup.setAttribute("class", "pop_up");
		popup.style.animation = "fadeInFromNone 0.5s ease-in";
		
		for(let i = 0; i < arrayOfDivsToInsert.length; i++)
		{
			popup.append(UIDiv_Text(arrayOfDivsToInsert[i]));
		}

		popup.style.pointerEvents = "none";
		
		$(this).data("info_popup", popup);
	});

	UIBindRemovalOfInfoPopup(divToAddInfoEvents);
}
