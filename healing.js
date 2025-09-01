var bIsHealing = false;

function ShowHealingWindow()
{
	const playerHealthPercentage = player.health / player.maxHealth * 100;
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
		const maxPlayerStatLvl = player.level * 3;

		const hpToHeal = Math.round(player.maxHealth / 5 * (player.stamina / maxPlayerStatLvl));
		const manaToHeal = Math.round(player.maxMana / 5 * (player.intelligence / maxPlayerStatLvl));

		player.health += hpToHeal;
		player.mana += manaToHeal;
		if(player.health > player.maxHealth)
		{
			player.health = +player.maxHealth;
		}
		if(player.mana > player.maxMana)
		{
			player.mana = +player.maxMana;
		}
		const playerHealthPercentage = player.health / player.maxHealth * 100;
		$("#player_resting_health").html("Your current HP: " + playerHealthPercentage.toFixed() + "%");
	}
}

function healPlayerToMax()
{
	player.health = player.maxHealth;
	player.mana = player.maxMana;
}