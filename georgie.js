
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
var skillPoints = 0;
var powerUpMoveList = ["powerup-bathrooms", "powerup-upset", "powerup-squint"];

var powerUpsAchieved = [];

//function to handle all clicks
function clickOnGeorge(clicks){
	if(typeof clicks === 'undefined'){
		clicks = clickPower;
	}
	totalClickAmount = totalClickAmount + clicks;
	//checks to see if the player should level up because of this click
	if(totalClickAmount - (Math.pow(10, level)) >= 0){
		levelUp();
	}
	//document.cookie = "totalClickAmount = " + totalClickAmount;
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
function subSkillPoints(amount){
	skillPoints -= amount;
	document.getElementById("skill-points").innerText = skillPoints;
}

function spendSkillPoints(amount){
	skillPoints -= amount;
	document.getElementById("skill-points").innerText = skillPoints;
}

function upgrade(name, number){
	var powerName = "powerup-" + name;

	if(name == "bathrooms"){
		if(amountOfBathrooms < 20 && playerCash >= 10 * (amountOfBathrooms + 1)){
			amountOfBathrooms = amountOfBathrooms + number;
			document.getElementById(powerName + "-number").innerText = amountOfBathrooms;
			document.getElementById(powerName + "-price").innerText = 10 * (amountOfBathrooms + 1);
      		spendCash(10 * amountOfBathrooms);
		}
	}else if(name == "squint"){
		clickPower = 5 * number;
	}

	else if(name == "upset"){
		if(angerLevel < 91 && playerCash >= 10 * (angerLevel + 10)){
			angerLevel = angerLevel + number;
			document.getElementById(powerName + "-number").innerText = angerLevel;
			document.getElementById(powerName + "-price").innerText = 10 * (angerLevel + 10);
			spendCash(10 * angerLevel);
		}
	}
}

function newUpgrade(newMove){
	var index, value, result;
		for (index = 0; index < powerUpMoveList.length; index++) {
    	value = powerUpMoveList[index];
			console.log("index value" + value);
			console.log("move input" + newMove);
    	if (value == newMove) {
				document.getElementById(newMove).style.display = 'inline-block';
				subSkillPoints(1);
				powerUpMoveList = powerUpMoveList.filter(function(e) { return e !== newMove });
				console.log(powerUpMoveList);
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

function togglePanel(){
  var panel = document.getElementById("upgrade-panel");

  if(panel.className == "open"){
    panel.className = "closed";
		document.getElementById("upgrade-panel-closetext").style.visibility = "hidden"

  }else{
    panel.className = "open";
		setTimeout(function(){document.getElementById("upgrade-panel-closetext").style.visibility = "visible"}, 150);
  }
}

setInterval(gameTick, 50);
