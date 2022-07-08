const drumSounds = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App() {
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      playSound(e.key.toLocaleUpperCase());
    });
  }, []);


  const playSound = (e) => {
    const audio = document.getElementById(e);
    audio.play();
    setPressed(e);
    setTimeout(() => setPressed(false), 100);
  }


  return (
    <div id="drum-machine" className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drum Machine</h1>
      <div id="display">{pressed}</div>
      {drumSounds.map(sound => (
        <div key={sound.id} className={`btn btn-secondary drum-pad`} id={sound.id} onClick={() => playSound(sound.keyTrigger)}>
          <audio id={sound.keyTrigger} className="clip" src={sound.url} />
          {sound.keyTrigger}
        </div>
      ))}
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));