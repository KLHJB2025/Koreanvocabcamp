async function test() {
    const wordListStr = '"决心", "烦恼", "江", "小狗", "狗", "头", "猫", "秋天", "苦恼"';
    
    // We want the story in Chinese
    const payload = {
        model: "openai", // or not specified
        messages: [
            {
                role: "system",
                content: "You are a creative writer. Write a short, engaging story or dialogue in Chinese (max 120 words) that naturally includes these exact terms: \"决心\", \"烦恼\", \"江\", \"小狗\", \"狗\", \"头\", \"猫\", \"秋天\", \"苦恼\". You must output a JSON object in this format: { \"title\": \"story title\", \"story\": \"story text\" }. No markdown, no extra explanation, just raw JSON."
            },
            {
                role: "user",
                content: "Write the story now."
            }
        ],
        response_format: { type: "json_object" }
    };
    
    console.log("Sending POST to chat/completions...");
    const start = Date.now();
    try {
        const res = await fetch("https://text.pollinations.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Time taken:", Date.now() - start, "ms");
        console.log("Data keys:", Object.keys(data));
        console.log("Message content:", data.choices?.[0]?.message?.content);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
