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


function on_search(self)
{
    alert("搜索无结果!")
}

function GetCurLanguage()
{
    if (localStorage.getItem("lang") == undefined)
    {
        localStorage.setItem("lang", navigator.language.substring(0, 2))
    }
    return localStorage.getItem("lang");
}



window.addEventListener("load", function()
{
    if (window.navigator.userAgent.indexOf("MSIE")>=1)
    {
        alert("Your Internet Explorer's version is less than IE 11, so some pages might not be loaded well.")
    }
    var result = new URLSearchParams(new URL(this.window.location).search);
    if (result.get("lang"))
    {
        this.localStorage.setItem("lang", result.get("lang"))
    }
})