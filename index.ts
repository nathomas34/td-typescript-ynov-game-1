import './style.css';

const cardsArray: { name: string; img: string }[] = [
  {
    name: 'shell',
    img: 'img/blueshell.png',
  },
  {
    name: 'star',
    img: 'img/star.png',
  },
  {
    name: 'bobomb',
    img: 'img/bobomb.png',
  },
  {
    name: 'mario',
    img: 'img/mario.png',
  },
  {
    name: 'luigi',
    img: 'img/luigi.png',
  },
  {
    name: 'peach',
    img: 'img/peach.png',
  },
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

let firstGuess: string | undefined = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game') as HTMLElement;
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach((item) => {
  var { name, img } = item;

  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(https://cdn.jsdelivr.net/gh/taniarascia/memory@master/${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach((item) => {
    item.classList.remove('selected');
  });
};

grid.addEventListener('click', (event) => {
  const clicked = event.target as HTMLElement;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.classList.contains('selected') ||
    clicked.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count = count + 1;
    if (count === 1) {
      firstGuess = clicked.parentElement?.dataset.name;
      clicked.parentElement?.classList.add('selected');
    } else {
      secondGuess = clicked.parentElement?.dataset.name;
      clicked.parentElement?.classList.add('selected');
    }
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach((card) => {
    card.classList.add('match');
  });
};
