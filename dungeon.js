class DungeonExperience
{
	teamwork = 0; // Player soft skills? No clue
	mechanics = 0; // Player skill
	gameKnowledge = 0; // This might be trown out

	mechanicAwarness = 0; // This should be per dungeon
}

class Dungeon
{
	name = "";
	monsters = [];
	averageTeammateItemLevel = 1;
	dungeonDifficulty = 1; // Probably will be from 1 to 100, works against player mechanics and gameKnowledge
}

const AllyRole = {
	none: "none",
	tank: "tank",
	healer: "healer",
	dps: "dps"
};

class Ally
{
	role = AllyRole.none;
	itemLevel = 1;
	totalExperience = 1;
}

const dungeonsMap = new Array();

function initializeDungeon()
{
	$("#dungeonWindow_startDebugDungeon").click(function()
	{
		$("#dungeonWindow_selectDungeon").css("display", "none");
		$("#dungeonWindow_insideDungeon").css("display", "flex");
	})
}

function showDungeonWindow()
{
	$("#dungeonWindow").css("display", "flex");
	$("#dungeonWindow_selectDungeon").css("display", "flex");
	$("#dungeonWindow_insideDungeon").css("display", "none");
}

function hideDungeonWindow()
{
	$("#dungeonWindow").css("display", "none");
}