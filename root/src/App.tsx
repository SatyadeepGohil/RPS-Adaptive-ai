import MainMenu from "./MainMenu";
import { Routes, Route} from 'react-router-dom';

function App () {
    return (
        <Routes>
            <Route path="/" element={<MainMenu />}/>
        </Routes>
    )
}

export default App;