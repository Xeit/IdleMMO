const BuffType = {
	none : "none",
	damage: "damage",
	deffense: "deffense",
	critChance: "critChance"
 };

class PlayerBuff
{
	buffType = BuffType.none;
	buffPower = 0;
	buffDuration = 0;
	buffName = "";
	buffDescription = "";

	constructor (buffType, buffPower, buffDuration, buffName, buffDescription)
	{
		this.buffType = buffType;
		this.buffPower = buffPower;
		this.buffDuration = buffDuration;
		this.buffName = buffName;
		this.buffDescription = buffDescription;
	}

	serializeBuff()
	{
		var serializedString = this.buffType + "|buff|";
		serializedString += this.buffPower + "|buff|";
		serializedString += this.buffDuration + "|buff|";
		serializedString += this.buffName + "|buff|";
		serializedString += this.buffDescription;

		return serializedString;
	}
}

function tickBuffs()
{
	for(var i = 0; i < playerBuffList.length; i = i + 1)
	{
		if(typeof(playerBuffList[i] == PlayerBuff))
		{
			playerBuffList[i].buffDuration -= 1;
			if(playerBuffList[i].buffDuration <= 0)
			{
				//This is the dumbest way of removing element from list. WTF JavaScript.
				playerBuffList = playerBuffList.filter(buff => buff !== playerBuffList[i]);
			}
		}
	}
}