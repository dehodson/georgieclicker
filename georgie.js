
//var cookieString = document.cookie;
var totalClickAmount = 0;
var luxuryBathroomClick;
var georgeUpsetClick;
var level = 1;
var levelPointsLeft = 0;
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
  console.log("points left :" + levelPointsLeft);
  totalClickAmount = totalClickAmount + clicks;
  //checks to see if the player should level up because of this click
  if(totalClickAmount - (Math.pow(100, levelMult)) >= 0){
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
  if(amountOfBathrooms > 0 && amountOfBathrooms < 20 && levelPointsLeft >= 10){
    clearInterval(luxuryBathroomClick);
    levelPointsLeft = levelPointsLeft - 10;
    luxuryBathroomClick = setInterval(clickOnGeorge, 1000, 5 * amountOfBathrooms);
  }
  else{
    alert("bathroom issues");
  }
}
function georgeUpset(angerLevelInput){
  angerLevel = angerLevel + angerLevelInput;
  if(angerLevel > 0 && angerLevel < 101 && levelPointsLeft >= 10 * angerLevel){
    clearInterval(georgeUpsetClick);
    levelPointsLeft = levelPointsLeft - (10 * angerLevel);
    georgeUpsetClick = setInterval(clickOnGeorge, 1000, 10 * angerLevel);
  }
  else{
    alert("nothing to be upset about");
  }
}

//adds more points to spend on powerups and levels the player to the next level
function levelUp(){
  levelPointsLeft = levelPointsLeft + (100 * level);
  console.log(levelPointsLeft);
  level++;
  levelMult = levelMult + .5;
  console.log("level: " + level);
}


//function that will display possible powerUps
function availablePowerUps(){

}
