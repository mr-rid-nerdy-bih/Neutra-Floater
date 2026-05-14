function handleSerialSend() {
  if (port.opened() && frameCount % 5 === 0) {
    let biases = getBias(curArray);
    let speeds = convertBiasesToSpeeds(biases.leftBias, biases.rightBias);
    
    let L = floor(speeds.leftSpeed);
    let R = floor(speeds.rightSpeed);
    port.write(`${L},${R}\n`);
  }
}

function handleSerialReceive() {
  if (port.opened() && port.available() > 0) {
    let rawStr = port.readStringUntil("\n");
    if (rawStr) {
        let parsed = processBluetoothTelemetry(rawStr);
        if (parsed) btValueDictionary = parsed; // Update your global dictionary
    }
  }
}