const FishingStatus = 
{
	NONE: "NONE",
	CAN_CAST: "CAST",
	NO_BITE: "NO_BITE",
	FISH_BITE: "FISH_BITE"
};

var fishingStatus = FishingStatus.NONE;
var fishingActionTimer = 30;
var fishingStartingActionTimer = 30;

// 0 - Waiting for cast, 1 - Waiting for bite, 2 - Bit(Click now!), 3 - Reel in (Success)
var fishingState = 0; 
var fishingTimer = 0;
var biteTime = 0;

function initializeFishing()
{
	$("#fishingButton").click(function()
	{
		newPlayerTask(PlayerTasks.fishing);
	});

	$("#fishing_cast_button").click(function()
	{
		switch(fishingStatus)
		{
			case FishingStatus.NONE:
				fishingSwitchStatus(FishingStatus.NO_BITE);
				break;
			case FishingStatus.CAN_CAST:
				fishingSwitchStatus(FishingStatus.NO_BITE);
				break;
			case FishingStatus.NO_BITE:
				break;
			case FishingStatus.FISH_BITE:
				catchFish();
				fishingSwitchStatus(FishingStatus.CAN_CAST);
				break;
		}
		updateFishingAfkActionBar();
	});
}

function ShowFishingWindow()
{
	$("#fishing_window").css("display", "flex");
}

function HideFishingWindow()
{
	$("#fishing_window").css("display", "none");
}

function startFishing()
{
	fishingSwitchStatus(FishingStatus.CAN_CAST);
	drawFishingUI();
	updateFishingStats();
}

function castFishingRod()
{
	$("#fishing_status").text("Waiting for bite...");
	$("#fishing_cast_button").text("...");
	$("#fishing_bobber").addClass("bobber_floating");
}

function catchFish()
{
	$("#fishing_status").text("Caught one!");
	$("#fishing_bobber").removeClass("bobber_bite");
	
	// Rewards
	giveFishingRewards();
}

function giveFishingRewards()
{
	// XP Calculation (currently max lvl is 30)
	let bDidLevelUp = false;
	if(player.fishingLevel < 30)
	{
		let xpGain = 10 + (player.fishingLevel * 2);
		
		player.fishingXP += xpGain;
		let requiredXP = player.fishingLevel * 50;
		if(player.fishingXP >= requiredXP)
		{
			player.fishingLevel++;
			player.fishingXP = 0;

			bDidLevelUp = true
		}
	}
	
	// Gold Calculation
	let goldGain = 30 + Math.floor(Math.random() * player.fishingLevel * 3);
	player.gold += goldGain;

	UIShowPopup("FishCaught", goldGain, bDidLevelUp);
	updateFishingStats();
}

function fishingSwitchStatus(newStatus)
{
	switch(newStatus)
	{
		case FishingStatus.NONE:
			consoleLogDebug("Something broke in fishing::fishingSwitchStatus as newStatus is NONE. Please fix.");
			break;
		case FishingStatus.CAN_CAST:
			$("#fishing_status").text("Cast rod");
			$("#fishing_cast_button").text("CAST ROD");
			$("#fishing_cast_button").prop('disabled', false);
			$("#fishing_bobber").removeClass("bobber_floating bobber_bite");
			$("#fishing_bobber").css("display", "none");
			fishingActionTimer = 60 - player.fishingLevel;
			break;
		case FishingStatus.NO_BITE:
			$("#fishing_status").text("Waiting for bite...");
			$("#fishing_cast_button").text("...");
			$("#fishing_cast_button").prop('disabled', true);
			$("#fishing_bobber").addClass("bobber_floating");
			$("#fishing_bobber").css("display", "block");
			fishingActionTimer = 15 +  +Math.floor(Math.random() * 35);
			break;
		case FishingStatus.FISH_BITE:
			$("#fishing_status").text("BITE! CATCH IT!");
			$("#fishing_cast_button").text("CATCH!");
			$("#fishing_cast_button").prop('disabled', false);
			$("#fishing_bobber").removeClass("bobber_floating").addClass("bobber_bite");
			fishingActionTimer = 5 * 60; //AFK timer for afk fishing is currently 5 min
			break;
	}

	fishingStartingActionTimer = fishingActionTimer;
	fishingStatus = newStatus;
}

function tickFishing()
{
	fishingActionTimer--;
	switch(fishingStatus)
	{
		case FishingStatus.NONE:
			fishingSwitchStatus(FishingStatus.CAN_CAST);
			break;
		case FishingStatus.CAN_CAST:
			if(fishingActionTimer <= 0)
			{
				fishingSwitchStatus(FishingStatus.NO_BITE);
			}
			break;
		case FishingStatus.NO_BITE:
			if(fishingActionTimer <= 0)
			{
				fishingSwitchStatus(FishingStatus.FISH_BITE);
			}
			break;
		case FishingStatus.FISH_BITE:
			if(fishingActionTimer <= 0)
			{
				catchFish();
				fishingSwitchStatus(FishingStatus.CAN_CAST);
			}
			break;
	}

	updateFishingAfkActionBar();
}

function updateFishingAfkActionBar()
{
	const afkPercent = (fishingActionTimer / fishingStartingActionTimer * 100).toFixed() + "%";

	if(fishingStatus != FishingStatus.NO_BITE)
	{
		$("#fishing_afk_bar").css("background-size", afkPercent + " 100%");
	}
	else
	{
		$("#fishing_afk_bar").css("background-size", "100% 100%");
	}
}

function drawFishingUI()
{
	$("#fishing_status").text("Ready to cast");
	$("#fishing_cast_button").text("CAST");
}

function updateFishingStats()
{
	if(player.fishingLevel < 30)
	{
		let requiredXP = player.fishingLevel * 50;
		$("#fishing_level").text(player.fishingLevel);
		$("#fishing_xp").text(player.fishingXP + "/" + requiredXP);
	}
	else
	{
		$("#fishing_level").text(player.fishingLevel + " [MAX]");
		$("#fishing_xp_div").css("display", "none");
	}
}
