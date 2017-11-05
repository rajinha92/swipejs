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
