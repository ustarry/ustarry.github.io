var menu_showed = false;

function show_menu()
{
    var menu_list = document.getElementById("menu_list");
    if (menu_showed)
    {
        menu_list.className = "hidden_menu";
    }
    else
    {
        menu_list.className = "showed_menu";
    }
    menu_showed = !menu_showed;
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



window.addEventListener("load", function()
{
    init_lazy_image();
})
