import "./App.css";
import Footer from "./Routes/Footer";
import Navbar from "./Routes/Navbar";
import Router from "./Routes/Router";

function App() {
  const cw = window.location.href;
  if (cw.includes("admin")){
    return (<div className="App"><Router /></div>)
  }
  return (
    <div className="App">
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;