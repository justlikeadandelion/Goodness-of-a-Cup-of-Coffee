// Project: Goodness of a Cup of Coffee
// Author: Anna Srikitkul

// Acknowledgement:
// Thanks to Daniel Shiffman the author of The Nature of Code, http://natureofcode.com
// Thanks to box2d by Erin Catto

let world; // A reference to box2d world

let boundaries = []; // A list of fixed objects

let longpairs = []; // A list of dynamical objects connected by a chain

// A list of texts
let SetOfWords = [
  [
    "s,l,e,e,p,y",
    "u,n,p,r,o,d,u,c,t,i,v,e",
    "e,x,a,m,s, ,t,o,m,o,r,r,r,o,w",
    "3,0,0, ,p,a,g,e,s, ,l,e,f,t",
    "t,i,r,e,d",
    "d,o,u,b,t",
    "d,o,n,',t, ,u,n,d,e,r,s,t,a,n,d",
    "n,o, ,a,p,p,e,t,i,t,e",
    "2,0,0, ,s,e,c,t,i,o,n,s, ,t,o, ,r,e,m,e,m,b,e,r",
    "s,t,r,e,s,s",
    "m,i,g,h,t, ,f,a,i,l",
  ],
  [
    "a,t,e, ,2, ,b,o,w,l,s, ,o,f, ,r,i,c,e",
    "t,o,o, ,f,a,t,?",
    "n,o, ,m,o,r,e, ,c,a,r,b,s",
    "n,e,e,d, ,t,o, ,e,x,c,e,r,c,i,s,e",
    "s,a,t, ,a,l,l, ,d,a,y",
    "p,r,e,t,t,i,e,r",
    "d,o,u,b,l,e, ,c,h,i,n,s",
    "l,a,u,g,h,e,d, ,a,t",
    "n,o,t, ,l,i,k,e,d,?",
    "t,h,i,n,n,e,r",
    "l,o,v,a,b,l,e,?",
    "s,h,o,u,l,d, ,d,o, ,w,o,r,k,o,u,t,s",
    "s,e,l,f, ,c,o,n,t,r,o,l",
  ],
  [
    "i,n,t,e,r,n,s,h,i,p",
    "n,o,t, ,g,o,o,d, ,e,n,o,u,g,h",
    "t,h,i,n,g,s, ,i, ,d,o,n,',t, ,k,n,o,w",
    "d,e,a,d,l,i,n,e,s",
    "p,r,o,d,u,c,t,i,v,i,t,y",
    "c,o,u,l,d,n,',t, ,f,i,n,d",
    "e,x,h,a,u,s,t,e,d",
    "l,o,o,k, ,s,m,a,r,t, ,e,n,o,u,g,h,?",
    "f,r,i,e,n,d,l,y, ,e,n,o,u,g,h,?",
    "e,y,e,s, ,h,u,r,t",
    "p,r,o,d,u,c,t,i,v,e, ,e,n,o,u,g,h,?",
    "p,e,r,f,e,c,t",
  ],
];
let select; // A reference to which set of texts will be displayed

// A list of all dates
let dates = [
  "10 Jan 2022",
  "25 Feb 2022",
  "6 Mar 2022",
  "14 April 2022",
  "11 May 2022",
  "21 Jun 2022",
  "30 Jul 2022",
  "31 Aug 2022",
  "25 Sep 2022",
  "1 Oct 2022",
  "17 Nov 2022",
  "10 Dec 2022",
];
let IndexDate = -1; // A reference to which date will be displayed

// Define variables indicating dimensions of the coffee mug
let wMug;
let hMug;
let wHandle;
let hHandle;

// Define colour of the mug
let rMug;
let gMug;
let bMug;

// Define colour of the coffee
let rCoffee;
let gCoffee;
let bCoffee;

let CoffeeLevel; // Define surface level of the coffee

function setup() {
  createCanvas(windowHeight, windowHeight);
  newSketch();
}

function draw() {
  background(0); // Set up the background

  // Set up the notion of time in box2d
  let timeStep = 1.0 / 30;
  world.Step(timeStep, 10, 10);

  // Display all the fixed objects
  //for (let i = 0; i < boundaries.length; i++) {
  //  boundaries[i].display();
  //}

  // Display the coffee mug
  DisplayCoffee(
    wMug,
    hMug,
    wHandle,
    hHandle,
    rMug,
    gMug,
    bMug,
    rCoffee,
    gCoffee,
    bCoffee,
    CoffeeLevel
  );

  // Display all the dynamical objects
  for (let i = longpairs.length - 1; i >= 0; i--) {
    longpairs[i].display();
  }

  // Display the date
  push();
  textAlign(RIGHT);
  textFont("Helvetica");
  colorMode(HSB);
  fill(62, 31, 89);
  textSize(48);
  text(dates[IndexDate], width - 40, 55);
  pop();

  // Display the arrow
  push();
  colorMode(HSB);
  stroke(62, 31, 89);
  strokeWeight(4);
  line(width - 90, 90, width - 44, 90);
  line(width - 65, 70, width - 44, 90);
  line(width - 65, 110, width - 44, 90);
  pop();
}

function mousePressed() {
  let p = new LongPair(mouseX, mouseY, random(SetOfWords[select]));
  longpairs.push(p); // Add new word to the list of dynamical objects

  // Refresh function
  if (
    width - 90 < mouseX &&
    mouseX < width - 40 &&
    70 < mouseY &&
    mouseY < 110
  ) {
    cleanSketch();
    newSketch();
  }
}

function newSketch() {
  // Initialize box2d physics and create the world
  world = createWorld();

  var screenD = 2; // Set the thickness of the frames

  // Add frames as a fixed object
  boundaries.push(new Boundary(screenD / 2, height / 2, screenD, height));
  boundaries.push(
    new Boundary(width / 2, height - screenD / 2, width, screenD)
  );
  boundaries.push(
    new Boundary(width - screenD / 2, height / 2, screenD, height)
  );
  boundaries.push(new Boundary(width / 2, screenD / 2, width, screenD));

  // Initialise date & coffee mug's detail

  initialValue();

  // Add coffee mug as a fixed object
  boundaries.push(new Boundary(width / 2, height / 2, wMug, hMug));
  boundaries.push(
    new Boundary(
      width / 2 + wMug / 2 + wHandle / 2,
      height / 2,
      wHandle,
      hHandle
    )
  );
}

function cleanSketch() {
  // Reset the set of dynamical objects
  for (let i = 0; i < longpairs.length; i++) {
    longpairs[i].killBody();
  }
  longpairs = [];
}

// Define the initialisation
function initialValue() {
  wMug = random(width * 0.1, width * 0.2);
  hMug = random(height * 0.1, height * 0.2);
  wHandle = random(wMug * 0.3, wMug * 0.7);
  hHandle = random(hMug * 0.3, hMug * 0.7);

  rMug = random(0, 200);
  gMug = random(50, 200);
  bMug = random(100, 255);

  rCoffee = random(100, 255);
  gCoffee = random(0, 200);
  bCoffee = random(0, 100);

  CoffeeLevel = random(0, hMug - 40);

  select = random([0, 1, 2]);

  IndexDate = IndexDate + 1;
  if (IndexDate == dates.length) {
    IndexDate = 0;
  }
}
