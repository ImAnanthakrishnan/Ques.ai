import React from "react";
import { convertTime } from "../../utils/helper";
import { handleDelete } from "../../utils/actions";
import { useAppSelector } from "../../app/hooks";

export type PropsType =
  | {
      _id: string;
      name: string;
      transcript: string;
      updatedAt: string;
    }[]
  | undefined;
const Table = ({
  datas,
  setView,
  setTranscript,
  setId,
  setTrigger
}: {
  datas: PropsType;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  setId : React.Dispatch<React.SetStateAction<string>>;
  setTrigger:React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 const {token} = useAppSelector(data => data.user);
  const handleView = (transcript:string,id:string) => {
    setView(true);
    setId(id);

    setTranscript(transcript);
  }

  const handleDeleteEpisode = async(id:string) => {
    try{
      const result = await handleDelete(id,token);
      if(result){
        setTrigger(true);
        alert("successfully deleted");
      } 
    }catch(error){
      alert('Failed to delete');
    }  
  }

  return (
    <section className="upload-table">
      <h2>Your Files</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Upload Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((ele, index) => (
              <tr key={ele._id}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{convertTime(ele.updatedAt)}</td>
                <td>
                  <button onClick={() => handleView(ele.transcript,ele._id)}>View</button>
                  <button onClick={() => handleDeleteEpisode(ele._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default React.memo(Table);
