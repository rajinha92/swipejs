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
    document.body.addEventListener('mousedown', (evt) => {
      this.down(evt, this)
    });
    document.body.addEventListener('touchstart', (evt) => {
      this.down(evt, this)
    });
  }

  mouseUpListener() {
    document.body.addEventListener('mouseup', (evt) => {
      this.up(evt, this)
    });
    document.body.addEventListener('touchend', (evt) => {
      this.up(evt, this)
    });
  }

  up(evt, self) {
    if (self.swipeClicked && self.swipeDirection) {
      self.swipeElement.dispatchEvent(new CustomEvent('swipe.end', {
        bubbles: true,
        detail: {
          direction: self.swipeDirection,
          x: self.currentX,
          y: self.currentY,
        }
      }));
    } else if (self.swipeClicked && !self.swipeDirection) {
      self.swipeElement.dispatchEvent(new CustomEvent('swipe.cancel', {
        bubbles: true
      }));
    }

    self.reset();
  }

  down(evt, self) {
    self.swipeClicked = true;
    self.swipeElement = evt.srcElement;
    if(evt instanceof TouchEvent) {
      self.startX = evt.changedTouches[0].clientX;
      self.startY = evt.changedTouches[0].clientY;
    } else {
      self.startX = evt.x;
      self.startY = evt.y;
    }
  }

  move(evt, self) {
    if (self.swipeClicked) {
      if(evt instanceof TouchEvent) {
        self.currentX = evt.changedTouches[0].clientX;
        self.currentY = evt.changedTouches[0].clientY;
      } else {
        self.currentX = evt.x;
        self.currentY = evt.y;
      }


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
        self.swipeElement.dispatchEvent(new CustomEvent('swipe.start', {
          bubbles: true
        }));
      } else {
        self.swipeElement.dispatchEvent(new CustomEvent('swipe.progress', {
          bubbles: true,
          detail: {
            direction: self.swipeDirection,
            x: self.currentX,
            y: self.currentY,
          }
        }));
      }
    }
  }

  mouseMoveListener() {
    document.body.addEventListener('mousemove', (evt) => {
      this.move(evt, this)
    });
    document.body.addEventListener('touchmove', (evt) => {
      this.move(evt, this)
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
