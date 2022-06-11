const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextdBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const cover = document.querySelector('.cover__img');
const imgSrc = document.querySelector('.img__src');


// Названия песен
const songs = ['Молитва за Україну', 'Not an Idol - Мосты', 'Ой У Лузі Червона Калина'];

// Песня по умолчанию
let songIndex = 0

//Download song
function loadSong (song) {
	title.innerHTML = song
	audio.src = `audio/${song}.mp3`
	cover.src = `img/cover${songIndex + 1}.jpg`
}

loadSong(songs[songIndex])

//play
function playSong() {
	player.classList.add('play')
	cover.classList.add('active')
	imgSrc.src = './img/stop.png'
	audio.play()
}

//pause
function pauseSong () {
	player.classList.remove('play')
	cover.classList.remove('active')
	imgSrc.src = './img/play.png'
	audio.pause()
}

playBtn.addEventListener('click', () => {
	const isPlaying = player.classList.contains('play')
	if (isPlaying) {
		pauseSong()
	} else {
		playSong()
	}
})

// Next song
function nextSong () {
	songIndex++

	if (songIndex > songs.length -1) {
		songIndex = 0
	}

	loadSong(songs[songIndex])
	playSong()
} 
nextdBtn.addEventListener('click', nextSong)


//Prev song
function prevSong () {
	songIndex--

	if (songIndex <0) {
		songIndex = songs.length -1
	}
	loadSong(songs[songIndex])
	playSong()
}
prevBtn.addEventListener('click', prevSong)


//Progress bar 
function updateProgress(e) {
	const {duration, currentTime} = e.srcElement
	const progressPercent = (currentTime / duration) * 100
	progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate', updateProgress)

//Set progress
function setProgress(e) {
	const width = this.clientWidth
	const clickX = e.offsetX 
	const duration = audio.duration

	audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)

//Autoplay 
audio.addEventListener('ended', nextSong)