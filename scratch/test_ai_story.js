async function test() {
    const payload = {
        messages: [
            {
                role: 'system',
                content: 'You are a story writer. Write a JSON object with "title" and "story" containing specific words.'
            },
            {
                role: 'user',
                content: 'Write a short story in Chinese containing: "镜子", "警察局", "高速巴士". Format as raw JSON only.'
            }
        ],
        jsonMode: true
    };
    
    try {
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Response text:", text);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
