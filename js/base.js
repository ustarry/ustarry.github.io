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

