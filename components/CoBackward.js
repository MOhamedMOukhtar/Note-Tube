import Backward from "./icons/IconBackward";

function CoBackward({ onClick }) {
  return (
    <button className="control-btn" onClick={onClick}>
      <div className="group relative">
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 scale-90 rounded border border-stone-500 bg-[#15161c] p-[3px_7px] text-sm text-nowrap opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          Backward 5s
        </div>
        <Backward size={25} />
      </div>
    </button>
  );
}

export default CoBackward;
