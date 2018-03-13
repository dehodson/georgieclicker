var totalClickAmount = 0;
var level = 1;
var playerCash = 0;
var levelMult = 1;
var amountOfBathrooms = 0;
var bathroomPower = 0.5;
var angerLevel = 0;
var twixTimer = 0;
var georgeLying = 0;
var isLaughing = false;
var clickPower = 1;
var backgroundX = 0.0;
var skillPoints = 0;
var lyingSecondTimer = 0;
var cashmereSecondTimer = 0;
var elaineHelping = 0;
var golfBallX = 0.0;
var golfBallY = 0.0;
var newGolfBall = 0;
var golfBallActive = false;
var golfBallTimer;
var whaleX = 500;
var whaleActive = false;
var cashmereSwitchCounter = 0;
var contestCounter = 0;
var contestActive = false;
var parentLevel = 1;
var parentPosition = 0;
var iqTestActive;
var saveGameTimer = 0;
var cleverBranchCount = 0;
var angryBranchCount = 0;
var dishonestBranchCount = 0;
var kysCount = 0;
var deathCount = 0;
var deathMult = 1;
var powerUpMoveList = ["powerup-bathrooms", "powerup-bathrooms2", "powerup-bathrooms3", "powerup-upset", "powerup-squint", "powerup-super-squint", "powerup-twix", "powerup-shrinkage", "powerup-dishonest", "powerup-cashmere", "powerup-whaleBio", "powerup-contest", "powerup-mom", "powerup-dad", "powerup-iqTest", "powerup-answer-machine", "powerup-human-fund", "powerup-pulp", "powerup-kys"];
var powerUpsAchieved = [];
var availableUpgrades = [];
var unlockedUpgrades = [];
var pulpActive = false;

var powerUpTree = {
	"upgrade-clever-george":    ["upgrade-squint", "upgrade-bathrooms2"],
	"upgrade-bathrooms2":       ["upgrade-bathrooms3"],
	"upgrade-bathrooms3":       [],
	"upgrade-squint":           ["upgrade-super-squint"],
	"upgrade-super-squint":     [],
	"upgrade-angry-george":     ["upgrade-twix", "upgrade-dad"],
	"upgrade-twix":             ["upgrade-shrinkage"],
	"upgrade-shrinkage":        [],
	"upgrade-dad":              ["upgrade-mom"],
	"upgrade-mom":              [],
	"upgrade-dishonest-george": ["upgrade-cashmere", "upgrade-whaleBio"],
	"upgrade-whaleBio":         ["upgrade-contest"],
	"upgrade-contest":          [],
	"upgrade-cashmere":         ["upgrade-iqTest"],
	"upgrade-iqTest":           [],
	"upgrade-answer-machine":   [],
	"upgrade-human-fund":       [],
	"upgrade-pulp":             [],
	"upgrade-kys":              []
};

var saveState = {};

function saveGame() {
	saveState.totalClickAmount = totalClickAmount;
	saveState.level = level;
	saveState.playerCash = playerCash;
	saveState.levelMult = levelMult;
	saveState.amountOfBathrooms = amountOfBathrooms;
	saveState.bathroomPower = bathroomPower;
	saveState.angerLevel = angerLevel;
	saveState.twixTimer = twixTimer;
	saveState.georgeLying = georgeLying;
	saveState.isLaughing = isLaughing;
	saveState.clickPower = clickPower;
	saveState.backgroundX = backgroundX;
	saveState.skillPoints = skillPoints;
	saveState.lyingSecondTimer = lyingSecondTimer;
	saveState.cashmereSecondTimer = cashmereSecondTimer;
	saveState.elaineHelping = elaineHelping;
	saveState.golfBallX = golfBallX;
	saveState.golfBallY = golfBallY;
	saveState.newGolfBall = newGolfBall;
	saveState.golfBallActive = golfBallActive;
	saveState.golfBallTimer = golfBallTimer;
	saveState.whaleX = whaleX;
	saveState.whaleActive = whaleActive;
	saveState.cashmereSwitchCounter = cashmereSwitchCounter;
	saveState.contestCounter = contestCounter;
	saveState.contestActive = contestActive;
	saveState.parentLevel = parentLevel;
	saveState.parentPosition = parentPosition;
	saveState.iqTestActive = iqTestActive;
	saveState.deathCount = deathCount;
	saveState.deathMult = deathMult;
	saveState.powerUpsAchieved = powerUpsAchieved;
	saveState.powerUpMoveList = powerUpMoveList;
	saveState.unlockedUpgrades = unlockedUpgrades;
	saveState.cleverBranchCount = cleverBranchCount;
	saveState.dishonestBranchCount = dishonestBranchCount;
	saveState.angryBranchCount = angryBranchCount;
	saveState.kysCount = kysCount;
	saveState.pulpActive = pulpActive;
	saveState.availableUpgrades = availableUpgrades;
	localStorage.saveState = JSON.stringify(saveState);
}

if (localStorage.saveState) {
	saveState = JSON.parse(localStorage.saveState);
	totalClickAmount = saveState.totalClickAmount;
	level = saveState.level;
	playerCash = saveState.playerCash;
	levelMult = saveState.levelMult;
	amountOfBathrooms = saveState.amountOfBathrooms;
	bathroomPower = saveState.bathroomPower;
	angerLevel = saveState.angerLevel;
	twixTimer = saveState.twixTimer;
	georgeLying = saveState.georgeLying;
	isLaughing = saveState.isLaughing;
	clickPower = saveState.clickPower;
	backgroundX = saveState.backgroundX;
	skillPoints = saveState.skillPoints;
	lyingSecondTimer = saveState.lyingSecondTimer;
	cashmereSecondTimer = saveState.cashmereSecondTimer;
	elaineHelping = saveState.elaineHelping;
	golfBallX = saveState.golfBallX;
	golfBallY = saveState.golfBallY;
	newGolfBall = saveState.newGolfBall;
	golfBallActive = saveState.golfBallActive;
	golfBallTimer = saveState.golfBallTimer;
	whaleX = saveState.whaleX;
	whaleActive = saveState.whaleActive;
	cashmereSwitchCounter = 1;
	contestCounter = saveState.contestCounter;
	contestActive = saveState.contestActive;
	parentLevel = saveState.parentLevel;
	parentPosition = saveState.parentPosition;
	iqTestActive = saveState.iqTestActive;
	deathCount = saveState.deathCount;
	deathMult = saveState.deathMult;
	powerUpsAchieved = saveState.powerUpsAchieved;
	powerUpMoveList = saveState.powerUpMoveList;
	unlockedUpgrades = saveState.unlockedUpgrades;
	cleverBranchCount = saveState.cleverBranchCount;
	angryBranchCount = saveState.angryBranchCount;
	kysCount = saveState.kysCount;
	pulpActive = saveState.pulpActive;
	availableUpgrades = saveState.availableUpgrades;
	dishonestBranchCount = saveState.dishonestBranchCount;

	for (var n in unlockedUpgrades) {
		unlockChildren(document.getElementById(unlockedUpgrades[n]));
	}

	if ( deathCount > 0){
		document.getElementById("death").style.display = 'inline-block';
		document.getElementById("death-number").innerText = deathCount;
	}

	document.getElementById("powerup-upset-number").innerText = angerLevel;
	document.getElementById("powerup-upset-price").innerText = 10 * (angerLevel + 10);

	for (var n in availableUpgrades) {
		document.getElementById(availableUpgrades[n]).className = "upgrade-node available";
	}

	for (var n in powerUpsAchieved) {
		document.getElementById(powerUpsAchieved[n]).style.display = 'inline-block';
		if (powerUpsAchieved[n] !== "powerup-cashmere") {
			upgrade(powerUpsAchieved[n], 0);
		} else {
			if (cashmereSwitchCounter % 2 === 0) {
				document.getElementById("cashmere-button").innerText = "ON";
				elaineHelping = 1;
			} else {
				document.getElementById("cashmere-button").innerText = "OFF";
				document.getElementById("powerup-cashmere-number").innerText = "Placated";
				elaineHelping = 0;
			}
		}
	}

	addCash(0);
	addSkillPoints(0);
	document.getElementById("level").innerText = level;
}

function killYourSelf(num) {
	if (num != 0 ){
		for (var n in unlockedUpgrades){
			if (document.getElementById(unlockedUpgrades[n]).id === 'upgrade-clever-george' || document.getElementById(unlockedUpgrades[n]).id === 'upgrade-angry-george' || document.getElementById(unlockedUpgrades[n]).id === 'upgrade-dishonest-george' ) {
				document.getElementById(unlockedUpgrades[n]).className = "upgrade-node available";
			}else{
				document.getElementById(unlockedUpgrades[n]).className = "upgrade-node disabled";
			}
		}
		for (var n in powerUpsAchieved){
			document.getElementById(powerUpsAchieved[n]).style.display = "none";
		}
		deathCount++;
		deathMult = (deathCount + .5) * (deathCount + .5) * 5;

		totalClickAmount = 0;
		totalClickAmount = 0;
		level = 1;
		playerCash = 0;
		levelMult = 1;
		amountOfBathrooms = 0;
		bathroomPower = 0.5;
		angerLevel = 0;
		twixTimer = 0;
		georgeLying = 0;
		isLaughing = false;
		clickPower = 1;
		skillPoints = 0;
		lyingSecondTimer = 0;
		cashmereSecondTimer = 0;
		elaineHelping = 0;
		golfBallX = 0.0;
		golfBallY = 0.0;
		newGolfBall = 0;
		golfBallActive = false;
		golfBallTimer;
		whaleX = 500;
		whaleActive = false;
		cashmereSwitchCounter = 0;
		contestCounter = 0;
		contestActive = false;
		parentLevel = 1;
	 	parentPosition = 0;
		iqTestActive = false;
		saveGameTimer = 0;
		cleverBranchCount = 0;
		angryBranchCount = 0;
		dishonestBranchCount = 0;
		kysCount = 0;
		pulpActive = false;
		powerUpMoveList = ["powerup-bathrooms", "powerup-bathrooms2", "powerup-bathrooms3", "powerup-upset", "powerup-squint", "powerup-super-squint", "powerup-twix", "powerup-shrinkage", "powerup-dishonest", "powerup-cashmere", "powerup-whaleBio", "powerup-contest", "powerup-mom", "powerup-dad", "powerup-iqTest", "powerup-answer-machine", "powerup-human-fund", "powerup-pulp", "powerup-kys"];
		powerUpsAchieved = [];
		unlockedUpgrades = [];

		saveGame();
		location.reload();

	}
	document.getElementById("death").style.display=  'inline-block';
	document.getElementById("death-number").innerText = deathCount;
}
//function to handle all clicks
function clickOnGeorge(clicks) {
	if (typeof clicks === 'undefined') {
		clicks = clickPower * deathMult;
		if (elaineHelping === 1) {
			clicks *= 100 * deathMult;
		} else if (elaineHelping === 2) {
			clicks *= -100 * deathMult;
		}
		if (contestActive) {
			contestCounter = 60 * 20;
		}
	}
	if (totalClickAmount + clicks < 0) {
		totalClickAmount = 0;
	} else {
		totalClickAmount = totalClickAmount + clicks;
	}
	//checks to see if the player should level up because of this click
	if (totalClickAmount - (Math.pow(2, (2*level)+2 )) >= 0) {
		levelUp();
	}
	document.getElementById("score").innerText = totalClickAmount.toFixed(0);
}

function clickOnGeorgeMoney() {
	if (iqTestActive === true) {
		if (elaineHelping === 0) {
			addCash(0.5);
		} else if (elaineHelping == 1) {
			addCash(10);
		} else if (elaineHelping == 2) {
			addCash(-3);
		}
	}
}

function addCash(amount) {
	playerCash += amount;
	document.getElementById("cash").innerText = playerCash;
}

function spendCash(amount) {
	playerCash -= amount;
	document.getElementById("cash").innerText = playerCash;
}

function addSkillPoints(amount) {
	if(pulpActive == true){
		var skillChance = Math.floor(Math.random() * 10) + 1
		if(skillChance < 4){
			console.log("gain 2 skill points ")
			amount = 2;
		}
	}
	skillPoints += amount;
	document.getElementById("skill-points").innerText = skillPoints;
}

function spendSkillPoints(amount) {
	skillPoints -= amount;
	document.getElementById("skill-points").innerText = skillPoints;
}

function upgrade(name, number) {
	if (name == "powerup-bathrooms") {
		if (playerCash >= 10 * (amountOfBathrooms + 1)) {
			amountOfBathrooms = amountOfBathrooms + number;
			document.getElementById(name + "-number").innerText = amountOfBathrooms;
			document.getElementById(name + "-price").innerText = 10 * (amountOfBathrooms + 1);
			spendCash(10 * amountOfBathrooms);
		}
	} else if (name == "powerup-bathrooms2") {
		bathroomPower = 1;
	} else if (name == "powerup-bathrooms3") {
		bathroomPower = 2.5;
	} else if (name == "powerup-squint") {
		if(number < 1){
			number = 1;
		}
		clickPower = 5 * number;
	} else if (name == "powerup-super-squint") {
		if(number < 1){
			number = 1;
		}
		clickPower = 10 * number;
	} else if (name == "powerup-answer-machine") {
		//move for answer machine
		if(number < 1){
			number = 1;
		}
		bathroomPower = bathroomPower * 2.5;
		clickPower = 100 * number;

	}


	//parts for upset george
	else if (name == "powerup-upset") {
		if ((parentLevel == 3 || angerLevel < parentLevel * 100) && playerCash >= 10 * (angerLevel + 10)) {
			angerLevel = angerLevel + number;
			document.getElementById(name + "-number").innerText = angerLevel;
			document.getElementById(name + "-price").innerText = 10 * (angerLevel + 10);
			spendCash(10 * angerLevel);
		}
	} else if (name == "powerup-twix") {
		if (playerCash >= 50 && number == 1) {
			spendCash(50);
			twixTimer += (60 * 20);
		}
	} else if (name == "powerup-shrinkage") {
		isLaughing = true;
	} else if (name == "powerup-parents") {
		parentLevel = number;
		if (number == 2) document.getElementById("frank").style.visibility = "visible";
		if (number == 3) document.getElementById("estelle").style.visibility = "visible";
	} else if (name == "powerup-pulp"){
		pulpActive = true;
	}


	//parts for dishonest branch power ups
	else if (name == "powerup-dishonest") {
		georgeLying = 1;
	} else if (name == "powerup-cashmere") {
		//elaineHelping equals 0 then she isnt helping
		//elaineHelping equals 1 then she is helping with time not out and each click gives more points
		//elaineHelping equals 2 she is helping but time is out and each click takes away clicks
		if (playerCash >= 200 && cashmereSwitchCounter % 2 === 0) {
			elaineHelping = number;
			spendCash(200);
			cashmereSecondTimer += (10 * 20);
			document.getElementById("cashmere-switch").style.visibility = "visible";
		}
	} else if (name == "powerup-whaleBio") {
		golfBallTimer = 20;
		whaleActive = true;
	} else if (name == "powerup-contest") {
		contestActive = true;
		contestCounter = 60 * 20;
	} else if (name == "powerup-iqTest") {
		// iqTest should be effected by the function powerupSwitch and in gameTick under cashmere portion
		iqTestActive = true;
	} else if (name == "powerup-human-fund"){
		addCash(20000);
	} else if (name == "powerup-kys"){
		//TODO: restart the game and add death counter
		killYourSelf(number);
	}
}

function powerupSwitch(powerup) {
	if (powerup == 'cashmere') {
		cashmereSwitchCounter++;
		if (cashmereSwitchCounter % 2 === 0) {
			document.getElementById("cashmere-button").innerText = "ON";
			elaineHelping = 1;
			saveGame();
		} else {
			document.getElementById("cashmere-button").innerText = "OFF";
			document.getElementById("powerup-cashmere-number").innerText = "Placated";
			elaineHelping = 0;
			saveGame();
		}
	}
}

function upgradable(element) {
	if (element.className == "upgrade-node available" && skillPoints > 0) {
		saveGame();
		return true;
	}
	return false;
}

function unlockChildren(element) {

	element.className = "upgrade-node visible";
	var id = element.id;
	id = String(id);
	var found = availableUpgrades.indexOf(id);

	 while (found !== -1) {
			 availableUpgrades.splice(found, 1);
			 found = availableUpgrades.indexOf(id);
	 }
	var exists = false;
	for (var item in unlockedUpgrades) {
		if (unlockedUpgrades[item] == element.id) {
			exists = true;
		}
	}
	if (!exists) {
		unlockedUpgrades.push(element.id);
	}
	for (var i = 0; i < powerUpTree[id].length; i++) {
		document.getElementById(powerUpTree[id][i]).className = "upgrade-node available";
		availableUpgrades.push(powerUpTree[id][i]);
	}
	if (document.getElementById("upgrade-bathrooms3").className == 'upgrade-node visible' && document.getElementById("upgrade-super-squint").className == 'upgrade-node visible' && cleverBranchCount === 0) {
		cleverBranchCount = 1;
		document.getElementById("upgrade-answer-machine").className = "upgrade-node available";
		availableUpgrades.push("upgrade-answer-machine");
	}
	if (document.getElementById("upgrade-shrinkage").className == 'upgrade-node visible' && document.getElementById("upgrade-mom").className == 'upgrade-node visible' && angryBranchCount === 0) {
		angryBranchCount = 1;
		document.getElementById("upgrade-pulp").className = "upgrade-node available";
		availableUpgrades.push("upgrade-pulp");

	}
	if (document.getElementById("upgrade-contest").className == 'upgrade-node visible' && document.getElementById("upgrade-iqTest").className == 'upgrade-node visible' && dishonestBranchCount === 0) {
		dishonestBranchCount = 1;
		document.getElementById("upgrade-human-fund").className = "upgrade-node available";
		availableUpgrades.push("upgrade-human-fund");


	}
	if( document.getElementById("upgrade-answer-machine").className == "upgrade-node visible" && document.getElementById("upgrade-pulp").className == "upgrade-node visible" && document.getElementById("upgrade-human-fund").className == "upgrade-node visible" && kysCount === 0){
		kysCount = 1;
		document.getElementById("upgrade-kys").className = "upgrade-node available";
		availableUpgrades.push("upgrade-kys");

	}
}

function newUpgrade(newMove) {
	var index, value;
	for (index = 0; index < powerUpMoveList.length; index++) {
		value = powerUpMoveList[index];
		if (value == newMove && skillPoints > 0) {
			document.getElementById(newMove).style.display = 'inline-block';
			spendSkillPoints(1);
			powerUpsAchieved.push(newMove);
			powerUpMoveList.splice(index, 1);
			break;
		}
	}
}
//adds more points to spend on powerups and levels the player to the next level
function levelUp() {
	addCash(100 * level);
	level++;
	addSkillPoints(1);
	levelMult = levelMult + 1;
	document.getElementById("level").innerText = level;
}

function updateBackground() {
	backgroundX += 1;
	if (backgroundX >= 250) {
		backgroundX = 0;
	}
	document.getElementById("main-container").style.backgroundPosition = backgroundX + "px " + backgroundX + "px";
}

function gameTick() {
	//saves the game every ten seconds
	saveGameTimer++;

	if (saveGameTimer >= 200) {
		saveGame();
		saveGameTimer = 0;
	}

	var clicksPerSecond = 0;
	clicksPerSecond += bathroomPower * amountOfBathrooms;
	clicksPerSecond += (0.1 * (parentLevel * parentLevel)) * angerLevel;

	if (georgeLying > 0) {
		lyingSecondTimer++;
		document.getElementById("powerup-dishonest-number").innerText = Math.ceil(lyingSecondTimer / 20) + "/10";
		if (lyingSecondTimer == 200) {
			var randMin = .01 * totalClickAmount;
			var randMax = .05 * totalClickAmount;
			var lyingClicks = Math.floor(Math.random() * (randMax - randMin + 1)) + randMin;
			clickOnGeorge(lyingClicks);
			lyingSecondTimer = 0;
		}
	}

	if (whaleActive) {
		document.getElementById("whale").style.visibility = "visible";
		golfBallTimer -= 1;
		document.getElementById("powerup-whaleBio-number").innerText = "FORRREE! " + Math.ceil(golfBallTimer / 20);
	}

	if (golfBallTimer === 0) {
		newGolfBall = true;
		golfBallTimer = 20 * 20;
		golfBallActive = true;
	}

	if (golfBallActive) {
		golfBall();
	}

	if (cashmereSecondTimer > 0 && elaineHelping == 1) {
		cashmereSecondTimer -= 1;
		document.getElementById("powerup-cashmere-number").innerText = "Happy for " + Math.ceil(cashmereSecondTimer / 20);
	} else if (cashmereSecondTimer === 0 && elaineHelping == 1) {
		document.getElementById("powerup-cashmere-number").innerText = "Pissed";
		elaineHelping = 2;
	}

	if (twixTimer > 0) {
		twixTimer -= 1;
		clicksPerSecond *= 2;
		document.getElementById("powerup-twix-number").innerText = Math.ceil(twixTimer / 20);
	}

	if (contestActive && contestCounter > 0) {
		contestCounter -= 1;
		document.getElementById("powerup-contest-number").innerText = Math.ceil(contestCounter / 20);
	} else if (contestActive && contestCounter === 0) {
		contestCounter = 60 * 20;
		addCash(100);
	}
	
	if (Math.random() > 0.99 && isLaughing) {
		laughing(true);
	}

	clicksPerSecond = clicksPerSecond * deathMult;
	clickOnGeorge(clicksPerSecond);
	updateBackground();

	parentPosition += 0.02;
	if (parentPosition >= 6.28) {
		parentPosition = 0;
	}

	orbitParents();
}

setInterval(gameTick, 50);

function togglePanel() {
	var panel = document.getElementById("upgrade-panel");

	if (panel.className == "open") {
		panel.className = "closed";
		document.getElementById("upgrade-panel-closetext").style.visibility = "hidden";
	} else {
		panel.className = "open";
		setTimeout(function() {
			document.getElementById("upgrade-panel-closetext").style.visibility = "visible";
		}, 150);
	}
}

function keyPressed(event) {
	if (event.which == 32) {
		togglePanel();
	} else if (event.which == 77) {
		clickOnGeorge(2000000);
		addSkillPoints(20);
		addCash(1000);
	} else if (event.which == 37) {
		whaleMove("left");
	} else if (event.which == 39) {
		whaleMove("right");
	}
}

function laughing(bool) {
	var element = document.getElementById("laughing");

	if (bool) {
		element.style.top = (Math.random() * (screen.height * 0.9) + 100) + "px";
		element.style.left = (Math.random() * (screen.width * 0.4) + 50) + "px";
		element.style.visibility = "visible";
	} else {
		element.style.visibility = "hidden";
		clickOnGeorge(totalClickAmount * 0.03);
	}
}

function whaleMove(direction) {
	var element = document.getElementById("whale");

	if (direction == "left") {
		if (whaleX > 0) {
			whaleX -= 15;
			element.style.left = whaleX + "px";
			element.className = "";
		}
	} else if (direction == "right") {
		if (whaleX < document.getElementById("main-container").clientWidth - 150) {
			whaleX += 15;
			element.style.left = whaleX + "px";
			element.className = "flip";
		}
	}
}

function golfBall() {
	var element = document.getElementById("golfball");
	var whale = document.getElementById("whale");
	var rect1 = element.getBoundingClientRect();
	var rect2 = whale.getBoundingClientRect();
	var overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);

	element.style.visibility = "visible";

	if (newGolfBall === true) {
		golfBallX = (Math.random() * (screen.width * 0.4) + 50);
		golfBallY = 0;
		newGolfBall = false;
	}

	if (!newGolfBall) {
		golfBallY += 10;
		element.style.left = golfBallX + "px";
		element.style.top = golfBallY + "px";
		if (golfBallY >= 1000) {
			element.style.visibility = "hidden";
			golfBallActive = false;
			newGolfBall = true;
		}
	}

	if (overlap) {
		addCash(500);
		element.style.visibility = "hidden";
		golfBallActive = false;
		newGolfBall = true;
	}
}

function orbitParents() {
	var mom = document.getElementById("estelle");
	var dad = document.getElementById("frank");

	var originX = 130;
	var originY = 122;
	
	mom.style.top = (originX + Math.cos(parentPosition) * 250) + "px";
	mom.style.left = (originY + Math.sin(parentPosition) * 250) + "px";
	dad.style.top = (originX + Math.cos(parentPosition - 3.14) * 250) + "px";
	dad.style.left = (originY + Math.sin(parentPosition - 3.14) * 250) + "px";
}
