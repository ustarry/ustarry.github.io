// 生成彩色气球（覆盖在footer上方）
function createBalloons() {
    const container = document.querySelector('.celebration-content');
    if (!container) return;
    
    Object.assign(container.style, {
        position: 'relative',
        overflow: 'hidden',
        minHeight: '500px',
        zIndex: '10'
    });
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#96CEB4', '#E91E63', '#7B2CBF'];
    const balloonCount = 18;
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        const size = Math.random() * 35 + 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 90 + 5;
        const delay = Math.random() * 4;
        const duration = Math.random() * 5 + 7;
        const bottom = i % 3 === 0 ? `-${size * 0.5}px` : `-${size}px`;
        
        Object.assign(balloon.style, {
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            left: `${left}%`,
            bottom: bottom,
            animation: `float ${duration}s ease-in-out ${delay}s infinite`,
            zIndex: '12',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
        });
        
        const string = document.createElement('div');
        Object.assign(string.style, {
            position: 'absolute',
            width: '1px',
            height: `${size * 1.5}px`,
            backgroundColor: 'rgba(51, 51, 51, 0.5)',
            bottom: `-${size * 1.5}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '12'
        });
        
        balloon.appendChild(string);
        container.appendChild(balloon);
    }
}

// 生成彩带
function createRibbons() {
    const container = document.querySelector('.celebration-header');
    if (!container) return;
    
    Object.assign(container.style, {
        position: 'relative',
        overflow: 'hidden'
    });
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#96CEB4', '#E91E63', '#7B2CBF'];
    const ribbonCount = 8;
    
    for (let i = 0; i < ribbonCount; i++) {
        const ribbon = document.createElement('div');
        ribbon.classList.add('ribbon');
        
        const width = Math.random() * 8 + 6;
        const height = Math.random() * 60 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 90 + 5;
        const top = Math.random() * 30;
        const delay = Math.random() * 2;
        
        Object.assign(ribbon.style, {
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: color,
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            transformOrigin: 'top center',
            animation: `wave 3s ease-in-out ${delay}s infinite`
        });
        
        container.appendChild(ribbon);
    }
}

// 生成彩屑
function createConfetti() {
    const confettiContainer = document.createElement('div');
    Object.assign(confettiContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '10',
        overflow: 'hidden'
    });
    document.body.appendChild(confettiContainer);
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#96CEB4', '#E91E63', '#7B2CBF', '#FFFFFF'];
    const confettiCount = 120;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const size = Math.random() * 6 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const rotation = Math.random() * 360;
        const delay = Math.random() * 8;
        const duration = Math.random() * 8 + 8;
        
        Object.assign(confetti.style, {
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            position: 'absolute',
            left: `${left}%`,
            top: `-${size}px`,
            transform: `rotate(${rotation}deg)`,
            animation: `fall ${duration}s linear ${delay}s infinite`
        });
        
        confettiContainer.appendChild(confetti);
    }
}

// 替换为图片显示（保持原蛋糕位置和响应式效果）
function renderCakeImage() {
    const container = document.querySelector('.cake-container');
    if (!container) return;
    
    // 设置容器样式，保持原蛋糕的尺寸和位置特性
    Object.assign(container.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '600px', // 保持原蛋糕容器最大宽度
        height: '500px',   // 保持原蛋糕高度
        margin: '0 auto 4rem',
        overflow: 'hidden'
    });
    
    // 创建图片元素
    const cakeImage = document.createElement('img');
    Object.assign(cakeImage, {
        src: '/image/cake.png', // 临时图片链接
        alt: '星光工作室5周年庆典蛋糕',
        loading: 'eager'
    });
    
    // 设置图片样式，确保与原蛋糕位置和响应式效果一致
    Object.assign(cakeImage.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // 居中显示
        maxWidth: '90%',  // 不超过容器宽度
        maxHeight: '90%', // 不超过容器高度
        objectFit: 'contain', // 保持图片比例，不拉伸
        zIndex: '2' // 确保在气球下方，彩带上方
    });
    
    // 添加响应式调整
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .cake-container {
                height: 400px !important; /* 移动端保持原蛋糕高度 */
            }
            
            .cake-container img {
                max-width: 95% !important;
                max-height: 95% !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 清空容器并添加图片
    container.innerHTML = '';
    container.appendChild(cakeImage);
}

// 初始化动画元素
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflowX = 'hidden';
    
    // 确保footer层级低于气球
    const footer = document.getElementById('footer');
    if (footer) footer.style.zIndex = '5';
    
    // 先渲染蛋糕图片，再创建其他元素
    renderCakeImage();
    setTimeout(createBalloons, 300);
    setTimeout(createRibbons, 600);
    setTimeout(createConfetti, 900);
});

// 添加全局动画关键帧定义
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-30px) rotate(5deg); }
        100% { transform: translateY(0) rotate(0deg); }
    }
    
    @keyframes wave {
        0% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
        100% { transform: rotate(-5deg); }
    }
    
    @keyframes fall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 0.9; }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    .flame {
        transform-origin: center bottom;
        animation: flicker 3s infinite alternate;
    }
    
    @keyframes flicker {
        0% { transform: rotate(-2deg) scale(1); }
        25% { transform: rotate(2deg) scale(1.05); }
        50% { transform: rotate(-1deg) scale(0.98); }
        75% { transform: rotate(1deg) scale(1.02); }
        100% { transform: rotate(-2deg) scale(1); }
    }
`;
document.head.appendChild(style);
