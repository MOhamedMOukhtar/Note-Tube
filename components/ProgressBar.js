"use client";

import { useRef } from "react";
import BtnAddNote from "./icons/IconAddNote";
import { formatTime } from "@/utils/formatTime";

function ProgressBar(props) {
  const {
    handleSeek,
    currentTime,
    duration,
    isPlaying,
    toggleMute,
    isMuted,
    handleVolumeChange,
    volume,
    togglePlay,
  } = props;

  return (
    <div className="custom-controls">
      {/* Progress Bar */}
      <div className="progress-container" onClick={handleSeek}>
        <div
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
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
  );
}

export default ProgressBar;
