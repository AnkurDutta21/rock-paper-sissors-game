const toggleRulesBtn = document.querySelector('.rules-btn')
const closeRulesBtn = document.querySelector('.rules-close')
const rulesMenu = document.querySelector('.rules-menu')
const gameBtn = document.querySelectorAll('.circle')
const nextBtn = document.querySelector('.next-btn')

const optionsArr = ['rock', 'paper', 'sissors']

// Game logic part
const computerChoice = (optionsArr) => {
  const random = Math.floor(Math.random() * optionsArr.length)
  const computerChoice = optionsArr[random]
  return computerChoice
}

gameBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const userSelection = btn.value
    setTimeout(() => {
      isWinner(userSelection, computerChoice(optionsArr))   
    }, 500);
    console.log(userSelection, computerChoice(optionsArr), '-------------------------------------')
  })
})

let winner = ''

const isWinner = (userSelection, computerChoice) => {
  switch (true) {
    case (userSelection === 'rock' && computerChoice === 'paper') ||
      (userSelection === 'sissors' && computerChoice === 'rock') ||
      (userSelection === 'paper' && computerChoice === 'sissors'):
      winner = 'computer'
      localSetData(winner)
      resultScreen(userSelection, computerChoice, winner)
      playAgainHandler()
      break
    case userSelection === computerChoice:
      winner = 'draw'
      resultScreen(userSelection, computerChoice, winner)
      playAgainHandler()
      break
    default:
      winner = 'user'
      resultScreen(userSelection, computerChoice, winner)
      localSetData(winner)
      playAgainHandler()
      nextToggle()
  }
}

const computerScore = document.querySelector('#computerScore')
const userScore = document.querySelector('#userScore')

const localSetData = (player) => {
  let currentScore = parseInt(localStorage.getItem(player)) || 0
  localStorage.setItem(player, currentScore + 1)
}

if (computerScore && userScore) {
  computerScore.innerText = localStorage.getItem('computer') || 0
  userScore.innerText = localStorage.getItem('user') || 0
} else {
  console.log('error')
}

// Result screen
const gameInterface = document.querySelector('.game-interface')

const resultScreen = (user, pc, winner) => {
  let resultHtml = ''
  if (winner === 'draw') {
    resultHtml = `<div class="result-wrp">
      <div class="user">
        <h3 class="user-selection">YOU PICKED</h3>
        <button class="circle middle ${user}">
          <img src="../assets/${user}.svg" alt="">
        </button>
      </div>
      <div class="result-text-tie">
        <h1>TIE UP</h1>
        <button class="play-again">
          REPLAY
        </button>
      </div>
      <div class="computer">
        <h3 class="pc-selection">PC PICKED</h3>
        <button class="circle center ${pc}">
          <img src="../assets/${pc}.svg" alt="">
        </button>
      </div>
    </div>`
  } else {
    let addUserHtml = `<div class="ellipse"></div>
      <div class="ellipse-2"></div>
      <div class="ellipse-3"></div>`
    let addComputerHtml = `<div class="ellipse-computer"></div>
      <div class="ellipse-2-computer"></div>
      <div class="ellipse-3-computer"></div>`
    resultHtml = `<div class="result-wrp">
        <div class="user">
          <h3 class="user-selection">YOU PICKED</h3>
          ${winner === 'user' ? addUserHtml : ''}
          <button class="circle middle ${user}">
            <img src="../assets/${user}.svg" alt="">
          </button>
        </div>
        <div class="${winner === 'computer'? 'result-text-computer' : 'result-text'}">
          <h1>
            YOU ${winner === 'user' ? 'WIN' : 'LOST'}
          </h1>
          <h3>
            AGAINST PC
          </h3>
          <button class="play-again">
            PLAY AGAIN
          </button>
        </div>
        <div class="computer">
          <h3 class="pc-selection">PC PICKED</h3>
          ${winner === 'computer' ? addComputerHtml : ''}
          <button class="circle center ${pc}">
            <img src="../assets/${pc}.svg" alt="">
          </button>
        </div>
      </div>`
  }

  if (resultHtml !== '') {
    gameInterface.innerHTML = resultHtml
  } else {
    console.log('error')
  }
}

// Reset game
const playAgainHandler = () => {
  const playAgainBtn = document.querySelector('.play-again')
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      location.reload()
    })
  } else {
    console.log('error')
  }
}

// Toggle functionalities
toggleRulesBtn.addEventListener('click', () => {
  rulesMenu.classList.remove('hidden')
})

closeRulesBtn.addEventListener('click', () => {
  rulesMenu.classList.add('hidden')
})

const nextToggle = () => {
  nextBtn.classList.remove('hidden-btn')
  toggleRulesBtn.style.right = '17%'
}