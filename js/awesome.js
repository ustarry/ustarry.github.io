// 从ESM模块导入marked
import { marked } from '/js/marked.js';

const member_info = [
    {
        id: "kaikaibenkai",
        name: "凯凯本凯",
        role: "工作室室长，技术爱好者",
        desc: "星光工作室创始人，热爱编程与地图制作",
        qqid: 2710522092 
    },
    {
        id: "anan",
        name: "安安",
        role: "工作室副室长,官方社区组长",
        desc: "全身心投入迷你世界文创，有丰富的社区管理经验，曾管理了70万人社区",
        qqid: 3260922891,
    },
    {
        id: "leyao",
        name: "乐瑶",
        role: "自媒体创作者，优秀管理员",
        desc: "创作高质量迷你世界相关视频，热爱分享与交流",
        qqid: 23963743,
    },
    {
        id: "jijinlvmei",
        name: "嵇金缕梅",
        role: "智囊团，文创创作者，社区管理",
        desc: "积极鉴赏优秀地图，发布文创作品，将迷你世界社区建设得很好",
        qqid:  1091321599,
    },
    {
        id: "cat",
        name: "喵喵",
        role: "智囊团，文创创作者，社区管理",
        desc: "积极爆料新版本更新内容，热心帮助社区成员，推动社区发展",
        qqid: 1522723293,
    },
    {
        id: "mengmeng",
        name: "梦梦",
        role: "编程爱好者，优秀玩法创作者",
        desc: "热爱前端开发与设计，很有上进心，创作了多个爆款地图",
        qqid: 3224815186,
    },
    {
        id: "yeshui",
        name: "夜水",
        role: "编程爱好者，优秀玩法创作者",
        desc: "热爱编程，近期研究象棋AI，还创作出了精选地图，深受玩家喜爱",
        qqid: 2820795095,
    },
    {
        id: "qingyuan",
        name: "清圆",
        role: "编程爱好者，开发者好导师",
        desc: "热爱玩法创作与编程，耐心地解答其他成员的迷你世界游戏问题，其象棋大赛地图斩获精选",
        qqid: 1138621663,
    },
    {
        id: "qingwu",
        name: "清芜",
        role: "编程爱好者",
        desc: "热爱编程，喜欢造轮子",
        qqid: 594684895,
    },
    {
        id: "jiujianguixian",
        name: "九剑归仙",
        role: "优秀玩法创作者", 
        desc: "热爱玩法地图创作，创作出多张精彩地图，他的微缩作品因高质量赢得了官方的精美礼物",
        qqid: 3072455581,
    },
    {
        id: "xiaoye",
        name: "小叶",
        role: "优秀玩法创作者",
        desc: "优秀音乐地图创作者，运用代码在迷你世界实演奏各种动听音乐",
        qqid: 1983915463,
    },
    {
        id: "greenpoem",
        name: "绿钻诗云",
        role: "优秀玩法创作者",
        desc: "热爱编程与玩法设计，快速建筑出优秀的建筑，赢得玩家一致赞同",
        qqid: 3562612927,
    },
];

// 随机排序（保持前两位不变）
let index = member_info.length;
while (index > 2)
{
    const randomIndex = Math.floor(Math.random() * (index - 2)) + 2;
    [member_info[randomIndex], member_info[index - 1]] = [member_info[index - 1], member_info[randomIndex]];
    index--;
}

// 获取所有唯一的角色
function getUniqueRoles() {
    const roles = new Set();
    member_info.forEach(member => {
        // 处理包含多个角色的情况
        const memberRoles = member.role.split(/,|，/).map(role => role.trim());
        memberRoles.forEach(role => roles.add(role));
    });
    return Array.from(roles).sort();
}

// 初始化筛选下拉菜单
function initRoleFilter() {
    const filter = document.getElementById('roleFilter');
    if (!filter) return;
    
    const uniqueRoles = getUniqueRoles();
    uniqueRoles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        filter.appendChild(option);
    });
    
    // 添加筛选事件监听
    filter.addEventListener('change', (e) => {
        filterMembers(e.target.value);
    });
}

// 筛选成员
function filterMembers(role) {
    const container = document.getElementById('membersContainer');
    if (!container) return;
    
    const cards = container.querySelectorAll('.member-card');
    
    cards.forEach(card => {
        const memberId = card.dataset.id;
        const member = member_info.find(m => m.id === memberId);
        
        if (role === 'all') {
            card.style.display = 'block';
        } else {
            // 检查成员是否包含目标角色（支持多角色）
            const memberRoles = member.role.split(/,|，/).map(r => r.trim());
            const hasRole = memberRoles.includes(role);
            card.style.display = hasRole ? 'block' : 'none';
        }
    });
}

// 渲染成员卡片并暴露到window对象
window.renderMemberCards = function() {
    const container = document.getElementById('membersContainer');
    if (!container) return;
    container.innerHTML = ''; // 清空容器
    
    member_info.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.dataset.id = member.id; // 添加id数据属性
        
        // 使用QQ头像URL，添加懒加载属性
        const avatarUrl = `https://q1.qlogo.cn/g?b=qq&nk=${member.qqid}&s=640`;
        
        card.innerHTML = `
            <div class="member-avatar">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23f0f0f0' opacity='0.2'/%3E%3C/svg%3E" 
                     data-src="${avatarUrl}" 
                     alt="${member.name}的头像" 
                     class="avatar-img lazy-load">
            </div>
            <h3 class="member-name">${member.name}</h3>
            <p class="member-role">${member.role}</p>
            <p class="member-desc">${member.desc}</p>
        `;
        
        // 添加点击事件，支持触摸设备
        card.addEventListener('click', () => openMemberModal(member.id));
        // 为触摸设备添加额外的样式反馈
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
        
        container.appendChild(card);
    });
    
    // 初始化懒加载
    initLazyLoading();
};

// 初始化图片懒加载
function initLazyLoading() {
    // 检查浏览器是否原生支持懒加载
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.loading = 'lazy';
        });
    } else {
        // 浏览器不支持时使用IntersectionObserver实现懒加载
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy-load').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 打开成员详情对话框
function openMemberModal(memberId) {
    const modalOverlay = document.getElementById('memberModal');
    const modalContent = document.getElementById('modalContent');
    
    // 显示加载状态
    modalContent.innerHTML = '<p style="text-align: center; color: white;">加载中...</p>';
    modalOverlay.classList.add('active');
    
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
    
    // 加载并解析Markdown文件
    fetch(`/awesome_info/${memberId}.md`)
        .then(response => {
            if (!response.ok) {
                throw new Error('该成员很优秀但是比较低调，没有留下任何信息~');
            }
            return response.text();
        })
        .then(markdown => {
            // 使用新版本marked解析Markdown
            modalContent.innerHTML = marked.parse(markdown);
            // 对模态框内的图片也应用懒加载
            initLazyLoading();
        })
        .catch(error => {
            modalContent.innerHTML = `<p style="color: #ff4444; text-align: center;">${error.message}</p>`;
        });
}

// 关闭对话框
function closeMemberModal() {
    const modalOverlay = document.getElementById('memberModal');
    modalOverlay.classList.remove('active');
    // 恢复背景滚动
    document.body.style.overflow = '';
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('memberModal');
    const closeModal = document.getElementById('closeModal');
    
    // 初始化角色筛选
    initRoleFilter();
    
    // 点击关闭按钮
    closeModal.addEventListener('click', closeMemberModal);
    
    // 点击对话框外部关闭
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeMemberModal();
        }
    });
    
    // 按ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeMemberModal();
        }
    });
    
    // 确保导航和页脚高度正确计算，消除间隙
    setTimeout(() => {
        const navHeight = document.getElementById('nav').offsetHeight;
        const footerHeight = document.getElementById('footer').offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
        document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    }, 100);
});