import { useState, useRef, useEffect } from "react";
import "./App.css";
import { songData } from "./config/audio";
import Player from "./Player/Player";

function App() {
  const [songs, setSongs] = useState(songData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songData[0]);
  const [currentVolume, setCurrentVolume] = useState(0);

  const audioSource = useRef();
  // volume
  const progressBar = useRef();
  console.log("progressBar", progressBar);

  useEffect(() => {
    if (isPlaying) {
      audioSource.current.play();
    } else {
      audioSource.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = document.getElementById("audio");
    audio.volume = progressBar.current.value;
  }, []);

  const onPlaying = () => {
    const duration = audioSource.current.duration;
    const currentTime = audioSource.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (currentTime / duration) * 100,
      length: duration,
    });

    console.log("duration", Math.floor(duration));
    console.log("currentTime", Math.floor(currentTime));
    console.log("SUM TIMER", Math.floor((currentTime / duration) * 100));

    console.log(currentVolume);
  };
  return (
    <div className="App">
      <audio
        id="audio"
        src={currentSong.url}
        ref={audioSource}
        onTimeUpdate={onPlaying}
      />
      <Player
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioSource={audioSource}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        currentVolume={currentVolume}
        progressBar={progressBar}
      />
    </div>
  );
}

export default App;
