import { Button } from "./ui/button";

function Test({ handleAddNote, playerRef, setAddNote }) {
  return (
    <form
      onSubmit={handleAddNote}
      className="m-auto mt-10 w-fit flex flex-col items-end gap-5 "
    >
      <textarea
        cols={55}
        rows={4}
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
  );
}

export default Test;
