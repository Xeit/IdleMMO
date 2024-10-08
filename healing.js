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
		playerHealth += playerStamina * 2;
		playerMana += playerIntelligence * 2;
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