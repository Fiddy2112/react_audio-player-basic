import React, { useRef } from "react";
import {
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoPlayOutline,
  IoPauseOutline,
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
  IoVolumeOffOutline,
} from "react-icons/io5";
import "./Player.scss";

function Player({
  songs,
  setSongs,
  audioSource,
  setIsPlaying,
  isPlaying,
  currentSong,
  setCurrentSong,
  currentVolume,
  progressBar,
}) {
  const clickRef = useRef();
  // console.log("clickRef", clickRef);
  const handlePlayer = () => {
    setIsPlaying(!isPlaying);
  };

  const handleWidth = (e) => {
    console.log(e);
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const progress = (offset / width) * 100;
    audioSource.current.currentTime = (progress / 100) * currentSong.length;
  };

  const handleSkipBack = () => {
    const index = songs.findIndex((i) => i.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioSource.current.currentTime = 0;
  };

  const handleSkipForward = () => {
    const index = songs.findIndex((i) => i.title === currentSong.title);
    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioSource.current.currentTime = 0;
  };

  const handleForward = () => {
    console.log(audioSource);
    if (!audioSource.paused) {
      audioSource.current.currentTime += 1;
    }
  };

  const handleBack = () => {
    console.log(audioSource);
    if (!audioSource.paused) {
      audioSource.current.currentTime -= 1;
    }
  };
  return (
    <div className="player_container">
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <div className="player_navigation">
        <div className="player_timer">
          <p>0:10</p>
          <p>2:10</p>
        </div>
        <div className="player_bar" onClick={handleWidth} ref={clickRef}>
          <div
            className="lever_bar"
            style={{ width: `${currentSong.progress + "%"}` }}
          ></div>
        </div>
        <div className="player_controls">
          <IoPlaySkipBackOutline
            className="btn_action"
            onClick={handleSkipBack}
          />
          <IoPlayBackOutline className="btn_action" onClick={handleBack} />
          {!isPlaying ? (
            <IoPlayOutline className="btn_action" onClick={handlePlayer} />
          ) : (
            <IoPauseOutline className="btn_action" onClick={handlePlayer} />
          )}

          <IoPlayForwardOutline
            className="btn_action"
            onClick={handleForward}
          />
          <IoPlaySkipForwardOutline
            className="btn_action"
            onClick={handleSkipForward}
          />
        </div>
        <div>
          <IoVolumeOffOutline className="btn_action" />
          <input ref={progressBar} type="range" defaultValue={currentVolume} />
        </div>
      </div>
    </div>
  );
}

export default Player;
