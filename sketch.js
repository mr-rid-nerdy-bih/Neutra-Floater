let port;
let connectBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  port = createSerial();

  // Android Chrome needs a clear user gesture to open the port
  connectBtn = createButton('Connect to HC-05');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectToSerial);
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
    
    // Example: Read data coming from your project
    let str = port.readStringUntil("\n");
    if (str) {
      console.log("Received: " + str);
    }
  }
}

// Example: Send a command when the screen is touched
function mousePressed() {
  if (port.opened()) {
    port.write('H'); // Send 'H' to your Arduino
  }
}