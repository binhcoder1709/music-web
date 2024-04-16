import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { selectMusicData } from "../../redux/useSlice/musicSlice";

export default function PlayBar() {
  const musicSrc = useSelector(selectMusicData);
  return (
    <>
      <AudioPlayer
        src={musicSrc}
        // other props here
      />
    </>
  );
}
