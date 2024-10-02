var timeFromLastTick = 0;

$(document).ready(function()
{
	eatCookie();
	
	initializeTraining();
	initializeQuesting();
	initializeBattle();
	
	updateInfoPanel();

	setInterval(function()
	{
		timeFromLastTick += 10;
		updateProgressBar();
		if(timeFromLastTick >= 1000)
		{
			timeFromLastTick = 0;

			switch(currentTask)
			{
				case PlayerTasks.none:
					break;
				case PlayerTasks.farming_monsters:
					tickBattle();
					break;
				case PlayerTasks.healing:
					tickHealing();
					break;
				case PlayerTasks.training:
					tickTraining();
					break;
				case PlayerTasks.questing:
					tickQuesting();
					break;
			}

			updateInfoPanel();

			bakeACookie();
			//Tbh all bs I wrote was started by this tutorial: https://www.youtube.com/playlist?list=PLgHw_wODS1vX20X7ppbssrn_MU6SaYoDF
			//He had like 4k views on playlist, it's not best tutorial but still helped me start writing this website. Thanks!
			//Old stuff from tutorial on YT that had literally like 1k views, LMAO.
			//Give this man a like and tell him that I send You! https://www.youtube.com/@steamcode4441
		}
	}, 10);

	$("#battleButton").click(function(){
		newPlayerTask(PlayerTasks.farming_monsters);
	});

	$("#questingButton").click(function(){
		newPlayerTask(PlayerTasks.questing);
	})

	$("#recoverHealthButton").click(function(){
		newPlayerTask(PlayerTasks.healing);
	});

	$("#trainingButton").click(function(){
		newPlayerTask(PlayerTasks.training);
	});
	
	$("#equipmentButton").click(function(){
		newPlayerTask(PlayerTasks.equipment);
	});
});

function updateProgressBar()
{
	var fillPercent = (timeFromLastTick / 1000 * 100) + "%";
	$("#tick_progress_inside").css("width", fillPercent);
}

function updateInfoPanel()
{
	$("#player_info_level").text("Level: " + playerLevel);

	if(playerLevel < 10){
		$("#player_info_xp").text("XP: " + (playerXp / playerRequiredXp * 100).toFixed(1) + "%");
	}
	else if(playerLevel < 100){
		$("#player_info_xp").text("XP: " + (playerXp / playerRequiredXp * 100).toFixed(3) + "%");
	}

	$("#player_info_health").text("Health: " + (playerHealth / playerMaxHealth * 100).toFixed() + "%");
	$("#player_info_mana").text("Mana: " + (playerMana / playerMaxMana * 100).toFixed() + "%");

	$("#player_info_gold").text("Gold: " + playerGold);
	
	$("#player_info_strength").text("Strength: " + playerStrength);
	$("#player_info_dexterity").text("Dexterity: " + playerDexterity);
	$("#player_info_stamina").text("Stamina: " + playerStamina);
	$("#player_info_intelligence").text("Intelligence: " + playerIntelligence);
	
	$("#player_info_exhaustion").text("Exhaustion: " + (playerExhaustion / playerMaxExhaustion * 100).toFixed() + "%");
}

function newPlayerTask(newTask)
{
	//End current task
	switch(currentTask)
	{
		case PlayerTasks.none:
			$("#empty_window").css("display", "none");
			break;
		case PlayerTasks.farming_monsters:
			stopBattle();
			break;
		case PlayerTasks.healing:
			stopHealing();
			break;
		case PlayerTasks.training:
			stopTraining();
			break;
		case PlayerTasks.equipment:
			stopEquipment();
			break;
		case PlayerTasks.questing:
			stopQuesting();
			break;
	}

	//Start new task
	switch(newTask)
	{
		case PlayerTasks.none:
			break;
		case PlayerTasks.farming_monsters:
			startBattle();
			break;
		case PlayerTasks.healing:
			startHealing();
			break;
		case PlayerTasks.training:
			startTraining();
			break;
		case PlayerTasks.equipment:
			startEquipment();
			break;
		case PlayerTasks.questing:
			startQuesting();
			break;
	}

	//Set current task
	currentTask = newTask;
	$("#task_info").text("CURRENT TASK: " + currentTask);
}