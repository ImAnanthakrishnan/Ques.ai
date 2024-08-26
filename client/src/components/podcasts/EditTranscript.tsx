import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { handleUpdate } from "../../utils/actions";
import { useAppSelector } from "../../app/hooks";

const EditTranscript = ({
  transcript,
  setClick,
  setView,
  setTranscript,
  id,
  project,
}: {
  transcript: string;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  project: string | undefined;
}) => {
  const {token} = useAppSelector(data => data.user);
  const [edit, setEdit] = useState<boolean>(false);
  const [currentTranscript, setCurrentTranscript] =
    useState<string>(transcript);

  const handleSave = async () => {
    setEdit(false);

    //saving
    try {
      const result = await handleUpdate(currentTranscript, id, project,token);
      console.log(result);
      alert("Successfully updated");
      setTranscript(result.data.transcript);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscard = () => {
    setEdit(false);

    setCurrentTranscript(transcript);
  };

  return (
    <section className="transcript-container">
      <header className="transcript-header">
        <div
          onClick={() => {
            setView(false), setClick(true);
          }}
        >
          <FaArrowLeftLong size={30} /> <h2>Edit Transcript</h2>
        </div>
        {!edit ? (
          <button onClick={() => setEdit(true)}>Edit</button>
        ) : (
          <div>
            <button className="discard-btn" onClick={handleDiscard}>
              Discard
            </button>
            <button onClick={() => handleSave()}>Save</button>
          </div>
        )}
      </header>
      <section className="transcript-content">
        <h5>Speaker</h5>
        <div className="transcript-btn">
          {edit ? (
            <textarea
              value={currentTranscript}
              onChange={(e) => setCurrentTranscript(e.target.value)}
              rows={10}
              cols={50}
            ></textarea>
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>{transcript}</div>
          )}
        </div>
      </section>
    </section>
  );
};

export default React.memo(EditTranscript);
