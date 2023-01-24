var selected = false;
var selected_order = 0;

function pop_or_hide_menu(clicked)
{
    var menu_tabs = document.getElementById("menu_tabs").children;
    var functions = document.getElementById("functions")
    if (selected)
    {
        menu_tabs[selected_order].className = undefined;
        functions.children[selected_order].style = undefined
        if (clicked == selected_order)
        {
            selected = false;
            document.getElementById("background_manager").className = "no_filter";
            functions.className = "hidden";
            return;
        }
        selected_order = clicked
    }
    else
    {
        selected = true;
        selected_order = clicked;
        document.getElementById("background_manager").className = "filter";
        functions.className = "showed";
    }
    menu_tabs[clicked].className = "selected";
    functions.children[clicked].style = "display: block;"
}


var is_rest = true;
var learn_time = 0;
function rest_or_continue(node)
{
    var title = document.getElementById("status");
    if (is_rest)
    {
        title.innerText = IsZh() ? "学习中..." : "Learning...";
        node.innerText = IsZh() ?  "休息一下" : "Have a rest";
        setTimeout(record_study_time, 1000);
    }
    else
    {
        title.innerText = IsZh() ? "休息中~" : "Resting";
        node.innerText = IsZh() ? "开始学习" : "Start learning";
    }
    is_rest = !is_rest;
}

function makeup_study_time()
{
    var hour = Math.floor(learn_time / 3600);
    var min = Math.floor((learn_time % 3600) / 60);
    var sec = Math.floor(learn_time - min * 60 - hour * 3600 );
    return IsZh() ? `已学习时间：${hour}小时${min}分钟${sec}秒` : `Learning Time：${hour}hr ${min}min ${sec}sec`; 
}

function record_study_time()
{
    if (is_rest)
    {
        return;
    }
    ++learn_time;
    document.getElementById("time").innerText = makeup_study_time();
    setTimeout(record_study_time, 1000);
}


var task_count = 0;
var finished_count = 0;
function add_task()
{
    var task_msg = prompt(
        IsZh() ? "输入你要完成的任务吧:" : "Type the task", 
        IsZh() ? "练习两年半" : "Practice for two and a half year");
    if (task_msg.replace(/\s*/g,"").length == 0)
    {
        return;
    }
    if (task_msg != null || task_msg.length != 0)
    {
        ++task_count;
        var my_task = document.createElement("li");
        my_task.innerText = task_msg;
        my_task.setAttribute("onclick", "active_menu(this)")
        document.getElementById("task_list").appendChild(my_task);
        update_process();
    }
}

function update_process()
{
    document.getElementById("process").innerText = 
    IsZh() ? `学习进度：${finished_count}/${task_count}` : `Learning Process: ${finished_count}/${task_count}`
}


function active_menu(node)
{
    var result = prompt(IsZh() ? 
                        "输入f表示完成学习任务，输入r表示移除学习任务，退出表示不进行操作" 
                        : "Type f to finish the task.Type r to remove the selected task.To exit means cancel the action.")
    if (result == "f")
    {
        node.setAttribute("onclick", undefined);
        node.className = "finished";
        ++finished_count;
        update_process();
    }
    else if (result == "r")
    {
        --task_count;
        document.getElementById("task_list").removeChild(node);
        update_process();
    }
}

function callback()
{

}


function search_music()
{
    var content = document.getElementById("search_content").value;
    // var target = `https://music.163.com/api/search/get/web?s=${content}&type=1&offset=0&total=true&limit=50`;
    var target = `https://api.gmit.vip/Api/Music?format=json&text=${content}&site=netease&page=1`
    $.getJSON(target, function(data)
    {
        if (data.code == 200)
        {
            set_song_list(data.data);
        }
        else
        {
            alert(IsZh() ? "搜索失败!" : "Failed to find the resource!")
        }
    })
}

var my_music_list = [];
var current_list;
var current_song_name;
var finished_time;
var music_player;

function set_song_list(data)
{
    current_list = data;
    var song_list = document.getElementById("song_list");
    song_list.innerHTML = "";
    for (var i = 0; i != data.length; ++ i)
    {
        var item = document.createElement("div");
        var songname = `${data[i].author} - ${data[i].title}`
        item.className = "item";
        item.innerHTML = `
            <p>${songname}</p>
            <span class="play" onclick="play_song(${i})"></span>
            <span class="add" onclick="add_song(${i})"></span>
            <span class="download" onclick="download_song(${i})"></span>
        `
        song_list.appendChild(item);
    }
}


function download_song(index)
{
    var link = document.createElement("a");
    var res = current_list[index];
    var target = `https://music.163.com/song/media/outer/url?id=${res.songid}`;
    link.style = "display: none";
    link.href = target;
    link.download = `${res.author} - ${res.title}.mp3`;
    link.click();
    document.removeChild(link);
}

function add_song(index)
{
    my_music_list.appendChild(current_list[i]);
}

function play_song(index)
{
    var target = current_list[index];
    var music_range = document.getElementById("music_range");
    music_player.pause();
    music_player.src = `https://music.163.com/song/media/outer/url?id=${target.songid}`;
    current_song_name = `${target.author} - ${target.title}`
    music_player.load();
    music_player.play();
    document.getElementById("play_or_pause").className = "pause";
    document.getElementById("song_title").innerText = current_song_name;
    document.getElementById("song_cover").src = target.pic;
}


function play_or_pause()
{
    var btn = document.getElementById("play_or_pause");
    var cd = document.getElementById("song_cover")
    if (music_player.paused)
    {
        music_player.play();
        btn.className = "pause";
        cd.className = "rolate";

    }
    else
    {
        music_player.pause();
        btn.className = "play";
        cd.className = "";
    }
}

window.addEventListener("load", function()
{
    music_player = document.getElementById("music_player");
    music_player.ontimeupdate = function(ev)
    {
        document.getElementById("song_title").innerText = `${current_song_name} [${this.currentTime} : ${this.duration}]`
        document.getElementById("music_range").value = 100 * (this.currentTime + 1) / this.duration;
        if (this.currentTime == this.duration)
        {
            play_or_pause();
        }
    }
    document.getElementById("music_range").oninput =
    function(ev)
    {
        music_player.currentTime = this.value * music_player.duration / 100 - 1;
    };
    this.document.getElementById("search_content").onkeydown = function(ev)
    {
        if (ev.keyCode == "13")
        {
            search_music();
        }
    }
})