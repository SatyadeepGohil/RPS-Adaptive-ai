async function getPatterns() {
    try {
        const response = await fetch('http://localhost:3000/pattern_lib');
        if (!response.ok) throw new Error('Network response was not ok');

        const patterns = await response.json();
        console.log('Patterns:', patterns);

        return patterns;
    } catch (error) {
        console.error('Falied t ofetch patterns:', error);
        return [];
    }
}

let SequencePatterns = getPatterns();