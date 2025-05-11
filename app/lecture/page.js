"use client";

import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CoPlaybackRate from "@/components/CoPlaybackRate";

import CoPlayPause from "@/components/CoPlayPause";
import CoBackward from "@/components/CoBackward";
import { formatTime } from "@/utils/formatTime";
import { Button } from "@/components/ui/button";
import CoForward from "@/components/CoForward";
import CoVolume from "@/components/CoVolume";
import CoFullScreen from "@/components/CoFullScreen";
import CoExpandScreen from "@/components/CoExpandScreen";
import CoAddNote from "@/components/CoAddNote";

////////////////////////////////////////////
function CustomYouTubePlayer() {
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const textareaRef = useRef(null);
  const [volume, setVolume] = useState(50);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [addNote, setAddNote] = useState(false);
  const [lists, setLists] = useState([]);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [PlaybackRate, setPlaybackRate] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullscreen, setIsFullScreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoverProgressBar, setIsHoverProgressBar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [screenHeight, setScreenHeight] = useState(null);
  const [innerWidth, setInnerWidth] = useState(null);
  const [innerHeight, setInnerHeight] = useState(null);

  const videoId = "WgDedHNvr3E";

  // get screen width and height
  useEffect(() => {
    setScreenWidth(window.screen.width);
    setScreenHeight(window.screen.availHeight);
  }, []);

  // get inner width and height
  useEffect(() => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  }, []);

  //handle is full screen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(document.fullscreenElement === iframeRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // handle hide dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("btnDropdown")) return;
      setShowDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // update progress bar
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

  const opts = {
    width: "100%",
    height: "849",
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
    playerRef.current.setVolume(volume);
    // console.log(event.target);
    iframeRef.current = event.target.getIframe();
  };

  // Handle Seek
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    const newTime = clickRatio * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  // Toggle Play
  function togglePlay() {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  // Toggle Mute
  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(100);
      setVolume(100);
    } else {
      playerRef.current.mute();
      playerRef.current.setVolume(0);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  // Volume Change
  const handleVolumeChange = (e) => {
    const newVolume = e;
    setVolume(newVolume);
    if (!playerRef.current) return;
    playerRef.current.setVolume(newVolume);
    if (newVolume > 0 && isMuted) setIsMuted(false);
    if (newVolume === 0) setIsMuted(true);
  };

  //active add note
  async function handleActiveAddNote() {
    try {
      // 1. Pause video and wait for completion
      await playerRef.current.pauseVideo();

      // 2. Show the textarea
      setAddNote(true);

      // 3. Focus after the component re-renders
      setTimeout(() => {
        textareaRef.current?.focus();
        textareaRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start", // or 'center', 'end', 'nearest'
        });
      }, 50);
    } catch (error) {
      console.error("Error activating note:", error);
    }
  }

  // Add Note
  const handleAddNote = (e) => {
    e.preventDefault();
    const note = textareaRef.current.value;
    if (note.trim() === "") return;
    setLists([...lists, { time: currentTime, note }]);
    textareaRef.current.value = "";
    setAddNote(false);
    playerRef.current.playVideo();
    setIsPlaying(true);
  };

  // Playback Rate
  function handlePlaybackRate(rate) {
    setPlaybackRate(rate);
    playerRef.current.setPlaybackRate(rate);
    setShowDropdown(false);
  }

  // backward
  function handleBackward() {
    playerRef.current.seekTo(currentTime - 5, true);
  }

  // forward
  function handleForward() {
    playerRef.current.seekTo(currentTime + 5, true);
  }

  // Toggle Show Dropdown
  function toggleShowDropdown() {
    setShowDropdown(!showDropdown);
  }

  // full screen
  function handleFullScreen() {
    if (playerRef.current) {
      const iframe = playerRef.current.getIframe();

      // Standard fullscreen API
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
      // Browser prefixes
      else if (iframe.webkitRequestFullscreen) {
        /* Safari */
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        /* IE/Edge */
        iframe.msRequestFullscreen();
      }
    }
  }

  return (
    <main className={`${isExpanded ? undefined : "grid grid-cols-12"}`}>
      <div className={`${isExpanded ? undefined : "col-span-9"}`}>
        <div className="youtube-container">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onPlay={() => {
              setIsPlaying(true);
              setShowDropdown(false);
            }}
            onPause={() => {
              setIsPlaying(false);
              setShowDropdown(false);
            }}
          />
          <div
            className={`custom-controls ${isPlaying && !showDropdown ? "opacity-0" : "opacity-100"} `}
          >
            {/* Progress Bar */}
            <div
              className="progress-container"
              onMouseDown={(e) => setIsDragging(true)}
              onMouseMove={(e) => {
                if (isDragging) handleSeek(e);
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={(e) => {
                setIsHoverProgressBar(false);
                setIsDragging(false);
              }}
              onMouseOver={() => setIsHoverProgressBar(true)}
              onClick={(e) => handleSeek(e)}
              style={isHoverProgressBar ? { transform: "scaleY(2)" } : {}}
            >
              <div
                className={`progress-bar bg-[#a435f0]`}
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="controls-row">
              <div className="left-controls">
                <CoPlayPause togglePlay={togglePlay} isPlaying={isPlaying} />
                <CoBackward onClick={handleBackward} />
                <CoPlaybackRate
                  showDropdown={showDropdown}
                  PlaybackRate={PlaybackRate}
                  handlePlaybackRate={handlePlaybackRate}
                  toggleShowDropdown={toggleShowDropdown}
                />
                <CoForward onClick={handleForward} />
                <span className="time-display">
                  {formatTime(currentTime)}/{formatTime(duration)}
                </span>
                <CoAddNote onClick={handleActiveAddNote} />
              </div>
              <div className="flex gap-2 pr-2">
                <CoVolume
                  isMuted={isMuted}
                  onChange={handleVolumeChange}
                  onClick={toggleMute}
                  value={volume}
                />
                <CoFullScreen onClick={handleFullScreen} />
                {!isFullscreen && (
                  <div className="ml-1">
                    <CoExpandScreen
                      onClick={() => setIsExpanded(!isExpanded)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {!addNote && (
          <button
            onClick={handleActiveAddNote}
            className="relative m-auto mt-10 flex w-[60%] cursor-pointer rounded-xs border-1 border-gray-400 p-[5px_15px] text-gray-500 outline-none"
          >
            Create a new note at {formatTime(currentTime)}
            <AiOutlinePlusCircle className="absolute top-[50%] right-3 -translate-y-[50%]" />
          </button>
        )}
        {addNote && (
          <form
            onSubmit={handleAddNote}
            className="m-auto mt-10 flex w-fit flex-col items-end gap-5"
          >
            <textarea
              ref={textareaRef}
              cols={55}
              rows={4}
              onBlur={() => setIsTextareaFocused(false)}
              className="resize-none rounded-sm border-1 border-black p-2 outline-none focus:border-[#892de1]"
            />

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  playerRef.current.playVideo();
                  setAddNote(false);
                }}
                className="cursor-pointer rounded-sm bg-transparent text-black hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button className="cursor-pointer rounded-sm bg-[#6722a8] hover:bg-[#892de1]">
                Save Note
              </Button>
            </div>
          </form>
        )}
      </div>
      {!isExpanded && (
        <aside className="col-span-3 h-screen border-2 border-red-700">
          <ul>
            <li>mohamed</li>
            <li>waheed</li>
            <li>mokhtar</li>
            <li>ibrahem</li>
          </ul>
        </aside>
      )}
    </main>
  );
}

export default CustomYouTubePlayer;
