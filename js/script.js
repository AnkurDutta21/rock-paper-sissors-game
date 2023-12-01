const toggleRulesBtn = document.querySelector('.rules-btn')
const closeRulesBtn = document.querySelector('.rules-close')
const applauseToggleBtn = document.querySelector('.applause-rules-btn')
const applauseCloseRulesBtn = document.querySelector('.applause-rules-close')
const rulesMenu = document.querySelector('.rules-menu')
const applauseRulesMenu = document.querySelector('.applause-rules-menu')
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
    resultHtml =  `<div class="game-wrp-next">
    <div class="user">
         <h3>YOU PICKED</h3>
        ${winner === 'user' ? `<div class="eclipse3"></div>
        <div class="eclipse2"></div>
        <div class="eclipse1"></div>`: ''}
        <button class="circle center ${user}">
            <img src="../assets/${user}.svg" alt="">
        </button>
    </div>
    <div class="result-text">
            ${winner === 'draw' ? `<h1>TIE UP</h1>`: `<h1>
            YOU ${winner === 'user' ?'WIN' : 'LOST'}
          </h1>
          <h3>
            AGAINST PC
          </h3>`}
            <button class="play-again">
              ${winner === 'draw'? 'REPLAY' : 'PLAY AGAIN'}
            </button>
    </div>
    <div class="computer">
         <h3>PC PICKED</h3>
         ${winner === 'computer'? `<div class="eclipse3"></div>
         <div class="eclipse2"></div>
         <div class="eclipse1"></div>`: ''}
        <button class="circle middle ${pc}">
            <img src="../assets/${pc}.svg" alt="">
        </button>
    </div>
</div>`

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
if (toggleRulesBtn && closeRulesBtn) {
  toggleRulesBtn.addEventListener('click', () => {
    rulesMenu.classList.remove('hidden')
  })

  closeRulesBtn.addEventListener('click', () => {
    rulesMenu.classList.add('hidden')
  })
} else if (applauseToggleBtn && applauseCloseRulesBtn) {
  applauseToggleBtn.addEventListener('click', () => {
    applauseRulesMenu.classList.remove('hidden')
  })

  applauseCloseRulesBtn.addEventListener('click', () => {
    applauseRulesMenu.classList.add('hidden')
  })
}


const nextToggle = () => {
  nextBtn.classList.remove('hidden-btn')
  toggleRulesBtn.style.right = '17%'
}