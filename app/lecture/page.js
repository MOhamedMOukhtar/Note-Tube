"use client";

import BtnAddNote from "@/components/icons/IconAddNote";

import { Button } from "@/components/ui/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { formatTime } from "@/utils/formatTime";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

function CustomYouTubePlayer() {
  const playerRef = useRef(null);
  const textareaRef = useRef(null);
  const [volume, setVolume] = useState(10);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [addNote, setAddNote] = useState(false);
  const [lists, setLists] = useState([]);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const videoId = "bM8V8-7K6Co";

  const opts = {
    height: "360",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      iv_load_policy: 3,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  useEffect(() => {
    let intervalId;

    const updateProgress = () => {
      if (playerRef.current && isPlaying && !isTextareaFocused) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
      }
    };

    // Use setInterval instead of requestAnimationFrame
    intervalId = setInterval(updateProgress, 200); // Update every 200ms

    return () => clearInterval(intervalId);
  }, [isPlaying, isTextareaFocused]);

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    const newTime = clickRatio * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  function togglePlay() {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (!playerRef.current) return;
    playerRef.current.setVolume(newVolume);
    if (newVolume > 0 && isMuted) setIsMuted(false);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    const note = textareaRef.current.value;
    if (note.trim() === "") return;
    setLists([...lists, { time: currentTime, note }]);
    textareaRef.current.value = "";
    setAddNote(false);
    playerRef.current.playVideo(); // Resume playback
    setIsPlaying(true);
  };

  return (
    <>
      <div className="youtube-container">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onStateChange={onReady}
        />

        <div className="custom-controls">
          {/* Progress Bar */}
          <div className="progress-container" onClick={handleSeek}>
            <div
              className={`progress-bar  bg-[#a435f0] `}
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            ></div>
          </div>

          {/* Control Buttons */}
          <div className="controls-row">
            <div className="left-controls">
              <button onClick={togglePlay} className="control-btn">
                {isPlaying ? "⏸" : "▶"}
              </button>
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <BtnAddNote />
            </div>

            <div className="right-controls">
              <button onClick={toggleMute} className="control-btn">
                {isMuted ? "🔇" : volume > 50 ? "🔊" : "🔉"}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>
        </div>
      </div>
      {!addNote && (
        <button
          onClick={() => {
            playerRef.current.pauseVideo();
            setAddNote(true);
          }}
          className="relative border-1 outline-none border-gray-400 p-[5px_15px] mt-10 w-[60%] m-auto flex rounded-xs text-gray-500 cursor-pointer"
        >
          Create a new note at {formatTime(currentTime)}
          <AiOutlinePlusCircle className="absolute right-3 -translate-y-[50%] top-[50%] " />
        </button>
      )}
      {addNote && (
        <form
          onSubmit={handleAddNote}
          className="m-auto mt-10 w-fit flex flex-col items-end gap-5 "
        >
          <textarea
            cols={55}
            rows={4}
            onBlur={() => setIsTextareaFocused(false)}
            className="border-1 border-black resize-none rounded-sm outline-none focus:border-[#892de1] p-2 "
          />

          <div className="flex gap-2">
            <Button
              onClick={() => {
                playerRef.current.playVideo();
                setAddNote(false);
              }}
              className="hover:bg-gray-200 text-black bg-transparent rounded-sm"
            >
              Cancel
            </Button>
            <Button className="hover:bg-[#892de1] bg-[#6722a8] rounded-sm">
              Save Note
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default CustomYouTubePlayer;
