// Select all audio and video elements
const audios = document.querySelectorAll(".audio");
const videos = document.querySelectorAll(".video");

// Function to pause all other elements (audio or video)
function pauseOthers(currentElement, elements) {
  elements.forEach((element) => {
    if (element !== currentElement) {
      element.pause();
    }
  });
}

// Loop through each audio element
audios.forEach((audio) => {
  audio.addEventListener("play", () => {
    // Pause all other audio elements when one is played
    pauseOthers(audio, audios);
    // Pause all videos when an audio is played
    pauseOthers(audio, videos);
  });
});

// Loop through each video element
videos.forEach((video) => {
  video.addEventListener("play", () => {
    // Pause all other video elements when one is played
    pauseOthers(video, videos);
    // Pause all audios when a video is played
    pauseOthers(video, audios);
  });

  // Create an IntersectionObserver to monitor when the video enters or leaves the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the video is in the viewport and is playing, resume it
        if (entry.isIntersecting && !video.paused) {
          video.play(); // Resume playback when in view
        }
        // If the video is out of the viewport, pause it
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    },
    {
      threshold: 0.5, // 50% of the video must be in view to be considered visible
    }
  );

  // Start observing each video
  observer.observe(video);
});
