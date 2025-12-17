import Main from './Components/Main';
import place_data from "./Scripts/place_data";
import Header from "./Components/Header";
import './Styles/main.css'
import './Styles/general.css'


function App() {
    return (
      <>
        <Header />
        <main  className="main"><Main /></main>
      </>
)
}  

export default App;