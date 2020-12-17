// Rotating knob to select midi note numbers
// Miles DeCoster - Codeforartists.com
// Uses the Rotating Knob library I created for the p5js.org site - version 5 (July, 2020)
// Two Oscillators generating different waveforms. Two knobs. One knob sets midi note number from 0 - 127. 
// One osc is panned left, the other right. The second knob sets the volume of the oscillators, one from 0 to 1 the other from 1 to 0.
// The second osc is tuned up a fifth from the first.
// Note that knob1 returns MIDI numbers that are then converted into frequencies and set to the oscillators (line 45)
// Hold down the SHIFT key and click and drag for fine-tuning
// With the cursor over a knob but without clicking, use the UP and DOWN arrow keys to change knob settings

let timer = 31;
let timer2 = 0;
let timer3 = 0;
let ktimer1 = 0;
let ktimer2 = 0;
let ktimer3 = 0;
let ktimer4 = 0;
let isOn1 = false;
let isOn2 = false;
let isOn3 = false;
let isOn4 = false;

let scoreMax = 50;
let currentScore = 0;
let scores = [0, 0, 0];


let indicator = 0;
let foodInd = [0, 0, 0, 0];


let counter = 0;

//0: home screen, 1: stove game, 2: ingredients, 3: rolling
let screen = 0;
let gui;
let slider1;
let submit;

let a, b, c, d, e, f;

let progress = 140;
//0: not completed, 1: completed
let completed = 0;
//0: instructions screen, 1: game
let starting = 0;
let comp1 = 0;

let rcol = 255;
let gcol = 0;



function preload(){
  dokdo = loadFont('EastSeaDokdo-Regular.ttf');
  
  stovetop = loadImage('stovetop.png');
  pan = loadImage('pan.png');
  cuttingBoard = loadImage('cuttingBoard.png');
  
  eggImg = loadImage('egg.png');
  eggUnder = loadImage('eggUnder.png');
  eggPerf = loadImage('eggPerf.png');
  eggOver = loadImage('eggOver.png');
  spamImg = loadImage('spam.png');
  spamUnder = loadImage('spamUnder.png');
  spamPerf = loadImage('spamPerf.png');
  spamOver = loadImage('spamOver.png');
  riceImg = loadImage('rice.png');
  riceUnder = loadImage('riceUnder.png');
  ricePerf = loadImage('ricePerf.png');
  riceOver = loadImage('riceOver.png');
  carrotImg = loadImage('carrot.png');
  carrotUnder = loadImage('carrotUnder.png');
  carrotPerf = loadImage('carrotPerf.png');
  carrotOver = loadImage('carrotOver.png');
  
  bubblesImg = loadImage('bubbles.png');
  bubbles1Img = loadImage('bubbles1.png');
  
  recipeImg = loadImage('recipe.png');
  
  homeScreen = loadImage('homeScreen.png');
  ending = loadImage('ending.png');
  
  kSheet = loadImage('kSheet.png');
  kRoll = loadImage('kRoll.png');
  
  ins = loadImage('ins.png');
  fin = loadImage('fin.png');
}


var knob1, knob2, knob3, knob4;
let nextLevel1, nextLevel2;
var pointerCursor = false; // referenced in knobMaker

var bubbles = {x: 0, y: 0, size: 280};



function setup() {
  createCanvas( 800, 600);
  background(50);
  gui = createGui();
  starting = 0;
  indicator = 0;
  comp1 = 0;
  timer2 = 0;
  textAlign(CENTER, CENTER);
  strokeWeight(0);
  
  a = int(random(1, 10));
  b = int(random(1, 10));
  c = int(random(1, 10));
  d = int(random(1, 10));
  e = int(random(1, 10));
  f = int(random(1, 10));
  
  
  if(screen == 0){
  }
  
  
  if(screen == 1){
  
  
  //image, size, xpos, ypos, min?, max, starting point, text
knob1 = new MakeKnob("knobDesign.png", 80, 570, 400, 0, 195, 0, 0, "");
knob2 = new MakeKnob("knobDesign.png", 80, 680, 400, 0, 195, 0, 0, "");
  knob3 = new MakeKnob("knobDesign.png", 80, 570, 500, 0, 195, 0, 0, "");
  knob4 = new MakeKnob("knobDesign.png", 80, 680, 500, 0, 195, 0, 0, "");
  knob1.textColor = 0;
  knob1.textPt = 30;
  knob2.textColor = 0; 
  knob2.textPt = 30;
  knob3.textColor = 0; 
  knob3.textPt = 30;
  knob4.textColor = 0; 
  knob4.textPt = 30;
// knob1.moveRange=195; 
// knob2.moveRange=195; 
    
  }
  
  
  if(screen == 2){
    
    carrotSlider = createSliderV("Slider", 160, 30, 32, 200, 1, 10);
    riceSlider = createSliderV("Slider", 250, 30, 32, 200, 1, 10);
    spinachSlider = createSliderV("Slider", 340, 30, 32, 200, 1, 10);
    spamSlider = createSliderV("Slider", 430, 30, 32, 200, 1, 10);
    radishSlider = createSliderV("Slider", 520, 30, 32, 200, 1, 10);
    eggSlider = createSliderV("Slider", 610, 30, 32, 200, 1, 10);
    
    
    riceSlider.val = 1;
    carrotSlider.val = 1;
    spamSlider.val = 1;
    eggSlider.val = 1;
    spinachSlider.val = 1;
    radishSlider.val = 1;
    
  }
  
  
  if(screen == 3){
  }
  
  
  egg = new Egg();
  spam = new Spam();
  rice = new Rice();
  carrot = new Carrot();
  
  
  
  
  
}


function draw() {

  if(screen == 0){
    completed = 0;
    
    background(120, 103, 95);
    image(homeScreen, 0, 0, 800, 600);

    textSize(70);
    textFont(dokdo);
    strokeWeight(0);
    fill(255);
    text("Ms. Kim's Kimbap!", 580, 100);
    
      //mouse hover buttons for screen 0
    if(screen == 0 && mouseX>490 && mouseX<710 && mouseY>180 && mouseY<250){
      fill(0);
      stroke(255);
      strokeWeight(5);
      rect(480, 175, 240, 80, 10);

      strokeWeight(0);
      fill(255);
      textSize(55);
      text("start game", 600, 205);
    }
    else if (screen == 0){
      fill(120, 103, 95);
      rect(460, 210, 260, 100);

      fill(0);
      stroke(255);
      strokeWeight(5);
      rect(490, 180, 220, 70, 10);

      strokeWeight(0);
      fill(255);
      textSize(50);
      text("start game", 600, 205);
    }
    
    
    if(screen == 0 && mouseX>490 && mouseX<710 && mouseY>280 && mouseY<350){
      fill(0);
      stroke(255);
      strokeWeight(5);
      rect(480, 275, 240, 80, 10);

      strokeWeight(0);
      fill(255);
      textSize(55);
      text("highscores", 600, 305);
    }
    else if (screen == 0){
      fill(120, 103, 95);
      rect(460, 310, 260, 100);

      fill(0);
      stroke(255);
      strokeWeight(5);
      rect(490, 280, 220, 70, 10);

      strokeWeight(0);
      fill(255);
      textSize(50);
      text("highscores", 600, 305);
    }
  }
  
  if(screen == 1){
    completed = 0;
    if(starting == 1){
      timer-=1/60;
    }

    background(209, 206, 201);
    image(stovetop, 0, 20, 490, 550);
    image(cuttingBoard, 420, -40, 380, 380);

    pointerCursor = false;
    knob1.update();
    knob2.update();
    knob3.update();
    knob4.update();

    fill(0);
    // text(int(knob1.knobValue), 50, 50);
    // cursor check
    if (pointerCursor) { cursor('pointer'); } else { cursor('default');     }

    ktimer1+=knob1.knobValue/60;
    ktimer2+=knob2.knobValue/60;
    ktimer3+=knob3.knobValue/60;
    ktimer4+=knob4.knobValue/60;
    
    egg.view();
    spam.view();
    rice.view();
    carrot.view();

    if(ktimer1 >= 1000 && starting == 1){
      if(ktimer1 >= 1200){
        egg.burn();
        if(foodInd[0] == 1){
          currentScore--;
          foodInd[0] = 2;
        }
      }
      else{
        egg.cook();
        if(foodInd[0] == 0){
          currentScore+= 2;
          foodInd[0] = 1;
        }
      }
    }
    if(ktimer2 >= 2500 && starting == 1){
       if(ktimer2 >= 3000){
         spam.burn();
         if(foodInd[1] == 1){
          currentScore--;
          foodInd[1] = 2;
          }
       }
      else{
        spam.cook();
        if(foodInd[1] == 0){
          currentScore+= 2;
          foodInd[1] = 1;
        }
      }
       }
    if(ktimer3 >= 3800 && starting == 1){
       if(ktimer3>= 4700){
         rice.burn();
         if(foodInd[2] == 1){
          currentScore--;
          foodInd[2] = 2;
          }
       }
      else{
        rice.cook();
        if(foodInd[2] == 0){
          currentScore+= 2;
          foodInd[2] = 1;
        }
      }
       }
    if(ktimer4 >= 2800 && starting == 1){
       if(ktimer4 >= 3700){
         carrot.burn();
         if(foodInd[3] == 1){
          currentScore--;
          foodInd[3] = 2;
          }
       }
      else{
        carrot.cook();
        if(foodInd[3] == 0){
          currentScore+= 2;
          foodInd[3] = 1;
        }
      }
    }
    // console.log(currentScore);
    if(knob1.knobValue > 0){
      bubbles.x = 7;
      bubbles.y = 27;
      image(bubblesImg, bubbles.x+random(0, 3), bubbles.y+random(0, 3), bubbles.size, bubbles.size);
    }
    if(knob2.knobValue > 0){
      bubbles.x = 227;
      bubbles.y = 27;
      image(bubblesImg, bubbles.x+random(0, 3), bubbles.y+random(0, 3), bubbles.size, bubbles.size);
    }
    if(knob3.knobValue > 0){
      bubbles.x = 7;
      bubbles.y = 237;
      image(bubbles1Img, bubbles.x+random(0, 3), bubbles.y+random(0, 3), bubbles.size, bubbles.size);
    }
    if(knob4.knobValue > 0){
      bubbles.x = 227;
      bubbles.y = 237;
      image(bubblesImg, bubbles.x+random(0, 3), bubbles.y+random(0, 3), bubbles.size, bubbles.size);
    }
    
    
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(210, 20, 80, 60, 5);
    
    strokeWeight(0);
    fill(255);
    textAlign(CENTER);
    textSize(60);
    text(int(timer), 250, 40);
    
    
    
    
    if(timer < 0){
      completed = 1;
      starting = 2;
      openFin('You have cooked \nthe ingredients!');
    }
    
    if(starting == 0){
      openInst('- click on the food\n\n      - use the knobs to change the \n      temperature\n\n            - watch the stove so the food \n            does not get burnt!');
    }
  }
  
  
  
  
  
  if(screen == 2){
    timer2 += 0.01;
    
    background(180, 163, 165);
    completed = 0;
    let points = 0;
    fill(255);
    
    image(recipeImg, 0, 0, 800, 600);
    
    drawGui();
    textSize(80);
    textFont(dokdo);
    fill(0);
    textAlign(LEFT);
    //BBBBBBBBBBBBBBBBBBBBB
     // text(int(timer2), 50, 50);
//     text(int(timer2), 720, 50);
    
    text(a, 180, 430);
    text(b, 270, 430);
    text(c, 360, 430);
    text(d, 450, 430);
    text(e, 540, 430);
    text(f, 630, 430);
    
    textSize(30);
    text(int(carrotSlider.val), 170, 240);
    text(int(riceSlider.val), 260, 240);
    text(int(spinachSlider.val), 350, 240);
    text(int(spamSlider.val), 440, 240);
    text(int(radishSlider.val), 530, 240);
    text(int(eggSlider.val), 620, 240);
    
    //checking if works
    console.log(int(carrotSlider.val),int(riceSlider.val),int(spinachSlider.val),int(spamSlider.val),int(radishSlider.val),int(eggSlider.val))

    
    if(int(carrotSlider.val) == a && int(riceSlider.val) == b && int(spinachSlider.val) == c && int(spamSlider.val) == d && int(radishSlider.val) == e && int(eggSlider.val) == f){
      
      completed = 1;
      openFin('You have measured \nout the ingredients!');
      if(indicator == 0 && timer2 <= 6){
        currentScore += 6;
        indicator = 1;
      }
      else if(indicator == 0 && timer2 >6 && timer2 <12){
        currentScore = currentScore + (6-(int(timer2)-6));
        indicator = 1;
      }
      // console.log(currentScore);
    }
    
    if(starting == 0){
      openInst('- look at the recipe at the bottom \n\n      - estimate how much out of 10  \n       on the sliders above \n\n            - try and get it exactly!');
      
    }
    
    
  }
  
  if(screen == 3){
    if(starting == 1){
      timer3+=1/60;
    }
    
    completed = 0;
    background(180, 163, 165);
    strokeWeight(3);
    rect(140, 70, 520, 70, 5);
    stroke(255);
    fill(rcol, gcol, 0);
    rect(150, 80, (progress*1.05), 50, 5);
    
    
    if(progress > 0){
      progress -= 1.5;
    }
    // fill(255);
    // rect(200, 50, 300, 300);
    
    if(progress >280 && progress < 420){
      rcol = 0;
      gcol = 255;
      counter += 0.01;
      console.log(counter);
    }
    else{
      counter = 0;
      rcol = 255;
      gcol = 0;
    }
    
    
    image(kSheet, 150, 100, 500, 510);
    
    //to cover sheet with rice
    strokeWeight(0);
    fill(180, 163, 165);
    rect(120, 190, 20+(progress*1.3), 310);
    
    image(kRoll, progress/1.2+50, 180, 240 +(progress/2), 300);
    
    if(counter >= 5){
      completed = 1;
      comp1 = 1;
    }
    if(comp1 == 1){
      completed = 1;
      // EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
      if(int(timer3) <= 12 && indicator == 0){
        currentScore = currentScore + 10;
        indicator = 1;
      }
      else if(int(timer3) > 12 && int(timer3) < 22 && indicator == 0){
        currentScore = currentScore + (10-(int(timer3)-12));
        indicator = 1;
      }
      // console.log(currentScore);
      
      openFin('You have rolled \nthe kimbap!'); 
    }
    
    if(starting == 0){
      openInst('\n     Click as fast as you can! \n     Keep the bar green for as \n     long as you can!\n\n\n\n');
    }
  }
  
  if(screen == 4){
    image(ending, 0, 0, 800, 600);
    
    textSize(70);
    textFont(dokdo);
    strokeWeight(0);
    fill(0);
    text("You have made kimbap!", 400, 60);
    if(mouseX>70 && mouseX<290 && mouseY>180 && mouseY<250){
      fill(0);
      stroke(255);
      strokeWeight(5);
      rect(60, 175, 240, 80, 10);

      strokeWeight(0);
      fill(255);
      textSize(55);
      text("start over", 180, 205);
      
      fill(0);
      textSize(70);
      stroke(255);
      strokeWeight(5);
      text("SCORE: "+ currentScore, 550, 205);
    }
    else{
      fill(0);
      stroke(255);
      strokeWeight(5);
      rect(70, 180, 220, 70, 10);

      strokeWeight(0);
      fill(255);
      textSize(50);
      text("start over", 180, 205);
      
      fill(0);
      textSize(70);
      stroke(255);
      strokeWeight(5);
      text("SCORE: "+ currentScore, 550, 205);
    }
    
    if(indicator == 0){
      currentScore = currentScore * 100;
      scores.push(currentScore);
      scores.sort(compare);
      indicator = 1;
    }
  }
  if(screen == 5){
    background(189, 176, 171);
    
    fill(0);
    textFont(dokdo);
    textSize(70);
    strokeWeight(0);
    text("HIGHSCORES", 400, 100);
    text('1: ' + scores[0], 400, 220);
    text('2: ' + scores[1], 400, 300);
    text('3: ' + scores[2], 400, 380);
    
    if(mouseX>230+80 && mouseX<430+80 && mouseY>300+190 && mouseY<370+190){
    textAlign(CENTER, CENTER);
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(230+70, 300+185, 220, 80, 10);
    strokeWeight(0);
    textSize(55);
    fill(255);
    text('back', 330+80, 327+190);
  }
  else{
    textAlign(CENTER, CENTER);
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(230+80, 300+190, 200, 70, 10);
    strokeWeight(0);
    textSize(50);
    fill(255);
    text('back', 330+80, 327+190);
  }
    
  }
  
  
}
//---------------------------------------------------

class Egg{
  constructor(){
    this.x = 630;
    this.y = 170;
    this.type = eggImg;
    this.size = 120;
  }
  view(){
    image(this.type, this.x, this.y, this.size, this.size);
  }
  startFry(){
    this.type = eggUnder;
    this.size = 280;
    this.x = 10;
    this.y = 30;
  }
  cook(){
    this.type = eggPerf;
    this.size = 280;
    this.x = 10;
    this.y = 30;
  }
  burn(){
    this.type = eggOver;
    this.size = 280;
    this.x = 10;
    this.y = 30;
  }
}

class Spam{
  constructor(){
    this.x = 670;
    this.y = 20;
    this.type = spamImg;
    this.size = 130;
  }
  view(){
    image(this.type, this.x, this.y, this.size, this.size);
  }
  startFry(){
    this.type = spamUnder;
    this.size = 280;
    this.x = 230;
    this.y = 30;
  }
  cook(){
    this.type = spamPerf;
    this.size = 280;
    this.x = 230;
    this.y = 30;
  }
  burn(){
    this.type = spamOver;
    this.size = 280;
    this.x = 230;
    this.y = 30;
  }
}

class Rice{
  constructor(){
    this.x = 370;
    this.y = 0;
    this.type = riceImg;
    this.size = 200;
  }
  view(){
    image(this.type, this.x, this.y, this.size, this.size);
  }
  startFry(){
    this.type = riceUnder;
    this.size = 280;
    this.x = 10;
    this.y = 240;
  }
  cook(){
    this.type = ricePerf;
    this.size = 280;
    this.x = 10;
    this.y = 240;
  }
  burn(){
    this.type = riceOver;
    this.size = 280;
    this.x = 10;
    this.y = 240;
  }
}


class Carrot{
  constructor(){
    this.x = 550;
    this.y = 60;
    this.type = carrotImg;
    this.size = 130;
  }
  view(){
    image(this.type, this.x, this.y, this.size, this.size);
  }
  startFry(){
    this.type = carrotUnder;
    this.size = 280;
    this.x = 230;
    this.y = 240;
  }
  cook(){
    this.type = carrotPerf;
    this.size = 280;
    this.x = 230;
    this.y = 240;
  }
  burn(){
    this.type = carrotOver;
    this.size = 280;
    this.x = 230;
    this.y = 240;
  }
}



// ----------------------------------------------

function mousePressed() {
  if(screen == 1){
    if(isOn1 == true){
      knob1.active();
    }
    if(isOn2 == true){
      knob2.active();
    }
    if(isOn3 == true){
      knob3.active();
    }
    if(isOn4 == true){
      knob4.active();
    }
  }
}

function mouseReleased() {
  if(screen == 1){
    knob1.inactive();
    knob2.inactive();
    knob3.inactive();
    knob4.inactive();
  }
}

function mouseClicked(){
  if(screen == 1){
    if(mouseX>630 && mouseX<750 && mouseY>180 && mouseY<270){
      egg.startFry();
      isOn1 = true;
    }
    if(mouseX>690 && mouseX<780 && mouseY>20 && mouseY<150){
      spam.startFry();
      isOn2 = true;
    }
    if(mouseX>410 && mouseX<540 && mouseY>0 && mouseY<120){
      rice.startFry();
      isOn3 = true;
    }
    if(mouseX>560 && mouseX<670 && mouseY>80 && mouseY<180){
      carrot.startFry();
      isOn4 = true;
    }
  }
  
  //for adding rolling mechanism on screen 3
  if(screen == 3 && progress <450){
    progress+=20;
  }
  
  
  //finished screen continue button functionality
  if(completed == 1 && mouseX>230 && mouseX<430 && mouseY>300 && mouseY<370){
    screen++;
    starting = 0;
    setup();
  }
  //start game button for home screen
  if(screen == 0 && mouseX>490 && mouseX<710 && mouseY>170 && mouseY<250){
      screen++;
      setup();
    }
  if(screen == 0 && mouseX>490 && mouseX<710 && mouseY>280 && mouseY<350){
    screen = 5;
  }
  if(screen == 4 && mouseX>490-420 && mouseX<710-420 && mouseY>230-50 && mouseY<300-50){
      screen = 0;
      setup();
      reset1();
    
    }
  if(screen == 5 && mouseX>230+80 && mouseX<430+80 && mouseY>300+190 && mouseY<370+190){
    screen = 0;
  }
  //text("start over", 180, 205)
  //    rect(70, 180, 220, 70, 10);
  //rect(230+80, 300+190, 200, 70, 10);
  
  //instructions page clicking
  if(starting == 0 && mouseX>230+80 && mouseX<430+80 && mouseY>300+190 && mouseY<370+190){
    starting = 1;
    //console.log('test');
  }
  
}

function openInst(txt){
    background(180, 163, 165);
    image(ins, 0, 0, 800, 600);
    textAlign(CENTER, CENTER);
    textFont(dokdo);
    fill(255);
    textSize(50);
    strokeWeight(0);
    text('Instructions:', 400, 160);
    
    textSize(28);
    textAlign(LEFT, CENTER);
    textLeading(22);
    text(txt, 270, 280);
  
  //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
  if(mouseX>230+80 && mouseX<430+80 && mouseY>300+190 && mouseY<370+190){
    textAlign(CENTER, CENTER);
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(230+70, 300+185, 220, 80, 10);
    strokeWeight(0);
    textSize(45);
    fill(255);
    text('I understand', 330+80, 327+190);
  }
  else{
    textAlign(CENTER, CENTER);
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(230+80, 300+190, 200, 70, 10);
    strokeWeight(0);
    textSize(40);
    fill(255);
    text('I understand', 330+80, 327+190);
  }
}


function openFin(txt){
  background(180, 163, 165);
  image(fin, -15, 0, 850, 650);
  
  textAlign(CENTER, CENTER);
    fill(255);
    textFont(dokdo);
    textSize(45);
    text(txt, 340, 220);
  
  //finished screen continue button functionality
  
  if(completed == 1 && mouseX>230 && mouseX<430 && mouseY>300 && mouseY<370){
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(220, 295, 220, 80, 10);
    strokeWeight(0);
    fill(255);
    textSize(45);
    text('Continue', 330, 327);
  }
  else{
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(230, 300, 200, 70, 10);
    strokeWeight(0);
    fill(255);
    textSize(40);
    text('Continue', 330, 327);
  }
}

function reset1(){
  screen = 0;
   timer = 31;
   ktimer1 = 0;
   ktimer2 = 0;
   ktimer3 = 0;
   ktimer4 = 0;
   counter = 0;
  //0: home screen, 1: stove game, 2: ingredients, 3: rolling
   progress = 140;
   completed = 0;
   comp1 = 0;
   starting = 0;
   isOn1 = false;
   isOn2 = false;
   isOn3 = false;
   isOn4 = false;

   scoreMax = 50;
   currentScore = 0;
   rcol = 255;
   gcol = 0;
  
   bubbles = {x: 0, y: 0, size: 280}
  
   burnt = 0;
   cooked = 0;
   undercooked = 0;
  
  
  indicator = 0;
  foodInd = [0, 0, 0, 0];
}



function compare(x, y){
  if(x>y){
    return -1;
  }
  else{
    return 1;
  }
}













// Miles DeCoster - codeforartists.com
// MakeKnob function to create rotating knobs which return different number ranges
// Version 5.0 July 2020

// 5.0
// Define mouse movement employed more clearly with parameter moveRange. 
// This determines the mouse move distance in pixels used to generate return values.
// Set with instancename.moveRange. Default is 280. To get the full and complete range of return values
// moveRange should equal the number of return values desired. Example: to return range of -50 to +50 you need 100 values.
// Example: to return range from 0.00 to 1.00 you also need 100 values.
// Add SHIFT/Click/Drag to allow for 10x fine-tune knob value You can change the fine tune value 
// using instancename.finetune = some number -- default is 10
// If cursor is OVER knob and NOT clicked, UP and DOWN ARROWS will increment knob value and rotate knob (see NOTES below)
// 
// 4.2.1
// Added displayValue update to update method
// 4.2
// Added textColor and textPt properties. (textPt is type size) defauts are 18 and black
// These properties are not initialized in the MakeButton function but may be set for 
// individual instances via instanceName.textColor and instanceName.textPt
// To hide labels set .textColor to [0,0,0,0] - this gives them 0 opacity

// These are the 9 parameters that need to be passed to the MakeKnob function:

// imgSrc - Set the image source in the first parameter. example: "knob.png" or "images/knob.png"
// diameter - Set knob size. Just a number (but refers to pixels)
// locx, locy - Set the location on the canvas horizontal and vertical pixel coordinates.
// lowNum, hiNum - Set the range of values returned. Floating point numbers.
// defaultNum - Sets the default value of the knob. DO NOT SET OR ALLOW A FREQUENCY TO BE SET TO 0 (ZERO). Amplitude can be 0.
// numPlaces - Refers to the displayed value below the knob. Sets the number of decimal places to display. 
//  - This does not affect the actual return values
// label - the text to display below the knob. example: "Frequency"

// NOTES:
// To retrieve the current value use instanceName.knobValue. This is how you access the returned value 
// and use it to actually do something.
// Example: myfreq = freqKnob.knobValue; osc.freq(myfreq);
// Each instance knob also needs to be attached to mouse actions with the active and inactive methods:
// example:
// function mousePressed() {
//    instancename.active();
// }
// function mouseReleased() {
//    instancename.inactive();
// }
// If you want to use the ARROW keys also add:
// function keyPressed() {
//    instancename.keypressed();
// }
// ------------------------------------------------------

function MakeKnob(imgSrc, diameter, locx, locy, lowNum, hiNum, defaultNum, numPlaces, label) {
  this.pos = createVector(0,0);
  this.pos.x = locx;
  this.pos.y = locy;
  this.lowNum = lowNum;
  this.hiNum = hiNum;
  this.rotateMe = map(defaultNum, lowNum, hiNum, 0, -280);
  this.currentRot = map(defaultNum, lowNum, hiNum, 0, -280);
  this.currentValue = defaultNum; 
  this.diameter = diameter;
  this.knobValue = defaultNum;
  this.displayValue=0;
  this.isClickedOn = false;
  this.mouseOver = false;
  this.myY=mouseY;
  this.label=label;
  this.numPlaces = numPlaces;
  this.img = loadImage(imgSrc);
  this.moveRange = 280;
  this.fineTune = 10;
  this.textColor = [0,0,0];
  this.textPt = 18;
  
  // the update function will be called in the main program draw function
  this.update = function() {
    push(); // store the coordinate matrix ------------------------------------
    
    // move the origin to the pivot point
    translate(this.pos.x, this.pos.y);

    // rotate the grid around the pivot point by a
    // number of degrees based on click and drag on button
  
    //  Check if mouse is over the knob
    if (dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.diameter/2) {
      this.mouseOver = true;
      cursor("pointer");
    } else {
      this.mouseOver = false;
    }
    
    //if (!mouseIsPressed && !this.mouseOver) {
    //  cursor('default');
    //}
    
    //-------------------------------- SET ROTATION AND RETURN VALUE------------------------
   
    if (mouseIsPressed && this.isClickedOn) { // && this.rotateMe >= -280 && this.rotateMe <= 0
 
      // check to see if SHIFT key is down and adjust range if it is
      if (keyIsPressed && keyCode==SHIFT) {
        this.rotateMe=this.currentRot+map(mouseY, this.myY, this.myY-this.moveRange, 0, -this.fineTune);
        if (this.rotateMe <  -280) { this.rotateMe = -280; }
        if (this.rotateMe > 0) { this.rotateMe = 0; }
        this.knobValue=map(this.rotateMe, 0, -280, this.lowNum, this.hiNum);
        // this.rotateMe=int(this.rotateMe);
      } else {
        this.rotateMe=this.currentRot+map(mouseY, this.myY, this.myY-this.moveRange, 0, -280);
        this.rotateMe=int(this.rotateMe);
        if (this.rotateMe <  -280) { this.rotateMe = -280; }
        if (this.rotateMe > 0) { this.rotateMe = 0; }
        this.knobValue=map(this.rotateMe, 0, -280, this.lowNum, this.hiNum);
      }

      rotate(radians(-this.rotateMe));   // change degrees to radians
    } else {
      rotate(radians(-this.rotateMe));
    }
  
    if (!mouseIsPressed ) {
      //this.currentRot=this.rotateMe;
      this.isClickedOn = false;
    } 
    // ----------------------------------------------DRAW KNOB  ----------------------------
    imageMode(CENTER);
    image(this.img,0,0,this.diameter,this.diameter);
    pop(); // restore coordinate matrix
  
    rotate(0);
  
//    // add the display value and label
//     textAlign(CENTER);
//     textSize(this.textPt);
//     fill(this.textColor);
//     this.displayValue = nfc(this.knobValue, this.numPlaces); // added in version 4.2.1
//     if (this.displayValue == -0) { this.displayValue = 0; }
//     text(this.displayValue, this.pos.x, this.pos.y+this.diameter/2+15+this.textPt); // display value 
    
//     fill(this.textColor);
//     text(this.label, this.pos.x, this.pos.y+this.diameter/2+20+2.4*this.textPt);
    // set the cursor
    if (this.mouseOver || this.isClickedOn) { pointerCursor = true; }
  }; 
  
  
  // -----------------------------------------------------------
  
  this.active = function() {
    if (this.mouseOver){
      this.isClickedOn = true; 
      this.myY=mouseY;  
      cursor('pointer');
    } else {
      this.isClickedOn = false;
    }
  };
  
  this.inactive = function() {
    this.currentRot=this.rotateMe;
    this.isClickedOn = false;
    cursor('default');
  };
  this.keypressed = function() {
    if (this.mouseOver && this.currentRot <= 0 && this.currentRot >= -280 && keyCode === UP_ARROW) {
      this.currentRot-=280/this.moveRange;
      if (this.currentRot < -280) { this.currentRot = -280; }
      this.rotateMe=this.currentRot;
      this.knobValue=map(this.rotateMe, 0, -280, this.lowNum, this.hiNum);
    }
    if (this.mouseOver && this.currentRot >= -280 && this.currentRot <= 0 && keyCode === DOWN_ARROW) {
      //alert(this.currentRot);
      this.currentRot+=280/this.moveRange;
      if (this.currentRot > 0) { this.currentRot = 0; }
      this.rotateMe=this.currentRot;
      this.knobValue=map(this.rotateMe, 0, -280, this.lowNum, this.hiNum);
    }
  };

} // end KnobMaker
