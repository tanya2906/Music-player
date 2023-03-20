let song=new Audio("song1.mp3");
let index=0;
//let song_index=0;
let song_list=[
    {songname:"Paris Ka Trip - Yo Yo Honey Singh",songcover:"song1.jpg",songpath:"song1.mp3",songtime:"3:32"},
    {songname:"Players - Badshah",songcover:"song2.jpg",songpath:"song2.mp3",songtime:"2:51"},
    {songname:"Jehri Ve - Jasmine Sandlas",songcover:"song3.jpg",songpath:"song3.mp3",songtime:"3:43"},
    {songname:"Kahani Suno 2.O",songcover:"song4.jpg",songpath:"song4.mp3",songtime:"2:53"},
    {songname:"Notorious - Wazir Patar",songcover:"song5.jpg",songpath:"song5.mp3",songtime:"3:00"},
    {songname:"Kaleshi Chori",songcover:"song6.jpg",songpath:"song6.mp3",songtime:"3:31"},
    {songname:"Milne Hai Mujhse Aayi",songcover:"song7.jpg",songpath:"song7.mp3",songtime:"4:55"},
    {songname:"Mi Amor",songcover:"song8.jpg",songpath:"song8.mp3",songtime:"3:23"},
]
let playbutton=document.getElementById("play-pause");
let song_range;
let set_song_range=document.getElementById("range");
let song_image=document.getElementsByClassName("songimg");
let song_name=document.getElementsByClassName("songname");
let song_time=document.getElementsByClassName("song-time");
let play_song=document.getElementsByClassName("playsong");
let current_song_name=document.getElementById("current-song-name");
let current_song_cover=document.getElementById("current-song-cover");
let next_song=document.getElementById("next-song");
let previous_song=document.getElementById("previous-song");
let times;
let timee;
let start;//=time.getSeconds();
let end;//=time.getSeconds();
//let song_duration;

let flag=0;
for(let i=0; i< song_list.length; i++)
{
    song_image[i].src=song_list[i].songcover;
    song_name[i].innerHTML=song_list[i].songname;
    song_time[i].innerHTML=song_list[i].songtime;
    let play_button_icon=document.createElement("img");
    play_button_icon.src="play song.png";
    play_button_icon.className="playsong";
    play_button_icon.id=i;
    song_time[i].appendChild(play_button_icon);
}
function play_all() {
   
    for (let index = 0; index < play_song.length; index++) {
        play_song[index].src="play song.png";
    }
}
function pause_all(){
    for(let i=0; i<song_list.length; i++)
    {
        play_song[i].src="play song.png";
    }
}

Array.from(play_song).forEach(element => {
    element.addEventListener("click",(e)=>{
        
        if(flag==1  && e.target.id==index){
            timee=new Date();
            end=timee.getSeconds();
            //console.log(end);
            play_all();
            e.target.src="play song.png";
            flag=2;
            song.pause();
            playbutton.src="play.png";
        }
        else if(flag==2 && e.target.id==index){
            //console.log(end-start);
            play_all();
            e.target.src="pau.png";
            flag=1;
            song.src=song_list[e.target.id].songpath;
            song.currentTime=end-start;
            song.play();
            playbutton.src="pause.png";
           
        }
        else   {
            
            times=new Date();
            start=times.getSeconds();
           // console.log(start);
            play_all();
            e.target.src="pau.png";
            flag=1;
            song.src=song_list[e.target.id].songpath;
            song.currentTime=0;
            song.play();
            playbutton.src="pause.png";
            current_song_cover.src=song_list[e.target.id].songcover;
            current_song_name.innerHTML=song_list[e.target.id].songname;
            index=e.target.id;
            document.getElementById("ps").style.display="block";
        }  
    })
});
function playy(){
    document.getElementById(index).src="pau.png";
}
playbutton.addEventListener("click",function(){
    
    if(song.paused || song.currentTime<=0)
    {
        song.play();
        playbutton.src="pause.png";
        playy();
    }
    else if(song.played || song.currentTime>0 )
    {
        song.pause();
        playbutton.src="play.png";
        pause_all();
    }
});
song.addEventListener("timeupdate",function(){
    
    song_range=parseInt((song.currentTime/song.duration)*100);
    set_song_range.value=song_range;
    if(song.currentTime==song.duration){
        index++;
        if(index==song_list.length)
        {
            index=0;
        }
        song.src=song_list[index].songpath;
        song.play();
        current_song_cover.src=song_list[index].songcover;
        current_song_name.innerHTML=song_list[index].songname;
        playbutton.src="pause.png";
        pause_all();
        playy();
    }
});
set_song_range.addEventListener("change",function(){
    song.currentTime=(set_song_range.value*song.duration)/100;
});

//next
next_song.addEventListener('click',()=>{
    index++;
    if(index>=song_list.length)
    {
        index=0;
    }
    song.src=song_list[index].songpath;
    song.play();
    current_song_cover.src=song_list[index].songcover;
    current_song_name.innerHTML=song_list[index].songname;
    playbutton.src="pause.png";
    pause_all();
    playy();
});
//previous
previous_song.addEventListener('click',()=>{
    index--;
    if(index<0)
    {
        index=song_list.length-1;
    }
    song.src=song_list[index].songpath;
    song.play();
    current_song_cover.src=song_list[index].songcover;
    current_song_name.innerHTML=song_list[index].songname;
    playbutton.src="pause.png";
    pause_all();
    playy();
});