let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
      img : 'svt_1.jpg',
      name : '하품 (Yawn)',
      artist : 'Seventeen',
      music : '하품(48k).mp3'
  },
  {
        img : 'svt_2.jpg',
        name : 'Simple',
        artist : 'Seventeen',
        music : 'SIMPLE__SIMPLE_(48k).mp3'
},
    {
        img : 'svt_4.jpg',
        name : 'If You Leave Me',
        artist : 'Seventeen',
        music : 'IF_you_leave_me(0).m4a'
    },
    {
        img : 'svt_5.jpg',
        name : '노래해',
        artist : 'Seventeen',
        music : '노래해(0).m4a'
    },
    {
        img : 'svt_6.jpg',
        name : 'Circle',
        artist : 'Seventeen',
        music : '[LYRICS_가사]_SEVENTEEN__세븐틴__-_돌고_돌아__CIRCLES__[4th_Album_Repackage__Sector_17_](0).m4a'
    },
   {
      img : 'svt_3.jpg',
      name : 'Beautiful',
      artist : 'Seventeen',
      music : 'BEAUTIFUL(0).m4a'
   },
  {
      img : 'skz_1.jpg',
      name : 'Youtiful',
      artist : 'Straykids',
      music : 'Stray_Kids__Youtiful__Video(0).m4a'
  },
  {
       img : 'skz_2.jpg',
       name : 'Fam',
       artist : 'Straykids',
       music : 'FAM__Korean_Ver._(0).m4a'
   },
  {
       img : 'skz_3.jpg',
       name : 'Waiting for you',
       artist : 'Straykids',
       music : '피어난다_(방찬,_리노,_승민,_아이엔)_Waiting_For_Us_(Bang_Chan,_Lee_Know,_Seungmin,...(0).m4a'
   },
  {
       img : 'skz_4.jpg',
       name : 'Leave',
       artist : 'Straykids',
       music : 'Leave(0).m4a'
   },
  {
       img : 'enha_1.jpg',
       name : 'Shoutout',
       artist : 'Enhypen',
       music : 'SHOUT_OUT(0).m4a'
   },
  {
       img : 'enha_2.jpg',
       name : 'Polaroid Love',
       artist : 'Enhypen',
       music : 'Polaroid_Love(0).m4a'
   },
  {
       img : 'enha_3.jpg',
       name : 'Still Monster',
       artist : 'Enhypen',
       music : 'Still_Monster(48k).mp3'
   },
  {
       img : 'bts_1.jpg',
       name : 'Blue & Grey',
       artist : 'BTS',
       music : 'Blue___Grey(0).m4a'
   },
  {
       img : 'bts_2.jpg',
       name : 'Stay',
       artist : 'BTS',
       music : 'Stay(0).m4a'
   },
  {
       img : 'bts_3.jpg',
       name : 'Moon',
       artist : 'BTS',
       music : 'Moon(0).m4a'
   },
  {
       img : 'bts_4.jpg',
       name : 'Magic Shop',
       artist : 'BTS',
       music : 'Magic_Shop(0).m4a'
   },
  {
       img : 'trs_1.jpg',
       name : 'Its okay',
       artist : 'Treasure',
       music : '괜찮아질_거야__IT’S_OKAY_(0).m4a'
   },
  {
       img : 'dk.jpg',
       name : 'Youre My Christmas',
       artist : 'DK',
       music : '도겸_-_Youre_My_Christmas(0).m4a'
   },
  {
       img : 'wonu.jpg',
       name : '무릎 (IU)',
       artist : 'Wonwoo',
       music : '[COVER]_원우_-_무릎__원곡___아이유_(0).m4a'
   },
  {
       img : 'twc_4.jpg',
       name : 'Queen of Hearts',
       artist : 'Twice',
       music : 'TWICE__Queen_of_Hearts__Live_Clip(0).m4a'
   },
  {
       img : 'twc_1.jpg',
       name : 'Crazy Stupid Love',
       artist : 'Twice',
       music : 'CRAZY_STUPID_LOVE(0).m4a'
   },
  {
       img : 'twc_2.jpg',
       name : 'Moonlight',
       artist : 'Twice',
       music : 'MOONLIGHT(128k).m4a'
   },
  {
       img : 'twc_3.jpg',
       name : 'More & more',
       artist : 'Twice',
       music : 'TWICE__MORE___MORE__M_V(0).m4a'
   },
  {
       img : 'twc_3.jpg',
       name : 'Oxygen',
       artist : 'Twice',
       music : 'OXYGEN(0).m4a'
   },
  {
       img : 'twc_5.jpg',
       name : 'Break Through',
       artist : 'Twice',
       music : 'BREAKTHROUGH__Korean_Ver._(0).m4a'
   },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
  
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}