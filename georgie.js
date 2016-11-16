
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