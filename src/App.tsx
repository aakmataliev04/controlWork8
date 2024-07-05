import './App.css';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import AddQuote from './containers/AddQuote/AddQuote';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={'/'} element={<Home />}></Route>
          <Route path={'/quotes'} element={<Home />}></Route>
          <Route path={'/quotes/:category'} element={<Home />}></Route>
          <Route path={'/add-quote'} element={<AddQuote />}></Route>
          <Route path={'/quotes/:id/edit'} element={<AddQuote />}></Route>
          <Route path="*" element={<h1>Not found!</h1>}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
