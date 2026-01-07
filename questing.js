const FlavoutTexts = ["You are running from NPC to NPC as a messenger. Such challenge for a hero!",
	"You are on quest to pick up apples from garden for the NPC. They are making a cake. No, not for You!",
	"You are having a deep debate with NPCs. They forget about this after sometime.",
	"You are fishing for broken glass shards. Someone needs to take them out!",
	"You are tasked with delivering a letter from one NPC to another... who is standing ten meters away.",  
	"You are collecting 10 pieces of grass. Yes, grass. Truly a legendary mission.",  
	"You are gathering firewood for the NPC who apparently has never heard of an axe.",  
	"You are picking up groceries for an NPC who forgot their wallet at home. Again.",  
	"You are running across town to deliver a single potato. A true test of endurance.",  
	"You are sent to fetch water from a well 10 steps from the NPC's house. A vital mission, no doubt.",  
	"You are retrieving lost socks from a nearby field. Some hero you are!",  
	"You are asked to find a specific type of pebble. No, not that one. A different pebble.",  
	"You are gathering dust from a bookshelf because apparently, that's your job now.",  
	"You are collecting feathers from chickens. Not the ones next to the NPC, though-those are decorative.",  
	"You are delivering a love note between two NPCs who are too shy to talk to each other. How romantic.",  
	"You are on a mission to return a borrowed spoon. It's been missing for ages!",  
	"You are fishing for discarded boots in a nearby pond. A hero's work is never done.",  
	"You are collecting eggs from the farm. But not just any eggs, the ones that are hardest to reach.",  
	"You are fetching a book from a shelf. Because reaching up is apparently too much for some.",  
	"You are tasked with finding a missing cat... that's hiding right behind the NPC.",  
	"You are delivering a sandwich. Truly, no one else was worthy of this mission.",  
	"You are picking flowers. Not for anything important, it's just because they look nice.",  
	"You are retrieving a lost hat from a windy hill. Because hats can't walk back, duuuh.",  
	"You are collecting seashells for an NPC who lives nowhere near the ocean. Go figure.",  
	"You are tasked with fixing a squeaky door by fetching some oil. Because heroes fix doors now.",  
	"You are gathering paper scraps from the town square. Somebody's got to clean up after the festival.",  
	"You are hunting down a specific mushroom in the forest. Apparently, it's for a very 'important' soup.",  
	"You are delivering a pie to the next house over. A challenge only you could handle.",  
	"You are collecting autumn leaves for decoration. Yes, really. The ground is full of them, but you get the honor.",  
	"You are tasked with finding a missing shoe. It's under the NPC's bed, but sure, let's make it a quest.",  
	"You are fetching beer for the NPC who 'ran out' while standing next to a full barrel.",  
	"You are retrieving a broom from the corner of the room. A quest that will echo through the ages.",  
	"You are tasked with finding the NPC's lost keys. Hint: they're in their pocket.",  
	"You are collecting rainwater in jars. It's raining, but why make it easy?",  
	"You are fetching the NPC's glasses, which are perched on top of their head.",  
	"You are asked to gather apples from a tree, but only the ones on the highest branch. Of course.",  
	"You are retrieving a scarf for the NPC who's too cold to leave their own house. Heroic.",  
	"You are tasked with untangling a ball of yarn. Nothing like a good challenge.",  
	"You are collecting kindling for a fire that doesn't seem all that necessary. But hey, a quest is a quest.",  
	"You are sent to retrieve a cake from the bakery. Maybe you'll get a slice... or not.",  
	"You are fishing for an old, rusty key. Why? Nobody knows, but You are doing it.",  
	"You are tasked with gathering rocks. But only the flat ones. Because skipping stones is important.",  
	"You are retrieving a towel for the NPC who just got out of the bath. You should be honored.",  
	"You are sent to deliver a blanket. Why? Because NPCs get cold, apparently.",  
	"You are collecting weeds from the garden. Apparently, someone forgot how to pull them out themselves.",  
	"You are tasked with finding a quill that's been lost for centuries... or at least a few days.",  
	"You are collecting honey from beehives. Don't worry, you'll only get stung... a lot.", 
	"You are gathering wood chips. No, not actual logs-just tiny pieces of wood. For... reasons.",  
	"You are fetching a feather duster because the NPC's house is 'too dusty' to live in.",  
	"You are tasked with finding a missing earring. It's somewhere in the haystack. Good luck.",  
	"You are delivering a candle to the house next door. Apparently, nobody else could handle this.",  
	"You are sent to collect pumpkins for the festival. Hope you like heavy lifting.",  
	"You are retrieving a piece of string. Yes, this is what your life has come to.",  
	"You are collecting pinecones. For... decoration? Who knows. Just do it.",  
	"You are tasked with finding a specific type of leaf. Too bad they all look the same to you.",  
	"You are gathering sand for an NPC who needs it for a mysterious 'project.'",  
	"You are fetching a pail of milk from a cow that's literally right there. Heroic deeds, indeed.",  
	"You are collecting nails for a fence. Because nobody else is qualified for this, clearly.",  
	"You are tasked with picking up a loaf of bread. It's at the bakery. That's it. That's the quest.",  
	"You are collecting watermelons for the harvest. But only the biggest ones, of course.",  
	"You are fetching an umbrella for the NPC standing in the rain. They could just come inside, but no.",  
	"You are tasked with retrieving a spoon that fell behind the NPC's chair. A challenge of great proportions.",  
	"You are collecting wool from sheep that are standing right in front of the NPC. But sure, they need help.",  
	"You are gathering nails scattered across the street. A bit dangerous? Maybe. Exciting? Not really.",  
	"You are tasked with picking up a lost shoe from a puddle. Who knew heroes did this sort of thing?",  
	"You are collecting paint supplies for a mural. Because no one else in town remembers where they left theirs.",  
	"You are tasked with collecting 10 pieces of broken pottery. That's right, you're now in charge of cleanup.",  
	"You are fetching a pillow for the NPC who just wants to be a little more comfortable.",  
	"You are collecting herbs for an 'important' stew. Who knew herbs were this hard to find?",  
	"You are retrieving a broom to sweep the NPC's porch. Guess heroes also do chores.",  
	"You are tasked with finding the NPC's missing shoehorn. That's a thing, apparently.",  
	"You are gathering carrots for a very picky rabbit. Yes, a rabbit. Your life is thrilling.",  
	"You are fetching some twine. No explanation needed-just go get it.",  
	"You are tasked with finding a missing shopping list. It's under a book, but don't tell the NPC that.",  
	"You are gathering tea leaves for a brew the NPC absolutely must have. No pressure.",  
	"You are fetching a mirror for the NPC who's too vain to move. The hero they deserve.",  
	"You are collecting snowballs for a snowman-building competition. Because NPCs are too busy for fun.",  
	"You are retrieving laundry from the clothesline because apparently, folding clothes is beneath them.",  
	"You are tasked with finding a specific type of cheese. Good luck with that.",  
	"You are collecting berries from a bush. But only the rare ones, because why not?",  
	"You are fetching a hammer for an NPC. Yep. Blacksmith. Go get it.",  
	"You are gathering knitting needles that got lost in a couch. A grand adventure, surely.",  
	"You are collecting feathers from birds who are conveniently flying away from you. Fun.",  
	"You are retrieving a jar of jam for an NPC. But not just any jam-the *best* jam.",  
	"You are tasked with gathering snow for an NPC who doesn't want to go outside. Brave of you.",  
	"You are collecting thread for a sewing project. Because no one else in town can shop, apparently.",  
	"You are fetching a lost scarf from a windy hill. Clearly, you were born for this.",  
	"You are tasked with delivering a letter to the house next door. Hope your legs are ready.",  
	"You are collecting paintbrushes scattered around the town. NPCs really need to be more careful.",  
	"You are fetching ice cubes from the frozen pond. You know, because ice cubes are so rare.",  
	"You are gathering soap bubbles for... some reason. The quest doesn't make much sense, but You are doing it anyway.",  
	"You are fetching an old journal from the attic. Dusty? Sure. Exciting? Not so much.",  
	"You are tasked with collecting keys that were dropped in the river. Hope you like diving.",  
	"You are gathering thread for a very important knitting project. Clearly, no one else is up to the task.",  
	"You are retrieving an NPC's favorite mug. Apparently, it's been 'missing' for years.",  
	"You are tasked with picking up 20 pieces of straw from the barn. Because heroes gather straw now.",  
	"You are collecting bread crumbs for a hungry pigeon. It's not much, but it's honest work.",  
	"You are fetching some ink for the NPC who has an urgent letter to write. Too bad they could just walk 10 feet.",  
	"You are tasked with finding a spoon lost in a field. A spoon. It's the kind of story bards will sing about, surely.",
	"You are sent to gather 10 wildflowers from a nearby meadow for a 'mysterious' potion. Yes, flowers. So dangerous.",  
	"You are tasked with delivering a loaf of bread to the village baker's apprentice. Because the baker can't walk five steps, apparently.",  
	"You are retrieving goat's milk for a local farmer. A task only you, the mighty adventurer, can complete.",  
	"You are tasked with finding a missing sheep. I'm sure it hasn't wandered off too far... right?",  
	"You are sent to collect dragonfly wings. No, not from a dragon-just regular dragonflies.",  
	"You are fetching mushrooms from the forest floor. But only the blue ones, for some reason.",  
	"You are tasked with delivering a love letter between two noble houses. Their romance truly depends on your heroic delivery skills.",  
	"You are collecting feathers for a knight's quill. Apparently, no one else has heard of writing tools.",  
	"You are retrieving apples from a nearby orchard. Not quite as glamorous as slaying monsters, but here we are.",  
	"You are sent to gather hay for a horse. Not exactly the daring adventure you imagined.",  
	"You are tasked with collecting honey from bees that don't seem to appreciate your presence.",  
	"You are fetching a bucket of water for a thirsty knight. I'm sure their squire couldn't handle this.",  
	"You are sent to collect frog legs. No explanation was given, but that doesn't make it any less weird.",  
	"You are tasked with retrieving lost candles from a crypt. Because the real terror is poor lighting.",  
	"You are gathering nettles for a peasant's soup. Nothing says heroism like foraging for soup ingredients.",  
	"You are sent to fetch parchment for a scholar who's too busy 'thinking' to get it themselves.",  
	"You are tasked with finding a wayward goose. Why does this keep happening?",  
	"You are retrieving an ancient scroll. Except it's not in a dungeon, it's just under someone's bed.", 
	"You are sent to gather wild berries for the castle's feast. A gourmet mission, no doubt.",  
	"You are tasked with collecting firewood for the village blacksmith. Apparently, axes are heavier than hammers.",  
	"You are fetching a spool of golden thread for a noble's fancy cloak. How... majestic.",  
	"You are collecting river stones for a local craftsman. A quest as thrilling as watching paint dry.",  
	"You are sent to gather lavender for the queen's bath. This is clearly the life of a noble adventurer.",  
	"You are tasked with finding a lost sheep's bell. Yes, a bell. You'll be remembered in legend for this.",  
	"You are fetching a broomstick for a witch who doesn't want to walk to the market. Even magic users can be lazy.",  
	"You are gathering mint leaves for a local healer's tea. Because when illness strikes, tea is the answer.",  
	"You are tasked with collecting a handful of sand from the desert. Not too much, though-just enough for 'ritual purposes.'",  
	"You are retrieving a fishing rod for a fisherman who misplaced it. Truly a quest of epic proportions.",  
	"You are tasked with delivering a chicken to the neighboring farm. Careful-it's a long five-minute walk.",  
	"You are fetching a comb for a princess who has misplaced hers. A test of strength? No. A test of patience? Absolutely.",  
	"You are collecting ivy from the castle walls. For some reason, they can't reach it from inside.",  
	"You are tasked with finding the blacksmith's lost hammer. It's probably under the forge, but let's call it a quest.",  
	"You are retrieving goat horns for a potion. Don't worry, the goats don't seem to mind.",  
	"You are sent to gather kindling for the innkeeper's hearth. Apparently, no one else in town can start a fire.",  
	"You are tasked with collecting wheat from the fields. The farmers could do it, but they have 'other things' to worry about.",  
	"You are fetching ink for a wizard who has somehow run out of magical ways to write things down.",  
	"You are gathering nightshade for an alchemist. For something *totally harmless*, they assure you.",  
	"You are tasked with retrieving a spindle for the weaver. A mighty quest for the ages.",  
	"You are sent to collect dew from the morning grass. Because apparently, that's a thing people need.",  
	"You are gathering acorns for a squirrel who refuses to do it themselves. Wait... why are you helping a squirrel?",  
	"You are fetching a bundle of herbs for a witch's brew. No curses involved, she swears.",  
	"You are tasked with collecting glowworms from a cave. For 'light' purposes, of course.",  
	"You are retrieving an enchanted pebble. It looks like every other pebble, but this one is *special*.",  
	"You are sent to gather thistles for a castle tapestry. Because nothing says 'luxury' like prickly plants.",  
	"You are tasked with collecting snow from the highest mountain peak. It's just snow, but they insist.",  
	"You are fetching river reeds for a bard's new lute. Because musical instruments need to be difficult, apparently.",  
	"You are gathering golden leaves from the autumn woods. Sure, they're pretty, but are they really worth the effort?",  
	"You are sent to fetch ale from the tavern for a knight. Because clearly, no one else could carry a drink.",  
	"You are retrieving salt from the sea. Because apparently, salt mines are too mainstream.",  
	"You are sent to gather moonlit dew. Don't ask why-it's just important, okay?",  
	"You are tasked with finding a long-lost book in the village library. It's probably just misplaced, but sure, let's make it a quest.",  
	"You are fetching a bouquet of roses for a noble. Just in time for a dramatic declaration of love.",  
	"You are gathering lily pads for a pond-dwelling hermit. I'm sure they have great plans for them.",  
	"You are sent to fetch an amulet that fell into a stream. Don't worry, the water's probably not that cold.",  
	"You are tasked with collecting wild mint for a peasant's 'special stew.' Because mint makes everything better?",  
	"You are retrieving a ring from the village well. I'm sure no one's thrown it in there for a reason...",  
	"You are tasked with finding a missing lantern. It's probably still burning somewhere nearby.",  
	"You are fetching a single silver coin for an NPC who's 'lost' it somewhere in the haystack. Best of luck with that.",  
	"You are gathering snail shells for a 'very important' alchemical experiment. The reason? Unknown, but you're doing it.",  
	"You are retrieving a wheel of cheese from a farmer's cart. Just don't drop it.",  
	"You are sent to gather pigeon feathers for an archer's arrows. Because pigeons make the best fletching material?",  
	"You are tasked with collecting tree sap for a blacksmith's new invention. Let's hope it's useful.",  
	"You are fetching a barrel of wine for the local tavern. No, you can't have a sip.",  
	"You are gathering mushrooms for a noble's feast. But only the finest ones, of course.",  
	"You are sent to find a lost fishing net. Spoiler: it's probably still in the water.",  
	"You are tasked with collecting hay for a villager's cow. Because clearly, hay isn't everywhere around here.",  
	"You are fetching a harp string for a bard's broken instrument. Don't expect a song in return.",  
	"You are gathering a handful of earth from the sacred grove. No idea why it's sacred, but you're getting it anyway.",  
	"You are tasked with finding a missing pair of boots. They're probably still on someone's feet.",  
	"You are sent to fetch feathers from a griffin's nest. Just the feathers-no need to fight the griffin.",  
	"You are collecting sunflower seeds for a farmer. Apparently, they ran out during harvest.",  
	"You are retrieving a lost shield from a battlefield. Hopefully, it's not still being used.",  
	"You are tasked with gathering ash from a burnt-out firepit. For 'ceremonial' purposes, naturally.",  
	"You are sent to fetch an ornate spoon from the royal kitchens. Because regular spoons just won't cut it.",  
	"You are collecting marigold petals for a healer's poultice. A heroic task, if ever there was one.",  
	"You are retrieving a lute string for a bard who can't quite finish their ballad without it.",  
	"You are tasked with finding a horseshoe lost in the mud. Surely, this is what legendary heroes do.",  
	"You are sent to gather sage for a ritual. Don't ask what kind of ritual-it's better not to know.",  
	"You are collecting wool from sheep for a weaver. Not nearly as exciting as shearing dragons, is it?",  
	"You are tasked with fetching a quill from a griffon's wing. No, the griffon probably won't mind. Probably.",  
	"You are retrieving a bell that fell from the tower. Not exactly thrilling, but it does make noise.",  
	"You are sent to gather coal for the blacksmith's forge. It's dirty work, but someone's got to do it.",  
	"You are tasked with finding a missing rabbit. Maybe check the nearest cabbage patch?",  
	"You are collecting butterflies for a bard's performance. They insist it's essential for the show.",  
	"You are sent to fetch a lost crown from the river. Maybe it's not as heavy as it sounds.",  
	"You are tasked with gathering daisies for a princess's garden. Because royalty demands perfection in all things.",  
	"You are retrieving golden thread from a spider's web. A particularly *magical* spider, no doubt.",  
	"You are sent to gather gemstones for a jeweler's craft. Just regular gemstones-no dungeons involved.",  
	"You are tasked with finding a lost staff in the woods. Hopefully, it's not too magical. Or too lost.",  
	"You are collecting feathers from a phoenix's nest. The trick is to wait until it flies off... good luck.",  
	"You are sent to fetch a teacup for the royal family's afternoon tea. A quest fit for a true knight, surely.",  
	"You are tasked with gathering clay from the riverbank for a potter. Not quite as glamorous as saving the world, is it?",  
	"You are retrieving a key lost in the castle moat. Because, of course, it couldn't be somewhere dry."
	]

//var questFocus = QuestFocuses.NONE;
var questProgress = 0;
var questTarget = 0;
var questXp = 0;
var questGold = 0;
var questFlavourText = "You are running from NPC to NPC as a messenger. Such challenge for a hero!";

function updateQuestFocus()
{
	$("#questing_slider_button_info_xp_selected").html("<br>");
	$("#questing_slider_button_info_balanced_selected").html("<br>");
	$("#questing_slider_button_info_gold_selected").html("<br>");

	switch(player.questingFocus)
	{
		case QuestFocuses.XP:
		$("#questing_slider_button_info_xp_selected").text("X");
			break;
		case QuestFocuses.BALANCED:
		$("#questing_slider_button_info_balanced_selected").text("X");
			break;
		case QuestFocuses.GOLD:
		$("#questing_slider_button_info_gold_selected").text("X");
			break;
		default:
			consoleLogDebug("Unhandled case in updateQuestFocus() !");
			break;
	}
}

function initializeQuesting()
{
	$("#questing_focus_button_xp").click(function(){
		player.questingFocus = QuestFocuses.XP;
		updateQuestFocus();
	});

	$("#questing_focus_button_balanced").click(function(){
		player.questingFocus = QuestFocuses.BALANCED;
		updateQuestFocus();
	});

	$("#questing_focus_button_gold").click(function(){
		player.questingFocus = QuestFocuses.GOLD;
		updateQuestFocus();
	});
	
	updateQuestFocus();
	updateQuestInfo();
}

function ShowQuestingWindow()
{
	$("#questing_window").css("display", "flex");
}

function HideQuestingWindow()
{
	$("#questing_window").css("display", "none");
}

function startQuesting()
{
	updateQuestInfo();
}

function stopQuesting()
{
}

function tickQuesting()
{
	if(player.exhaustion < player.maxExhaustion)
	{
		if(questProgress < questTarget)
		{
			questProgress++;
			player.exhaustion++;
			if(questProgress >= questTarget)
			{
				finishQuest();
			}
		}
		else
		{
			getNewQuest();
		}
	}

	updateQuestInfo();
}

function getNewQuest()
{
	const minXpRoll = player.level * 3 + 10;
	const maxXpRoll = player.level * 6 + 15;

	const minGoldRoll = player.level * 9 + 10;
	const maxGoldRoll = player.level * 15 + 15;

	var xpRoll = +(Math.random() * (maxXpRoll - minXpRoll) + minXpRoll).toFixed();
	var goldRoll = +(Math.random() * (maxGoldRoll - minGoldRoll) + minGoldRoll).toFixed();

	switch (player.questingFocus) {
		case QuestFocuses.XP:
			xpRoll = +(xpRoll * 1.5).toFixed();
			goldRoll = +(goldRoll * 0.70).toFixed();
			break;
		case QuestFocuses.BALANCED:
			break;
		case QuestFocuses.GOLD:
			xpRoll = +(xpRoll * 0.70).toFixed();
			goldRoll = +(goldRoll * 1.5).toFixed();
			break;
		default:
			break;
	}

	questXp = xpRoll;
	questGold = goldRoll;

	questTarget = +(Math.random() * 3 + +((1/5 * player.level).toFixed()) + 3).toFixed();
	questProgress = 0;
	
	const randomFlavourTextID = +(Math.random() * FlavoutTexts.length - 1).toFixed();

	questFlavourText = FlavoutTexts[randomFlavourTextID];
	
	$("#questing_flavour_text").text(questFlavourText);
	$("#questing_reward_xp").text("XP: " + questXp);
	$("#questing_reward_gold").text("GOLD: " + questGold);
}

function finishQuest()
{
	playerAddXp(questXp);
	player.gold = +(player.gold + questGold);

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
		$("#questing_progress_bar_inside").css("width", "0%");
	}
	else
	{
		const questProgressFillPercent = (questProgress / questTarget * 100) + "%";
		$("#questing_progress_bar_inside").css("width", questProgressFillPercent);
	}

	const playerExhaustionFillPercent = (player.exhaustion / player.maxExhaustion * 100).toFixed();
	if(playerExhaustionFillPercent > 80)
	{
		$("#questing_exhaustion_percentage").css("color", "red");
		$("#questing_exhaustion_tutorial").css("display", "block");
	}
	else
	{
		$("#questing_exhaustion_percentage").css("color", "white");
		$("#questing_exhaustion_tutorial").css("display", "none");
	}
	$("#questing_exhaustion_percentage").text("Bloodlust level: " + playerExhaustionFillPercent + "%");
}