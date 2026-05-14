function draw() {
  background(30);
  
  handleSerialReceive(); // Check for incoming data and update btValueDictionary

  if (!port.opened()) {
    fill(255, 0, 0);
    text("Disconnected", 20, 70);
  } else {
    fill(0, 255, 0);
    text("Connected!", 20, 70);
  }
  
  // 1. Calculate raw speeds from sonar biases
  let speeds = convertBiasesToSpeeds(getBias(curArray).leftBias, getBias(curArray).rightBias);

  // 2. Smooth the transition using lerp
  leftMotorSpeed = floor(lerp(leftMotorSpeed, speeds.leftSpeed, 0.3));
  rightMotorSpeed = floor(lerp(rightMotorSpeed, speeds.rightSpeed, 0.3));

  // 3. UI Display
  fill(255);
  stroke(0);
  strokeWeight(4);
  textFont('Courier New');
  textSize(20);
  
  // Display the smoothed values so they match the motor bars in radarDraw
  text(`Current Motor Speed Bias and Throttle : \nL: ${leftMotorSpeed} - R: ${rightMotorSpeed}`, 500, 100);
  
  // Optional: Display pH levels if data is available
  text(`pH Levels :\n${btValueDictionary['ph'] > 0 ? nfc(btValueDictionary['ph'], 2) : 'Scanning...'}`, 500, 300);
  
  stroke(255);
  line(50, 600, windowWidth - 50, 600);
  line(windowWidth / 2, 600, windowWidth / 2, 550);

  handleSerialSend(); // Send motor commands to Arduino
  radarDraw(btValueDictionary['angle']); // Update visualization
}