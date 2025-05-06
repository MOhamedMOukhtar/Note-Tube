import { BsFillPauseFill, BsPlayFill } from "react-icons/bs";

function CoPlayPause({ togglePlay, isPlaying }) {
  return (
    <button onClick={togglePlay} className="control-btn">
      {isPlaying ? (
        <div className="group relative">
          <div className="pointer-events-none absolute bottom-8 -left-1 scale-90 rounded border border-stone-500 bg-[#15161c] p-[3px_7px] text-sm opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
            Pause
          </div>
          <BsFillPauseFill size={25} />
        </div>
      ) : (
        <div className="group relative">
          <div className="pointer-events-none absolute bottom-8 -left-1 scale-90 rounded border border-stone-500 bg-[#15161c] p-[3px_7px] text-sm opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
            Play
          </div>
          <BsPlayFill size={25} />
        </div>
      )}
    </button>
  );
}

export default CoPlayPause;
