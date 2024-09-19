# Project Overview

This demo project consists of two main components:

#### Backend

An Express.js application that provides API endpoints for managing player data in the /PlayerProxyService directory. It functions as a proxy, exposing data from https://api.sleeper.app/v1/players/nfl

#### Frontend

A React Native mobile application that interacts with the backend API in /PlayersApp

![App print screen](https://drive.google.com/uc?export=download&id=1To5sy9XZ-ogGVPoZh5PP32lKBLiSMNLH)

[App screen cast](https://drive.google.com/file/d/1xlLYAcy1gLtfTGQkGfKsPTSpzf47IjJU/view?usp=sharing)

## Prerequisites

Before starting, ensure you have the following installed on your machine:

* **Node.js** (version 20 or higher)
* **npm** (comes with Node.js)
* **CocoaPods** (for iOS builds of React Native)
* **Xcode** (for iOS builds of React Native)
* **Java Development Kit (JDK)** (for android builds of React Native)
* **Android Studio** (for android builds of React Native)

## Installation

### Backend

##### Install dependencies, build and run:

`cd PlayerProxyService`

`npm install && npm run build && npm start`

##### Express.js application will run at:

`http://localhost:3000/api/players`

##### Test sample api endpoint

`curl -X GET -i http://localhost:3000/api/players/1`

### Frontend

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
