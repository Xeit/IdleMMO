var bIsTraining = false;

var currentlyTrainedStatystic = "none"

function initializeTraining()
{

	$("#train_strength").click(function(){
		currentlyTrainedStatystic = "strength";
	});
	
	$("#train_dexterity").click(function(){
		currentlyTrainedStatystic = "dexterity";
	});
	
	$("#train_stamina").click(function(){
		currentlyTrainedStatystic = "stamina";
	});
	
	$("#train_intelligence").click(function(){
		currentlyTrainedStatystic = "intelligence";
	});

	updateTrainingXpValues();
}

function stopTraining()
{
	bIsTraining = false;
	currentlyTrainedStatystic = "none";
	$("#training_window").css("display", "none");
}

function startTraining()
{
	bIsTraining = true;
	updateTrainingXpValues();
	$("#training_window").css("display", "block");
}

function tickTraining()
{
	if(bIsTraining)
	{
		const maxPlayerStatLvl = playerLevel * 3;
		const xpToReceive = 1 + Math.floor(playerIntelligence /2);

		switch(currentlyTrainedStatystic)
		{
			case "none":
				break;
			case "strength":
				if(playerStrength < maxPlayerStatLvl)
				{
					playerStrengthXP += xpToReceive;

					if(playerStrengthXP >= playerStrengthRequiredXP)
					{
						playerStrength += 1;
						playerStrengthXP = 0;

						const LevelPenalty = +Math.floor(playerStrength / 50)
						if(LevelPenalty > 0)
						{
							playerStrengthRequiredXP = LevelPenalty * playerStrength * 50;
						}
						else
						{
							playerStrengthRequiredXP = playerStrength * 50;
						}
					}
				}
				break;
			case "dexterity":
				if(playerDexterity < maxPlayerStatLvl)
				{
					playerDexterityXP += xpToReceive;

					if(playerDexterityXP >= playerDexterityRequiredXP)
					{
						playerDexterity += 1;
						playerDexterityXP = 0;

						const LevelPenalty = +Math.floor(playerDexterity / 50)
						if(LevelPenalty > 0)
						{
							playerDexterityRequiredXP = LevelPenalty * playerDexterity * 50;
						}
						else
						{
							playerDexterityRequiredXP = playerDexterity * 50;
						}
					}
				}
				break;
			case "stamina":
				if(playerStamina < maxPlayerStatLvl)
				{
					playerStaminaXP += xpToReceive;

					if(playerStaminaXP >= playerStaminaRequiredXP)
					{
						playerStamina += 1;
						playerStaminaXP = 0;

						const LevelPenalty = +Math.floor(playerStamina / 50)
						if(LevelPenalty > 0)
						{
							playerStaminaRequiredXP = LevelPenalty * playerStamina * 50;
						}
						else
						{
							playerStaminaRequiredXP = playerStamina * 50;
						}
					}
				}
				break;
			case "intelligence":
				if(playerIntelligence < maxPlayerStatLvl)
				{
					playerIntelligenceXP += xpToReceive;

					if(playerIntelligenceXP >= playerIntelligenceRequiredXP)
					{
						playerIntelligence += 1;
						playerIntelligenceXP = 0;

						const LevelPenalty = +Math.floor(playerIntelligence / 50) // Bonus multiplier to required xp every 50 lvls
						if(LevelPenalty > 0)
						{
							playerIntelligenceRequiredXP = LevelPenalty * playerIntelligence * 50;
						}
						else
						{
							playerIntelligenceRequiredXP = playerIntelligence * 50;
						}
					}
				}
				break;
		}

		updateTrainingXpValues();
	}
}

function updateTrainingXpValues()
{
	const maxStrengthLvl = playerLevel * 3;
	if(playerStrength < maxStrengthLvl)
	{
		$("#training_strength_xp").html("XP: " + playerStrengthXP + "/" + playerStrengthRequiredXP);
	}
	else
	{
		$("#training_strength_xp").html("MAX for current LVL");
	}

	const maxDexterityLvl = playerLevel * 3;
	if(playerDexterity < maxDexterityLvl)
	{
		$("#training_dexterity_xp").html("XP: " + playerDexterityXP + "/" + playerDexterityRequiredXP);
	}
	else
	{
		$("#training_dexterity_xp").html("MAX for current LVL");
	}

	const maxStaminaLvl = playerLevel * 3;
	if(playerStamina < maxStaminaLvl)
	{
		$("#training_stamina_xp").html("XP: " + playerStaminaXP + "/" + playerStaminaRequiredXP);
	}
	else
	{
		$("#training_stamina_xp").html("MAX for current LVL");
	}

	const maxIntelligenceLvl = playerLevel * 3;
	if(playerIntelligence < maxIntelligenceLvl)
	{
		$("#training_intelligence_xp").html("XP: " + playerIntelligenceXP + "/" + playerIntelligenceRequiredXP);
	}
	else
	{
		$("#training_intelligence_xp").html("MAX for current LVL");
	}
}