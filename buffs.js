const BuffType = 
{
	none : "none",
	damage: "damage",
	defense: "defense",
	critChance: "critChance"
};

class PlayerBuff
{
	buffId = "";
	buffPrice = 0;
	buffType = BuffType.none;
	buffPower = 0;
	buffDuration = 0;
	buffName = "";
	buffDescription = "";

	constructor (buffId, buffPrice, buffType, buffPower, buffDuration, buffName, buffDescription)
	{
		this.buffId = buffId;
		this.buffPrice = buffPrice;
		this.buffType = buffType;
		this.buffPower = buffPower;
		this.buffDuration = buffDuration;
		this.buffName = buffName;
		this.buffDescription = buffDescription;
	}
}

function tickBuffs()
{
	for(var i = 0; i < player.buffList.length; i = i + 1)
	{
		if(typeof(player.buffList[i] == PlayerBuff))
		{
			player.buffList[i].buffDuration -= 1;
			if(player.buffList[i].buffDuration <= 0)
			{
				//This is the dumbest way of removing element from list. WTF JavaScript.
				player.buffList = player.buffList.filter(buff => buff !== player.buffList[i]);
			}
		}
	}

	UIUpdateBuffInfoPanel();
}

function getTotalBuffsWithType(buffTypeToGet)
{
	var totalBuffStrength = 0;

	for(var i = 0; i < player.buffList.length; i = i + 1)
	{
		if(typeof(player.buffList[i] == PlayerBuff))
		{
			if(player.buffList[i].buffType == buffTypeToGet)
			{
				totalBuffStrength += +player.buffList[i].buffPower;
			}
		}
	}

	return totalBuffStrength;
}

const churchBuffs = new Array();

function unlockChurchBuffs(levelToUnlock)
{
	switch(levelToUnlock)
	{
		case 10:
			churchBuffs.push(new PlayerBuff("minorChurchDamage", 700, BuffType.damage, 10, 1800, "Minor Damage Blessing", "+10 flat DMG"));
			break;
		case 13:
			churchBuffs.push(new PlayerBuff("minorChurchDefense", 500, BuffType.defense, 10, 1800, "Minor Defense Blessing", "+10 flat DEF"));
			break;
		case 22:
			churchBuffs.push(new PlayerBuff("churchDamage", 7000, BuffType.damage, 25, 1800, "Damage Blessing", "+25 flat DMG"));
			break;
		case 25:
			churchBuffs.push(new PlayerBuff("churchDefense", 5000, BuffType.defense, 30, 1800, "Defense Blessing", "+30 flat DEF"));
			break;
		case 37:
			churchBuffs.push(new PlayerBuff("longChurchDamage", 5000, BuffType.damage, 10, 7200, "Prolonged Damage Blessing", "+10 flat DMG"));
			break;
		case 38:
			churchBuffs.push(new PlayerBuff("longChurchDefense", 5000, BuffType.defense, 10, 7200, "Prolonged Defense Blessing", "+10 flat DEF"));
			break;
		case 45:
			churchBuffs.push(new PlayerBuff("godlyChurchDamage", 25000, BuffType.damage, 60, 3600, "Godly Damage Blessing", "+60 flat DMG"));
			break;
		case 46:
			churchBuffs.push(new PlayerBuff("godlyChurchDefense", 25000, BuffType.defense, 80, 3600, "Godly Defense Blessing", "+80 flat DEF"));
			break;
		default:
			break;
	}
}

const tavernBuffs = new Array();

function unlockTavernBuffs(levelToUnlock)
{
	switch(levelToUnlock)
	{
		case 20:
			tavernBuffs.push(new PlayerBuff("tavernSpicyFood", 500, BuffType.damage, 25, 300, "Spicy Food!", "+25 flat DMG"));
			break;
		case 30:
			tavernBuffs.push(new PlayerBuff("tavernBeer", 5000, BuffType.damage, 50, 300, "Beer!", "+50 flat DMG"));
			tavernBuffs.push(new PlayerBuff("tavernRootBeer", 5000, BuffType.defense, 80, 300, "Root Beer!", "+80 flat DEF"));
			break;
		case 40:
			tavernBuffs.push(new PlayerBuff("tavernSleep", 200, BuffType.defense, 2, 10800, "Rest in bed", "You are mildly rested"));
			break;
		case 50:
			tavernBuffs.push(new PlayerBuff("tavernWineMaids", 25000, BuffType.damage, 90, 240, "Wine and Maids", "Ready for action! +90 flat DMG"));
			break;
		default:
			break;
	}
}
