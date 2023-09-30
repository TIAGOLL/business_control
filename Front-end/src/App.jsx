import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <RoutesApp />
      </Provider>
    </BrowserRouter>
  )
}

export default App
