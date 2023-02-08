function createVideo (src) {
    const videoContainer = document.createElement('div');
    videoContainer.innerHTML = `<video class="background-video" muted loop autoPlay playsInline src="${src}"></video>`;
    document.body.appendChild(videoContainer)

    return videoContainer.querySelector('video');
}

const video = createVideo('/assets/videos/backend-pages.mp4');
let styleTag;

function fitVideo() {
    if (styleTag) styleTag.remove();

    const videoRatio = video.videoWidth / video.videoHeight;
    const windowRatio = window.innerWidth / window.innerHeight;

    console.log({ videoRatio, windowRatio })
    
    // Video is wider -> Need to set the video height
    if (videoRatio > windowRatio) {
        const currentWidth = video.videoWidth * (window.innerHeight / video.videoHeight);
        video.style.height = window.innerHeight + 'px';
        video.style.left = -(currentWidth - window.innerWidth) / 2 + 'px';
        video.style.width = 'auto';
        video.style.top = '0';
    }
    // Window is wider -> Need to set the video width
    else {
        const currentHeight = video.videoHeight * (window.innerWidth / video.videoWidth);
        video.style.width = window.innerWidth + 'px';
        video.style.top = -(currentHeight - window.innerHeight) / 2 + 'px';
        video.style.height = 'auto';
        video.style.left = '0';
    }
    
    // Gradient fit
    const { height } = document.body.getBoundingClientRect()
    console.log('new window height ->', window.screen.height);
    
    if (height > window.screen.height) {
        styleTag = document.createElement('style');
        styleTag.innerHTML = `
            body::before { height: ${height}px; }
        `;
        document.body.appendChild(styleTag);
    }
}

const interval = setInterval(() => {
    if (!video.videoWidth) {
        return console.log('video not ready!');
    } else {
        setTimeout(fitVideo);
        clearInterval(interval);
    }
}, 333);


window.addEventListener('resize', function () {
    setTimeout(fitVideo);
})
