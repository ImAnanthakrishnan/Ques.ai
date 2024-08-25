import React from 'react'

type PropsType = {
  _id:string;
  name:string;
  transcript:string;
  updatedAt:Date
}[] | undefined;
const Table = ({datas}:{datas:PropsType}) => {
  return (
<section className='upload-table'>
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
        {
          datas?.map((ele,index) => (
            <tr key={ele._id}>
            <td>{index+1}</td>
            <td>{ele.name}</td>
            <td>25 Oct 23 | 09:04</td>
            <td>
              <button>View</button>
              <button>Delete</button>
            </td>
          </tr>
          ))
      }
      </tbody>
    </table>
  </div>
</section>

  )
}

export default Table
