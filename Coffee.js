// Construct the coffee mug
function DisplayCoffee(wM, hM, wH, hH, rM, gM, bM, rC, gC, bC, CofLevel) {
  
  // Draw the Mug
  push();
  fill(rM, gM, bM);
  noStroke();
  rectMode(CENTER);
  rect(width/2, height/2, wM, hM);
  rect(width/2 + wM/2 + wH/2, height/2, wH, hH);
  pop();
  
  // Draw the handle
  push();
  fill(0);
  noStroke();
  rectMode(CENTER);
  rect(width/2 + wM/2 + wH/2, height/2, wH - 20, hH - 20);
  pop();
  
  // Draw the coffee
  push();
  fill(rC, gC, bC);
  noStroke();
  rectMode(CORNERS);
  rect(width/2 + wM/2 - 20, height/2 + hM/2 - 20, width/2 - wM/2 + 20, height/2 - hM/2 + 20 + CofLevel);
  pop();
  
}