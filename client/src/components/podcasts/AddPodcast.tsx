
import upload from '../../assets/images/Vector.png'
const AddPodcast = () => {
  return (
    <section className='podcasts-upload'>
        <div className='podcasts-upload-image'>
            <img src={upload} alt="upload" />
        </div>
        <h4>Select a file or drag and drop here (Podcast Media or Transcription Text)</h4>
        <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </p>
        <button>Select File</button>
    </section>
  )
}

export default AddPodcast
