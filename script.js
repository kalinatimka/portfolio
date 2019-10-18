var expansionPanel = document.querySelector('.education--wrapper');
var schoolTime = document.querySelector('.education--time');
var arrow = document.querySelector('.education--arrow');

expansionPanel.addEventListener('click', function() {
  schoolTime.classList.toggle('education--time-active');
  arrow.classList.toggle('education--arrow-rotate');
})
