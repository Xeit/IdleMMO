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
			if((timeFromLastTick >= 1000) || levelBreeze == true)
			{
				if(levelBreeze != true)
				{
					timeFromLastTick -= 1000;
				}
				else
				{
					timeFromLastTick = 0;
				}

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


	if(currentTask != newTask)
	{
		var bShouldStopPreviousTask = false;
		//End current task
		switch(newTask)
		{
			case PlayerTasks.farming_monsters:
				bShouldStopPreviousTask = true;
				break;
			case PlayerTasks.healing:
				bShouldStopPreviousTask = true;
				break;
			case PlayerTasks.training:
				bShouldStopPreviousTask = true;
				break;
			case PlayerTasks.equipment:
				break;
			case PlayerTasks.questing:
				bShouldStopPreviousTask = true;
				break;
			case PlayerTasks.shop:
				break;
			default:
				break;
		}
	
		if(bShouldStopPreviousTask == true)
		{
			//End current task
			switch(currentTask)
			{
				case PlayerTasks.farming_monsters:
					stopBattle();
					break;
				case PlayerTasks.healing:
					stopHealing();
					break;
				case PlayerTasks.training:
					stopTraining();
					break;
				case PlayerTasks.questing:
					stopQuesting();
					break;
				default:
					break;
			}
			currentTask = newTask;
		}
	
		//Start new task
		switch(newTask)
		{
			case PlayerTasks.farming_monsters:
				startBattle();
				break;
			case PlayerTasks.healing:
				startHealing();
				break;
			case PlayerTasks.training:
				startTraining();
				break;
			case PlayerTasks.questing:
				startQuesting();
				break;
			default:
				break;
		}
	}

	//Set current task
	currentOpenWindow = newTask;
	$("#task_info").text("CURRENT TASK: " + currentTask);
}