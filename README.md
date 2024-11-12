# Project Overview

This demo project includes a sample backend and three mobile applications, each showcasing different frontend implementations:
   
   * React Native: A cross-platform application providing a unified experience on both iOS and Android.

   * iOS Native: A dedicated SwiftUI application built specifically for iOS, demonstrating native functionality.

   * Flutter: A single codebase application targeting both iOS and Android, leveraging Flutter’s UI framework for consistent design across platforms

All three applications offer similar functionality, allowing for comparisons across different development approaches and frameworks.

#### Backend

An Express.js application that provides API endpoints for managing player data in the /PlayerProxyService directory. It functions as a proxy, exposing data from https://api.sleeper.app/v1/players/nfl

#### Frontend (React Native)

A React Native mobile application that interacts with the backend API in /PlayersApp

![App print screen](https://drive.google.com/uc?export=download&id=1To5sy9XZ-ogGVPoZh5PP32lKBLiSMNLH)

[App screen cast](https://drive.google.com/file/d/1xlLYAcy1gLtfTGQkGfKsPTSpzf47IjJU/view?usp=sharing)

#### Frontend (iOS native application)

An iOS native application demonstrating the use of SwiftUI, Combine, and the MVVM-C (Model-View-ViewModel-Coordinator) architecture in the /PlayersNativeiOSApp

![App print screen](https://drive.google.com/uc?export=download&id=1AqLzqEm_Itp4AkIxYU1Y-rGXrwM6E7bW)

[App screen cast](https://drive.google.com/file/d/1UzVDvBHCiMw8qddqyi696xTSW2DcTkcw/view?usp=sharing)

#### Frontend (Flutter application)

This Flutter app, located in PlayersFlutterApp, demonstrates a Provider-based, MVVM-like architecture to separate logic and UI, ensuring modular and testable code. Built with Flutter’s cross-platform capabilities, the app can run on iOS, Android, macOS, and the web, providing a consistent experience across multiple platforms.

![App print screen](https://drive.google.com/uc?export=download&id=1hLxodAhmILVrXHubvOriHNXoW7xMFU0k)

[App screen cast](https://drive.google.com/file/d/1dgzlRYFwQS6c7mAfEF_s9iZClON3zBeh/view?usp=sharing)

## Prerequisites

Before starting, ensure you have the following installed on your machine:

* **Node.js** (version 20 or higher)
* **npm** (comes with Node.js)
* **CocoaPods** (for iOS builds of React Native)
* **Xcode** (for iOS builds of React Native and iOS navite application)
* **Java Development Kit (JDK)** (for android builds of React Native)
* **Android Studio** (for android builds of React Native)
* **Install Flutter SDK: Follow the instructions on flutter.dev to install Flutter.

## Installation

### Backend

##### Install dependencies, build and run:

`cd PlayerProxyService`

`npm install && npm run build && npm start`

##### Express.js application will run at:

`http://localhost:3000/api/players`

##### Test sample api endpoint

`curl -X GET -i http://localhost:3000/api/players/1`

### Frontend (React Native)

##### Install dependencies, build and run:

`cd PlayersApp`

`npm install`

##### Run on iOS

`cd PlayersApp`

`npm run run-ios`

###### Install coapods dependecies and run in Xcode (optionally)

`cd PlayersApp/ios`

`pod install`

`cd PlayersApp`

* open PlayersApp/ios/project.xcworkspace in XCode
* setup Signing application manually in Xcode 
* run applicaiton on simulator

##### Run on Android

`cd PlayersApp`

`npm run run-ios`

##### Run unit tests

`cd PlayersApp`

`npm run test`

### Frontend (iOS native applications)

`cd PlayersNativeiOSApp`

`open PlayersDemo.xcodeproj`

run applicaiton in Xcode

### Frontend (Flutter applications)

`cd PlayersFlutterApp/players_app`

`flutter pub get`

* iOS
`flutter run -d ios`

* Android
`flutter run -d android`
