function getBias(sonarData, safeDistance = 50) {
    // Assume sonarData is an array of distances from 0 to 179 degrees
    let leftMin = Math.min(...sonarData.slice(0, 90));
    let rightMin = Math.min(...sonarData.slice(90, 180));

    let leftBias = 0;
    let rightBias = 0;

    if (leftMin <= safeDistance && rightMin <= safeDistance) {
        // Both sides blocked, perhaps stop or reverse, but for now, turn sharply
        leftBias = -0.5;
        rightBias = -0.5;
    } else if (leftMin <= safeDistance) {
        // Left blocked, turn right
        leftBias = -0.2;
        rightBias = 0.2;
    } else if (rightMin <= safeDistance) {
        // Right blocked, turn left
        leftBias = 0.2;
        rightBias = -0.2;
    }
    // If both safe, biases remain 0

    return { leftBias, rightBias };
}

function convertBiasesToSpeeds(leftBias, rightBias) {
    // Convert bias values (-0.5 to 0.5) to motor speeds (0-150)
    // 0 = stop, 1-74 = reverse, 75 = neutral, 76-150 = forward
    const baseSpeed = 75;
    const scale = 150; // Full range for bias 1.0, but we use 0.5 max

    let leftSpeed = Math.round(baseSpeed + leftBias * scale);
    let rightSpeed = Math.round(baseSpeed + rightBias * scale);

    // Clamp to 0-150 range
    leftSpeed = Math.max(0, Math.min(150, leftSpeed));
    rightSpeed = Math.max(0, Math.min(150, rightSpeed));

    return { leftSpeed, rightSpeed };
}