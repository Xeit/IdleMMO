function initializeShops()
{
	$("#potionSellerButton").click(function()
	{
		$("#shop_window").css("display", "none");
		$("#potion_seller_window").css("display", "flex");
		$("#church_window").css("display", "none");
		$("#tavern_window").css("display", "none");
	});
	
	$("#churchButton").click(function()
	{
		$("#shop_window").css("display", "none");
		$("#potion_seller_window").css("display", "none");
		$("#church_window").css("display", "flex");
		$("#tavern_window").css("display", "none");
	});
	
	$("#tavernButton").click(function()
	{
		$("#shop_window").css("display", "none");
		$("#potion_seller_window").css("display", "none");
		$("#church_window").css("display", "none");
		$("#tavern_window").css("display", "flex");
	});

	$(".buyItemButton").click(function()
	{

	});
}

function startShops()
{
   $("#shop_window").css("display", "flex");
	$("#potion_seller_window").css("display", "none");
	$("#church_window").css("display", "none");
	$("#tavern_window").css("display", "none");
}

function stopShops()
{
   $("#shop_window").css("display", "none");
	$("#potion_seller_window").css("display", "none");
	$("#church_window").css("display", "none");
	$("#tavern_window").css("display", "none");
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
	}

	//Does nothing for not. Basically TODO xD
}