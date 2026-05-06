# Neutra Floater Web App

A GUI web application built with **p5.js** for controlling and visualizing a floating robot through Bluetooth serial communication. The app is hosted on GitHub Pages for easy accessibility.

## Overview

Neutra Floater is an interactive web-based control interface that bridges communication between your mobile device and a robot via Classic Bluetooth. The graphical interface provides real-time visualization and control capabilities using p5.js, a creative coding library.

## Features

- 🎨 **Interactive GUI** - Built with p5.js for smooth, responsive graphics
- 📱 **Bluetooth Serial Communication** - Classic Bluetooth connection to robot hardware
- ☁️ **Cloud Hosted** - Deployed on GitHub Pages for instant access
- 🌐 **Web-Based** - No installation required; run directly in your browser
- 📊 **Real-Time Visualization** - Live feedback from connected devices

## Technology Stack

- **Frontend Framework**: p5.js
- **Hosting**: GitHub Pages
- **Communication Protocol**: Classic Bluetooth Serial
- **Language**: JavaScript

## Getting Started

### Prerequisites

- A modern web browser with Bluetooth support (Chrome, Edge, Opera)
- A device with Classic Bluetooth capability
- A Bluetooth-enabled robot compatible with this application

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mr-rid-nerdy-bih/Neutra-Floater.git
cd Neutra-Floater
```

2. Open the application in your browser:
   - Visit: `https://mr-rid-nerdy-bih.github.io/Neutra-Floater/`
   - Or open `index.html` locally

### Usage

1. **Connect via Bluetooth**:
   - Launch the web app in your browser
   - Click the Bluetooth connect button
   - Select your robot device from the available list
   - Authorize the connection when prompted

2. **Control the Robot**:
   - Use the graphical interface to send commands
   - Receive real-time feedback from the robot

## Project Structure

```
Neutra-Floater/
├── index.html          # Main application file
├── sketch.js           # p5.js main sketch
├── css/                # Styling files
├── js/                 # JavaScript utilities
├── assets/             # Images and resources
└── README.md           # This file
```

## Architecture

### Communication Flow

```
Web App (p5.js) 
    ↓
Bluetooth Serial Connection
    ↓
Robot Hardware
```

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Edge    | ✅ Full |
| Opera   | ✅ Full |
| Firefox | ⚠️ Limited |
| Safari  | ❌ No |

*Note: Bluetooth Web API support varies by browser. Chrome and Edge provide the best compatibility.*

## Configuration

To customize the application, modify the following files:
- `sketch.js` - Core p5.js sketch logic
- `config.js` - Application settings and constants

## Troubleshooting

### Connection Issues
- Ensure Bluetooth is enabled on both devices
- Check that your browser supports Web Bluetooth API
- Try refreshing the page and reconnecting
- Verify the robot is powered on and in pairing mode

### Visual/Performance Issues
- Clear browser cache
- Disable browser extensions that might interfere
- Try a different browser if experiencing issues

## Development

### Local Development

```bash
# No build step required! Just open index.html in your browser
# Or use a simple HTTP server for better compatibility:
python -m http.server 8000
# Then visit http://localhost:8000
```

### Building for GitHub Pages

The site automatically deploys from the `main` branch. Simply push your changes:

```bash
git add .
git commit -m "Update app"
git push origin main
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License. See LICENSE file for details.

## Author

**mr-rid-nerdy-bih**
- GitHub: [@mr-rid-nerdy-bih](https://github.com/mr-rid-nerdy-bih)

## Support

For issues, feature requests, or questions:
- Open an issue on [GitHub Issues](https://github.com/mr-rid-nerdy-bih/Neutra-Floater/issues)
- Check the [Discussions](https://github.com/mr-rid-nerdy-bih/Neutra-Floater/discussions) section

## Resources

- [p5.js Documentation](https://p5js.org/)
- [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Last Updated**: May 6, 2026

Made with ❤️ for robotics enthusiasts