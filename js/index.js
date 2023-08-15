var cur_tab = 0;


function init_lazy_image()
{
    var images = document.getElementsByTagName("img");
    function callback(entries) {
        for (let i of entries) {
            if (i.isIntersecting) {
                let img = i.target;
                let trueSrc = img.getAttribute("data-src");
                if (trueSrc) {
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

window.addEventListener("DOMContentLoaded", ()=>
{
    init_lazy_image();
    document.getElementById("card_container_toggles").addEventListener("click", (e) =>
    {
        if (e.target.className == "bi bi-chevron-left")
        {
            ui_show_new_tab(--cur_tab);
        }
        else if (e.target.className == "bi bi-chevron-right")
        {
            ui_show_new_tab(++cur_tab);
        }
    })
    setInterval(() =>
    {
        ui_show_new_tab(++cur_tab);
    }, 3000)
})

