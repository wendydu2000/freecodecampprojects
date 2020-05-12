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
  // ,
  // {
  //   soundName: 'Chord_1',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'Chord_2',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'Chord_3',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'Give_us_a_light',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'Dry_Ohh',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'Bld_H1',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'punchy_kick_1',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'side_stick_1',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  //   padKey: 'Q'
  // },
  // {
  //   soundName: 'Brk_Snr',
  //   soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  //   padKey: 'Q'
  // }
]
class DrumMachine extends React.Component {

  render() {
    return (
      <div className="container drumContainer border mt-5 ">
          <div className="row">
            <h1>Drum Machine</h1>
          </div>
          <div id="drum-machine" className="row justify-content-md-center border p-2">
            <div className="col-8">
              { sounds.map ( (sound, index) => {
                return (
                  <button className="drum-pad bg-info" key={sound.padKey} id={index}>{sound.padKey}
                    <audio id={sound.soundName} 
                      src={sound.soundUrl}
                      className="clip"
                    >
                    </audio>
                  </button>
                )
              })}
            </div>
            <div id="display" className="col-4 bg-warning border">
              display
            </div>
          </div>
      </div>
    )
  }
}

export default DrumMachine;