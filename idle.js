var timeFromLastTick = 0;

$(document).ready(function()
{
	eatCookie();
	
	initializeTraining();
	initializeQuesting();
	initializeBattle();
	initializeShops();
	
	updateInfoPanel();
	tickBuffs();
	
	var tickWorker;
	if(typeof(Worker) !== "undefined")
	{
		tickWorker = new Worker("tickWorker.js?v=2");
		tickWorker.onmessage = 
		function(event)
		{
			timeFromLastTick += +event.data;
			updateProgressBar();
			if(timeFromLastTick >= 1000)
			{
				timeFromLastTick -= 1000;

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

				tickBuffs();

				updateInfoPanel();
				bakeACookie();
			}
			UIDecayCritOpacity();
			UIDecayItemDropped();
		};
	}
	else
	{
		//This is a moment when we drop web worker and rely on good old loops.
		
		tickWebWorker();
	}

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

	$("#shopButton").click(function(){
		newPlayerTask(PlayerTasks.shop);
	})
	
	//Tbh all bs I wrote was started by this tutorial: https://www.youtube.com/playlist?list=PLgHw_wODS1vX20X7ppbssrn_MU6SaYoDF
	//He had like 4k views on playlist, it's not best tutorial but still helped me start writing this website. Thanks!
	//Old stuff from tutorial on YT that had literally like 1k views, LMAO.
	//Give this man a like and tell him that I send You! https://www.youtube.com/@steamcode4441
});

function newPlayerTask(newTask)
{
	UIDisplayNewTask(newTask);
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
		case PlayerTasks.shop:
			stopShops();
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
		case PlayerTasks.shop:
			startShops();
			break;
	}

	//Set current task
	currentTask = newTask;
	$("#task_info").text("CURRENT TASK: " + currentTask);
}