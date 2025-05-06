function CoPlaybackRate({
  toggleShowDropdown,
  PlaybackRate,
  handlePlaybackRate,
  showDropdown,
}) {
  return (
    <div className="dropdown group relative">
      {!showDropdown && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 scale-90 rounded border border-stone-500 bg-[#15161c] p-[3px_7px] text-sm text-nowrap opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          Playback Rate
        </div>
      )}
      <button className="btnDropdown" onClick={toggleShowDropdown}>
        {PlaybackRate}x
      </button>
      {showDropdown && (
        <div className="content-drop">
          <span onClick={() => handlePlaybackRate(0.5)}>0.5x</span>
          <span onClick={() => handlePlaybackRate(0.75)}>0.75x</span>
          <span onClick={() => handlePlaybackRate(1)}>1x</span>
          <span onClick={() => handlePlaybackRate(1.25)}>1.25x</span>
          <span onClick={() => handlePlaybackRate(1.5)}>1.5x</span>
          <span onClick={() => handlePlaybackRate(1.75)}>1.75x</span>
          <span onClick={() => handlePlaybackRate(2)}>2x</span>
        </div>
      )}
    </div>
  );
}

export default CoPlaybackRate;
