import React from "react";
import { Navbar, Footer } from './components';
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
      <Navbar/>
    </div>
  );
}

export default App;
