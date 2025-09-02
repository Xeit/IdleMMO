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
					let requiredXP = player.strength * 50;

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
					let requiredXP = player.dexterity * 50;

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
					let requiredXP = player.stamina * 50;

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
					let requiredXP = player.intelligence * 50;

					if(player.intelligenceXP >= requiredXP)
					{
						player.intelligence += 1;
						player.intelligenceXP = 0;
					}
				}
				break;
		}

		updateTrainingXpValues();
	}
}

function updateTrainingXpValues()
{
	const maxStrengthLvl = player.level * 3;
	if(player.strength < maxStrengthLvl)
	{
		let requiredXP = player.strength * 50;
		$("#training_strength_xp").html("XP: " + player.strengthXP + "/" + requiredXP);
	}
	else
	{
		$("#training_strength_xp").html("MAX for current LVL");
	}

	const maxDexterityLvl = player.level * 3;
	if(player.dexterity < maxDexterityLvl)
	{
		let requiredXP = player.dexterity * 50;
		$("#training_dexterity_xp").html("XP: " + player.dexterityXP + "/" + requiredXP);
	}
	else
	{
		$("#training_dexterity_xp").html("MAX for current LVL");
	}

	const maxStaminaLvl = player.level * 3;
	if(player.stamina < maxStaminaLvl)
	{
		let requiredXP = player.stamina * 50;
		$("#training_stamina_xp").html("XP: " + player.staminaXP + "/" + requiredXP);
	}
	else
	{
		$("#training_stamina_xp").html("MAX for current LVL");
	}

	const maxIntelligenceLvl = player.level * 3;
	if(player.intelligence < maxIntelligenceLvl)
	{
		let requiredXP = player.intelligence * 50;
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
