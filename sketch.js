// Multimedia Programming
// Assignment 3 /
// Emma Culhane – 2957975 – emmajaneculhane@gmail.com

//** ASSIGN VARIABLES **//
// variables assigned to colours for the palette & primary brand colours to be used throughout
let whiteB;
let redB;
let yellowB;
let blueB;
let blackB;
let greenB;
let pinkB;
let brownB;

// variables assined to each of the sliders
let brushSize;
let opacity;
let rSlide, gSlide, bSlide;

// variables assigned to background colour & linked to rgb sliders
let r, g, b;

// variables assigned to the random setting for colour, to be used where necessary
let r1, g1, b1;

// variables assigned to the 'Brush Up!'' button
let brushType;
let nextBrush;

// used for Boolean variable for brush types linked to the various legohead images
let choice;

// variables assigned to all images
let imgLego;
let imgLegoman;
let imglegohead;
let imgPirate;
let imgGlasses;
let imgSave;
let imgEnter;
let imgKeys;
let imgBucket;

// variables assigned to all fonts
let fontHead;
let fontMid;
let fontSub;

// variable for drop-down menu
let menu;

// variable for text input
let emmasFile;

// variable for save image button
let saveAs;

// variables to change position of elements inside the canvas, i.e. synchronised alignment
let varX;
let varY;

// variables to trigger mouse key action in the x and y direction
let x;
let y;

// variable to reset the background, to be used in keyIsPressed function
let currentBackground = 255;

// PRELOAD: all loading calls here for images and fonts
function preload() {
  // preload images
  imgLego = loadImage("images/lego.png");
  imgLegoman = loadImage("images/legoman.png");
  imgLegohead = loadImage("images/legohead.png");
  imgPirate = loadImage("images/pirate.png");
  imgGlasses = loadImage("images/glasses.png");
  imgPen = loadImage("images/pen.png");
  imgEnter = loadImage("images/enter.png");
  imgKeys = loadImage("images/keys.png");
  imgSave = loadImage("images/save.png");
  imgBucket = loadImage("images/bucket.png");

  // preload fonts
  // heading beside logo 'sketch' to use Shizuru from Google Fonts - playful display font, relatable and relevant to the function of this app
  fontHead = loadFont("fonts/shizuru.ttf");
  // headings in GUI to use Concert One from Google Fonts - sans-serif, playful, bold and clear.
  fontMid = loadFont("fonts/concertOne.ttf");
}

function setup() {
  // blank canvas to begin, white background and size of 1000 X 600
  background(255);
  createCanvas(1000, 600);
  noStroke();

  // assign initial value to the BrushType variable
  brushType = 0;

  // values created to use generically - content all aligned to the same values acting as a margin and shortcut if value needs to be changed.
  varX = 20;
  varY = 10;

  // x and y values to be used to position the lego character and guide the key controls when the mouseIsPressed function is called
  x = width - 120;
  y = height - 170;

  // color variables for fill bucket palette, controlling the background colours
  whiteB = color(255);
  redB = color(255, 0, 0);
  yellowB = color(246, 236, 54);
  blueB = color(0, 0, 255);
  blackB = color(0);
  greenB = color(0, 170, 35);
  pinkB = color(255, 53, 184);
  brownB = color(155, 103, 60);

  // create and customise 'Brush Up!' button. change size, background colour, make font bold and white
  // assign to a mouseClicked function
  nextBrush = createButton("Brush Up!");
  nextBrush.position(varX, varY * 32);
  nextBrush.size(100, 30);
  nextBrush.style("background-color", blueB);
  nextBrush.style("color", whiteB);
  nextBrush.style("font-weight", BOLD);
  nextBrush.mouseClicked(BrushUp);

  // create and customise drop-down menu, with two options. draw will be the default value, and random circles the alternative option.
  // style the menu to lego brand red, with simialr attributes to that of the 'Brush Up!' button, creating design and layout consistency.
  menu = createSelect();
  menu.option("Draw");
  menu.option("Random Circles");
  menu.position(varX, varY * 37);
  menu.size(150, 30);
  menu.style("background-color", redB);
  menu.style("color", whiteB);
  menu.style("font-weight", BOLD);

  // create button linked to image 'save as', position beside input field, creating a mock save option, similar to that of p5.js.
  // when pressed, call the function 'theAnswer'
  saveAs = createImg("images/save.png", "save as floppy disk");
  saveAs.position(660, 14);
  saveAs.mousePressed(theAnswer);

  // create and style input field.
  emmasFile = createInput(" Emma's File ");
  emmasFile.position(width / 2, varY * 2);
  emmasFile.size(150, 30);
  emmasFile.style("background-color", redB);
  emmasFile.style("color", whiteB);
  emmasFile.style("font-weight", BOLD);

  // create the slider for the brush size & assign to variable
  brushSize = createSlider(1, 100, 10);

  // create the slider for opacity & assign to variable
  opacity = createSlider(1, 255, 255);

  // create the sliders for red, gree, blue values & assign to relelvant variables
  rSlide = createSlider(0, 255, 0);
  gSlide = createSlider(0, 255, 0);
  bSlide = createSlider(0, 255, 0);

  // position all of the sliders, use varX/Y variables to aid alignment and allow for quick changes in value
  rSlide.position(varX, varY * 16);
  gSlide.position(varX, varY * 18);
  bSlide.position(varX, varY * 20);
  brushSize.position(varX, varY * 26);
  opacity.position(varX, varY * 28);

  
} // close setup function

function draw() {
  noStroke();

  // read the value of the slider and store it in a variable
  r = rSlide.value();
  g = gSlide.value();
  b = bSlide.value();
  
  // create yellow rectangle acting as left margin
  fill(yellowB);
  rect(0, 0, width / 4, height);

  // create background for red "navbar"
  fill(redB);
  rect(0, 0, width, 120, 0, 0, 50, 0);

  // style and poisition the text of each slider, assign their corresponding numerical value to appear adjacent to the text.
  textAlign(LEFT, TOP);
  noStroke();
  fill(255);
  textFont(fontMid);
  textSize(15);
  text("red : " + rSlide.value(), varX * 1.5 + rSlide.width, varY * 16);
  text("green : " + gSlide.value(), varX * 1.5 + gSlide.width, varY * 18);
  text("blue : " + bSlide.value(), varX * 1.5 + bSlide.width, varY * 20);
  text("brush : " + brushSize.value(), varX * 1.5 + brushSize.width, varY * 26);
  text("opacity : " + opacity.value(), varX * 1.5 + brushSize.width, varY * 28);

  // customise "brush color" text, using the mid Font: Concert One.
  fill(0);
  textSize(20);
  text("BRUSH COLOR", varX, varY * 13);

  // customise "size & opacity" text using the mid Font: Concert One.
  fill(0);
  textSize(20);
  text("SIZE & OPACITY", varX, varY * 23);

  // customise "brush color" text using the mid Font: Concert One.
  fill(0);
  textSize(20);
  text("Control", varX, varY * 49);
  text("Character :", varX, varY * 51);
  text("Clear Canvas :", varX, varY * 56);

  // customse "sketch" text using the heading Font: Shizuru.
  fill(255);
  textFont(fontHead);
  textSize(40);
  text("SKETCH", 180, 10);

  // link text to "save as" input box. This will appear on the bottom of the canvas in light text, replicating the input live.
  fill(220);
  noStroke();
  textFont(fontMid);
  textSize(25);
  text("// " + emmasFile.value() + " //", 260, 570);

  // images - change mode to corner. position and size each image
  imageMode(CORNER);
  image(imgLego, 20, 15, 160, 90);
  image(imgLegoman, x, y, 100, 147);
  image(imgBucket, 910, 20, 70, 70);
  image(imgKeys, 160, 490);
  image(imgEnter, 190, 550, 40, 40);

  // create buttons for the legohead images and one default pen image: these will act as brushes or image stamps. put each of them inside a rectangle
  fill(135);
  stroke(0);
  strokeWeight(0.5);
  rect(varX, varY * 43, 42, 40, 10);
  rect(varX * 3.5, varY * 43, 40, 40, 10);
  rect(varX * 6, varY * 43, 40, 40, 10);
  rect(varX * 8.5, varY * 43, 40, 40, 10);
  image(imgPen, varX, 430, 40, 40);
  image(imgPirate, varX * 3.5, 430);
  image(imgGlasses, varX * 6, 430);
  image(imgLegohead, varX * 8.5, 430);

  //** LEGOHEAD BUTTONS **//
  // the choice varibale will be employed here to dictate which option is true. once the conditions of the 'if' statement are met, the choice number condidtions can be fulfilled
  // the first choice will be blank, acting as a default draw button. the images will called as buttons for the other 'if' statements relating to the choice variable, ranging 1-4.
  // pen button
  if (
    mouseX < 60 &&
    mouseX > 20 &&
    mouseY < 470 &&
    mouseY > 430 &&
    mouseIsPressed
  ) {
    choice = 1;
  }

  if (choice == 1) {
    if (mouseIsPressed) {
    }
  }

  // pirate head button
  if (
    mouseX < 110 &&
    mouseX > 70 &&
    mouseY < 470 &&
    mouseY > 430 &&
    mouseIsPressed
  ) {
    choice = 2;
  }

  if (choice == 2) {
    if (mouseIsPressed) {
      imageMode(CENTER);
      image(imgPirate, mouseX, mouseY, 40, 40);
    }
  }

  // glasses head button
  if (
    mouseX < 160 &&
    mouseX > 120 &&
    mouseY < 470 &&
    mouseY > 430 &&
    mouseIsPressed
  ) {
    choice = 3;
  }

  if (choice == 3) {
    if (mouseIsPressed) {
      imageMode(CENTER);
      image(imgGlasses, mouseX, mouseY, 40, 40);
    }
  }

  // plain legohead button
  if (
    mouseX < 210 &&
    mouseX > 170 &&
    mouseY < 470 &&
    mouseY > 430 &&
    mouseIsPressed
  ) {
    choice = 4;
  }

  if (choice == 4) {
    if (mouseIsPressed) {
      imageMode(CENTER);
      image(imgLegohead, mouseX, mouseY, 40, 40);
    }
  }

  // style the lego block in the top right corner
  stroke(0);
  strokeWeight(3);
  fill(246, 236, 54);
  rect(748, 18, 164, 84, 5);

  // change ellipse mode to centre to facilitate the radial distance setting
  ellipseMode(CENTER);

  // distance variables for fill bucket. the distance from the mouse position in relation to the centre of the colour cirles in the palette
  dWhite = dist(mouseX, mouseY, 770, 40);
  dRed = dist(mouseX, mouseY, 810, 40);
  dYellow = dist(mouseX, mouseY, 850, 40);
  dBlue = dist(mouseX, mouseY, 890, 40);
  dBlack = dist(mouseX, mouseY, 770, 80);
  dGreen = dist(mouseX, mouseY, 810, 80);
  dPink = dist(mouseX, mouseY, 850, 80);
  dBrown = dist(mouseX, mouseY, 890, 80);

  // each colour will calculate the distance from the mouse to the center. when this is less than 15, the mouseIsPressed function will be triggered, changing the background colour of the canvas
  // white button
  fill(whiteB);
  stroke(0);
  ellipse(770, 40, 30);
  if (dWhite < 30 / 2 && mouseIsPressed) {
    background(whiteB);
  }

  // red button
  fill(redB);
  ellipse(810, 40, 30);
  if (dRed < 30 / 2 && mouseIsPressed) {
    background(redB);
  }

  // yellow button
  fill(yellowB);
  ellipse(850, 40, 30);
  if (dYellow < 30 / 2 && mouseIsPressed) {
    background(yellowB);
  }

  // blue button
  fill(blueB);
  ellipse(890, 40, 30);
  if (dBlue < 30 / 2 && mouseIsPressed) {
    background(blueB);
  }

  // black button
  fill(blackB);
  ellipse(770, 80, 30);
  if (dBlack < 30 / 2 && mouseIsPressed) {
    background(blackB);
  }

  // green button
  fill(greenB);
  ellipse(810, 80, 30);
  if (dGreen < 30 / 2 && mouseIsPressed) {
    background(greenB);
  }

  // pink button
  fill(pinkB);
  ellipse(850, 80, 30);
  if (dPink < 30 / 2 && mouseIsPressed) {
    background(pinkB);
  }

  // brown button
  fill(brownB);
  ellipse(890, 80, 30);
  if (dBrown < 30 / 2 && mouseIsPressed) {
    background(brownB);
  }

  // variables to hold random colour, used in random circles setting so each shape can hold a different random colour
  r1 = random(0, 255);
  g1 = random(0, 255);
  b1 = random(0, 255);

  // conditions in which the drop down options are fulfilled, using rlelvant variables.
  // assign it so this is inside the canvas and not impeding on the GUI space
  if (menu.value() == "Draw") {
  } else if (
    (menu.value() == "Random Circles",
    mouseX > 250 && mouseY > 120 && mouseIsPressed)
  ) {
    // settings to create random circles of various sizes and colours and positions
    fill(r1, g1, b1);
    noStroke();
    ellipse(random(250, width), random(120, height), random(100));
  }
} // close draw function

// this function is to fulfill relevant conditions ifcertain keys are pressed. assign the enter key to clear the canvas, and the arrow keys to direct the lego character image in x and y direction
// move in increments of 10
function keyPressed() {
  // clear backgorund after each loop runs, so the character appears to move and doesn't continuously duplicate
  background(currentBackground);

  if (keyCode === UP_ARROW) {
    y = y - 10;
  } else if (keyCode === DOWN_ARROW) {
    y = y + 10;
  }
  if (keyCode === LEFT_ARROW) {
    x = x - 10;
  } else if (keyCode === RIGHT_ARROW) {
    x = x + 10;
  }

  // clear canvas
  if (keyCode === RETURN) {
    background(255);
  }
}

// the mouse dragged function will create the effect of a pen, drawing continuously insead of the value of the loop running
// use the brush type variable to determine the value of the brush and conditions met in order to fulfill the relevant brush requirements
function mouseDragged() {
  if (brushType == 0 && mouseX >= 250 && mouseY >= 120) {
    stroke(r, g, b, opacity.value());
    strokeWeight(brushSize.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  } else if (brushType == 1 && mouseX >= 250 && mouseY >= 120) {
    noStroke();
    fill(r, g, b, opacity.value());
    rect(mouseX, mouseY, brushSize.value());
  } else if (brushType == 2 && mouseX >= 250 && mouseY >= 120) {
    fill(r, g, b, opacity.value());
    stroke(r, g, b);
    ellipse(mouseX, mouseY, brushSize.value());
  }
} // close mouseDragged function

// create function to assign brush values to the 'Brush Up!' button in increments of 1 - aka ++
function BrushUp() {
  if (brushType == 2) {
    brushType = 0;
  } else brushType++;
}

// call saved into the console once the floppy disk image is pressed
function theAnswer() {
  console.log("Saved!");
}
