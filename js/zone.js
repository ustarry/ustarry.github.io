var entertainment_links = [
    {
        name: "星光自习室",
        url: "/zone/studyhall.html",
        description: "一个安静的自习室，适合学习和工作",
        icon: "bi-book"
    },
    {
        name: "星光扫雷",
        url: "/zone/mine.html",
        description: "经典的扫雷游戏，挑战你的智慧",
        icon: "bi-grid-3x3-gap"
    },
    {
        name: "星光记事本",
        url: "/zone/notebook.html",
        description: "一个简单的记事本，记录你的重要事项",
        icon: "bi-journal-text"
    },
    {
        name: "星光画板",
        url: "/zone/paint.html",
        description: "一个在线画板，释放你的创意",
        icon: "bi-palette"
    }
];

// 动态创建娱乐链接卡片
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.entertainment_container');
    container.innerHTML = ''; // 清空现有内容
    
    // 创建卡片
    entertainment_links.forEach(link => {
        const card = document.createElement('a');
        card.href = link.url;
        card.className = 'card';
        
        card.innerHTML = `
            <div class="icon">
                <i class="bi ${link.icon}"></i>
            </div>
            <div class="name">${link.name}</div>
            <div class="description">${link.description}</div>
        `;
        
        container.appendChild(card);
    });
    
});