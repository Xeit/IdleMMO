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
		const maxPlayerStatLvl = player.playerLevel * 3;
		var xpToReceive = 1 + Math.floor(player.playerIntelligence /2);

		if(levelBreeze == true)
		{
			xpToReceive = xpToReceive * 50;
		}

		switch(currentlyTrainedStatystic)
		{
			case "none":
				break;
			case "strength":
				if(player.playerStrength < maxPlayerStatLvl)
				{
					player.playerStrengthXP += xpToReceive;
					let playerStrengthRequiredXP = player.playerStrength * 50;

					if(player.playerStrengthXP >= playerStrengthRequiredXP)
					{
						player.playerStrength += 1;
						player.playerStrengthXP = 0;
					}
				}
				break;
			case "dexterity":
				if(player.playerDexterity < maxPlayerStatLvl)
				{
					player.playerDexterityXP += xpToReceive;
					let playerDexterityRequiredXP = player.playerDexterity * 50;

					if(playerDexterityXP >= playerDexterityRequiredXP)
					{
						player.playerDexterity += 1;
						player.playerDexterityXP = 0;
					}
				}
				break;
			case "stamina":
				if(player.playerStamina < maxPlayerStatLvl)
				{
					player.playerStaminaXP += xpToReceive;
					let playerStaminaRequiredXP = player.playerStamina * 50;

					if(player.playerStaminaXP >= playerStaminaRequiredXP)
					{
						player.playerStamina += 1;
						player.playerStaminaXP = 0;
					}
				}
				break;
			case "intelligence":
				if(player.playerIntelligence < maxPlayerStatLvl)
				{
					player.playerIntelligenceXP += xpToReceive;
					let playerIntelligenceRequiredXP = player.playerIntelligence * 50;

					if(player.playerIntelligenceXP >= playerIntelligenceRequiredXP)
					{
						player.playerIntelligence += 1;
						player.playerIntelligenceXP = 0;
					}
				}
				break;
		}

		updateTrainingXpValues();
	}
}

function updateTrainingXpValues()
{
	const maxStrengthLvl = player.playerLevel * 3;
	if(player.playerStrength < maxStrengthLvl)
	{
		let playerStrengthRequiredXP = player.playerStrength * 50;
		$("#training_strength_xp").html("XP: " + player.playerStrengthXP + "/" + playerStrengthRequiredXP);
	}
	else
	{
		$("#training_strength_xp").html("MAX for current LVL");
	}

	const maxDexterityLvl = player.playerLevel * 3;
	if(player.playerDexterity < maxDexterityLvl)
	{
		let playerDexterityRequiredXP = player.playerDexterity * 50;
		$("#training_dexterity_xp").html("XP: " + player.playerDexterityXP + "/" + playerDexterityRequiredXP);
	}
	else
	{
		$("#training_dexterity_xp").html("MAX for current LVL");
	}

	const maxStaminaLvl = player.playerLevel * 3;
	if(player.playerStamina < maxStaminaLvl)
	{
		let playerStaminaRequiredXP = player.playerStamina * 50;
		$("#training_stamina_xp").html("XP: " + player.playerStaminaXP + "/" + playerStaminaRequiredXP);
	}
	else
	{
		$("#training_stamina_xp").html("MAX for current LVL");
	}

	const maxIntelligenceLvl = player.playerLevel * 3;
	if(player.playerIntelligence < maxIntelligenceLvl)
	{
		let playerIntelligenceRequiredXP = player.playerIntelligence * 50;
		$("#training_intelligence_xp").html("XP: " + player.playerIntelligenceXP + "/" + playerIntelligenceRequiredXP);
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
