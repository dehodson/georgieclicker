
//var cookieString = document.cookie;
var totalClickAmount = 0;


//function to handle all clicks
function clickOnGeorge(clicks){
  totalClickAmount = totalClickAmount + clicks;
  //document.cookie = "totalClickAmount = " + totalClickAmount;
  console.log(totalClickAmount);
}

//a powerup to help click george automatically
//5 clicks a second per luxuryBathroomSpots activated
//20 is the most you can have activated
function luxuryBathroomSpots(amountOfBathrooms){
  if(amountOfBathrooms != 0 && amountOfBathrooms < 20){
    setInterval(clickOnGeorge(5), 1000/amountOfBathrooms);
  }
}
