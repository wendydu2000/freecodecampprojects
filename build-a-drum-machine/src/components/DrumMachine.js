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
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handlePlay (event, soundKey, soundName) {
      this.setState( {
        currentPlayName: soundName
      })
      const sound = document.getElementById(soundKey);
      sound.play();
  }

  handleKeyPress (event) {
    let soundData = this.state.data.filter( sound => 
      sound.padKey === String.fromCharCode(event.keyCode));
    if (soundData.length !== 0) {
      this.setState( {
        currentPlayName: soundData[0].soundName
      });
      const sound = document.getElementById(soundData[0].padKey);
      sound.play();
    }
  }

  render() {
    return (
      <div className="container drumContainer border mt-5 ">
          <div className="row">
            <h1 className="m-4">Drum Machine</h1>
          </div>
          <div id="drum-machine" className="row justify-content-md-center border p-2">
            <div className="col-8">
              { this.state.data.map ( (sound, index) => {
                let playKey = sound.padKey;
                let soundName = sound.soundName;
                return (
                  <button 
                    className="drum-pad bg-info" 
                    key={sound.padKey} 
                    id={sound.soundName}
                    onClick={((e) => this.handlePlay(e,playKey,soundName))}
                  >{sound.padKey}
                    <audio id={sound.padKey} 
                      src={sound.soundUrl}
                      className="clip"
                    >
                    </audio>
                  </button>
                )
              })}
            </div>
            <div id="display" className="col-4 bg-warning border displayDiv p-3">
              <strong>Sound Name:</strong>
              <p>{this.state.currentPlayName}</p>
            </div>
          </div>
      </div>
    )
  }
}

export default DrumMachine;