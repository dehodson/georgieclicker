//var cookieString = document.cookie;
var totalClickAmount = 0;
var level = 1;
var playerCash = 0;
var levelMult = 1;
var amountOfBathrooms = 0;
var bathroomPower = 0.5;
var angerLevel = 0;
var twixTimer  = 0;
var georgeLying = 0;
var isLaughing   = false;
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
var contestActive  = false;

var powerUpMoveList = ["powerup-bathrooms", "powerup-bathrooms2", "powerup-bathrooms3", "powerup-upset", "powerup-squint", "powerup-super-squint", "powerup-twix", "powerup-shrinkage", "powerup-dishonest", "powerup-cashmere", "powerup-whaleBio", "powerup-contest"];

var powerUpsAchieved = [];

var powerUpTree = {
	"upgrade-clever-george":    ["upgrade-squint", "upgrade-bathrooms2"],
	"upgrade-bathrooms2":       ["upgrade-bathrooms3"],
	"upgrade-squint":           ["upgrade-super-squint"],
	"upgrade-angry-george":     ["upgrade-twix", "upgrade-shrinkage"],
	"upgrade-dishonest-george":	["upgrade-cashmere", "upgrade-whaleBio"],
	"upgrade-whaleBio":         ["upgrade-contest"]
};

//function to handle all clicks
function clickOnGeorge(clicks){
	if(typeof clicks === 'undefined'){
		clicks = clickPower;

		if(elaineHelping == 1){
			clicks *=  100;
		}else if(elaineHelping == 2){
			clicks *= -100;
		}

		if(contestActive){
			contestCounter = 60 * 20;
		}
	}
	if(totalClickAmount + clicks < 0){
		totalClickAmount = 0;
	}else{
		totalClickAmount = totalClickAmount + clicks;
	}

	//checks to see if the player should level up because of this click
	if(totalClickAmount - (Math.pow(10, level)) >= 0){
		levelUp();
	}

	document.getElementById("score").innerText = totalClickAmount.toFixed(0);
}

function addCash(amount){
	playerCash += amount;
	document.getElementById("cash").innerText = playerCash;
}

function spendCash(amount){
	playerCash -= amount;
	document.getElementById("cash").innerText = playerCash;
}

function addSkillPoints(amount){
	skillPoints += amount;
	document.getElementById("skill-points").innerText = skillPoints;
}

function spendSkillPoints(amount){
	skillPoints -= amount;
	document.getElementById("skill-points").innerText = skillPoints;
}

function upgrade(name, number){
	var powerName = "powerup-" + name;

	if(name == "bathrooms"){
		if(playerCash >= 10 * (amountOfBathrooms + 1)){
			amountOfBathrooms = amountOfBathrooms + number;
			document.getElementById(powerName + "-number").innerText = amountOfBathrooms;
			document.getElementById(powerName + "-price").innerText = 10 * (amountOfBathrooms + 1);
      		spendCash(10 * amountOfBathrooms);
		}
	}
	else if(name == "bathrooms2"){
		bathroomPower = 1;
	}
	else if(name == "bathrooms3"){
		bathroomPower = 2.5;
	}
	else if(name == "squint"){
		clickPower = 5 * number;
	}
	else if(name == "super-squint"){
		clickPower = 10 * number;
	}

	//parts for upset george
	else if(name == "upset"){
		if(angerLevel < 91 && playerCash >= 10 * (angerLevel + 10)){
			angerLevel = angerLevel + number;
			document.getElementById(powerName + "-number").innerText = angerLevel;
			document.getElementById(powerName + "-price").innerText = 10 * (angerLevel + 10);
			spendCash(10 * angerLevel);
		}
	}

	else if(name == "twix"){
		if(playerCash >= 50){
			spendCash(50);
			twixTimer += (60 * 20);
		}

	}
	else if(name == "shrinkage"){
		isLaughing = true;
	}

	//parts for dishonest branch power ups
	else if(name == "dishonest"){
		georgeLying = 1;

	}

	else if (name == "cashmere"){

		if (playerCash >= 200 && cashmereSwitchCounter%2 === 0){
			elaineHelping = number;
			spendCash(200);
			cashmereSecondTimer += (10 * 20);

			document.getElementById("cashmere-switch").style.visibility = "visible";
		}
	}

	else if(name == "whaleBio"){
		golfBallTimer = 20;
		whaleActive = true;

	}

	else if(name == "contest"){
		contestActive  = true;
		contestCounter = 60 * 20;
	}

}

function powerupSwitch(powerup){

	if(powerup == 'cashmere'){
		cashmereSwitchCounter++;
		if(cashmereSwitchCounter%2 === 0){
			document.getElementById("cashmere-button").innerText = "ON";
			elaineHelping = 1;
		}else{
			document.getElementById("cashmere-button").innerText = "OFF";
			document.getElementById("powerup-cashmere-number").innerText = "Placated";
			elaineHelping = 0;
		}

	}
}

function upgradable(element){
	if(element.className == "upgrade-node available" && skillPoints > 0){
		return true;
	}
	return false;
}

function unlockChildren(element){
	element.className = "upgrade-node visible";

	var id = element.id;
	id = String(id);
	console.log("this should be the id " + id);
	for(var i = 0; i < powerUpTree[id].length; i++){
		document.getElementById(powerUpTree[id][i]).className = "upgrade-node available";
	}
}

function newUpgrade(newMove){
		var index, value;
		for (index = 0; index < powerUpMoveList.length; index++) {
    	value = powerUpMoveList[index];
			console.log("index value" + value);
			console.log("move input" + newMove);
    	if (value == newMove && skillPoints > 0) {
			document.getElementById(newMove).style.display = 'inline-block';
			spendSkillPoints(1);
			//powerUpMoveList = powerUpMoveList.filter(function(e) { return e !== newMove;});
			powerUpsAchieved.push(newMove);
			console.log("powerups achieed " + powerUpsAchieved);
			console.log("powerup list of not achieved " + powerUpMoveList);
			break;
		}
    }
}

//adds more points to spend on powerups and levels the player to the next level
function levelUp(){
	addCash(100 * level);
	level++;
	addSkillPoints(1);
	levelMult = levelMult + 1;
	document.getElementById("level").innerText = level;
}

function updateBackground(){
	backgroundX += 1;
	if(backgroundX >= 250){
		backgroundX = 0;
	}
	document.getElementById("main-container").style.backgroundPosition = backgroundX+"px "+backgroundX+"px";
}

function gameTick(){
	var clicksPerSecond = 0;

	clicksPerSecond += bathroomPower * amountOfBathrooms;
	clicksPerSecond +=  0.1 * angerLevel;

	if(georgeLying > 0){
		lyingSecondTimer++;
		document.getElementById("powerup-dishonest-number").innerText = Math.ceil(lyingSecondTimer / 20) + "/10";
		if(lyingSecondTimer == 200){
			var randMin = 100;
			var randMax = 1500;
			var lyingClicks = Math.floor(Math.random() * (randMax - randMin + 1)) + randMin;
			clickOnGeorge(lyingClicks);
			lyingSecondTimer = 0;
		}
	}

	if(whaleActive){
		document.getElementById("whale").style.visibility = "visible";
		golfBallTimer -= 1;
		document.getElementById("powerup-whaleBio-number").innerText = "FORRREE! "+Math.ceil(golfBallTimer / 20);
	}
	if(golfBallTimer === 0){
		newGolfBall = true;
		console.log("test");
		golfBallTimer = 20*20;
		golfBallActive = true;
	}
	if (golfBallActive){
		golfBall();
	}

	if(cashmereSecondTimer > 0 && elaineHelping == 1){
		cashmereSecondTimer -=1;
		document.getElementById("powerup-cashmere-number").innerText = "Happy for "+Math.ceil(cashmereSecondTimer / 20);
	}else if(cashmereSecondTimer === 0 && elaineHelping == 1){
		//clickPower = clickPower - elaineClickPower;
		document.getElementById("powerup-cashmere-number").innerText = "Pissed";
		elaineHelping = 2;
	}

	if(twixTimer > 0){
		twixTimer -= 1;
		clicksPerSecond *= 2;
		document.getElementById("powerup-twix-number").innerText = Math.ceil(twixTimer / 20);
	}

	if(contestActive && contestCounter > 0){
		contestCounter -= 1;
		document.getElementById("powerup-contest-number").innerText = Math.ceil(contestCounter / 20);
	}else if(contestActive && contestCounter == 0){
		contestCounter = 60 * 20;
		addCash(100);
	}

	if(Math.random() > 0.99 && isLaughing){
		laughing(true);
	}

	clickOnGeorge(clicksPerSecond);

	updateBackground();
}

function togglePanel(){
	var panel = document.getElementById("upgrade-panel");

	if(panel.className == "open"){
		panel.className = "closed";
		document.getElementById("upgrade-panel-closetext").style.visibility = "hidden";

	}else{
		panel.className = "open";
		setTimeout(function(){document.getElementById("upgrade-panel-closetext").style.visibility = "visible";}, 150);
	}
}

setInterval(gameTick, 50);

function keyPressed(event){
	if(event.which == 32){
		togglePanel();

	}else if (event.which == 77){
		clickOnGeorge(2000000);
		addSkillPoints(20);

	}else if (event.which == 37){
		whaleMove("left");

	}else if( event.which == 39){
		whaleMove("right");
		
	}
}

function laughing(bool){
	var element = document.getElementById("laughing");
	if(bool){
		element.style.top = (Math.random() * (screen.height * 0.9) + 100)+"px";
		element.style.left = (Math.random() * (screen.width * 0.4) + 50 )+"px";
		element.style.visibility = "visible";
	}else{
		element.style.visibility = "hidden";
		clickOnGeorge(totalClickAmount * 0.01);
	}
}

function whaleMove(direction){
	var element = document.getElementById("whale");
	if(direction == "left"){
		whaleX -= 15;
		element.style.left = whaleX + "px";
		element.className  = "";
	}
	else if(direction == "right"){
		whaleX += 15;
		element.style.left = whaleX + "px";
		element.className  = "flip";
	}
}

function golfBall(){
	var element = document.getElementById("golfball");
	var whale   = document.getElementById("whale");

	var rect1 = element.getBoundingClientRect();
	var rect2 = whale.getBoundingClientRect();

	var overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);

	element.style.visibility = "visible";
	if(newGolfBall === true){
		golfBallX = (Math.random() * (screen.width * 0.4) + 50 );
		golfBallY = 0;
		newGolfBall = false;
	}

	if(!newGolfBall){
		golfBallY += 10;
		element.style.left = golfBallX + "px";
		element.style.top = golfBallY + "px";
		if(golfBallY >= 1000){
			element.style.visibility = "hidden";
			golfBallActive = false;
			newGolfBall = true;
		}
	}
	if(overlap){
		//clickOnGeorge(1000);
		addCash(500);
		element.style.visibility = "hidden";
		golfBallActive = false;
		newGolfBall = true;
	}
}
