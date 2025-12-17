const ShopWindows = 
{
	NONE: "NONE",
	CHURCH: "Silver Church",
	TAVERN: "Tavern"
};

let lastShop = ShopWindows.NONE;

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

	$("#shop_health_potion_percentage").text(player.healthPotionUsePercent + "%");
}

function ShowShopsWindow()
{
	$("#shop_window").css("display", "flex");
	ShopCreateShopWindow(lastShop);
}

function HideShopsWindow()
{
	$("#shop_window").css("display", "none");
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
			consoleLogDebug("Missing itemId to buy: " + itemId);
			break;
	}

	if(player.gold >= itemCost)
	{
		player.gold -= +itemCost;

		switch(itemId)
		{
			case "0":
				player.healthPotions = player.healthPotions + 1;
				UIUpdateHPPotionsAmount();
				UIUpdateGold();
				break;
			default:
				break;
		}
	}
}

function buyBuff(buffId, cost, shop)
{
	consoleLogDebug("Try to buy buff");
	if(player.gold >= cost)
	{
		player.gold -= +cost;

		var createNewBuff = true;
		var buffDefaultValues = null;

		let arrayToUse = new Array();
		if(shop == "church")
		{
			arrayToUse = churchBuffs;
		}
		else if(shop == "tavern")
		{
			arrayToUse = tavernBuffs;
		}

		for(var i = 0; i < arrayToUse.length; i = i + 1)
		{
			if(typeof(arrayToUse[i] == PlayerBuff))
			{
				if(arrayToUse[i].buffId == buffId)
				{
					buffDefaultValues = new PlayerBuff(arrayToUse[i].buffId, arrayToUse[i].buffPrice, arrayToUse[i].buffType, arrayToUse[i].buffPower, arrayToUse[i].buffDuration, arrayToUse[i].buffName, arrayToUse[i].buffDescription);
					break;
				}
			}
		}

		for(var i = 0; i < player.buffList.length; i = i + 1)
		{
			if(typeof(player.buffList[i] == PlayerBuff))
			{
				if(player.buffList[i].buffId == buffId)
				{
					//Refresh duration on the buff
					player.buffList[i].buffDuration = buffDefaultValues.buffDuration;
					createNewBuff = false;
					break;
				}
			}
		}

		if(createNewBuff)
		{
			consoleLogDebug(buffDefaultValues);
			player.buffList.push(buffDefaultValues);
		}
	}

	UIUpdateBuffInfoPanel();
}

function ShopCreateShopWindow(tabToCreate)
{
	lastShop = tabToCreate;
	const shopWindow = document.getElementById("shop_window");
	$(shopWindow).empty();
	switch(tabToCreate)
	{
		case ShopWindows.NONE:
		{
			const selectChurch = document.createElement("div");
			const selectTavern = document.createElement("div");
			shopWindow.append(selectChurch);
			shopWindow.append(selectTavern);
			$(selectChurch).addClass("shops_shop_selection_half");
			$(selectTavern).addClass("shops_shop_selection_half");
			selectChurch.append(UIDiv_ClassText("shops_shop_name", "Silver Church"));
			selectTavern.append(UIDiv_ClassText("shops_shop_name", "Tavern"));
			const churchButton = UIButton_Text("ENTER");
			const tavernButton = UIButton_Text("ENTER");
			selectChurch.append(churchButton);
			selectTavern.append(tavernButton);
			$(churchButton).click(function(){
				ShopCreateShopWindow(ShopWindows.CHURCH);
			});
			$(tavernButton).click(function(){
				ShopCreateShopWindow(ShopWindows.TAVERN);
			});
			break;
		}
		case ShopWindows.CHURCH:
		{
			const shopWindowInside = UIDiv_ClassText("shop_window_inside", "");
			shopWindow.append(shopWindowInside);

			const shopDisplay = UIDiv_ClassText("shops_display","");
			const shopBottomControl = UIDiv_ClassText("shops_bottom_control","");
			shopWindowInside.append(shopDisplay);
			shopWindowInside.append(shopBottomControl);

			const exitShopButton = UIButton_ClassText("shop_window_button_back", "Go Back");
			$(exitShopButton).css("font-size", "x-large");
			$(exitShopButton).click(function()
			{
				ShopCreateShopWindow(ShopWindows.NONE);
			});
			shopBottomControl.append(exitShopButton);

			//Health potions
			const potionRow = UIDiv_ClassText("shops_item_row", "");
			const potionName = UIDiv_ClassText("shop_flexing_center", "HEALTH POTION");
			$(potionName).css("width", "25%");
			const potionPrice = UIDiv_ClassText("shop_flexing_center", "2000G");
			$(potionPrice).css("width", "50%");
			const potionButtonDiv = UIDiv_ClassText("shop_flexing_center", "");
			$(potionButtonDiv).css("width", "10%");
			const potionButton = UIButton_ClassText("buyItemButton", "BUY");
			$(potionButton).attr("itemId", "0");
			$(potionButton).click(function()
			{
				buyItem($(potionButton).attr("itemId"));
			});
			potionRow.append(potionName);
			potionRow.append(potionPrice);
			potionRow.append(potionButtonDiv);
			potionButtonDiv.append(potionButton);
			shopDisplay.append(potionRow);

			//Health potions tresholds
			const potionUsageRow = UIDiv_ClassText("shops_item_row", "");
			shopDisplay.append(potionUsageRow);
			const potionUsageTresholdName = UIDiv_ClassText("shop_flexing_center", "USAGE TRESHHOLD");
			potionUsageRow.append(potionUsageTresholdName);
			$(potionUsageTresholdName).css("width", "25%");
			const potionUsageTresholdSlider = UIDiv_ClassText("shop_flexing_center", "");
			potionUsageRow.append(potionUsageTresholdSlider);
			$(potionUsageTresholdSlider).css("width", "50%");
			const potionSlider = document.createElement("input");
			$(potionSlider).prop("type", "range");
			$(potionSlider).prop("min", "1");
			$(potionSlider).prop("max", "99");
			$(potionSlider).attr("value", "50");
			potionUsageTresholdSlider.append(potionSlider);
			const potionUsagePercentage = UIDiv_ClassText("shop_flexing_center", "50%");
			potionUsageRow.append(potionUsagePercentage);
			$(potionUsagePercentage).css("width", "10%");

			$(potionSlider).on("mousemove", function() 
			{
				$(potionUsagePercentage).text($(potionSlider).val() + "%");
				player.healthPotionUsePercent = $(potionSlider).val();
			});
			$(potionSlider).val(player.healthPotionUsePercent);
			$(potionUsagePercentage).text(player.healthPotionUsePercent + "%");

			//Spacer
			shopDisplay.append(UIDiv_ClassText("shops_item_row",""));

			//Church buffs

			for(let nrOfAddedBuffs = 0; nrOfAddedBuffs < churchBuffs.length; nrOfAddedBuffs++)
			{
				// Length of buff
				const buffLength = churchBuffs[nrOfAddedBuffs].buffDuration;
				const hoursLength = Math.floor(buffLength / 3600);
				if(hoursLength > 0)
				{
					buffLength = buffLength - (hoursLength * 3600);
				}
				const minLength = Math.floor(buffLength / 60);
				let buffString = "[";
				if(hoursLength > 0)
				{
					buffString = buffString + hoursLength + "h ";
				}
				if(minLength > 0)
				{
					buffString = buffString + minLength + "m";
				}
				buffString = buffString + "] ";
				buffString = buffString + "[" + churchBuffs[nrOfAddedBuffs].buffName + "] ";
				buffString = buffString + "[" + churchBuffs[nrOfAddedBuffs].buffDescription + "]";

				const newRow = UIDiv_ClassText("shops_item_row", "");
				shopDisplay.append(newRow);
				const leftPadding = UIDiv_Text("");
				$(leftPadding).css("width", "2%");
				newRow.append(leftPadding);
				const buffText = UIDiv_Text(buffString);
				$(buffText).css("display", "flex");
				$(buffText).css("justify-content", "left");
				$(buffText).css("width", "73%");
				newRow.append(buffText);
				const buffPrice = UIDiv_ClassText("shop_flexing_center", (churchBuffs[nrOfAddedBuffs].buffPrice + "G"));
				$(buffPrice).css("width", "15%");
				newRow.append(buffPrice);

				const buyButtonDiv = UIDiv_ClassText("shop_flexing_center", "");
				$(buyButtonDiv).css("width", "10%");
				newRow.append(buyButtonDiv);
				const buyButton = UIButton_ClassText("buyItemButton", "BUY");
				buyButtonDiv.append(buyButton);
				$(buyButton).attr("buffId", churchBuffs[nrOfAddedBuffs].buffId);
				$(buyButton).attr("cost", churchBuffs[nrOfAddedBuffs].buffPrice);
				$(buyButton).attr("shop", "church");
				$(buyButton).click(function()
				{
					buyBuff($(buyButton).attr("buffId"), $(buyButton).attr("cost"), $(buyButton).attr("shop"));
				});
			}

			break;
		}
		case ShopWindows.TAVERN:
		{
			const shopWindowInside = UIDiv_ClassText("shop_window_inside", "");
			shopWindow.append(shopWindowInside);

			const shopDisplay = UIDiv_ClassText("shops_display","");
			const shopBottomControl = UIDiv_ClassText("shops_bottom_control","");
			shopWindowInside.append(shopDisplay);
			shopWindowInside.append(shopBottomControl);

			const exitShopButton = UIButton_ClassText("shop_window_button_back", "Go Back");
			$(exitShopButton).css("font-size", "x-large");
			$(exitShopButton).click(function()
			{
				ShopCreateShopWindow(ShopWindows.NONE);
			});
			shopBottomControl.append(exitShopButton);

			if(tavernBuffs.length > 0)
			{
				for(let nrOfAddedBuffs = 0; nrOfAddedBuffs < tavernBuffs.length; nrOfAddedBuffs++)
				{
					// Length of buff
					const buffLength = tavernBuffs[nrOfAddedBuffs].buffDuration;
					const hoursLength = Math.floor(buffLength / 3600);
					if(hoursLength > 0)
					{
						buffLength = buffLength - (hoursLength * 3600);
					}
					const minLength = Math.floor(buffLength / 60);
					let buffString = "[";
					if(hoursLength > 0)
					{
						buffString = buffString + hoursLength + "h ";
					}
					if(minLength > 0)
					{
						buffString = buffString + minLength + "m";
					}
					buffString = buffString + "] ";
					buffString = buffString + "[" + tavernBuffs[nrOfAddedBuffs].buffName + "] ";
					buffString = buffString + "[" + tavernBuffs[nrOfAddedBuffs].buffDescription + "]";

					const newRow = UIDiv_ClassText("shops_item_row", "");
					shopDisplay.append(newRow);
					const leftPadding = UIDiv_Text("");
					$(leftPadding).css("width", "2%");
					newRow.append(leftPadding);
					const buffText = UIDiv_Text(buffString);
					$(buffText).css("display", "flex");
					$(buffText).css("justify-content", "left");
					$(buffText).css("width", "73%");
					newRow.append(buffText);
					const buffPrice = UIDiv_ClassText("shop_flexing_center", (tavernBuffs[nrOfAddedBuffs].buffPrice + "G"));
					$(buffPrice).css("width", "15%");
					newRow.append(buffPrice);

					const buyButtonDiv = UIDiv_ClassText("shop_flexing_center", "");
					$(buyButtonDiv).css("width", "10%");
					newRow.append(buyButtonDiv);
					const buyButton = UIButton_ClassText("buyItemButton", "BUY");
					buyButtonDiv.append(buyButton);
					$(buyButton).attr("buffId", tavernBuffs[nrOfAddedBuffs].buffId);
					$(buyButton).attr("cost", tavernBuffs[nrOfAddedBuffs].buffPrice);
					$(buyButton).attr("shop", "tavern");
					$(buyButton).click(function()
					{
						buyBuff($(buyButton).attr("buffId"), $(buyButton).attr("cost"), $(buyButton).attr("shop"));
					});
				}
			}
			else
			{
				const message = UIDiv_ClassText("shop_flexing_center", "Come back at level 20.");
				$(message).css("font-size", "xx-large");
				shopDisplay.append(message);
				$(shopDisplay).css("justify-content", "center");
			}

			break;
		}
	}
}