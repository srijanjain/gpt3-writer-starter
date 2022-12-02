import Head from 'next/head';
import Image from 'next/image';
// import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Lyric Generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Make new songs</h1>
          </div>
          <div className="header-subtitle">
            <h2>Enter the topic and the artist to take inspiration from</h2>
          </div>
          <div className="header-subtitle">
          <h4>Example:</h4>
            <h4>Heartbreak by Taylor Swift</h4>
            <h4>Police by Snoop Dogg</h4>
            <h4>Inflation by Atif Aslam in Hindi</h4>
            <h4>Toxicity of Social media by Gulzaar in Hindi</h4>
          </div>
        </div>
      </div>
      <div className="prompt-container">
          <textarea placeholder="start typing here" 
          className="prompt-box" value={userInput} 
          onChange={onUserChangedText} />

          <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
          {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      <div className="badge-container grow">
        <a
          href="https://srijanja.in/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={buildspaceLogo} alt="buildspace logo" /> */}
            <p>Made by Srijan</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
