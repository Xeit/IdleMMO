const AllyRole = 
{
	none: "none",
	tank: "tank",
	healer: "healer",
	dps: "dps"
};

class Ally
{
	role = AllyRole.none;
	itemPower = 1;
	totalExperience = 1;
	health = 100;
	maxHealth = 100;
	enemyTargetID = -1;

	// TODO: This are the most magical number here but it's "stamina reduction" and "buffs"
	// It multiplied monster damage by itself before armour
	staminaDamageReduction = 1;
	// This is flat damage reduction bcs why not
	buffDamageReduction = 0;

	isAlive()
	{
		if(this.health > 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	allyLogic()
	{
		consoleLogDebug("Ally have incorrect class or this function is not overriden in child class. Please fix.");
	}

	findTarget()
	{
		consoleLogDebug("Ally have incorrect class or this function is not overriden in child class. Please fix.");
	}

	attackTarget()
	{
		consoleLogDebug("Ally have incorrect class or this function is not overriden in child class. Please fix.");
	}

	takeDamage(baseMonsterDamageNumber)
	{
		consoleLogDebug("Ally have incorrect class or this function is not overriden in child class. Please fix.");
	}
}

class AllyTank extends Ally
{
	defensiveBuffTimeLeft = 0;

	constructor()
	{
		super();

		this.staminaDamageReduction = 0.8;
		this.buffDamageReduction = 250;
	}

	allyLogic()
	{
		if(!this.isAlive())
		{
			//Ally is dead, there is no point of doing anything.
			return;
		}

		if(this.defensiveBuffTimeLeft <= 1)
		{
			this.castBuff();
			return;
		}

		// I feel like tank should switch targets constantly for feeling of gathering aggro but we will see how this will look.
		this.findTarget();

		// Here should attack target
		this.attackTarget();
	}

	castBuff()
	{
		this.defensiveBuffTimeLeft = 5;
	}

	findTarget()
	{
		this.enemyTargetID = -1;
		let bossID = -1;
		let targetedHealerID = -1;
		let notTargetingTankID = -1;

		for(let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
		{
			if(dungeonCurrentWaveEnemies[i].isAlive())
			{
				if(dungeonCurrentWaveEnemies[i].isBoss)
				{
					bossID = i;
					break; // We just nope out of the loop, this will be 100% the target
				}

				if(dungeonCurrentWaveEnemies[i].target == "healer")
				{
					targetedHealerID = i;
				}
				else if(dungeonCurrentWaveEnemies[i].target != "tank")
				{
					notTargetingTankID = i;
				}
			}
		}

		if(bossID != -1)
		{
			this.enemyTargetID = bossID;
		}
		else if(targetedHealerID != -1)
		{
			this.enemyTargetID = targetedHealerID;
		}
		else if(notTargetingTankID != -1)
		{
			this.enemyTargetID = notTargetingTankID;
		}

		if(this.enemyTargetID != -1)
		{
			// We got one of the preferred targets, we can return.
			return;
		}
		else
		{
			// We select random target. We try to get alive target 3 times then we just take first alive.
			for(let i = 0; i < 3; i++)
			{
				let randomEnemyID = Math.round(Math.random() * dungeonCurrentWaveEnemies.length)
				if(dungeonCurrentWaveEnemies[randomEnemyID].isAlive())
				{
					this.enemyTargetID = randomEnemyID;
					return;
				}
			}
			
			for(let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
			{
				if(dungeonCurrentWaveEnemies[i].isAlive())
				{
					this.enemyTargetID = i;
					return;
				}
			}
		}
	}

	attackTarget()
	{
		if(!dungeonCurrentWaveEnemies[this.enemyTargetID].isAlive())
		{
			return;
		}

		// TODO:
		// Let's say that I'll take quarter of item power to compensate for random buffs player can have.
		// DPS will probably have half of item power
		// It might be changed in the future if it's too OP / underpowered.

		dungeonCurrentWaveEnemies[this.enemyTargetID].health -= Math.round(this.itemPower / 4);
	}

	takeDamage(baseMonsterDamageNumber)
	{
		// TODO: Tbh I have no idea currently how numbers relate so I'll make random stuff up xD

		const staminaMonsterDamageNumber = Math.round(baseMonsterDamageNumber * this.staminaDamageReduction);
		const armourRating = Math.round(this.itemPower * (3/4));
		const armourMonsterDamageNumber = staminaMonsterDamageNumber - (baseMonsterDamageNumber * armourRating);
		const buffMonsterDamageNumber = armourMonsterDamageNumber - this.buffDamageReduction;
		this.health = this.health - buffMonsterDamageNumber;

		consoleLogDebug("TANK RECIVES DAMAGE");
		consoleLogDebug("Base monster damage: " + baseMonsterDamageNumber);
		consoleLogDebug("Stamina: " + staminaMonsterDamageNumber);
		consoleLogDebug("Armour: " + armourMonsterDamageNumber);
		consoleLogDebug("Buff: " + buffMonsterDamageNumber);
	}
}

class AllyHealer extends Ally
{

}

class AllyDPS extends Ally
{

}