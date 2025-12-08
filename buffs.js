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
	buffType = BuffType.none;
	buffPower = 0;
	buffDuration = 0;
	buffName = "";
	buffDescription = "";

	constructor (buffId, buffType, buffPower, buffDuration, buffName, buffDescription)
	{
		this.buffId = buffId;
		this.buffType = buffType;
		this.buffPower = buffPower;
		this.buffDuration = buffDuration;
		this.buffName = buffName;
		this.buffDescription = buffDescription;
	}

	serializeBuff()
	{
		var serializedString = this.buffId + "|buff|";
		serializedString += this.buffType + "|buff|";
		serializedString += this.buffPower + "|buff|";
		serializedString += this.buffDuration + "|buff|";
		serializedString += this.buffName + "|buff|";
		serializedString += this.buffDescription;

		return serializedString;
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

const buffsDefaultsArray = new Array();

buffsDefaultsArray.push(new PlayerBuff("churchDamage", BuffType.damage, 10, 3600, "Church Damage Blessing", "Increases damage by 10"));
buffsDefaultsArray.push(new PlayerBuff("churchDefense", BuffType.defense, 10, 3600, "Church Defense Blessing", "Reduces damage taken by 10"));
buffsDefaultsArray.push(new PlayerBuff("spicyFood", BuffType.damage, 5, 1200, "Spicy!", "Increases damage by 5"));