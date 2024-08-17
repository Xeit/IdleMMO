const QuestFocuses = {
	NONE: "NONE",
	XP: "XP",
	BALANCED: "BALANCED",
	GOLD: "GOLD"
};

var questFocus = QuestFocuses.NONE;
var questProgress = 0;
var questTarget = 0;
var questXp = 0;
var questGold = 0;
var questFlavourText = "You are from NPC to NPC as a messenger. Such challenge for a hero!";

function initializeQuesting()
{
	$("#questing_focus_button_xp").click(function(){
		questFocus = QuestFocuses.XP;
		$("#questing_slider_button_info_xp_selected").text("X");
		$("#questing_slider_button_info_balanced_selected").html("<br>");
		$("#questing_slider_button_info_gold_selected").html("<br>");
	});

	$("#questing_focus_button_balanced").click(function(){
		questFocus = QuestFocuses.BALANCED;
		$("#questing_slider_button_info_xp_selected").html("<br>");
		$("#questing_slider_button_info_balanced_selected").text("X");
		$("#questing_slider_button_info_gold_selected").html("<br>");
	});

	$("#questing_focus_button_gold").click(function(){
		questFocus = QuestFocuses.GOLD;
		$("#questing_slider_button_info_xp_selected").html("<br>");
		$("#questing_slider_button_info_balanced_selected").html("<br>");
		$("#questing_slider_button_info_gold_selected").text("X");
	});

	questFocus = QuestFocuses.BALANCED;
}

function startQuesting()
{
	$("#questing_window").css("display", "flex");
}

function stopQuesting()
{
	$("#questing_window").css("display", "none");
}

function tickQuesting()
{
	if(questProgress < questTarget)
	{
		questProgress++;
		if(questProgress >= questTarget)
		{
			finishQuest();
		}
	}
	else
	{
		getNewQuest();
	}

	updateQuestInfo();
}

function getNewQuest()
{
	const minXpRoll = playerLevel * 5;
	const maxXpRoll = minXpRoll * 2;

	const minGoldRoll = playerLevel * 4;
	const maxGoldRoll = playerLevel * 3;

	var xpRoll = +(Math.random() * (maxXpRoll - minXpRoll) + minXpRoll).toFixed();
	var goldRoll = +(Math.random() * (maxGoldRoll - minGoldRoll) + minGoldRoll).toFixed();

	switch (questFocus) {
		case QuestFocuses.XP:
			xpRoll = +(xpRoll * 1.25).toFixed();
			goldRoll = +(goldRoll * 0.75).toFixed();
			break;
		case QuestFocuses.BALANCED:
			break;
		case QuestFocuses.GOLD:
			xpRoll = +(xpRoll * 0.75).toFixed();
			goldRoll = +(goldRoll * 1.25).toFixed();
			break;
		default:
			break;
	}

	questXp = xpRoll;
	questGold = goldRoll;

	questTarget = +(Math.random() * 3 + playerLevel + 3).toFixed();
	questProgress = 0;
	
	questFlavourText = "You are from NPC to NPC as a messenger. Such challenge for a hero!";
	
	$("#questing_flavour_text").text(questFlavourText);
	$("#questing_reward_xp").text("XP: " + questXp);
	$("#questing_reward_gold").text("GOLD: " + questGold);
}

function finishQuest()
{
	addPlayerXp(questXp);

	//TODO: Gold, lol.

	questTarget = 0;
	questProgress = 0;
	questXp = 0;
	questGold = 0;
	questFlavourText = "Looking for \"new\" adventure.";

	$("#questing_flavour_text").text("Looking for quest.");
	$("#questing_reward_xp").text("XP: 0");
	$("#questing_reward_gold").text("GOLD: 0");
}

function updateQuestInfo()
{
	if(questTarget == 0)
	{
		$("#questing_progress_bar_inside").css("width", "100%");
	}
	else
	{
		const questProgressFillPercent = (questProgress / questTarget * 100) + "%";
		$("#questing_progress_bar_inside").css("width", questProgressFillPercent);
	}
}