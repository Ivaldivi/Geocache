import React from 'react';
import {describe, expect, test} from '@jest/globals'

//gets angle based on compass math logic, uses set x and y for magnetometer
//does not normalize angle because not using magnetometer
function getAngle (bearing , x, y) {
    //get angle and make whole number
    let _angle = atan2Normalized(x, y);
    _angle = Math.round(_angle);
    // console.log(_angle, bearing)
    if (bearing === _angle){
        return 0;
    }
    else if (bearing < _angle){
        return Math.abs((_angle - bearing)%360);
    }
    else{
        return ((bearing + _angle))%360;
        
    }
}

//normalizes atan2 so that it covers 0 to 360 degrees
function atan2Normalized(x,y) {
    let result = Math.degrees(Math.atan2(y,x));
    if (result < 0){
        result = (360+result)%360;
    }
    return result;
}

//turns degrees to radians
Math.radians = function(degrees) {
	return degrees * (Math.PI / 180);
}

//turns radians to degrees
Math.degrees = function(radians) {
	return radians * (180 / Math.PI);
}

it('if bearing = magnetometer, returns 0', () => {
    expect(getAngle(0, 0, 0)).toBe(0);
})

it('if bearing > magnetometer, returns number less than 360', () => {
    expect(getAngle(150, 2, 3)).toBeLessThan(360);
})

it('if bearing = magnetometer, returns number equal to 0', () => {
    for (i = 0; i <= 360; i++){
        //convert degree to x y coordinates that would match the degree in getAngle
        expect(getAngle(i, Math.cos(Math.radians(i)), Math.sin(Math.radians(i)))).toBe(0);
    }
})

it('if bearing < magnetometer, returns correct angle greater than angle', () => {
    for (i = 0; i <= 180; i++){
        //convert degree to x y coordinates that would match the degree in getAngle
        expect(getAngle(360-i, Math.cos(Math.radians(i)), Math.sin(Math.radians(i)))).toBe(((360-i + i))%360);
    }
})

it('if bearing > magnetometer, returns correct angle greater than bearing', () => {
    for (i = 0; i <= 180; i++){
        //convert degree to x y coordinates that would match the degree in getAngle
        expect(getAngle(i, Math.cos(Math.radians(360-i)), Math.sin(Math.radians(360-i)))).toBe(Math.abs(((360-i-i))%360));
    }
})