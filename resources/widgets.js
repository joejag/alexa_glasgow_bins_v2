"use strict"

var APP_ID = undefined

var AlexaSkill = require("./AlexaSkill")

// APP

function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000))
}

function nextWeekdayDate(date, day_in_week) {
  var ret = new Date(date || new Date())
  ret.setDate(ret.getDate() + ((day_in_week - 1 - ret.getDay() + 7) % 7) + 1)
  return ret
}

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
function nth(d) {
  if (d > 3 && d < 21) return "th"
  switch (d % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

function binsGettingCollectedOn(pickupDate) {
  const startingFrom = new Date(2021, 0, 4)
  const collectionPattern = [
    "blue",
    "green and brown",
    "blue",
    "green and brown",
    "blue",
    "green and brown",
    "blue",
    "purple, green and brown",
  ]

  var weeksSinceStartOfThisPattern = weeksBetween(startingFrom, pickupDate)

  console.log()

  return collectionPattern[weeksSinceStartOfThisPattern % collectionPattern.length]
}

function nextWednesday(date) {
  return nextWeekdayDate(date, 3)
}

function nextPickUpMessage(date) {
  var nextPickupDay = nextWednesday(date)
  var binsToBeCollected = binsGettingCollectedOn(nextPickupDay)

  var date = nextPickupDay.getDate()
  var month = months[nextPickupDay.getMonth()]

  return `It'll be the ${binsToBeCollected} bins on the ${date}${nth(date)} ${month}`
}

// for (let x = 0; x < 12; x++) {
//   console.log(new Date(2021, x, 1) + " --> " + nextPickUpMessage(new Date(2021, x, 1)))
//   console.log(new Date(2021, x, 8) + " --> " + nextPickUpMessage(new Date(2021, x, 8)))
//   console.log(new Date(2021, x, 15) + " --> " + nextPickUpMessage(new Date(2021, x, 15)))
//   console.log(new Date(2021, x, 22) + " --> " + nextPickUpMessage(new Date(2021, x, 22)))
// }

// APP

var GlasgowBins = function () {
  AlexaSkill.call(this, APP_ID)
}

GlasgowBins.prototype = Object.create(AlexaSkill.prototype)

GlasgowBins.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  response.tellWithCard(nextPickUpMessage(), nextPickUpMessage(), nextPickUpMessage())
}

GlasgowBins.prototype.intentHandlers = {
  // register custom intent handlers
  GlasgowBinsIntent: function (intent, session, response) {
    response.tellWithCard(nextPickUpMessage(), nextPickUpMessage(), nextPickUpMessage())
  },
  "AMAZON.HelpIntent": function (intent, session, response) {
    response.ask("You can say bins to me!", "You can say bins to me!")
  },
}

GlasgowBins.prototype.constructor = GlasgowBins
GlasgowBins.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {}
GlasgowBins.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {}

exports.handler = function (event, context) {
  var glasgowBins = new GlasgowBins()
  glasgowBins.execute(event, context)
}
