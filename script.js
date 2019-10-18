var expansionPanel = document.querySelector('.education--wrapper');
var schoolTime = document.querySelector('.education--time');
var arrow = document.querySelector('.education--arrow');

expansionPanel.addEventListener('click', function() {
  schoolTime.classList.toggle('education--time-active');
  arrow.classList.toggle('education--arrow-rotate');
})

var items = document.querySelectorAll('.carousel--item');
var activeItem = 0;
var isEnabled = true;

function changeActiveItem (n) {
  activeItem = (n + items.length) % items.length;
}

function hideItem (direction) {
  isEnabled = false;
  items[activeItem].classList.add(direction);
  items[activeItem].addEventListener('animationend', function() {
    this.classList.remove('carousel--item-active', direction);
  });
}

function showItem (direction) {
  items[activeItem].classList.add('carousel--item-next', direction);
  items[activeItem].addEventListener('animationend', function() {
    this.classList.remove('carousel--item-next', direction);
    this.classList.add('carousel--item-active');
    isEnabled = true;
  });
}


function previousItem (n) {
  hideItem('to-right');
  changeActiveItem(n - 1);
  showItem('from-left');
}

function nextItem (n) {
  hideItem('to-left');
  changeActiveItem(n + 1);
  showItem('from-right');
}


document.querySelector('.carousel--control-prev').addEventListener('click', function () {
  if (isEnabled) {
    previousItem(activeItem);
  }
});

document.querySelector('.carousel--control-next').addEventListener('click', function () {
  if (isEnabled) {
    nextItem(activeItem);
  }
});

var swipeDetect = (el) => {
  var surface = el;
  var startX = 0;
  var startY = 0;
  var distX = 0;
  var distY = 0;

  var startTime = 0;
  var elapsedTime = 0;

  var threshold = 150;
  var resistant = 100;
  var allowedTime = 300;

  surface.addEventListener('mousedown', function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) > threshold && Math.abs(distY) <= resistant) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(activeItem);
          }
        }
        else {
          if (isEnabled) {
            nextItem(activeItem);
          }
        }
      }
    }

    e.preventDefault();
  });

  surface.addEventListener('touchstart', function (e) {
    if (e.target.classList.contains('carousel--control') || e.target.classList.contains('arrow')) {
      if (e.target.classList.contains('carousel--control-prev') || e.target.classList.contains('arrow-prev')) {
        if (isEnabled) {
          previousItem(activeItem);
        }
      }
      else if (e.target.classList.contains('carousel--control-next') || e.target.classList.contains('arrow-next')) {
        if (isEnabled) {
          nextItem(activeItem);
        }
      }
    }

    var touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('touchmove', function (e) {
    e.preventDefault();
  });

  surface.addEventListener('touchend', function (e) {
    var touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) > threshold && Math.abs(distY) <= resistant) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(activeItem);
          }
        }
        else {
          if (isEnabled) {
            nextItem(activeItem);
          }
        }
      }
    }

    e.preventDefault();
  });
}

var el = document.querySelector('.carousel');
swipeDetect(el);
