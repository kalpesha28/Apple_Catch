// Select the basket and ball elements
const basket = document.getElementById('basket');
const ball = document.getElementById('ball');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');

let score = 0;
let lives = 3;
let ballSpeed = 5;  // Speed at which the ball falls

// Move the basket left and right
document.addEventListener('keydown', (event) => {
    let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));

    if (event.key === 'ArrowLeft' && basketLeft > 0) {
        basket.style.left = basketLeft - 15 + 'px';
    }

    if (event.key === 'ArrowRight' && basketLeft < 320) { // Keep within game area width
        basket.style.left = basketLeft + 15 + 'px';
    }
});

// Ball falling and checking for collision with the basket
function moveBall() {
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'));
    let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));

    // Ball falling
    ball.style.top = ballTop + ballSpeed + 'px';

    // Check if the ball reaches the bottom (basket level)
    if (ballTop >= 560) {
        if (ballLeft >= basketLeft && ballLeft <= basketLeft + 120) { // Adjusted basket width
            // Ball is caught by the basket
            score++;
            scoreElement.innerText = 'Score: ' + score;
            resetBall();  // Reset ball position for another round
        } else {
            // Ball missed the basket -> Reduce lives
            lives--;
            livesElement.innerText = 'Lives: ' + lives;
            resetBall();  // Reset ball position for another round

            // Check for game over
            if (lives <= 0) {
                gameOver();
            }
        }
    }

    // Keep moving the ball
    requestAnimationFrame(moveBall);
}

// Reset the ball to the top after being caught or missed
function resetBall() {
    ball.style.top = '0';
    ball.style.left = Math.floor(Math.random() * (360 - 50)) + 'px';  // Randomize horizontal position
}

// Game Over logic
function gameOver() {
    alert('Game Over! Your score is: ' + score);
    resetGame();  // Reset the game
}

// Reset the entire game
function resetGame() {
    score = 0;
    lives = 3;
    scoreElement.innerText = 'Score: ' + score;
    livesElement.innerText = 'Lives: ' + lives;
    resetBall();  // Reset the ball for a fresh start
}

// Start the game
resetBall();
moveBall();




















