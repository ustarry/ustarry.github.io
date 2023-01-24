function send_content()
{
    var edit = document.getElementById("edit");
    var msg = edit.value;
    edit.value = "";
    var content = document.getElementById("content");
    if (msg.replace(/\s*/g,"").length == 0)
    {
        return;
    }
    
    var my_message = document.createElement("p");
    my_message.innerText = `${IsZh() ? "我" : "ME"}: ${msg}`;
    content.appendChild(my_message);
    $.get(`https://v.api.aa1.cn/api/api-xiaoai/talk.php?msg=${msg}`, 
    function(data)
    {
        message_back(data);
    });
}


function message_back(content)
{
    var callback_message = document.createElement("p");
    callback_message.innerHTML = `${IsZh() ? "小爱" : "Xiaoai"}: ${content}`;
    document.getElementById("content").appendChild(callback_message)
    return callback_message;
}


function content_back(content)
{
    var callback_message = document.createElement("p");
    callback_message.className = "bold";
    callback_message.innerHTML = content;
    document.getElementById("content").appendChild(callback_message)
    return callback_message;
}

function make_text_back(url, content)
{
    $.get(url, 
    function(data)
    {
        message_back(data)
    })
}


function quick_message(ev)
{
    if (ev.keyCode == "13")
    {
        send_content();
    }
}


function yiyan()
{
    $.get("https://api.gmit.vip/Api/YiYan?format=text", 
    function(data)
    {
        content_back("[每日一言]" + data)
    })
}

function hot_comment()
{
    $.get("https://v.api.aa1.cn/api/api-wenan-wangyiyunreping/index.php?aa1=text", 
    function(data)
    {
        content_back("[网易云热评]" + data)
    })
}


function love_article()
{
    $.get("https://api.gmit.vip/Docs/#/Doc/MD/Api/HotComments", 
    function(data)
    {
        content_back("[爱情文案]" + data)
    })
}


function dog()
{
    $.get("https://v.api.aa1.cn/api/tiangou/index.php?format=text", 
    function(data)
    {
        content_back("[舔狗日记]" + data)
    })
}

function comfort()
{
    $.get("https://v.api.aa1.cn/api/api-wenan-anwei/index.php?type=text", 
    function(data)
    {
        content_back("[安慰文案]" + data)
    })
}

function poem()
{
    $.get("https://zj.v.api.aa1.cn/api/wenan-shici/?type=text", 
    function(data)
    {
        content_back("[诗词佳句]" + data)
    })
}


function view()
{
    content_back(`<img src="https://api.gmit.vip/Docs/#/Doc/MD/Api/FjImg" alt="Image Not Found"/>`)
}


function beauty()
{
    content_back(`<img src="https://api.gmit.vip/Api/MvImg?format=image" alt="Image Not Found"/>`)
}

function dmimg()
{
    content_back(`<img src="https://api.gmit.vip/Api/DmImg?format=image" alt="Image Not Found"/>`)
}
function pengyouquan()
{
    content_back(`<video src="https://v.api.aa1.cn/api/api-video-pyqshuqing/video/0180.mp4%20%E6%9C%8B%E5%8F%8B%E5%9C%88%E6%8A%92%E6%83%85%E8%A7%86%E9%A2%91%E9%9A%8F%E6%9C%BAAPI%20%E5%AE%98%E7%BD%91api.aa1.cn%20%E6%B0%B8%E4%B9%85%E5%85%8D%E8%B4%B9API.mp4" controls preload/>`)
}

function saohua()
{
    $.get("https://v.api.aa1.cn/api/api-saohua/index.php?type=text", 
    function(data)
    {
        content_back("[骚话文案]" + data)
    })
}
function dujitang()
{
    $.get("https://v.api.aa1.cn/api/api-wenan-dujitang/index.php?aa1=text", 
    function(data)
    {
        content_back("[骚话文案]" + data)
    })
}
