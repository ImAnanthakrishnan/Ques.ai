import { IoIosAddCircleOutline } from "react-icons/io"

const CreateBtn = ({setShow}:{setShow:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <>
      <button className='home-create-btn' onClick={()=>setShow(true)}>{<IoIosAddCircleOutline size={30}  style={{marginRight:'8px'}}/>}Create New Project</button> 
    </>
  )
}

export default CreateBtn
