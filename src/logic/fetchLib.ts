import { setPatternLibrary,} from "./patternsCache.js";
async function fetchLib() {
    let patterns = [];
    if (!window.Worker) {
        try {
            const response = await fetch('http://localhost:3000/pattern_lib');
            if (!response.ok) throw new Error('Network response was not ok');
            patterns = await response.json()
            setPatternLibrary(patterns);
        } catch (error) {
            console.error('Failed to fetch patterns:', error);
            setPatternLibrary([]);
        }
    } else {
        const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module'});

        worker.postMessage({ action: 'fetch_patterns'});

        worker.onmessage = (e) => {
            console.log('Main: message received from worker', e.data);
            setPatternLibrary(e.data.patterns);
        }
    }
}

export default fetchLib;