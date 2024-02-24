// Get references to DOM elements
const video = document.getElementById('myVideo');
const playPauseButton = document.getElementById('playPauseButton');
const forwardButton = document.querySelector('#step-forward');
const backwardButton = document.querySelector('#step-backward');
const volumeBtn = document.querySelector('#volume-button');
const fullscreenBtn = document.querySelector('#full-screen');
const progressBar = document.getElementById('progress-bar');
const settings = document.querySelector('#settings-btn');
const speedControlDropdown = document.querySelector('.speed-controls')
const speedControls = document.querySelectorAll('.speed-controls button');

// Event listeners for play and pause functionality
video?.addEventListener('click', playPauseVideo);
playPauseButton?.addEventListener('click', playPauseVideo);

// Function to toggle play and pause status of the video
function playPauseVideo() {
    if (video?.paused) {
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        video.play();
    } else {
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        video?.pause();
    }
}

// Event listener for forward button to skip video by 10 seconds
forwardButton?.addEventListener('click', () => {
    video.currentTime += 10; 
});

// Event listener for backward button 
backwardButton?.addEventListener('click', () => {
    video.currentTime -= 10; 
});

// Event listener for volume button to toggle mute and unmute
volumeBtn?.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
        video.muted = true;
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
});

// Event listener for fullscreen button to toggle fullscreen mode
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
});

// Update progress bar as the video plays
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Seek functionality when clicking on the progress bar
const progressContainer = document.querySelector('.progress-container');
progressContainer.addEventListener('click', (event) => {
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progress = offsetX / rect.width;
    video.currentTime = progress * video.duration;
});

// Reset play button icon when the video ends
video.addEventListener('ended', () => {
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
});

// Toggle playback speed control dropdown
let toggle = false;
settings?.addEventListener('click', () => {
    toggle = !toggle;
    speedControlDropdown.style.display = toggle ? 'flex' : 'none';
    settings.classList.toggle('rotate', toggle);
});

// Apply selected playback speed to video
speedControls.forEach(control => {
    control.addEventListener('click', () => {
        const speed = parseFloat(control.dataset.speed);
        video.playbackRate = speed;
    });
});
