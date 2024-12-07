var bIsHealing = false;

function stopHealing()
{
	bIsHealing = false;
	$("#healing_window").css("display", "none");
}

function startHealing()
{
	bIsHealing = true;

	const playerHealthPercentage = playerHealth / playerMaxHealth * 100;
	$("#player_resting_health").html("Your current HP: " + playerHealthPercentage.toFixed() + "%");
	$("#healing_window").css("display", "flex");
}

function tickHealing()
{
	if(bIsHealing)
	{
		//Idea is that with maxes stamina stat on current level player heal 20% of hp per tick.
		//If stamina is lower then heal percentage wise less
		const maxPlayerStatLvl = playerLevel * 3;

		const hpToHeal = Math.round(playerMaxHealth / 5 * (playerStamina / maxPlayerStatLvl));
		const manaToHeal = Math.round(playerMaxMana / 5 * (playerIntelligence / maxPlayerStatLvl));

		playerHealth += hpToHeal;
		playerMana += manaToHeal;
		if(playerHealth > playerMaxHealth)
		{
			playerHealth = +playerMaxHealth;
		}
		if(playerMana > playerMaxMana)
		{
			playerMana = +playerMaxMana;
		}
		const playerHealthPercentage = playerHealth / playerMaxHealth * 100;
		$("#player_resting_health").html("Your current HP: " + playerHealthPercentage.toFixed() + "%");
	}
}

function healPlayerToMax()
{
	playerHealth = playerMaxHealth;
	playerMana = playerMaxMana;
}