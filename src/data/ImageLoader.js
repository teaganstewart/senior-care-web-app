let empty = require ('../../assets/images/empty.jpg')
let battery0to15 = require ('../../assets/images/0to15.jpg')
let battery15to25 = require ('../../assets/images/15to25.jpg')
let battery25to40 = require ('../../assets/images/25to40.jpg')
let battery40to50 = require ('../../assets/images/40to50.jpg')
let battery50to65 = require ('../../assets/images/50to65.jpg')
let battery65to75 = require ('../../assets/images/65to75.jpg')
let battery75to90 = require ('../../assets/images/75to90.jpg')
let battery90to100 = require ('../../assets/images/90to100.jpg')

let house = require('../../assets/images/house.jpg')
let kitchenActivity = require('../../assets/images/kitchenActivity.jpg')
let diningActivity = require('../../assets/images/diningActivity.jpg')
let livingActivity = require('../../assets/images/livingActivity.jpg')
let toiletActivity = require('../../assets/images/toiletActivity.jpg')
let bedroomActivity = require('../../assets/images/bedroomActivity.jpg')

export function loadBatteryImage(battery) {
    if(battery > 90)
        return battery90to100;     
    if (battery > 75)
        return battery75to90;
    if (battery > 65)
        return battery65to75;
    if (battery > 50)
        return battery50to65;
    if (battery > 40)
        return battery40to50;
    if (battery > 25)
        return battery25to40;
     if (battery > 15)
        return battery15to25;
    if (battery > 0) 
        return battery0to15;
    
     return empty;
}

export function loadHouseImage(location) {
    switch(location) {
        case "dining":
            return diningActivity;
        case "living":
            return livingActivity;
        case "kitchen":
            return kitchenActivity;
        case "toilet":
            return toiletActivity;
        case "bedroom":
            return bedroomActivity;
        default:
            return house;
    }
}