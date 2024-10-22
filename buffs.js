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