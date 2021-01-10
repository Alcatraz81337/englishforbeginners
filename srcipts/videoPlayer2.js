import { addZero } from "./supScript.js";

export const videoPlayerInit2 = () => {
  const videoPlayer = document.querySelector(".video-player-2");
  const videoButtonPlay = document.querySelector(".video-button__play-2");
  const videoProgress = document.querySelector(".video-progress-2");
  const videoTimePassed = document.querySelector(".video-time__passed-2");
  const videoTimeTotal = document.querySelector(".video-time__total-2");

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.remove("fa-play");
      videoButtonPlay.classList.add("fa-pause");
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  /* const soundOff = () => {
    const activeClass = videoPlayer.closest('active');

    if (activeClass) {

    }
  }; */

  videoPlayer.addEventListener("click", togglePlay);
  videoButtonPlay.addEventListener("click", togglePlay);

  videoPlayer.addEventListener("play", toggleIcon);
  videoPlayer.addEventListener("pause", toggleIcon);

  videoPlayer.addEventListener("timeupdate", () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  videoProgress.addEventListener("change", () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoPlayerInit2.stop = () => {
    videoPlayer.pause();
    toggleIcon();
  };
};

/* export default videoPlayerInit; */
