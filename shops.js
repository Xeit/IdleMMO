function initializeShops()
{
	$("#potionSellerButton").click(function()
	{
		$("#shop_window").css("display", "flex");
		$("#potion_seller_window").css("display", "flex");
		$("#church_window").css("display", "none");
		$("#tavern_window").css("display", "none");
		$("#shop_window_selection").css("display", "none");
	});
	
	$("#churchButton").click(function()
	{
		$("#shop_window").css("display", "flex");
		$("#potion_seller_window").css("display", "none");
		$("#church_window").css("display", "flex");
		$("#tavern_window").css("display", "none");
		$("#shop_window_selection").css("display", "none");
	});
	
	$("#tavernButton").click(function()
	{
		$("#shop_window").css("display", "flex");
		$("#potion_seller_window").css("display", "none");
		$("#church_window").css("display", "none");
		$("#tavern_window").css("display", "flex");
		$("#shop_window_selection").css("display", "none");
	});

	$(".shop_window_button_back").click(function()
	{
		$("#potion_seller_window").css("display", "none");
		$("#church_window").css("display", "none");
		$("#tavern_window").css("display", "none");
		$("#shop_window_selection").css("display", "flex");
	});

	$(".buyItemButton").click(function()
	{
		buyItem($(this).attr("itemId"));
	});

	$(".buyBuffButton").click(function()
	{
		buyBuff($(this).attr("buffId"), $(this).attr("cost"));
	});
}

function ShowShopsWindow()
{
   $("#shop_window").css("display", "flex");
	$("#potion_seller_window").css("display", "none");
	$("#church_window").css("display", "none");
	$("#tavern_window").css("display", "none");
	$("#shop_window_selection").css("display", "flex");
}

function HideShopsWindow()
{
   $("#shop_window").css("display", "none");
}

function startShops()
{
}

function stopShops()
{
}

function buyItem(itemId)
{
	var itemCost = -1;
	switch(itemId)
	{
		case "0":
			itemCost = 2000;
			break;
		default:
			console.log("Missing itemId to buy: " + itemId);
			break;
	}

	if(playerGold >= itemCost)
	{
		playerGold -= +itemCost;

		switch(itemId)
		{
			case "0":
				playerHealthPotions = playerHealthPotions + 1;
				break;
			default:
				break;
		}
	}
}

function buyBuff(buffId, cost)
{
	if(playerGold >= cost)
	{
		playerGold -= +cost;

		var createNewBuff = true;
		var buffDefaultValues = null;

		for(var i = 0; i < buffsDefaultsArray.length; i = i + 1)
		{
			if(typeof(buffsDefaultsArray[i] == PlayerBuff))
			{
				if(buffsDefaultsArray[i].buffId == buffId)
				{
					buffDefaultValues = new PlayerBuff(buffsDefaultsArray[i].buffId, buffsDefaultsArray[i].buffType, buffsDefaultsArray[i].buffPower, buffsDefaultsArray[i].buffDuration, buffsDefaultsArray[i].buffName, buffsDefaultsArray[i].buffDescription);
					break;
				}
			}
		}

		for(var i = 0; i < playerBuffList.length; i = i + 1)
		{
			if(typeof(playerBuffList[i] == PlayerBuff))
			{
				if(playerBuffList[i].buffId == buffId)
				{
					//Refresh duration on the buff
					playerBuffList[i].buffDuration = buffDefaultValues.buffDuration;
					createNewBuff = false;
					break;
				}
			}
		}

		if(createNewBuff)
		{
			playerBuffList.push(buffDefaultValues);
		}
	}
}
