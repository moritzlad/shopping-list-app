import express from 'express';
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config()
console.log("API Key: ", process.env.ANTHROPIC_API_KEY ? "yes" : "no")
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});



const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());

function createMessage(message: string): Anthropic.Messages.MessageCreateParams {
    const categorizationMessage: Anthropic.Messages.MessageCreateParams = {
        model: "claude-sonnet-4-0",
        max_tokens: 2048,
        system: fs.readFileSync(path.join(__dirname, "system_prompt.txt"), "utf-8"),
        messages: [
            { role: "user", content: message }
        ]
    };

    return categorizationMessage;
}

app.post("/categorize", async (req, res) => {
    try {
        console.log("Requested categorization for: ", JSON.stringify(req.body))
        const messageParams = createMessage(JSON.stringify(req.body));
        const response = await anthropic.messages.create(messageParams);
        console.log("Recieved categorization request")
        if ('content' in response && response.content[0]) {
            const contentBlock = response.content[0];
            if (contentBlock.type === 'text') {
                const jsonContent = contentBlock.text;
                console.log("Answered with: ", jsonContent)
                const parsedResult = JSON.parse(jsonContent);
                res.json(parsedResult);
            } else {
                res.status(500).json({ error: 'Expected text content block' });
            }
        } else {
            res.status(500).json({ error: 'Unexpected response format' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to categorize' });
    }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
