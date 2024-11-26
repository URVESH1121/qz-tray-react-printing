# QZ-Tray Setup Instructions

## Overview

QZ-Tray is a versatile printing utility that simplifies printing and browser integration across different platforms.

## Prerequisites

- Supported Operating Systems:
  - Linux (Ubuntu/Debian)
  - Windows
  - MacOS
- Recommended:
  - Active internet connection
  - Administrative/sudo privileges
  - Compatible web browser
  - Node.js and npm installed

## Download and Installation

### 1. Official Download Methods

#### Download Link

Official Download Page: [https://qz.io/download/](https://qz.io/download/)

#### Linux (Ubuntu/Debian)

```bash
wget -qO - qz.sh | bash
```

#### Windows

```powershell
irm pwsh.sh | iex
```

#### MacOS

```bash
curl qz.sh | bash
```

## Post-Installation Steps

### First-Time Launch

1. Open and start QZ-Tray application
2. Navigate to your React project directory
3. Install project dependencies and start the application
   ```bash
   npm install
   npm start
   ```
4. In the QZ-Tray interface:
   - Choose the printer you want to add
   - Configure printer settings
   - Click on the print button to test your configuration

## Quick Start Guide

- Ensure QZ-Tray is running
- Launch your React application
- Select and configure your desired printer
- Begin printing through the QZ-Tray interface
