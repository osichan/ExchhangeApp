# Exchange App

A React Native Android app to display currency exchange rates. Users can view rates, add favorites, and access them offline.

## Features

- List currency exchange rates
- Add/remove favorites
- Offline access to previously viewed and favorited rates using AsyncStorage

## Technology

- React Native (Android only)
- TypeScript
- Axios for API requests
- AsyncStorage for local data storage
- Environment variables for API key

## Architecture

Simple structure using React hooks (`useState`). Data fetching logic is in services and storage logic is in utils/helpers.

## Offline Mode

Implemented using AsyncStorage to cache viewed and favorite rates for offline use.

## Setup

1. Create `.env` file with your API key:
   `API_KEY=your_api_key_here`

2. Install dependencies:
   `npm install`

3. Run on Android device/emulator:
   `npm run android`
