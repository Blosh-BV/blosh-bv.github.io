// Pong game code
const canvas = document.getElementById("pongGame");
const ctx = canvas.getContext("2d");

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 2,
    speedY: 2,
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }
};

// Update function to move the ball
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.draw();

    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with walls
    if (ball.y + ball.speedY > canvas.height - ball.radius || ball.y + ball.speedY < ball.radius) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x + ball.speedX > canvas.width - ball.radius || ball.x + ball.speedX < ball.radius) {
        ball.speedX = -ball.speedX;
    }

    requestAnimationFrame(update);
}

// Start the game
update();
