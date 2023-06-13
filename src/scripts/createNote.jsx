import getDate from "./scripts/getDate";

function createNote() {
  const note = {
    name: "New Note",
    contents: [(title = ""), (date = getDate()), (text = "")],
  };
  return note;
}

export default createNote;
