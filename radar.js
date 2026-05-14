function radarDraw(angle) {
  // 1. Update the data array first
  let distance = btValueDictionary['distance'];
  curArray = sonarToArray(distance, angle);

  // 2. Setup the coordinate system for this frame
  radarFrame.resetMatrix(); // Prevents the drawing from "walking" off screen
  radarFrame.background(0, 25); // Draw background FIRST to allow dots to sit on top
  radarFrame.translate(200, 330); // Set origin to bottom-center of the 400x400 buffer

  // 3. DRAW THE MAP (Memory of all obstacles)
  for (let i = 0; i < curArray.length; i++) {
    let d = curArray[i];
    if (d > 0 && d < 200) { // Only draw valid distances within radar range
      let x = d * cos(i + 180); 
      let y = d * sin(i + 180);
      
      radarFrame.fill(255, 0, 0);
      radarFrame.noStroke();
      radarFrame.ellipse(x, y, 5, 5);
    }
  }
  
  // 4. DRAW THE UI AND SCANNER
  radarFrame.push();
  
  // The Scanning Line
  radarFrame.stroke(0, 255, 0);
  radarFrame.strokeWeight(2);
  let sx = 200 * cos(angle + 180);
  let sy = 200 * sin(angle + 180);
  radarFrame.line(0, 0, sx, sy);
  
  // Motor Speed Visualizers (using variables from sketch.js)
  radarFrame.stroke(0, 255, 0);
  radarFrame.line(-150, -250, -150, -250 - leftMotorSpeed / 2);
  radarFrame.line(150, -250, 150, -250 - rightMotorSpeed / 2);
  
  // Text Overlays
  radarFrame.fill(0, 255, 0);
  radarFrame.noStroke();
  radarFrame.textFont('Courier New');
  radarFrame.textSize(16);
  radarFrame.text(`SCAN TIME: ${nfc(frameCount/60, 1)}s`, -120, -290);

  // Range Arcs
  radarFrame.noFill();
  radarFrame.stroke(0, 100, 0, 150);
  for (let r = 100; r <= 200; r += 100) {
    radarFrame.arc(0, 0, r*2, r*2, 180, 360);
  }

  radarFrame.pop();
  
  // 5. Render the buffer to the main canvas
  image(radarFrame, 50, 50);
}