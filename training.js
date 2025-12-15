var bIsTraining = false;

var currentlyTrainedStatystic = "none"

function initializeTraining()
{

	$("#train_strength").click(function(){
		ResetTrainingButtons();
		if(currentlyTrainedStatystic == "strength")
		{
			currentlyTrainedStatystic = "none";
		}
		else
		{
			currentlyTrainedStatystic = "strength";
			$("#train_strength").text("TRAINING");
		}
	});
	
	$("#train_dexterity").click(function(){
		ResetTrainingButtons();
		if(currentlyTrainedStatystic == "dexterity")
		{
			currentlyTrainedStatystic = "none";
		}
		else
		{
			currentlyTrainedStatystic = "dexterity";
			$("#train_dexterity").text("TRAINING");
		}
	});
	
	$("#train_stamina").click(function(){
		ResetTrainingButtons();
		if(currentlyTrainedStatystic == "stamina")
		{
			currentlyTrainedStatystic = "none";
		}
		else
		{
			currentlyTrainedStatystic = "stamina";
			$("#train_stamina").text("TRAINING");
		}
	});
	
	$("#train_intelligence").click(function(){
		ResetTrainingButtons();
		if(currentlyTrainedStatystic == "intelligence")
		{
			currentlyTrainedStatystic = "none";
		}
		else
		{
			currentlyTrainedStatystic = "intelligence";
			$("#train_intelligence").text("TRAINING");
		}
	});

	updateTrainingXpValues();
}

function ShowTrainingWindow()
{
	$("#training_window").css("display", "block");
}

function HideTrainingWindow()
{
	$("#training_window").css("display", "none");
}

function stopTraining()
{
	bIsTraining = false;
	currentlyTrainedStatystic = "none";
	ResetTrainingButtons();
}

function startTraining()
{
	bIsTraining = true;
	updateTrainingXpValues();
}

function tickTraining()
{
	if(bIsTraining)
	{
		const maxPlayerStatLvl = player.level * 3;
		var xpToReceive = 1 + Math.floor(player.intelligence /2);

		if(levelBreeze == true)
		{
			xpToReceive = xpToReceive * 50;
		}

		switch(currentlyTrainedStatystic)
		{
			case "none":
				break;
			case "strength":
				if(player.strength < maxPlayerStatLvl)
				{
					player.strengthXP += xpToReceive;
					let requiredXP = player.strength * 35;

					if(player.strengthXP >= requiredXP)
					{
						player.strength += 1;
						player.strengthXP = 0;
					}
				}
				break;
			case "dexterity":
				if(player.dexterity < maxPlayerStatLvl)
				{
					player.dexterityXP += xpToReceive;
					let requiredXP = player.dexterity * 35;

					if(player.dexterityXP >= requiredXP)
					{
						player.dexterity += 1;
						player.dexterityXP = 0;
					}
				}
				break;
			case "stamina":
				if(player.stamina < maxPlayerStatLvl)
				{
					player.staminaXP += xpToReceive;
					let requiredXP = player.stamina * 35;

					if(player.staminaXP >= requiredXP)
					{
						player.stamina += 1;
						player.staminaXP = 0;
					}
				}
				break;
			case "intelligence":
				if(player.intelligence < maxPlayerStatLvl)
				{
					player.intelligenceXP += xpToReceive;
					let requiredXP = player.intelligence * 25;

					if(player.intelligenceXP >= requiredXP)
					{
						player.intelligence += 1;
						player.intelligenceXP = 0;
					}
				}
				break;
		}

		updateTrainingXpValues();
		TrainingGenerateAnimation();
	}
}

function updateTrainingXpValues()
{
	const maxStrengthLvl = player.level * 3;
	if(player.strength < maxStrengthLvl)
	{
		let requiredXP = player.strength * 35;
		$("#training_strength_xp").html("XP: " + player.strengthXP + "/" + requiredXP);
	}
	else
	{
		$("#training_strength_xp").html("MAX for current LVL");
	}

	const maxDexterityLvl = player.level * 3;
	if(player.dexterity < maxDexterityLvl)
	{
		let requiredXP = player.dexterity * 35;
		$("#training_dexterity_xp").html("XP: " + player.dexterityXP + "/" + requiredXP);
	}
	else
	{
		$("#training_dexterity_xp").html("MAX for current LVL");
	}

	const maxStaminaLvl = player.level * 3;
	if(player.stamina < maxStaminaLvl)
	{
		let requiredXP = player.stamina * 35;
		$("#training_stamina_xp").html("XP: " + player.staminaXP + "/" + requiredXP);
	}
	else
	{
		$("#training_stamina_xp").html("MAX for current LVL");
	}

	const maxIntelligenceLvl = player.level * 3;
	if(player.intelligence < maxIntelligenceLvl)
	{
		let requiredXP = player.intelligence * 25;
		$("#training_intelligence_xp").html("XP: " + player.intelligenceXP + "/" + requiredXP);
	}
	else
	{
		$("#training_intelligence_xp").html("MAX for current LVL");
	}
}

function ResetTrainingButtons()
{
	$("#train_strength").text("TRAIN");
	$("#train_dexterity").text("TRAIN");
	$("#train_stamina").text("TRAIN");
	$("#train_intelligence").text("TRAIN");
}

function TrainingGenerateAnimation()
{
	let colorToUse = "#000000ff";
	let divToUpdate;
	const msDuration = 600;
	let fillPercent = "0%";

	switch(currentlyTrainedStatystic)
	{
		case "strength":
			colorToUse = "#ca1c1cff";
			divToUpdate = document.getElementById("training_block_strength");
			if(player.strengthXP == 0)
			{
				fillPercent = 1000;
			}
			else
			{
				fillPercent = player.strengthXP / (player.strength * 35) * 100;
			}
			player.strengthXP;
			break;
		case "dexterity":
			colorToUse = "#05e12aff";
			divToUpdate = document.getElementById("training_block_dexterity");
			if(player.dexterityXP == 0)
			{
				fillPercent = 1000;
			}
			else
			{
				fillPercent = player.dexterityXP / (player.dexterity * 35) * 50;
			}
			break;
		case "stamina":
			colorToUse = "#ffd700";
			divToUpdate = document.getElementById("training_block_stamina");
			if(player.staminaXP == 0)
			{
				fillPercent = 1000;
			}
			else
			{
				fillPercent = player.staminaXP / (player.stamina * 35) * 50;
			}
			break;
		case "intelligence":
			colorToUse = "#4169e1";
			divToUpdate = document.getElementById("training_block_intelligence");
			if(player.intelligenceXP == 0)
			{
				fillPercent = 1000;
			}
			else
			{
				fillPercent = player.intelligenceXP / (player.intelligence * 35) * 50;
			}
			break;
		default: 
			break;
	}

	if(currentlyTrainedStatystic != "none" && divToUpdate !== "undefined")
	{
		consoleLogDebug("Trying to animate?");
		const animTarget = "inset 0px 0px " + fillPercent + "px " + fillPercent + "px " + colorToUse;

		divToUpdate.animate(
			[
				{easing: "ease-out", boxShadow: "inset 0px 0px 0px 0px rgba(0, 0, 0, 0)"},
				{easing: "ease-out", offset: 0.3, boxShadow: animTarget},
				{easing: "ease-in", boxShadow: "inset 0px 0px 0px 0px rgba(0, 0, 0, 0)"}
			],
			msDuration
		)

		divToUpdate.addEventListener("animationend", function()
		{
			divToUpdate.style.animation = "";
		}, { once: true });
	}
}
