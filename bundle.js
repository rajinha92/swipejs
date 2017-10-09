(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

class SwipeJS {

    construct() {
        this.swipeDirection = null;
        this.swipeClicked = true;
        this.swipeStarted = false;
        this.swipeElement = null;
        this.currentX = 0;
        this.currentY = 0;
        this.startX = 0;
        this.startY = 0;
    }

    addMouseListeners() {
        this.mouseDownListener();
        this.mouseUpListener();
        this.mouseMoveListener();
    }

    reset() {
        this.swipeDirection = null;
        this.swipeClicked = false;
        this.swipeElement = null;
    }

    mouseDownListener() {
        var self = this;
        document.body.addEventListener('mousedown', function (evt) {
            self.swipeClicked = true;
            self.swipeElement = evt.srcElement;
            self.startX = evt.x;
            self.startY = evt.y;
        });
    }

    mouseUpListener() {
        var self = this;
        document.body.addEventListener('mouseup', function (evt) {
            if (self.swipeClicked && self.swipeDirection) {
                self.swipeElement.dispatchEvent(new CustomEvent('swipe.end', {
                    detail: {
                        direction: self.swipeDirection,
                        x: self.currentX,
                        y: self.currentY,
                    }
                }));
            } else if (self.swipeClicked && !self.swipeDirection) {
                self.swipeElement.dispatchEvent(new CustomEvent('swipe.cancel'));
            }

            self.reset();
        });
    }

    mouseMoveListener() {
        var self = this;
        document.body.addEventListener('mousemove', function (evt) {
            if (self.swipeClicked) {
                self.currentX = evt.x;
                self.currentY = evt.y;

                let diffX = self.currentX - self.startX;
                let diffY = self.currentY - self.startY;

                if (diffX > SwipeJSConfig.sensitivityX) {
                    if (diffY > SwipeJSConfig.sensitivityY) {
                        self.swipeDirection = SwipeJSConfig.SOUTH_EAST;
                    } else if (diffY < -SwipeJSConfig.sensitivityY) {
                        self.swipeDirection = SwipeJSConfig.NORTH_EAST;
                    } else {
                        self.swipeDirection = SwipeJSConfig.EAST;
                    }
                } else if (diffX < -SwipeJSConfig.sensitivityX) {
                    if (diffY > SwipeJSConfig.sensitivityY) {
                        self.swipeDirection = SwipeJSConfig.SOUTH_WEST;
                    } else if (diffY < -SwipeJSConfig.sensitivityY) {
                        self.swipeDirection = SwipeJSConfig.NORTH_WEST;
                    } else {
                        self.swipeDirection = SwipeJSConfig.WEST;
                    }
                } else {
                    if (diffY > SwipeJSConfig.sensitivityY)
                        self.swipeDirection = SwipeJSConfig.SOUTH;
                    else if (diffY < -SwipeJSConfig.sensitivityY)
                        self.swipeDirection = SwipeJSConfig.NORTH;
                    else {
                        self.swipeDirection = null;
                    }
                }

                if (!self.swipeStarted) {
                    self.swipeStarted = true;
                    self.swipeElement.dispatchEvent(new CustomEvent('swipe.start'));
                } else {
                    self.swipeElement.dispatchEvent(new CustomEvent('swipe.progress', {
                        detail: {
                            direction: self.swipeDirection,
                            x: self.currentX,
                            y: self.currentY,
                        }
                    }));
                }
            }
        });
    }
}

exports.SwipeJS = new SwipeJS;

},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
window.SwipeJS = require('./SwipeJS').SwipeJS;
window.SwipeJSConfig = require('./SwipeJSConfig').SwipeJSConfig;

SwipeJS.addMouseListeners();

},{"./SwipeJS":1,"./SwipeJSConfig":2}]},{},[3]);
