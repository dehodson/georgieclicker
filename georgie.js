
//var cookieString = document.cookie;
var totalClickAmount = 0;
var luxuryBathroomClick;
var georgeUpsetClick;
var level = 1;
var playerCash = 0;
var levelMult = 1;
var amountOfBathrooms = 0;
var angerLevel = 0;
var clickPower = 1;

//function to handle all clicks
function clickOnGeorge(clicks){
	if(typeof clicks === 'undefined'){
		clicks = clickPower;
	}
	console.log(clicks);
	console.log("points left :" + playerCash);
	totalClickAmount = totalClickAmount + clicks;
	//checks to see if the player should level up because of this click
	if(totalClickAmount - (Math.pow(10, levelMult)) >= 0){
		levelUp();
		console.log("test");
	}
	//document.cookie = "totalClickAmount = " + totalClickAmount;
	document.getElementById("score").innerText = totalClickAmount;
}

//a powerup to help click george automatically
//5 clicks a second per luxuryBathroomSpots activated
//20 is the most you can have activated
function luxuryBathroomSpots(amountOfBathroomsInput){
	amountOfBathrooms = amountOfBathrooms + amountOfBathroomsInput;
	if(amountOfBathrooms > 0 && amountOfBathrooms < 20 && playerCash >= 10){
		spendCash(10);
	}
	else{
		alert("bathroom issues");
	}
}
function georgeUpset(angerLevelInput){
	angerLevel = angerLevel + angerLevelInput;
	if(angerLevel > 0 && angerLevel < 101 && playerCash >= 10 * angerLevel){
		spendCash(10 * angerLevel);
	}
	else{
		alert("nothing to be upset about");
	}
}

function addCash(amount){
	playerCash += amount;
	document.getElementById("cash").innerText = playerCash;
}

function spendCash(amount){
	playerCash -= amount;
	document.getElementById("cash").innerText = playerCash;
}

//adds more points to spend on powerups and levels the player to the next level
function levelUp(){
	addCash(100 * level);
	console.log(playerCash);
	level++;
	levelMult = levelMult + .5;
	console.log("level: " + level);
	document.getElementById("level").innerText = level;
}

function gameTick(){
	var clicksPerSecond = 0;

	clicksPerSecond +=  5 * amountOfBathrooms;
	clicksPerSecond += 10 * angerLevel;

	clickOnGeorge(clicksPerSecond);
}

setInterval(gameTick, 1000);