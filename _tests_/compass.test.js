import React from 'react';
import {describe, expect, test} from '@jest/globals'

//gets angle based on compass math logic, uses set x and y for magnetometer
//does not normalize angle because not using magnetometer
function getAngle (bearing , x, y) {
    let _angle = 0;
    if (Math.atan2(y, x) >= 0) {
        _angle = Math.atan2(y, x) * (180 / Math.PI);
    }
    if (bearing >= _angle) {
        return 360 - bearing - _angle;
    }
    else {
        return 360 - bearing + _angle;
    }
}

function normalizeCompassDirection() {

}

Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}

it('if bearing = magnetometer, returns 0', () => {
    expect(getAngle(0, 0, 0)).toBe(360);
})

it('if bearing > magnetometer, returns number less than 360', () => {
    expect(getAngle(150, 2, 3)).toBeLessThan(360);
})

// it('if bearing = magnetometer, returns number equal to 360', () => {
//     for(i = 0; i <= 360; i++){
//         expect(getAngle(i, Math.cos(Math.radians(i)), Math.sin(Math.radians(i)))).toBe(360);
//     }
// })