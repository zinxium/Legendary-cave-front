import './App.css';
import AppRoutes from './routes/routes';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
