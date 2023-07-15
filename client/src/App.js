import React from "react";
import { Signup } from './components';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
}));

function App() {
  return (
    <div className="App">
      <Signup/>
    </div>
  );
}

export default App;
