import { addZero } from "./supScript.js";

export const musicPlayerInit = () => {
  const audio = document.querySelector(".audio");
  const audioNavigation = document.querySelector(".audio-navigation");
  const audioPlayer = document.querySelector(".audio-player");
  const audioButtonPlay = document.querySelector(".audio-button__play");
  const audioButtonPause = document.querySelector(".audio-button__pause");
  const audioProgress = document.querySelector(".audio-progress");
  const audioProgressTiming = document.querySelector(".audio-progress__timing");
  const audioTimePassed = document.querySelector(".audio-time__passed");
  const audioTimeTotal = document.querySelector(".audio-time__total");

  const playlist = "hw-audio";

  let trackIndex = 0;

  const toggleIcon = () => {
    if (audioPlayer.paused) {
      audioButtonPlay.classList.remove("fa-pause");
      audioButtonPlay.classList.add("fa-play");
    } else {
      audioButtonPlay.classList.remove("fa-play");
      audioButtonPlay.classList.add("fa-pause");
    }
  };

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];

    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  audioNavigation.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("audio-button__play")) {
      audio.classList.toggle("play");
      audioButtonPause.style.display = "none";
      audioButtonPlay.style.display = "block";

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + "%";

    const minutesPassed = Math.floor(currentTime / 60) || "0";
    const secondsPassed = Math.floor(currentTime % 60) || "0";

    const minutesTotal = Math.floor(duration / 60) || "0";
    const secondsTotal = Math.floor(duration % 60) || "0";

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(
      secondsPassed
    )}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  audioProgress.addEventListener("click", (event) => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  musicPlayerInit.stop = () => {
    audioPlayer.pause();
    audio.classList.remove("play");
    toggleIcon();
  };
};
