import './App.css';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

const router_hostname = process.env.REACT_APP_ROUTER_HOSTNAME || 'localhost'
const router_port = process.env.REACT_APP_ROUTER_PORT || 1234

const Action = {
  Start: 'START',
  Pause: 'PAUSE',
  Cancel: 'CANCEL',
  FINISHED: 'FINISHED'
}

const Label = {
  START: 'In Progress',
  PAUSE: 'Paused',
  CANCEL: 'Stopped',
  FINISHED: 'Finished'
}

const LIMIT = 100
const conn = new WebSocket(`ws://${router_hostname}:${router_port}`);

const handleAction = (set, action) => {
  console.log('handling action:', action)
  set(action)
  if (action === Action.FINISHED) {
    return
  }
  conn.send(action)
}

function App() {
  const [action, setAction] = useState(Action.Cancel)
  const [label, setLabel] = useState(Label.CANCEL)
  const [sum, setSum] = useState(0)

  conn.onmessage = event => {
    event.data.text().then(text => setSum(text))
  }

  useEffect(() => {
    setLabel(Label[action])
  }, [action])

  useEffect(() => {
    if (parseInt(sum) >= LIMIT) {
      handleAction(setAction, Action.FINISHED)
    }
  }, [sum])

  return (
    <div className="App">
      <header className="App-header">
        <Grid>
          <Grid className='Container'>
            <h1>{label}</h1>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => handleAction(setAction, Action.Start)}>Start</Button>
              <Button onClick={() => handleAction(setAction, Action.Pause)}>Pause</Button>
              <Button onClick={() => handleAction(setAction, Action.Cancel)}>Cancel</Button>
            </ButtonGroup>
          </Grid>
          <Grid container className='Container'>
            <Grid xs={6} item><p>Output:</p></Grid>
            <Grid xs={6} item><p>{sum}</p></Grid>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
