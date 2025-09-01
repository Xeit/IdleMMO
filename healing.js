var bIsHealing = false;

function ShowHealingWindow()
{
	const playerHealthPercentage = player.playerHealth / player.playerMaxHealth * 100;
	$("#player_resting_health").html("Your current HP: " + playerHealthPercentage.toFixed() + "%");
	$("#healing_window").css("display", "flex");
}

function HideHealingWindow()
{
	$("#healing_window").css("display", "none");
}

function stopHealing()
{
	bIsHealing = false;
}

function startHealing()
{
	bIsHealing = true;
}

function tickHealing()
{
	if(bIsHealing)
	{
		//Idea is that with maxes stamina stat on current level player heal 20% of hp per tick.
		//If stamina is lower then heal percentage wise less
		const maxPlayerStatLvl = player.playerLevel * 3;

		const hpToHeal = Math.round(player.playerMaxHealth / 5 * (playerStamina / maxPlayerStatLvl));
		const manaToHeal = Math.round(player.playerMaxMana / 5 * (playerIntelligence / maxPlayerStatLvl));

		player.playerHealth += hpToHeal;
		player.playerMana += manaToHeal;
		if(player.playerHealth > player.playerMaxHealth)
		{
			player.playerHealth = +player.playerMaxHealth;
		}
		if(player.playerMana > player.playerMaxMana)
		{
			player.playerMana = +player.playerMaxMana;
		}
		const playerHealthPercentage = player.playerHealth / player.playerMaxHealth * 100;
		$("#player_resting_health").html("Your current HP: " + playerHealthPercentage.toFixed() + "%");
	}
}

function healPlayerToMax()
{
	player.playerHealth = player.playerMaxHealth;
	player.playerMana = player.playerMaxMana;
}