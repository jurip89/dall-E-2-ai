import { useState } from 'react'
import { Configuration,OpenAIApi } from 'openai'
import './App.css'
console.log(import.meta.env.VITE_API_KEY)
function App() {
  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState([])
  const configuration = new Configuration({
    apiKey:import.meta.env.VITE_API_KEY 
  })
  const openai = new OpenAIApi(configuration)
  const generateImage = async() => {
    const imgParams = {
      prompt: text,
      n: 1,
      size:'256x256'
    }
    const res = await openai.createImage(imgParams);
    console.log(res.data.data[0].url)
    const newImgs = [...imageUrl,res.data.data[0].url]
    setImageUrl(newImgs)
    setText('')
  }
  
  return (
    <div className="App">
      <h1>Generate your Image</h1>
      <h2>As best you describe as better the image will be</h2>
      <input type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='try: Painting of a turtole ating a pizza!'
        size={70} />
      <br />
      <button onClick={generateImage}>Generate!</button>
      <br />
      <div className='imgs-container'>
        {imageUrl.length >0 && imageUrl.map((el,i)=><img key={i} src={el} alt='Looser!' />)}
      </div>
      
    </div>
  )
}

export default App
