var cur_tab = 0;

var showed_menu = true;
function show_pop_up_menu(menu)
{
    var length = menu.children.length * 50;
    var beg;
    var step;
    var end;
    if (showed_menu)
    {
        beg = 0;
        step = 25;
        end = length;
    }
    else
    {
        beg = length;
        step = -25;
        end = 0;
    }

    menu.style = `height: ${beg}px;`;
    var id = setInterval(()=>
    {
        
        if (showed_menu)
        {
            menu.classList.remove("desktop_showed");
        }
        else
        {
            // menu.classList.add("desktop_showed");
        }
        if (beg == end)
        {
            if (!showed_menu)
            {
                menu.classList.add("desktop_showed");
            }
            showed_menu = !showed_menu;
            clearTimeout(id);
        }
        else
        {
            beg += step;
            menu.style = `height: ${beg}px;`;
        }
    }, 15)

}


window.addEventListener("scroll", () =>
{
    var nav = document.getElementById("nav");
    if (window.scrollY < document.getElementById("container").offsetTop - 50)
    {
        nav.className = "transparent_nav";
    }
    else
    {
        nav.className = "colored_nav";
    }
})

function init_lazy_image()
{
    var images = document.getElementsByTagName("img");
    function callback(entries) {
        for (let i of entries) {
            if (i.isIntersecting) {
                let img = i.target;
                let trueSrc = img.getAttribute("data-src");
                if (trueSrc) {
                    img.classList.add("show_later");
                    img.setAttribute("src", trueSrc);
                }
                observer.unobserve(img);
            }
        }
    }
    const observer = new IntersectionObserver(callback);
    for (let i of images) {
        observer.observe(i);
    }

    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var image = entry.target;
                image.src = image.dataset.src;
                image.classList.remove("lazy");
                image.classList.add("show_later");
                imageObserver.unobserve(image);
            }
        });
    });

    lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
    });
}

function ui_show_new_tab(tab)
{
    cur_tab = tab;
    var card_container = document.getElementById("card_container");
    var children = card_container.children;
    for (var i = 0; i < children.length; ++i)
    {
        children[i].className = "item";
    }
    if (tab == children.length)
    {
        cur_tab = 0;
    }
    else if (tab == -1)
    {
        cur_tab = children.length - 1;
    }
    children[cur_tab].className = "item active";
    children[cur_tab == 0 ? children.length - 1 : cur_tab - 1].className = "item prev";
    children[cur_tab == children.length - 1 ? 0 : cur_tab + 1].className = "item next";
}

window.addEventListener("DOMContentLoaded", ()=>
{
    init_lazy_image();
})


function set_nav_info()
{
    var nav = document.getElementById("nav");
    nav.innerHTML = `
        <div class="left">
            <img src="https://s1.ax1x.com/2023/01/13/pSKE2kT.png" alt="Logo Not Found">
        </div>
        <ul class="right desktop_showed">
            <li><a href="/">首页</a></li>
            <li><a href="/about.html">关于</a></li>
            <li><a href="/zone.html">领地</a></li>
        </ul>
        <i class="bi bi-list mobile_showed" onclick="show_pop_up_menu(this.parentNode.children[1])"></i>
    `
}

function set_footer_info()
{
    var footer = document.getElementById("footer");
    footer.innerHTML = `
            <!-- studio view -->
        <div class="studio_view">
            <a href="/index.html" id="logo"><img src="https://pic.imgdb.cn/item/64e09e26661c6c8e54651839.png"></a>
            <h4>期待与漫天繁星的相遇！</h4>
        </div>
        <!-- link view -->
        <div class="link_view">
            <dl>
                <dt>关于星光</dt>
                <dd><a href="/about.html">关于我们</a></dd>
                <dd><a href="/about.html#careers">生涯</a></dd>
                <dd><a href="/about.html#contact">联系我们</a></dd>
                <dd><a href="/about.html#recruitment">招贤纳士</a></dd>
                <dd><a href="/about.html#sustainability">可持续发展</a></dd>
            </dl>
            <dl>
                <dt>星光产品</dt>
                <dd><a href="https://github.com/Dev-Mini/cli">Dev Mini Cli</a></dd>
                <dd><a href="https://github.com/Starlight-Dev-Team/mnLua">MNLUA</a></dd>
                <dd><a href="https://mimeng.fun/">迷梦工坊</a></dd>
            </dl>
            <dl>
                <dt>星光特色</dt>
                <dd><a href="/zone.html">领地</a></dd>
                <dd><a href="/blogs">博客</a></dd>
                <dd><a href="#">媒体</a></dd>
                <dd><a href="https://pd.qq.com/s/9xlc1hut2">社区</a></dd>
            </dl>
            <dl>
                <dt>友情链接</dt>
                <dd><a target="_blank" href="https://mc.mimeng.top/">梦辰の小窝</a></dd>
                <dd><a target="_blank" href="https://www.imitoy.top/">清圆的院子</a></dd>
                <dd><a target="_blank" href="https://ycbrmsn.com/">莫小仙的小仙居</a></dd>
            </dl>
        </div>
        <!-- media view -->
        <div class="media_view clear">
            <ul>
                <li><a target="_blank" href="https://www.ixigua.com/home/1874031348815676/?source=pgc_author_profile&amp;list_entrance=anyVideo"><img data-src="//sf1-cdn-tos.douyinstatic.com/obj/eden-cn/lpqpflo/ixigua_favicon.ico" src="//sf1-cdn-tos.douyinstatic.com/obj/eden-cn/lpqpflo/ixigua_favicon.ico"></a></li>
                <li><a class="bi bi-tiktok" target="_blank" href="https://www.douyin.com/user/MS4wLjABAAAAl0WwP-4TG_uhKRX1Z0q2OllnQ3FU3cB1RpOLG-T2j2o"></a></li>
                <li><a class="bi bi-tencent-qq" target="_blank" href="https://pd.qq.com/s/9xlc1hut2"></a></li>
                <li><a class="bi bi-github" target="_blank" href="https://github.com/Starlight-Dev-Team"></a></li>
            </ul>
            <p class="clear">
                © 2023 星光工作室 - 期待与漫天繁星的相遇！
            </p>
        </div>
    `
}
/**
 * 创建加载遮罩层（全屏渐变背景 + 中心文字）
 */
function createLoadingMask() {
    // 1. 创建遮罩容器
    const loadingMask = document.createElement('div');
    loadingMask.id = 'page-loading-mask';
    
    // 2. 设置遮罩样式（全屏覆盖 + 渐变背景 + 居中布局）
    loadingMask.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(to left, #1FA2FF, #CFA6FF);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* 最高层级，确保覆盖所有内容 */
        transition: opacity 0.5s ease; /* 淡出动画过渡 */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    `;

    // 3. 创建加载文字元素（重点优化：手机端文字大小）
    const loadingText = document.createElement('div');
    loadingText.textContent = '精彩马上呈现';
    // 文字样式：用clamp()做响应式字体，确保手机端不小于18px，大屏不超过28px
    loadingText.style.cssText = `
        font-size: clamp(18px, 4vw, 28px); /* 核心优化：最小18px（手机），首选4vw，最大28px（电脑） */
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25); /* 加深阴影，手机端更清晰 */
        text-align: center;
        padding: 0 20px; /* 防止小屏幕文字溢出 */
        box-sizing: border-box;
    `;

    // 4. 组装遮罩并添加到页面（修复body未加载问题）
    loadingMask.appendChild(loadingText);
    if (document.body) {
        document.body.appendChild(loadingMask);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(loadingMask);
        });
    }
}

/**
 * 移除加载遮罩（带淡出动画）
 */
function removeLoadingMask() {
    const loadingMask = document.getElementById('page-loading-mask');
    if (loadingMask) {
        loadingMask.style.opacity = '0';
        setTimeout(() => {
            loadingMask.remove();
        }, 500); // 与过渡动画时间一致
    }
}

// 确保DOM解析后再创建遮罩
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLoadingMask);
} else {
    createLoadingMask();
}

// DOM完全加载后移除遮罩
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(removeLoadingMask, 300); // 可根据需求调整延迟
});


