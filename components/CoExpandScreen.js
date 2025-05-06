import IconExpandScreen from "./icons/IconExpandScreen";

function CoExpandScreen({ onClick }) {
  return (
    <button className="h-5 w-5 cursor-pointer" onClick={onClick}>
      <div className="group relative">
        <div className="pointer-events-none absolute right-0 bottom-7 scale-90 rounded border border-stone-500 bg-[#15161c] p-[3px_7px] text-sm text-nowrap opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          Expanded view
        </div>
        <IconExpandScreen />
      </div>
    </button>
  );
}

export default CoExpandScreen;
