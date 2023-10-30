import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
import { Provider } from 'react-redux'
import store from './redux/app/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/auth'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <RoutesApp />
          <ToastContainer autoClose={3000} />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
