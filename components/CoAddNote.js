import BtnAddNote from "@/components/icons/IconAddNote";

function CoAddNote({ onClick }) {
  return (
    <button className="control-btn cursor-pointer" onClick={onClick}>
      <div className="group relative bottom-[2px] mx-0.5">
        <div className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 scale-90 rounded border border-stone-500 bg-[#15161c] p-[3px_7px] text-sm text-nowrap opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          Add Note
        </div>
        <BtnAddNote />
      </div>
    </button>
  );
}

export default CoAddNote;
