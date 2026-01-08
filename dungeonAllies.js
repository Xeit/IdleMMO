var AllyRole = 
{
	none: "none",
	tank: "tank",
	healer: "healer",
	dps: "dps"
};

class Ally
{
	role = AllyRole.none;
	tag = "";
	itemPower = 1;
	totalExperience = 1;
	health = 100;
	maxHealth = 100;
	enemyTargetID = -1;

	// TODO: This are the most magical number here but it's "stamina reduction" and "buffs"
	// It lowers monster damage by percent before armour
	staminaDamageReduction = 0;
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

	getHealthPercent()
	{
		let returnValue = 0;

		if(this.health > 0)
		{
			returnValue = this.health / this.maxHealth;
		}

		return returnValue;
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

		this.staminaDamageReduction = 0.35;
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

				if(dungeonCurrentWaveEnemies[i].targetTag == "healer")
				{
					targetedHealerID = i;
				}
				else if(dungeonCurrentWaveEnemies[i].targetTag != "tank")
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
				let randomEnemyID = Math.round(Math.random() * (dungeonCurrentWaveEnemies.length - 1));
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
		if(this.enemyTargetID == -1)
		{
			// Something wrong happened in selecting enemy or round already ended
			return;
		}

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

		const staminaMonsterDamageNumber = Math.round(baseMonsterDamageNumber - (baseMonsterDamageNumber * this.staminaDamageReduction));
		const armourRating = Math.round(this.itemPower * (3/4));
		const armourMonsterDamageNumber = staminaMonsterDamageNumber - (staminaMonsterDamageNumber * armourRating);
		const buffMonsterDamageNumber = armourMonsterDamageNumber - this.buffDamageReduction;
		this.health = this.health - buffMonsterDamageNumber;

		if(this.health < 0)
		{
			this.health = 0;
		}

		consoleLogDebug("TANK RECIVES DAMAGE");
		consoleLogDebug("Base monster damage: " + baseMonsterDamageNumber);
		consoleLogDebug("Stamina: " + staminaMonsterDamageNumber);
		consoleLogDebug("Armour: " + armourMonsterDamageNumber);
		consoleLogDebug("Buff: " + buffMonsterDamageNumber);
	}
}

class AllyHealer extends Ally
{
	constructor()
	{
		super();

		this.staminaDamageReduction = 0;
		this.buffDamageReduction = 50;
	}

	allyLogic()
	{
		if(!this.isAlive())
		{
			return;
		}
		this.decideHeal();
	}

	decideHeal()
	{
		let numberOfAlliesForMassHeal = 0;
		let lowestHpPercent = 1;
		let allyWithLowestHp = null;
		let isAllyWithLowestHpATank = false;
		let deadAlly = null;
		let deadAllyRole = AllyRole.none;

		// Get info about target to heal / resurrect
		dungeonGeneratedAllies.forEach(ally => {
			if(ally instanceof Ally)
			{
				if(ally.isAlive())
				{
					const allyHealthPercent = ally.getHealthPercent();

					if(allyHealthPercent < 0.5)
					{
						numberOfAlliesForMassHeal = numberOfAlliesForMassHeal + 1;
					}

					if(ally.role == AllyRole.tank && allyHealthPercent < 0.5)
					{
						// Tanks only get highest priority if they are under 50% HP.
						// For some reason I made it as if there was multiple tanks... raids someday? xD
						if(isAllyWithLowestHpATank)
						{
							if(lowestHpPercent > allyHealthPercent)
							{
								lowestHpPercent = allyHealthPercent;
								allyWithLowestHp = ally;
							}
						}
						else
						{
							lowestHpPercent = allyHealthPercent;
							allyWithLowestHp = ally;
							isAllyWithLowestHpATank = true;
						}
					}
					else if(!isAllyWithLowestHpATank)
					{
						if(lowestHpPercent > allyHealthPercent)
						{
							lowestHpPercent = allyHealthPercent;
							allyWithLowestHp = ally;
						}
					}
				}
				else
				{
					// Dead ally, que for revive!
					if(deadAllyRole == AllyRole.healer)
					{
						// Nothing, slot taken.
					}
					else if(deadAllyRole == AllyRole.tank)
					{
						if(ally.role == AllyRole.healer)
						{
							deadAlly = ally;
							deadAllyRole = ally.role;
						}
						else
						{
							// Nothing, slot taken.
						}
					}
					else
					{
						if(ally.role == AllyRole.healer || ally.role == AllyRole.tank)
						{
							deadAlly = ally;
							deadAllyRole = ally.role;
						}
					}
				}
			}
		});

		// Cast mass heal if more than 4 players under 50% hp
		if(numberOfAlliesForMassHeal > 4)
		{
			this.castMassHeal();
			return;
		}
		
		// Prioritize survival over other players
		if(this.getHealthPercent() < 0.4)
		{
			this.castSingleHeal(this);
			return;
		}

		if(deadAlly != null && lowestHpPercent > 0.65)
		{
			this.resurrectAlly(deadAlly);
			deadAlly = null;
			deadAllyRole = AllyRole.none;
		}
		else
		{
			this.castSingleHeal(allyWithLowestHp);
		}
	}

	castMassHeal()
	{
		dungeonGeneratedAllies.forEach(ally => {
			if(ally instanceof Ally)
			{
				ally.health = ally.health + (0.3 * ally.maxHealth);
				if(ally.health > ally.maxHealth)
				{
					ally.health = ally.maxHealth;
				}
				else
				{
					ally.health = Math.round(ally.health);
				}
			}
		});
	}

	castSingleHeal(target)
	{
		if(target instanceof Ally)
		{
			consoleLogDebug("Healing: " + target);
			// This magic 0.6 is 60% of health
			target.health = target.health + (0.6 * target.maxHealth);
			if(target.health > target.maxHealth)
			{
				target.health = target.maxHealth;
			}
			else
			{
				target.health = Math.round(target.health);
			}
		}
	}

	resurrectAlly(target)
	{
		if(target instanceof Ally)
		{
			target.health = Math.round(target.maxHealth * 0.25);
		}
	}

	takeDamage(baseMonsterDamageNumber)
	{
		const staminaMonsterDamageNumber = Math.round(baseMonsterDamageNumber - (baseMonsterDamageNumber * this.staminaDamageReduction));
		const armourRating = Math.round(this.itemPower * (1/4));
		const armourMonsterDamageNumber = staminaMonsterDamageNumber - (baseMonsterDamageNumber * armourRating);
		const buffMonsterDamageNumber = armourMonsterDamageNumber - this.buffDamageReduction;
		this.health = this.health - buffMonsterDamageNumber;

		if(this.health < 0)
		{
			this.health = 0;
		}
	}
}

class AllyDPS extends Ally
{
	constructor()
	{
		super();

		this.staminaDamageReduction = 0.1;
		this.buffDamageReduction = 150;
	}

	allyLogic()
	{
		if(!this.isAlive())
		{
			return;
		}
		this.findTarget();
		this.attackTarget();
	}

	findTarget()
	{
		// DPS players will always protect themselfs by attacking enemy that attacks them.
		// Then will try to protect healer
		// And after self preservation and healer preservation they will attack boss.

		if(this.enemyTargetID != -1 && dungeonCurrentWaveEnemies[this.enemyTargetID].isAlive() && dungeonCurrentWaveEnemies[this.enemyTargetID].targetTag == this.tag)
		{
			// We will continue attacking enemy that is attacking us
			return;
		}

		this.enemyTargetID = -1;
		let bossID = -1;
		let targetedHealerID = -1;

		for(let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
		{
			if(dungeonCurrentWaveEnemies[i].isAlive())
			{
				if(dungeonCurrentWaveEnemies[i].targetTag == this.tag)
				{
					this.enemyTargetID = i;
					return;
				}
				else if(dungeonCurrentWaveEnemies[i].targetTag == "healer")
				{
					targetedHealerID = i;
				}

				if(dungeonCurrentWaveEnemies[i].isBoss)
				{
					bossID = i;
				}
			}
		}

		if(targetedHealerID != -1)
		{
			this.enemyTargetID = targetedHealerID;
		}
		else if(bossID != -1)
		{
			this.enemyTargetID = bossID;
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
				let randomEnemyID = Math.round(Math.random() * (dungeonCurrentWaveEnemies.length - 1));
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
		if(this.enemyTargetID == -1)
		{
			return;
		}

		if(!dungeonCurrentWaveEnemies[this.enemyTargetID].isAlive())
		{
			return;
		}

		dungeonCurrentWaveEnemies[this.enemyTargetID].health -= Math.round(this.itemPower / 2);
	}

	takeDamage(baseMonsterDamageNumber)
	{
		const staminaMonsterDamageNumber = Math.round(baseMonsterDamageNumber - (baseMonsterDamageNumber * this.staminaDamageReduction));
		const armourRating = Math.round(this.itemPower * (1/2));
		const armourMonsterDamageNumber = staminaMonsterDamageNumber - (baseMonsterDamageNumber * armourRating);
		const buffMonsterDamageNumber = armourMonsterDamageNumber - this.buffDamageReduction;
		this.health = this.health - buffMonsterDamageNumber;

		if(this.health < 0)
		{
			this.health = 0;
		}
	}
}