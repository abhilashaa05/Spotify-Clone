//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("/SpotifyClone/spotifyElements/songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    {songName: "Tujhe Sochta Hun", filePath: "/SpotifyClone/spotifyElements/songs/1.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/1.jpg"},
    {songName: "Main Dhoodne Ko Zamane", filePath: "/SpotifyClone/spotifyElements/songs/2.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/2.jpg"},
    {songName: "Ghungroo", filePath: "/SpotifyClone/spotifyElements/songs/3.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/3.jpg"},
    {songName: "Humnava", filePath: "/SpotifyClone/spotifyElements/songs/4.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/4.jpg"},
    {songName: "Raataan Lambiyan", filePath: "/SpotifyClone/spotifyElements/songs/5.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/5.jpg"},
    {songName: "Chaand Baaliyan", filePath: "/SpotifyClone/spotifyElements/songs/6.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/6.jpg"},
    {songName: "Shubharambh", filePath: "/SpotifyClone/spotifyElements/songs/7.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/7.jpg"},
    {songName: "Mere Sohneya", filePath: "/SpotifyClone/spotifyElements/songs/8.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/8.jpg"},
    {songName: "Tujhme Rab Dikhta Hai", filePath: "/SpotifyClone/spotifyElements/songs/9.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/9.jpg"},
    {songName: "Kesariya", filePath: "/SpotifyClone/spotifyElements/songs/10.mp3", coverPath: "/SpotifyClone/spotifyElements/covers/10.jpg"}
]

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})

//Update seek bar
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

//changing seek bar according to user 
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;   
})

//adding respective covers and song names
songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//when another song is played, the previous song's pause is converted to play
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

//the targetted song's play is changed to pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        masterSongName.innerText = songs[songIndex].songName;
        
        //new audio is set to intial and played 
        audioElement.src = `/SpotifyClone/spotifyElements/songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;

        //the play is changed to pause in the main bottom bar
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `/SpotifyClone/spotifyElements/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `/SpotifyClone/spotifyElements/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})
