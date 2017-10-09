# Swipe JS
A simple JS plugin for listening swipe events.

#### 1- Installation
```shell
npm install pure-swipe-js
```

#### 2 - Usage
Import the JS from wherever you put it
```html
<script src="build/swipe.min.js"></script>
```

Then listen for events
```javascript
    app.addEventListener('swipe.start', function() {
    });
    app.addEventListener('swipe.progress', function(event) {
    });
    app.addEventListener('swipe.cancel', function(event) {
    });
    app.addEventListener('swipe.end', function(event) { 
    });
```

#### 3 - Configuration
You can override the SwipeJS configuration
```javascript
SwipeJSConfig.sensitivityX = 200;
SwipeJSConfig.sensitivityY = 20;
```