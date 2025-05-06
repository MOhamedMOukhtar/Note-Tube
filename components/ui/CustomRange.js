import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function CustomRange({ value, onChange }) {
  return (
    <Slider
      min={0}
      max={100}
      value={value}
      onChange={onChange}
      vertical
      styles={{
        track: {
          backgroundColor: "#892de1",
          width: 18,
          borderRadius: 0,
        },
        rail: {
          width: 18,
          borderRadius: 0,
        },
        handle: {
          display: "none",
        },
      }}
      style={{
        height: 110,
        cursor: "grab",
      }}
    />
  );
}

export default CustomRange;
