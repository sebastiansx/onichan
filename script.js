// Efectos de entrada para elementos cuando aparecen en el viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar observador a las tarjetas de razones
document.addEventListener('DOMContentLoaded', () => {
    // Animaciones de entrada para las tarjetas
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Scroll suave para el indicador
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.reasons-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Crear corazones flotantes aleatorios
    createFloatingHearts();
    
    // Efectos de hover adicionales para las tarjetas
    addCardHoverEffects();
    
    // Crear estrellas fugaces ocasionales
    createShootingStars();
    
    // Efectos de escritura animada
    animateTextTyping();
});

// Función para crear corazones flotantes aleatorios
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💝';
        heart.className = 'floating-heart';
        
        // Estilos para el corazón flotante
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '0.7';
        heart.style.animation = 'floatUp 4s linear forwards';
        
        document.body.appendChild(heart);
        
        // Remover el corazón después de la animación
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }, 3000); // Crear un corazón cada 3 segundos
}

// Agregar estilos CSS dinámicamente para los corazones flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shootingStar {
        0% {
            transform: translateX(-100px) translateY(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateX(calc(100vw + 100px)) translateY(-200px);
            opacity: 0;
        }
    }
    
    .shooting-star {
        position: fixed !important;
        color: #ffd700 !important;
        font-size: 20px !important;
        z-index: 1000 !important;
        pointer-events: none !important;
        animation: shootingStar 3s linear forwards !important;
    }
    
    .sparkle-effect {
        position: absolute;
        pointer-events: none;
        font-size: 16px;
        color: #ff6b9d;
        animation: sparkleFloat 1.5s ease-out forwards;
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Función para crear estrellas fugaces
function createShootingStars() {
    setInterval(() => {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.className = 'shooting-star';
        star.style.top = Math.random() * (window.innerHeight / 2) + 'px';
        star.style.left = '-100px';
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 3000);
    }, 8000); // Crear una estrella fugaz cada 8 segundos
}

// Efectos adicionales de hover para las tarjetas
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.reason-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Crear efecto de chispas alrededor de la tarjeta
            createSparkles(card);
        });
        
        card.addEventListener('click', () => {
            // Efecto de pulso al hacer clic
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'cardPulse 0.6s ease-out';
            }, 10);
        });
    });
}

// Crear efecto de chispas
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.className = 'sparkle-effect';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }, i * 100);
    }
}

// Agregar animación de pulso para las tarjetas
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes cardPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(additionalStyle);

// Efecto de escritura animada para títulos
function animateTextTyping() {
    const title = document.querySelector('.main-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #ff6b9d';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Efectos de parallax suave para el fondo
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.stars');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Crear partículas de amor al hacer scroll
let ticking = false;
function updateParticles() {
    // Crear partículas ocasionales durante el scroll
    if (Math.random() > 0.95) {
        createLoveParticle();
    }
    ticking = false;
}

function createLoveParticle() {
    const particles = ['💕', '💖', '💗', '💘', '💙', '💜', '🤍', '❤️'];
    const particle = document.createElement('div');
    particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '100vh';
    particle.style.fontSize = Math.random() * 15 + 10 + 'px';
    particle.style.zIndex = '999';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'floatUp 3s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParticles);
        ticking = true;
    }
});

// Efecto de brillo en los iconos de las tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.card-icon i');
    icons.forEach(icon => {
        setInterval(() => {
            icon.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 157, 0.8))';
            setTimeout(() => {
                icon.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.3))';
            }, 1000);
        }, 3000 + Math.random() * 2000);
    });
});

// Mensaje especial oculto (Easter egg)
let clickCount = 0;
document.addEventListener('click', (e) => {
    if (e.target.closest('.main-title')) {
        clickCount++;
        if (clickCount === 5) {
            createSpecialMessage();
            clickCount = 0;
        }
    }
});

function createSpecialMessage() {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(255, 107, 157, 0.95)';
    message.style.color = 'white';
    message.style.padding = '2rem';
    message.style.borderRadius = '20px';
    message.style.textAlign = 'center';
    message.style.fontSize = '1.2rem';
    message.style.fontFamily = 'Dancing Script, cursive';
    message.style.zIndex = '10000';
    message.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    message.style.animation = 'fadeInScale 0.5s ease-out';
    message.innerHTML = `
        <h3>💝 Mensaje Secreto 💝</h3>
        <p>¡Cada click en mi corazón es un latido más de amor por ti!</p>
        <button onclick="this.parentElement.remove()" style="
            background: white; 
            color: #ff6b9d; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 15px; 
            margin-top: 1rem;
            cursor: pointer;
            font-family: inherit;
        ">❤️ Cerrar ❤️</button>
    `;
    
    document.body.appendChild(message);
}

// Añadir animación para el mensaje especial
const secretStyle = document.createElement('style');
secretStyle.textContent = `
    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(secretStyle); 