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

	takeDamage()
	{
		consoleLogDebug("Ally have incorrect class or this function is not overriden in child class. Please fix.");
	}
}

class AllyTank extends Ally
{
	defensiveBuffTimeLeft = 0;

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
		// This function is extremaly nonoptimal but idc, it works
		this.enemyTargetID = -1;

		// Attack boss
		for(let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
		{
			if(dungeonCurrentWaveEnemies[i].isAlive() && dungeonCurrentWaveEnemies[i].isBoss)
			{
				this.enemyTargetID = i;
				return;
			}
		}

		// Attack enemy that is targetting healer
		for(let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
		{
			if(dungeonCurrentWaveEnemies[i].isAlive() && dungeonCurrentWaveEnemies[i].target == "healer")
			{
				this.enemyTargetID = i;
				return;
			}
		}

		// Attack enemy that is not targetting tank
		for(let i = 0; i < dungeonCurrentWaveEnemies.length; i++)
		{
			if(dungeonCurrentWaveEnemies[i].isAlive() && dungeonCurrentWaveEnemies[i].target != "tank")
			{
				this.enemyTargetID = i;
				return;
			}
		}

		// Select random enemy
		while(this.enemyTargetID != -1)
		{
			let randomEnemyID = Math.round(Math.random() * dungeonCurrentWaveEnemies.length)
			if(dungeonCurrentWaveEnemies[randomEnemyID].isAlive())
			{
				this.enemyTargetID = randomEnemyID;
				return;
			}
		}
	}

	attackTarget()
	{
		if(!dungeonCurrentWaveEnemies[this.enemyTargetID].isAlive())
		{
			return;
		}

		// How the fuck do I calculate damage? xD
	}

	takeDamage()
	{
		
	}
}

class AllyHealer extends Ally
{

}

class AllyDPS extends Ally
{

}