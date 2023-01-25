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

function clear_message()
{
    document.getElementById("content").innerHTML = ""
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


function love_articles()
{
    $.get("https://v.api.aa1.cn/api/api-wenan-aiqing/index.php?type=text", 
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

function dmimg()
{
    content_back(`<img src="https://api.gmit.vip/Api/DmImg?format=image" alt="Image Not Found"/>`)
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
        content_back("[毒鸡汤]" + data)
    })
}


var next_video_type = 1;


function make_video()
{
    var target_url;
    switch (next_video_type) 
    {
    case 1:
        target_url = "https://v.api.aa1.cn/api/api-fj/index.php?aa1=url"
        // content_back(`<iframe src="${target_url}"></iframe>`)
        $.get(target_url, function (url) {
            content_back(`<video src="${url}" autoplay controls/>`)
        })
        break;
    case 2:
        target_url = "https://v.api.aa1.cn/api/api-dy-girl/index.php?aa1=url&key=ajdu987hrjfw";
        $.get(target_url,
            function (url) {
                content_back(`<video src="${url}" autoplay controls/>`)
            })
        break; 
    case 3:
        target_url = "https://v.api.aa1.cn/api/api-video-qinglvduihua/index.php?aa1=wwwaa1cn7yf58hyirjow8c5u";
        content_back(`<video src="${target_url}" autoplay controls/>`)
        break;
        break; 
    }
    
    if (next_video_type == 3)
    {
        next_video_type = 1;
        return;
    }
    ++next_video_type;
}