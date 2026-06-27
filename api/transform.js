export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { prompt } = req.body;
    const apiKey = process.env.BYNARA_API_KEY; 

    try {
        const aiResponse = await fetch("https://router.bynara.id/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "mimo-v2.5-pro-free",
                messages: [
                    { role: "system", content: "You are an assistant that rewrites text to sound perfectly professional for corporate emails." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await aiResponse.json();
        const aiReply = data.choices[0].message.content;
        return res.status(200).json({ result: aiReply });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}