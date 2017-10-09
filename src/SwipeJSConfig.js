'use strict'

let _sensitivityX = 20;
let _sensitivityY = 20;

class SwipeJSConfig {

    static get sensitivityX() {
        return _sensitivityX;
    }

    static get sensitivityY() {
        return _sensitivityY;
    }

    static set sensitivityX(value){
        _sensitivityX = value;
    }

    static set sensitivityY(value){
        _sensitivityY = value;
    }

    static get NORTH() {
        return 1;
    }

    static get SOUTH() {
        return 2;
    }

    static get WEST() {
        return 3;
    }

    static get EAST() {
        return 4;
    }

    static get NORTH_WEST() {
        return 5;
    }

    static get NORTH_EAST() {
        return 6;
    }

    static get SOUTH_WEST() {
        return 7;
    }

    static get SOUTH_EAST() {
        return 8;
    }


}

exports.SwipeJSConfig = SwipeJSConfig;