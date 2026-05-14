function processBluetoothTelemetry(rawJson) {
  try {
    // 1. Parse the incoming JSON string
    const data = JSON.parse(rawJson);

    // 2. Map and return the dictionary
    return {
      'distance': data.d || 0,
      'ph': data.p || 0,
      'angle': data.ang || 0, // Added based on previous logic
      'error': data.e || "",
      'dosingData': {
        'message': data.s?.m || "",
        'dueTime': data.s?.t || 0,
        'doseAmount': data.s?.a || 0,
        'status': data.s?.st || ""
      }
    };
  } catch (err) {
    console.error("Failed to parse telemetry:", err);
    return null; // Return null if the JSON was malformed
  }
}