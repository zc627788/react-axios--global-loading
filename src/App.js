import logo from './logo.svg';
import './App.css';
import AXIOS from './service/AxiosInstance'
import axios from 'axios'

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
function App() {
  const request = (params)=>{
    // NProgress.start()
    console.log('123123', 123123)
    AXIOS.get('/').then((response)=>console.log('response', response))

    AXIOS.get('/setTimeout').then((response)=>console.log('response', response))

  }
  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={()=>request('none')}>全局loading</button>

      </header>
    </div>
  );
}

export default App;
