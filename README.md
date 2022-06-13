# strapi-be

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Content
 * [Getting Started](#getting-started)

* [Prerequisites for installation](#prerequisites-for-installation)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [Features](#features)

 * [Author](#author)


## Getting Started

### Tools/Stacks
1. Node
2. Koa
4. Knex
5. Docker
6. Typescript
7. Graphql
8. Jest


### Setting up
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/OdunayoOkebunmi/strapi-be
```
2. cd into the folder
```
e.g cd strapi-be
```

3. Create `.env` file and fill out the required information 
```
e.g cp .env.example .env
```
4. Install dependencies

```
e.g npm install
```
5. Start the application by running the server script.

```
 npm run start
```
```
http://localhost:3000/graphql
```

6. Run `docker-compose up`

### Test
run test using ```npm test```.

## Features
 ### Planets
 * Get all planets
 * Get planets by ID 
  ### Spacecenters
 * Get all spacecenter
 * Get spacecenter by ID or uid
 ### Flights
 * Get all flights (paginated)
 * Get flights by ID 
 * Schedule a flight

 ### Bookings
 * Create a booking
 * Get all Bookings (paginated)

## Author
*  [Odunayo Olajumoke Okebunmi](https://twitter.com/OdunayoO_)
