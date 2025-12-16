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
			churchBuffs.push(new PlayerBuff("churchDamage", 500, BuffType.damage, 10, 1800, "Minor Damage Blessing", "+10 flat DMG"));
			break;
		case 15:
			churchBuffs.push(new PlayerBuff("churchDefense", 500, BuffType.defense, 10, 1800, "Minor Defense Blessing", "+10 flat DEF"));
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
			tavernBuffs.push(new PlayerBuff("spicyFood", 500, BuffType.damage, 25, 300, "Spicy!", "+25 flat DMG"));
			break;
		default:
			break;
	}
}
