const socket = io();
const rollButton = document.getElementById('rollButton');
const refreshButton = document.getElementById('refreshButton');
const digit1Element = document.getElementById('digit1');
const digit2Element = document.getElementById('digit2');
const digit3Element = document.getElementById('digit3');

// Define digits array at the top
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

rollButton.addEventListener('click', () => {
  socket.emit('roll');
});

refreshButton.addEventListener('click', () => {
  socket.emit('refresh');
});

socket.on('updateDisplay', ({ digit1, digit2, digit3 }) => {
  updateDigit(digit1Element, digit1);
  updateDigit(digit2Element, digit2);
  updateDigit(digit3Element, digit3);
});

socket.on('resetDisplay', () => {
  digit1Element.textContent = '0';
  digit2Element.textContent = '0';
  digit3Element.textContent = '0';
});

// Updated animation function
function updateDigit(digitElement, targetDigit, digitInterval = 50) {
  let currentIndex = 0;
  let startTime = null;
  let lastDigitChangeTime = null;

  function animate(timestamp) {
    if (!startTime) {
      startTime = timestamp;
      lastDigitChangeTime = timestamp;
    }

    const elapsedTime = timestamp - startTime;
    const timeSinceLastDigitChange = timestamp - lastDigitChangeTime;

    // Check if it's time to change to the next digit
    if (timeSinceLastDigitChange >= digitInterval) {
      digitElement.textContent = digits[currentIndex];
      currentIndex = (currentIndex + 1) % digits.length;
      lastDigitChangeTime = timestamp;
    }

    // Continue animation if less than 3 seconds have passed
    if (elapsedTime < 3000) {
      requestAnimationFrame(animate);
    } else {
      // Set final digit
      digitElement.textContent = targetDigit;
    }
  }

  requestAnimationFrame(animate);
}










