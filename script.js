const gameContainer = document.getElementById('game-container');
const character = document.getElementById('character');
let characterPosition = 285; // Posição inicial no eixo X
const characterSpeed = 15;

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.floor(Math.random() * (gameContainer.offsetWidth - 40)) + 'px';
    gameContainer.appendChild(obstacle);

    // Remove o obstáculo depois que ele sai da tela para otimizar o jogo
    setTimeout(() => {
        obstacle.remove();
    }, 3000);
}

// Cria um novo obstáculo a cada 1.5 segundos
setInterval(createObstacle, 1500);

function moveCharacter(event) {
    if (event.key === 'ArrowLeft' && characterPosition > 0) {
        characterPosition -= characterSpeed;
    } else if (event.key === 'ArrowRight' && characterPosition < gameContainer.offsetWidth - character.offsetWidth) {
        characterPosition += characterSpeed;
    }
    character.style.left = characterPosition + 'px';
}

document.addEventListener('keydown', moveCharacter);

function checkCollision() {
    const obstacles = document.querySelectorAll('.obstacle');
    const charRect = character.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obsRect = obstacle.getBoundingClientRect();
        
        if (
            charRect.left < obsRect.left + obsRect.width &&
            charRect.left + charRect.width > obsRect.left &&
            charRect.top < obsRect.top + obsRect.height &&
            charRect.top + charRect.height > obsRect.top
        ) {
            alert('Game Over! Tente de novo.');
            location.reload(); // Reinicia o jogo
        }
    });
}

// Verifica colisões a cada 50 milissegundos
setInterval(checkCollision, 50);