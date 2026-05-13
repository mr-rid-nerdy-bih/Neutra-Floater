let port; // Keep this for your HC-05

let angle = 0;
let distance = 100;
let curArray = [];
for (let i = 0; i < 180; i++) {
  curArray.push(0);
}

let sweepDir = 1;
let sweepAngle = 30;
let sweepSpeed = 0.5;
let maxThrottle = 100;

let leftMotorSpeed = 100;
let rightMotorSpeed = 100;
let radarFrame; // Added this variable for your graphics buffer

let btValueDictionary = {
  'distance': 0,
  'ph': 0,
  'angle': 0,
  'error': "",
  'dosingData': {'message': "", 'dueTime': "", 'doseAmount': 0, 'status': ""}
}; // To store the latest values from Bluetooth

function setup() {
  createCanvas(windowWidth, 1000);
  background(0);
  angleMode(DEGREES);
  
  // Initialize Serial
  port = createSerial();
  
  // Setup Radar Graphics
  radarFrame = createGraphics(400, 400);
  radarFrame.angleMode(DEGREES); // Critical: ensure the buffer also uses Degrees

  // Create your Connect button here as we discussed before
  let btn = createButton('Connect Bluetooth');
  btn.position(20, 20);
  btn.mousePressed(() => port.open(9600));
}

function connectToSerial() {
  if (!port.opened()) {
    // This will trigger the Android system Bluetooth selector
    port.open(9600);
  } else {
    port.close();
  }
}

function draw() {
  background(30);
  
  if (!port.opened()) {
    fill(255, 0, 0);
    text("Disconnected", 20, 70);
  } else {
    fill(0, 255, 0);
    text("Connected!", 20, 70);
  }

  sweepAngle += sweepSpeed * sweepDir;
  
  if (sweepAngle >= 150 || sweepAngle <= 30) {
    sweepDir *= -1;
  }
  
  radarFrame.background(0, 25);
  radarFrame.push();
  radarFrame.translate(200, 330);
  
  leftMotorSpeed = floor(lerp(leftMotorSpeed, calculateSteering()[0], 0.3));
  rightMotorSpeed = floor(lerp(rightMotorSpeed, calculateSteering()[1], 0.3));
  maxThrottle = floor(calculateSteering()[2]);

  // To real data (if connected):
  if (btValueDictionary['distance'] !== 'NaN' && btValueDictionary['distance'] > 0) {
    let simulatedDist = btValueDictionary['distance']; // Use the distance from Bluetooth if available
    curArray = sonarToArray(distance, angle);
  }

  let bx = simulatedDist * cos(sweepAngle + 180);
  let by = simulatedDist * sin(sweepAngle + 180);
  radarFrame.fill(255, 0, 0);
  radarFrame.ellipse(bx, by, 8, 8);
  
  radarFrame.noFill();
  radarFrame.stroke(0, 100, 0);
  for (let r = 100; r <= 200; r += 100) {
    radarFrame.arc(0, 0, r*2, r*2, 180, 360);
  }
  
  radarFrame.stroke(0, 255, 0);
  let sx = 200 * cos(sweepAngle + 180);
  let sy = 200 * sin(sweepAngle + 180);
  radarFrame.line(0, 0, sx, sy);
  
  radarFrame.stroke(0, 255, 0);
  radarFrame.line(-150, -250, -150, -250 - leftMotorSpeed / 2);
  radarFrame.line(150, -250, 150, -250 - (rightMotorSpeed / 2));
  
  radarFrame.fill(0, 255, 0);
  radarFrame.stroke(0, 255, 0);
  radarFrame.strokeWeight(1);
  radarFrame.textFont('Courier New');
  radarFrame.textSize(18);
  radarFrame.text(`SONAR SCANNING RUNTIME:\n${nfc(frameCount/60,0)}s`, -120, -290);
  
  radarFrame.pop();
  
  image(radarFrame, 50, 50);
  
  fill(255);
  stroke(0);
  strokeWeight(4);
  textFont('Courier New');
  textSize(20);
  text(text("Current Motor Speed Bias and Throttle : \n", join(calculateSteering(), " - ")), 500, 100);
  text(`MOTOR SPEEDS:\n${nfc(leftMotorSpeed, 2)} - ${nfc(rightMotorSpeed, 2)}`, 500, 200);
  text('pH Levels :\nN/A', 500, 300);
  
  stroke(255);
  line(50, 600, windowWidth - 50, 600);
  line(windowWidth / 2, 600, windowWidth / 2, 550)

  if (port.opened() && frameCount % 5 === 0) {
    let biases = getBias(curArray);
    let speeds = convertBiasesToSpeeds(biases.leftBias, biases.rightBias);
    
    let L = floor(speeds.leftSpeed);
    let R = floor(speeds.rightSpeed);
    port.write(`${L},${R}\n`);
  }
}

// Example: Send a command when the screen is touched
function mousePressed() {
  if (port.opened()) {
    port.write('H'); // Send 'H' to your Arduino
  }
}

function calculateSteering() {
  let leftMotor = maxThrottle;
  let rightMotor = maxThrottle;
  
  let biases = getBias(curArray);
  leftMotor += biases.leftBias * maxThrottle;
  rightMotor += biases.rightBias * maxThrottle;

  return [leftMotor, rightMotor, maxThrottle];
}

function sonarToArray(dist, angle) {
  // Implementation for converting sonar data to array
  let oldArr = curArray;

  oldArr[angle] = dist; // Store distance at the index corresponding to the angle
  return oldArr;
}

function sendMode() {
  if (port.opened()) {
    port.write("3\n"); // The \n is mandatory for readStringUntil('\n') to work!
    console.log("Sent: 3");
  }
}