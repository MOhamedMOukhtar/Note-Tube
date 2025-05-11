import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import CustomRange from "./ui/CustomRange";

function CoVolume({ value, onChange, onClick, isMuted }) {
  return (
    <div className="right-controls group relative">
      <div className="absolute -right-1 bottom-6 hidden p-4 group-hover:block">
        <CustomRange value={value} onChange={onChange} />
      </div>
      <button
        onClick={onClick}
        className="cursor-pointer rounded-sm bg-transparent p-1 hover:bg-neutral-800"
      >
        {isMuted ? <BiVolumeMute /> : <BiVolumeFull />}
      </button>
    </div>
  );
}

export default CoVolume;
