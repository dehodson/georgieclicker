var gameState = {
	"totalClickAmount": 0,
	"level": 1,
	"playerCash": 0,
	"LevelMult": 1,
	"amountOfBathrooms": 0,
	"bathroomPower": 0.5,
	"angerLevel": 0,
	"twixTimer": 0,
	"georgeLying": 0,
	"isLaughing": false,
	"clickPower": 1,
	"backgroundX": 0.0,
	"skillPoints": 0,
	"lyingSecondTimer": 0,
	"cashmereSecondTimer": 0,
	"elaineHelping": 0,
	"golfBallX": 0.0,
	"golfBallY": 0.0,
	"newGolfBall": 0,
	"golfBallActive": false,
	"golfBallTimer": undefined,
	"whaleX": 500,
	"whaleActive": false,
	"cashmereSwitchCounter": 0,
	"contestCounter": 0,
	"contestActive": false,
	"parentLevel": 1,
	"parentPosition": 0,
	"iqTestActive": false,
	"saveGameTimer": 0,
	"cleverBranchCount": 0,
	"angryBranchCount": 0,
	"dishonestBranchCount": 0,
	"kysCount": 0,
	"deathCount": 0,
	"deathMult": 1,
	"powerUpMoveList": ["powerup-bathrooms", "powerup-bathrooms2", "powerup-bathrooms3", "powerup-upset", "powerup-squint", "powerup-super-squint", "powerup-twix", "powerup-shrinkage", "powerup-dishonest", "powerup-cashmere", "powerup-whaleBio", "powerup-contest", "powerup-mom", "powerup-dad", "powerup-iqTest", "powerup-answer-machine", "powerup-human-fund", "powerup-pulp", "powerup-kys"],
	"powerUpsAchieved": [],
	"availableUpgrades": [],
	"unlockedUpgrades": [],
	"pulpActive": false
};

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

var upgrades = {
	"powerup-bathrooms": function (number) {
		if (gameState.playerCash >= 10 * (gameState.amountOfBathrooms + 1)) {
			gameState.amountOfBathrooms = gameState.amountOfBathrooms + number;
			document.getElementById("powerup-bathrooms-number").innerText = gameState.amountOfBathrooms;
			document.getElementById("powerup-bathrooms-price").innerText = 10 * (gameState.amountOfBathrooms + 1);
			spendCash(10 * gameState.amountOfBathrooms);
		}
	},

	"powerup-bathrooms2": function (number) {
		gameState.bathroomPower = 1;
	},

	"powerup-bathrooms3": function (number) {
		gameState.bathroomPower = 2.5;
	},

	"powerup-squint": function (number) {
		if (number < 1) {
			number = 1;
		}

		gameState.clickPower = 5 * number;
	},

	"powerup-super-squint": function (number) {
		if (number < 1) {
			number = 1;
		}
		
		gameState.clickPower = 10 * number;
	},

	"powerup-answer-machine": function (number) {
		if (number < 1) {
			number = 1;
		}
		
		gameState.bathroomPower = gameState.bathroomPower * 2.5;
		gameState.clickPower = 100 * number;
	},

	"powerup-upset": function (number) {
		if ((gameState.parentLevel == 3 || gameState.angerLevel < gameState.parentLevel * 100) && gameState.playerCash >= 10 * (gameState.angerLevel + 10)) {
			gameState.angerLevel = gameState.angerLevel + number;
			document.getElementById("powerup-upset-number").innerText = gameState.angerLevel;
			document.getElementById("powerup-upset-price").innerText = 10 * (gameState.angerLevel + 10);
			spendCash(10 * gameState.angerLevel);
		}
	},

	"powerup-twix": function (number) {
		if (gameState.playerCash >= 50 && number == 1) {
			spendCash(50);
			gameState.twixTimer += (60 * 20);
		}
	},

	"powerup-shrinkage": function (number) {
		gameState.isLaughing = true;
	},


	"powerup-parents": function (number) {
		gameState.parentLevel = number;
		if (number == 2) document.getElementById("frank").style.visibility = "visible";
		if (number == 3) document.getElementById("estelle").style.visibility = "visible";
	},


	"powerup-pulp": function (number) {
		gameState.pulpActive = true;
	},

	"powerup-dishonest": function (number) {
		gameState.georgeLying = 1;
	},

	"powerup-cashmere": function (elaineHelping) {
		//gameState.elaineHelping equals 0 then she isnt helping
		//gameState.elaineHelping equals 1 then she is helping with time not out and each click gives more points
		//gameState.elaineHelping equals 2 she is helping but time is out and each click takes away clicks
		if (gameState.playerCash >= 200 && gameState.cashmereSwitchCounter % 2 === 0) {
			spendCash(200);
			gameState.cashmereSecondTimer += (10 * 20);
			document.getElementById("cashmere-switch").style.visibility = "visible";
		}
	},


	"powerup-whaleBio": function (number) {
		gameState.golfBallTimer = 20;
		gameState.whaleActive = true;
	},


	"powerup-contest": function (number) {
		gameState.contestActive = true;
		gameState.contestCounter = 60 * 20;
	},

	"powerup-iqTest": function (number) {
		// iqTest should be effected by the function powerupSwitch and in gameTick under cashmere portion
		gameState.iqTestActive = true;
	},

	"powerup-human-fund": function (number) {
		addCash(20000);
	},

	"powerup-kys": function (number) {
		//restart the game and add death counter
		killYourSelf(number);
	}
};

function upgrade(name, number) {
	if (upgrades.hasOwnProperty(name)) {
		upgrades[name](number);
	} else {
		console.warn("Unknown upgrade: " + name);
	}
}

function saveGame() {
	console.log("save game called ")
	localStorage.saveState = JSON.stringify(gameState);
}

if (localStorage.saveState) {
	gameState = JSON.parse(localStorage.saveState);


	for (var n in gameState.unlockedUpgrades) {
		unlockChildren(document.getElementById(gameState.unlockedUpgrades[n]));
	}

	if (gameState.deathCount > 0) {
		document.getElementById("death").style.display = 'inline-block';
		document.getElementById("death-number").innerText = gameState.deathCount;
	}

	document.getElementById("powerup-upset-number").innerText = gameState.angerLevel;
	document.getElementById("powerup-upset-price").innerText = 10 * (gameState.angerLevel + 10);

	for (var n in gameState.availableUpgrades) {
		document.getElementById(gameState.availableUpgrades[n]).className = "upgrade-node available";
	}

	for (var n in gameState.powerUpsAchieved) {
		document.getElementById(gameState.powerUpsAchieved[n]).style.display = 'inline-block';
		if (gameState.powerUpsAchieved[n] !== "powerup-cashmere") {
			upgrade(gameState.powerUpsAchieved[n], 0);
		} else {
			if (gameState.cashmereSwitchCounter % 2 === 0) {
				document.getElementById("cashmere-button").innerText = "ON";
				gameState.elaineHelping = 1;
			} else {
				document.getElementById("cashmere-button").innerText = "OFF";
				document.getElementById("powerup-cashmere-number").innerText = "Placated";
				gameState.elaineHelping = 0;
			}
		}
	}

	addCash(0);
	addSkillPoints(0);
	document.getElementById("level").innerText = gameState.level;
}

function killYourSelf(num) {
	if (num != 0 ){
		for (var n in gameState.unlockedUpgrades){
			if (document.getElementById(gameState.unlockedUpgrades[n]).id === 'upgrade-clever-george' || document.getElementById(gameState.unlockedUpgrades[n]).id === 'upgrade-angry-george' || document.getElementById(gameState.unlockedUpgrades[n]).id === 'upgrade-dishonest-george' ) {
				document.getElementById(gameState.unlockedUpgrades[n]).className = "upgrade-node available";
			}else{
				document.getElementById(gameState.unlockedUpgrades[n]).className = "upgrade-node disabled";
			}
		}
		for (var n in gameState.powerUpsAchieved){
			document.getElementById(gameState.powerUpsAchieved[n]).style.display = "none";
		}
		gameState.deathCount++;
		gameState.deathMult = (gameState.deathCount + .5) * (gameState.deathCount + .5) * 5;

		gameState.totalClickAmount = 0;
		gameState.totalClickAmount = 0;
		gameState.level = 1;
		gameState.playerCash = 0;
		gameState.levelMult = 1;
		gameState.amountOfBathrooms = 0;
		gameState.bathroomPower = 0.5;
		gameState.angerLevel = 0;
		gameState.twixTimer = 0;
		gameState.georgeLying = 0;
		gameState.isLaughing = false;
		gameState.clickPower = 1;
		gameState.skillPoints = 0;
		gameState.lyingSecondTimer = 0;
		gameState.cashmereSecondTimer = 0;
		gameState.elaineHelping = 0;
		gameState.golfBallX = 0.0;
		gameState.golfBallY = 0.0;
		gameState.newGolfBall = 0;
		gameState.golfBallActive = false;
		gameState.golfBallTimer;
		gameState.whaleX = 500;
		gameState.whaleActive = false;
		gameState.cashmereSwitchCounter = 0;
		gameState.contestCounter = 0;
		gameState.contestActive = false;
		gameState.parentLevel = 1;
	 	gameState.parentPosition = 0;
		gameState.iqTestActive = false;
		gameState.saveGameTimer = 0;
		gameState.cleverBranchCount = 0;
		gameState.angryBranchCount = 0;
		gameState.dishonestBranchCount = 0;
		gameState.kysCount = 0;
		gameState.pulpActive = false;
		powerUpMoveList = ["powerup-bathrooms", "powerup-bathrooms2", "powerup-bathrooms3", "powerup-upset", "powerup-squint", "powerup-super-squint", "powerup-twix", "powerup-shrinkage", "powerup-dishonest", "powerup-cashmere", "powerup-whaleBio", "powerup-contest", "powerup-mom", "powerup-dad", "powerup-iqTest", "powerup-answer-machine", "powerup-human-fund", "powerup-pulp", "powerup-kys"];
		gameState.powerUpsAchieved = [];
		gameState.unlockedUpgrades = [];

		saveGame();
		location.reload();

	}
	document.getElementById("death").style.display=  'inline-block';
	document.getElementById("death-number").innerText = gameState.deathCount;
}
//function to handle all clicks
function clickOnGeorge(clicks) {
	if (typeof clicks === 'undefined') {
		clicks = gameState.clickPower * gameState.deathMult;
		if (gameState.elaineHelping === 1) {
			clicks *= 100 * gameState.deathMult;
		} else if (gameState.elaineHelping === 2) {
			clicks *= -100 * gameState.deathMult;
		}
		if (gameState.contestActive) {
			gameState.contestCounter = 60 * 20;
		}
	}
	if (gameState.totalClickAmount + clicks < 0) {
		gameState.totalClickAmount = 0;
	} else {
		gameState.totalClickAmount = gameState.totalClickAmount + clicks;
	}
	//checks to see if the player should level up because of this click
	if (gameState.totalClickAmount - (Math.pow(2, (2*gameState.level)+2 )) >= 0) {
		levelUp();
	}
	document.getElementById("score").innerText = gameState.totalClickAmount.toFixed(0);
}

function clickOnGeorgeMoney() {
	if (gameState.iqTestActive === true) {
		if (gameState.elaineHelping === 0) {
			addCash(0.5);
		} else if (gameState.elaineHelping == 1) {
			addCash(10);
		} else if (gameState.elaineHelping == 2) {
			addCash(-3);
		}
	}
}

function addCash(amount) {
	gameState.playerCash += amount;
	document.getElementById("cash").innerText = gameState.playerCash;
}

function spendCash(amount) {
	gameState.playerCash -= amount;
	document.getElementById("cash").innerText = gameState.playerCash;
}

function addSkillPoints(amount) {
	if(gameState.pulpActive == true){
		var skillChance = Math.floor(Math.random() * 10) + 1
		if(skillChance < 4){
			console.log("gain 2 skill points ")
			amount = 2;
		}
	}
	gameState.skillPoints += amount;
	document.getElementById("skill-points").innerText = gameState.skillPoints;
}

function spendSkillPoints(amount) {
	gameState.skillPoints -= amount;
	document.getElementById("skill-points").innerText = gameState.skillPoints;
}

function powerupSwitch(powerup) {
	if (powerup == 'cashmere') {
		gameState.cashmereSwitchCounter++;
		if (gameState.cashmereSwitchCounter % 2 === 0) {
			document.getElementById("cashmere-button").innerText = "ON";
			gameState.elaineHelping = 1;
			saveGame();
		} else {
			document.getElementById("cashmere-button").innerText = "OFF";
			document.getElementById("powerup-cashmere-number").innerText = "Placated";
			gameState.elaineHelping = 0;
			saveGame();
		}
	}
}

function upgradable(element) {
	if (element.className == "upgrade-node available" && gameState.skillPoints > 0) {
		saveGame();
		return true;
	}
	return false;
}

function unlockChildren(element) {

	element.className = "upgrade-node visible";
	var id = element.id;
	id = String(id);
	var found = gameState.availableUpgrades.indexOf(id);

	 while (found !== -1) {
			 gameState.availableUpgrades.splice(found, 1);
			 found = gameState.availableUpgrades.indexOf(id);
	 }
	var exists = false;
	for (var item in gameState.unlockedUpgrades) {
		if (gameState.unlockedUpgrades[item] == element.id) {
			exists = true;
		}
	}
	if (!exists) {
		gameState.unlockedUpgrades.push(element.id);
	}
	for (var i = 0; i < powerUpTree[id].length; i++) {
		document.getElementById(powerUpTree[id][i]).className = "upgrade-node available";
		gameState.availableUpgrades.push(powerUpTree[id][i]);
	}
	if (document.getElementById("upgrade-bathrooms3").className == 'upgrade-node visible' && document.getElementById("upgrade-super-squint").className == 'upgrade-node visible' && gameState.cleverBranchCount === 0) {
		gameState.cleverBranchCount = 1;
		document.getElementById("upgrade-answer-machine").className = "upgrade-node available";
		gameState.availableUpgrades.push("upgrade-answer-machine");
	}
	if (document.getElementById("upgrade-shrinkage").className == 'upgrade-node visible' && document.getElementById("upgrade-mom").className == 'upgrade-node visible' && gameState.angryBranchCount === 0) {
		gameState.angryBranchCount = 1;
		document.getElementById("upgrade-pulp").className = "upgrade-node available";
		gameState.availableUpgrades.push("upgrade-pulp");

	}
	if (document.getElementById("upgrade-contest").className == 'upgrade-node visible' && document.getElementById("upgrade-iqTest").className == 'upgrade-node visible' && gameState.dishonestBranchCount === 0) {
		gameState.dishonestBranchCount = 1;
		document.getElementById("upgrade-human-fund").className = "upgrade-node available";
		gameState.availableUpgrades.push("upgrade-human-fund");


	}
	if( document.getElementById("upgrade-answer-machine").className == "upgrade-node visible" && document.getElementById("upgrade-pulp").className == "upgrade-node visible" && document.getElementById("upgrade-human-fund").className == "upgrade-node visible" && gameState.kysCount === 0){
		gameState.kysCount = 1;
		document.getElementById("upgrade-kys").className = "upgrade-node available";
		gameState.availableUpgrades.push("upgrade-kys");

	}
}

function newUpgrade(newMove) {
	var index, value;
	for (index = 0; index < gameState.powerUpMoveList.length; index++) {
		value = gameState.powerUpMoveList[index];
		if (value == newMove && gameState.skillPoints > 0) {
			document.getElementById(newMove).style.display = 'inline-block';
			spendSkillPoints(1);
			gameState.powerUpsAchieved.push(newMove);
			gameState.powerUpMoveList.splice(index, 1);
			break;
		}
	}
}
//adds more points to spend on powerups and levels the player to the next level
function levelUp() {
	addCash(100 * gameState.level);
	gameState.level++;
	addSkillPoints(1);
	gameState.levelMult = gameState.levelMult + 1;
	document.getElementById("level").innerText = gameState.level;
}

function updateBackground() {
	gameState.backgroundX += 1;
	if (gameState.backgroundX >= 250) {
		gameState.backgroundX = 0;
	}
	document.getElementById("main-container").style.backgroundPosition = gameState.backgroundX + "px " + gameState.backgroundX + "px";
}

function gameTick() {
	//saves the game every ten seconds
	gameState.saveGameTimer++;

	if (gameState.saveGameTimer >= 200) {
		saveGame();
		gameState.saveGameTimer = 0;
	}

	var clicksPerSecond = 0;
	clicksPerSecond += gameState.bathroomPower * gameState.amountOfBathrooms;
	clicksPerSecond += (0.1 * (gameState.parentLevel * gameState.parentLevel)) * gameState.angerLevel;

	if (gameState.georgeLying > 0) {
		gameState.lyingSecondTimer++;
		document.getElementById("powerup-dishonest-number").innerText = Math.ceil(gameState.lyingSecondTimer / 20) + "/10";
		if (gameState.lyingSecondTimer == 200) {
			var randMin = .01 * gameState.totalClickAmount;
			var randMax = .05 * gameState.totalClickAmount;
			var lyingClicks = Math.floor(Math.random() * (randMax - randMin + 1)) + randMin;
			clickOnGeorge(lyingClicks);
			gameState.lyingSecondTimer = 0;
		}
	}

	if (gameState.whaleActive) {
		document.getElementById("whale").style.visibility = "visible";
		gameState.golfBallTimer -= 1;
		document.getElementById("powerup-whaleBio-number").innerText = "FORRREE! " + Math.ceil(gameState.golfBallTimer / 20);
	}

	if (gameState.golfBallTimer === 0) {
		gameState.newGolfBall = true;
		gameState.golfBallTimer = 20 * 20;
		gameState.golfBallActive = true;
	}

	if (gameState.golfBallActive) {
		golfBall();
	}

	if (gameState.cashmereSecondTimer > 0 && gameState.elaineHelping == 1) {
		gameState.cashmereSecondTimer -= 1;
		document.getElementById("powerup-cashmere-number").innerText = "Happy for " + Math.ceil(gameState.cashmereSecondTimer / 20);
	} else if (gameState.cashmereSecondTimer === 0 && gameState.elaineHelping == 1) {
		document.getElementById("powerup-cashmere-number").innerText = "Pissed";
		gameState.elaineHelping = 2;
	}

	if (gameState.twixTimer > 0) {
		gameState.twixTimer -= 1;
		clicksPerSecond *= 2;
		document.getElementById("powerup-twix-number").innerText = Math.ceil(gameState.twixTimer / 20);
	}

	if (gameState.contestActive && gameState.contestCounter > 0) {
		gameState.contestCounter -= 1;
		document.getElementById("powerup-contest-number").innerText = Math.ceil(gameState.contestCounter / 20);
	} else if (gameState.contestActive && gameState.contestCounter === 0) {
		gameState.contestCounter = 60 * 20;
		addCash(100);
	}

	if (Math.random() > 0.99 && gameState.isLaughing) {
		laughing(true);
	}

	clicksPerSecond = clicksPerSecond * gameState.deathMult;
	clickOnGeorge(clicksPerSecond);
	updateBackground();

	gameState.parentPosition += 0.02;
	if (gameState.parentPosition >= 6.28) {
		gameState.parentPosition = 0;
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
		clickOnGeorge(gameState.totalClickAmount * 0.03);
	}
}

function whaleMove(direction) {
	var element = document.getElementById("whale");

	if (direction == "left") {
		if (gameState.whaleX > 0) {
			gameState.whaleX -= 15;
			element.style.left = gameState.whaleX + "px";
			element.className = "";
		}
	} else if (direction == "right") {
		if (gameState.whaleX < document.getElementById("main-container").clientWidth - 150) {
			gameState.whaleX += 15;
			element.style.left = gameState.whaleX + "px";
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

	if (gameState.newGolfBall === true) {
		gameState.golfBallX = (Math.random() * (screen.width * 0.4) + 50);
		gameState.golfBallY = 0;
		gameState.newGolfBall = false;
	}

	if (!gameState.newGolfBall) {
		gameState.golfBallY += 10;
		element.style.left = gameState.golfBallX + "px";
		element.style.top = gameState.golfBallY + "px";
		if (gameState.golfBallY >= 1000) {
			element.style.visibility = "hidden";
			gameState.golfBallActive = false;
			gameState.newGolfBall = true;
		}
	}

	if (overlap) {
		addCash(500);
		element.style.visibility = "hidden";
		gameState.golfBallActive = false;
		gameState.newGolfBall = true;
	}
}

function orbitParents() {
	var mom = document.getElementById("estelle");
	var dad = document.getElementById("frank");

	var originX = 130;
	var originY = 122;
	
	mom.style.top = (originX + Math.cos(gameState.parentPosition) * 250) + "px";
	mom.style.left = (originY + Math.sin(gameState.parentPosition) * 250) + "px";
	dad.style.top = (originX + Math.cos(gameState.parentPosition - 3.14) * 250) + "px";
	dad.style.left = (originY + Math.sin(gameState.parentPosition - 3.14) * 250) + "px";
}
