import { Routes, Route} from 'react-router-dom';
import MainMenu from "./MainMenu";
import ClassicMode from './ClassicModePage';

function App () {
    return (
        <Routes>
            <Route path="/" element={<MainMenu />}/>
            <Route path="/classic-mode" element={<ClassicMode />} />
        </Routes>
    )
}

export default App;