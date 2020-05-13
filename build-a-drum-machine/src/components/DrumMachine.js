import React from 'react';
import './DrumMachine.css'; 

const sounds = [
  {
    soundName: 'Heater-1',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    padKey: 'Q'
  },
  {
    soundName: 'Heater-2',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    padKey: 'W'
  },
  {
    soundName: 'Heater-3',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    padKey: 'E'
  },
  {
    soundName: 'Heater-4_1',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    padKey: 'A'
  },
  {
    soundName: 'Heater-6',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    padKey: 'S'
  },
  {
    soundName: 'Dsc_Oh',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    padKey: 'D'
  },
  {
    soundName: 'Kick_n_Hat',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    padKey: 'Z'
  },
  {
    soundName: 'RP4_KICK_1',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    padKey: 'X'
  },
  {
    soundName: 'Cev_H2',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    padKey: 'C'
  }
];

class DrumMachine extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: sounds,
      currentPlayName: ''
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleButtonStyle = this.handleButtonStyle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handlePlay (event, soundData) {
    this.setToPlay(soundData);
  }

  handleKeyPress (event) {
    let soundData = this.state.data.filter( sound => 
      sound.padKey === String.fromCharCode(event.keyCode));
    if (soundData.length !== 0) {
      this.setToPlay(soundData[0]);
    }
  }

  setToPlay (soundData) {
    this.setState( {
      currentPlayName: soundData.soundName
    })
    this.handleButtonStyle(soundData.soundName);
    const sound = document.getElementById(soundData.padKey);
    sound.play();

    // ****** better to use code below to play the audio, but will be fail in FreeCodeCamp test if you use it. Just for your information.

    // sound.load();
    // fetch(`${soundData.soundUrl}`)
    //     .then(response => response.blob())
    //     .then(blob => {
    //         sound.play();
    //     })
    //     .catch(e => {
    //           // Video playback failed ;(
    //     });
  }

  handleButtonStyle (ButtonId) {
    document.getElementById(ButtonId).style = "color: orange; border: 3px solid orange;";
      
    setTimeout(() => {
      document.getElementById(ButtonId).style = "color: black; border: None;";
    }, 200);
  }

  render() {
    return (
      <div className="container drumContainer border border-danger mt-5">
          <div className="row bg-dark text-light">
            <h1 className="m-4">Drum Machine</h1>
          </div>
          <div id="drum-machine" className="row justify-content-md-center p-4 bg-dark">
            <div className="col-8">
              { this.state.data.map ( (sound, index) => {
                return (
                  <button 
                    className="drum-pad bg-gradient-primary" 
                    key={sound.padKey} 
                    id={sound.soundName}
                    onClick={((e) => this.handlePlay(e,sound))}
                  >{sound.padKey}
                    <audio 
                      preload="auto" 
                      id={sound.padKey} 
                      src={sound.soundUrl}
                      className="clip"
                    >
                    </audio>
                  </button>
                )
              })}
            </div>
            <div id="display" className="col-4 border text-light displayDiv p-3">
              <strong>Sound Name:</strong>
              <p>{this.state.currentPlayName}</p>
            </div>
          </div>
      </div>
    )
  }
}

export default DrumMachine;