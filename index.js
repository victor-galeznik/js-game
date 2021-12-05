var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = [
   'linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)',
   'linear-gradient(to right, #6441a5, #2a0845)',
   'linear-gradient(to right, #43cea2, #185a9d)',
   'linear-gradient(to right, #360033, #0b8793)',
   'linear-gradient(to right, #d38312, #a83279)',
   'linear-gradient(to right, #73c8a9, #373b44)',
   'linear-gradient(to right, #fdfc47, #24fe41)',
   'linear-gradient(to right, #83a4d4, #b6fbff)',
   'linear-gradient(to right, #fe8c00, #f83600)'
]
var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
   $el.classList.remove('hide')
}

function hide($el) {
   $el.classList.add('hide')
}

function startGame() {
   score = 0
   setGameTime()
   $gameTime.setAttribute('disabled', 'true')

   isGameStarted = true
   $game.style.backgroundColor = '#fff'
   hide($start)

   var interval = setInterval(function () {
      var time = parseFloat($time.textContent)
      if (time <= 0) {
         clearInterval(interval)
         endGame()
      } else {
         $time.textContent = (time - 0.1).toFixed(1)
      }
   }, 100)
   renderBox()
}

function setGameScore() {
   $result.textContent = score.toString()
}

function setGameTime() {
   var time = +$gameTime.value
   $time.textContent = time.toFixed(1)
   show($timeHeader)
   hide($resultHeader)
}

function endGame() {
   isGameStarted = false
   setGameScore()
   $gameTime.removeAttribute('disabled')
   show($start)
   $game.innerHTML = ''
   $game.style.backgroundColor = 'rgba(255, 0, 241, 0.4)'
   hide($timeHeader)
   show($resultHeader)
}

function handleBoxClick(event) {
   if (!isGameStarted) {
      return
   }

   if (event.target.dataset.box) {
      score++
      renderBox()
   }
}

function renderBox() {
   $game.innerHTML = ''
   var box = document.createElement('div')
   var boxSize = getRandom(30, 100)
   var gameSize = $game.getBoundingClientRect()
   var maxTop = gameSize.height - boxSize
   var maxLeft = gameSize.width - boxSize
   var randomColorIndex = getRandom(0, colors.length)

   box.style.height = box.style.width = boxSize + 'px'
   box.style.borderRadius = '50%'
   box.style.border = '1px solid gray'
   box.style.position = 'absolute'
   box.style.backgroundImage = colors[randomColorIndex]
   box.style.top = getRandom(0, maxTop) + 'px'
   box.style.left = getRandom(0, maxLeft) + 'px'
   box.style.cursor = 'pointer'
   box.setAttribute('data-box', 'true')

   $game.insertAdjacentElement('afterbegin', box)
}
function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min) + min)
}