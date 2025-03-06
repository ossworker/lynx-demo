import './App.css';
import '@lynx-js/web-core/index.css';
import '@lynx-js/web-elements/index.css';
import '@lynx-js/web-core';

const App = () => {
  return (
    <lynx-view url='/main.web.bundle?fullScreen=true'  globalProps={{}} style={{height: '100vh', width: '100vw'}}>
  </lynx-view>
  );
};



export default App;