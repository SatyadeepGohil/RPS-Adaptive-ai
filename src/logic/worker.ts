let pattern_library = [];

onmessage = async (e) => {
    console.log('Worker: Message received from main script', e.data);
    const { action } = e.data;

    if (action === 'fetch_patterns') {
        const t1 = performance.now();

        try {
            const response = await fetch('http://localhost:3000/pattern_lib');
            if (!response.ok) throw new Error('Network response was not ok');
            pattern_library = await response.json();

            const t2 = performance.now();

            postMessage({
                status: 'done',
                patterns: pattern_library,
                timeTaken: (t2 - t1).toFixed(2) + 'ms'
            });
        } 
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Failed to fetch patterns:", error.message);
                postMessage({
                    status: "error",
                    message: error.message,
                    patterns: [],
                });
            } else {
                console.error("Unknown error:", error);
                postMessage({
                    status: "error",
                    message: String(error),
                    patterns: [],
                });
            }
        }
    }
}