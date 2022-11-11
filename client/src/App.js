import logo from './logo.svg';
import './App.css';
import { Landing } from './components/landing/Landing';

import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
