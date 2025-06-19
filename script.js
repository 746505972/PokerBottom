// 扑克牌花色和点数
const suits = ['♥', '♦', '♣', '♠', 'Joker']; // 花色（Joker为特殊花色）
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
  'Big Joker', 'Small Joker'];

function generateRandomCards(count) {
  const cards = [];
  const jokers = ['Big Joker', 'Small Joker']; // 待生成的大王和小王
  for (let i = 0; i < count; i++) {
    let suit, rank, color;

    // 10% 概率生成 Joker（且确保大王和小王不重复）
    if (Math.random() < 0.5 && jokers.length > 0) {
      rank = jokers.pop(); // 从待生成列表中取出一个 Joker
      suit = 'Joker';
      color = rank === 'Small Joker' ? 'text-black' : 'text-red-600'; // 大王红色，小王黑色
    } else {
      suit = suits[Math.floor(Math.random() * 4)]; // 普通花色（♥♦♣♠）
      rank = ranks[Math.floor(Math.random() * 13)]; // 普通点数（A~K）
      color = (suit === '♥' || suit === '♦') ? 'text-red-600' : 'text-black';
    }

    cards.push({ suit, rank, color });
  }
  return cards;
}

// 渲染扑克牌（带堆叠效果）
function renderCards(cards) {
  const container = document.getElementById('card-container');
  container.innerHTML = '';

  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = `card absolute w-24 h-36 bg-white rounded-md shadow-lg ${card.color} cursor-pointer`;
    cardElement.style.left = `${index * 30}px`;
    cardElement.style.zIndex = index;

    if (card.suit === 'Joker') {
      // Joker 牌（大王或小王）
      const isBigJoker = card.rank === 'Big Joker';
      cardElement.innerHTML = `
        <div class="absolute top-1 left-1 text-sm font-bold">
          J<br>O<br>K<br>E<br>R
        </div>
        <div class="absolute inset-0 flex items-center justify-center text-5xl">
          🃏
        </div>
        <div class="absolute bottom-1 right-1 text-sm font-bold transform rotate-180">
          J<br>O<br>K<br>E<br>R
        </div>
      `;
    } else {
      // 普通牌
      cardElement.innerHTML = `
        <div class="absolute top-1 left-1 text-lg font-bold">
          ${card.rank}<br>${card.suit}
        </div>
        <div class="absolute inset-0 flex items-center justify-center text-5xl">
          ${card.suit}
        </div>
        <div class="absolute bottom-1 right-1 text-lg font-bold transform rotate-180">
          ${card.rank}<br>${card.suit}
        </div>
      `;
    }

    cardElement.addEventListener('click', () => {
      cardElement.classList.toggle('selected');
    });

    container.appendChild(cardElement);
  });
}

// 初始化
// 点击生成按钮时，随机生成5~8张牌
document.getElementById('generate').addEventListener('click', () => {
  const count = Math.floor(Math.random() * 4) + 5; // 生成5、6、7、8中的随机数
  const randomCards = generateRandomCards(count);
  renderCards(randomCards);
});
// 默认加载时生成一次
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generate').click();
});