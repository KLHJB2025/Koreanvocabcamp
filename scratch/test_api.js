async function testGet() {
    const systemPrompt = `You are a creative writer. Write a short, engaging story or dialogue in Chinese (max 180 words) that naturally includes these exact terms: "镜子", "警察局", "高速巴士". 
Return ONLY a JSON object in this format: { "title": "story title", "story": "story text" }.`;

    const userPrompt = `Write a coherent, creative short story containing: "镜子", "警察局", "高速巴士".`;
    const url = `https://text.pollinations.ai/${encodeURIComponent(userPrompt)}?system=${encodeURIComponent(systemPrompt)}&jsonMode=true`;
    console.log("Testing GET URL:", url);
    try {
        const response = await fetch(url);
        console.log("GET Status:", response.status);
        const text = await response.text();
        console.log("GET Response body:", text);
    } catch (e) {
        console.error("GET Error:", e);
    }
}

async function testPost() {
    const systemPrompt = `You are a creative writer. Write a short, engaging story or dialogue in Chinese (max 180 words) that naturally includes these exact terms: "镜子", "警察局", "高速巴士". 
Return ONLY a JSON object in this format: { "title": "story title", "story": "story text" }.`;

    const userPrompt = `Write a coherent, creative short story containing: "镜子", "警察局", "高速巴士".`;
    const payload = {
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: userPrompt
            }
        ],
        jsonMode: true
    };
    try {
        console.log("Testing POST...");
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        console.log("POST Status:", response.status);
        const text = await response.text();
        console.log("POST Response body:", text);
    } catch (e) {
        console.error("POST Error:", e);
    }
}

async function run() {
    await testGet();
    console.log("\n-------------------\n");
    await testPost();
}

run();
