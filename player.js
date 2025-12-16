class DungeonPlayerStatistics
{
	teamwork = 0; // Player soft skills? No clue
	mechanics = 0; // Player skill
	gameKnowledge = 0; // This might be trown out

	mechanicAwarness = 0; // This should be per dungeon
}

class Player
{
	//Level
	level = 1;
	xp = 0;
	requiredXp = 50;

	//Spendables
	gold = 0;
	health = 100;
	maxHealth = 100;
	mana = 100;
	maxMana = 100;
	exhaustion = 0;
	maxExhaustion = 50;

	//Attributes
	strength = 1;
	strengthXP = 0;
	dexterity = 1;
	dexterityXP = 0;
	stamina = 1;
	staminaXP = 0;
	intelligence = 1;
	intelligenceXP = 0;

	//Equipment slots
	weaponSlot = undefined;
	helmetSlot = undefined;
	bodyArmourSlot = undefined;
	glovesSlot = undefined;
	bootsSlot = undefined;

	//Potions
	healthPotions = 0;
	healthPotionUsePercent = 50;

	//Buffs
	buffList = [];

	//Dungeon
	dungeonStatistics = new DungeonPlayerStatistics();
	dungeonEnemyID = -1;

	questingFocus = QuestFocuses.BALANCED;

	playerUnlockFunctionsUntilLevel()
	{
		for(let i = 0; i <= this.level; i++)
		{
			playerUnlockFunctions(i);
		}
	}

	playerFixItems()
	{
		// Holy fuck it took me way too long to understand that deserialization make Object rather than correct class...
		// And even longer to finaly come up with way to fix this... What the fuck xD

		this.weaponSlot = castObjectToItem(player.weaponSlot);
		this.helmetSlot = castObjectToItem(player.helmetSlot);
		this.bodyArmourSlot = castObjectToItem(player.bodyArmourSlot);
		this.glovesSlot = castObjectToItem(player.glovesSlot);
		this.bootsSlot = castObjectToItem(player.bootsSlot);
	}
}

var player = new Player()

//Player data
var currentTask = PlayerTasks.none;
var currentOpenWindow = PlayerTasks.none;

//Debug
var levelBreeze = false;
var freezeTime = false;
var debugGame = false;

function playerAddXp(xpToAdd)
{
	//This is current level cap
	if(player.level < 50)
	{
		player.xp += +xpToAdd;
		if(player.xp >= +player.requiredXp)
		{
			playerLevelUp();
		}
	}
}

function playerLevelUp()
{
	player.level += 1;
	player.xp = 0;

	player.requiredXp = 0.25 * (player.level - 1 + 300 * Math.pow(2, (player.level-1)/4 )) + 50;
	player.requiredXp = +player.requiredXp.toFixed();

	player.maxHealth = 100 + (10 * (player.level - 1));
	player.maxMana = 100 + (10 * (player.level - 1));
	player.maxExhaustion = 50 + (5 * (player.level - 1));

	healPlayerToMax();

	playerUnlockFunctions(player.level);
	UIShowPopup("LevelUp");
}

function playerGetArmourValue()
{
	var armourValue = 0;

	if(player.helmetSlot instanceof Item)
	{
		armourValue += player.helmetSlot.returnItemPower(true);
	}
	if(player.bodyArmourSlot instanceof Item)
	{
		armourValue += player.bodyArmourSlot.returnItemPower(true);
	}
	if(player.glovesSlot instanceof Item)
	{
		armourValue += player.glovesSlot.returnItemPower(true);
	}
	if(player.bootsSlot instanceof Item)
	{
		armourValue += player.bootsSlot.returnItemPower(true);
	}

	return armourValue;
}

function playerHealPlayer(hpToAdd)
{
	player.health += +hpToAdd;
	if(player.health > player.maxHealth)
	{
		player.health = player.maxHealth;
	}
}

function playerTakeDamage(monsterDamageNumber)
{	
	let baseMonsterDamage = monsterDamageNumber;

	consoleLogDebug("Monster damage before reductions: " + monsterDamageNumber);

	monsterDamageNumber = monsterDamageNumber - (monsterDamageNumber * (player.stamina / (baseMonsterDamage * 4)));
	consoleLogDebug("Monster damage after stamina: " + monsterDamageNumber);

	armourReduction = playerGetArmourValue() / (playerGetArmourValue() + (3 * baseMonsterDamage));
	consoleLogDebug("Monster damage: " + baseMonsterDamage + " Armor: " + playerGetArmourValue() + " Negation: " + armourReduction);
	monsterDamageNumber = monsterDamageNumber - (baseMonsterDamage * armourReduction);

	monsterDamageNumber = +Math.floor(monsterDamageNumber);
	consoleLogDebug("Monster damage after armor: " + monsterDamageNumber);

	monsterDamageNumber -= +getTotalBuffsWithType(BuffType.defense);
	consoleLogDebug("Monster damage after buffs: " + monsterDamageNumber + "\n");

	if(monsterDamageNumber < 1)
	{
		monsterDamageNumber = 1;
	}

	player.health -= +monsterDamageNumber;

	if(player.health <= 0)
	{
		player.health = 0;
		newPlayerTask(PlayerTasks.healing);
	}
	else if((((player.health / player.maxHealth) * 100) < player.healthPotionUsePercent) && player.healthPotions > 0)
	{
		//Use potion if under % health specified by player
		player.healthPotions -= 1;
		const healthToHeal = +Math.floor(player.maxHealth / 2);
		playerHealPlayer(healthToHeal);
	}
}

function playerGetAttackDamage(againstEnemyLevel)
{
	var playerDamageToDeal = 0;
	
	playerDamageToDeal = +player.strength;
	if(player.weaponSlot instanceof Item)
	{
		playerDamageToDeal += +player.weaponSlot.returnItemPower(true);
	}

	const critRoll = +(Math.random() * againstEnemyLevel * 3 * 2).toFixed(); //50% crit chance with max dex for enemy on same level
	if(critRoll < player.dexterity)
	{
		//This is crit
		playerDamageToDeal = playerDamageToDeal * 2;
		UIPlayerCrited();
	}

	playerDamageToDeal += +getTotalBuffsWithType(BuffType.damage);

	// Nerf player damage if monster is above player level
	if(againstEnemyLevel > player.level)
	{
		const levelDiff = againstEnemyLevel - player.level;
		playerDamageToDeal = playerDamageToDeal - ((levelDiff / 10) * playerDamageToDeal);
	}

	if(playerDamageToDeal < 1)
	{
		playerDamageToDeal = 1;
	}

	return playerDamageToDeal;
}

function playerResetPlayer()
{
	player = new Player();

	//Player data
	currentTask = PlayerTasks.none;
	currentOpenWindow = PlayerTasks.none;
}

function playerUnlockFunctions(levelToUnlock)
{
	switch(levelToUnlock)
	{
		case 0:
			//Quests
			break;
		case 2:
			$("#battleButton").css("display", "block");
			$("#recoverHealthButton").css("display", "block");
			$("#trainingButton").css("display", "block");
			$("#equipmentButton").css("display", "block");
			break;
		case 7:
			$("#smithButton").css("display", "block");
			break;
		case 10:
			$("#shopButton").css("display", "block");
			break;
		case 12:
			$("#dungeonButton").css("display", "block");
			break;
	}
	unlockDungeons(levelToUnlock);
	unlockMonsterZones(levelToUnlock);
	unlockChurchBuffs(levelToUnlock);
	unlockTavernBuffs(levelToUnlock);
}

function playerGetTotalItemPower()
{
	let itemPower = 0;

	if(player.weaponSlot !== undefined)
	{
		itemPower = itemPower + player.weaponSlot.returnItemPower(true);
	}
	if(player.helmetSlot !== undefined)
	{
		itemPower = itemPower + player.helmetSlot.returnItemPower(true);
	}
	if(player.bodyArmourSlot !== undefined)
	{
		itemPower = itemPower + player.bodyArmourSlot.returnItemPower(true);
	}
	if(player.glovesSlot !== undefined)
	{
		itemPower = itemPower + player.glovesSlot.returnItemPower(true);
	}
	if(player.bootsSlot !== undefined)
	{
		itemPower = itemPower + player.bootsSlot.returnItemPower(true);
	}

	return itemPower;
}
