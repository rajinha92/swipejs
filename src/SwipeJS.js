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
