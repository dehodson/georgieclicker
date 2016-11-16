
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
var backgroundX = 0.0;
var backgroundY = 0.0;

//function to handle all clicks
function clickOnGeorge(clicks){
	if(typeof clicks === 'undefined'){
		clicks = clickPower;
	}
	totalClickAmount = totalClickAmount + clicks;
	//checks to see if the player should level up because of this click
	if(totalClickAmount - (Math.pow(10, levelMult)) >= 0){
		levelUp();
	}
	//document.cookie = "totalClickAmount = " + totalClickAmount;
	document.getElementById("score").innerText = totalClickAmount.toFixed(1);
}

function addCash(amount){
	playerCash += amount;
	document.getElementById("cash").innerText = playerCash;
}

function spendCash(amount){
	playerCash -= amount;
	document.getElementById("cash").innerText = playerCash;
}

function upgrade(name, number){
	var powerName = "powerup-" + name;

	if(name == "bathrooms"){
		if(amountOfBathrooms < 20 && playerCash >= 10){
			amountOfBathrooms = amountOfBathrooms + number;
			document.getElementById(powerName + "-number").innerText = amountOfBathrooms;
			spendCash(10);
		}
	}else if(name == "upset"){
		if(angerLevel < 91 && playerCash >= 10 * (angerLevel + 10)){
			angerLevel = angerLevel + number;
			document.getElementById(powerName + "-number").innerText = angerLevel;
			document.getElementById(powerName + "-price").innerText = 10 * (angerLevel + 10);
			spendCash(10 * angerLevel);
		}
	}
}

//adds more points to spend on powerups and levels the player to the next level
function levelUp(){
	addCash(100 * level);
	level++;
	levelMult = levelMult + .5;
	document.getElementById("level").innerText = level;
}

function updateBackground(){
	backgroundX += 1
	if(backgroundX >= 250){
		backgroundX = 0;
	}
	document.getElementById("main-container").style.backgroundPosition = backgroundX+"px "+backgroundX+"px";
}

function gameTick(){
	var clicksPerSecond = 0;

	clicksPerSecond += .05 * amountOfBathrooms;
	clicksPerSecond +=  .1 * angerLevel;

	clickOnGeorge(clicksPerSecond);

	updateBackground();
}

setInterval(gameTick, 50);