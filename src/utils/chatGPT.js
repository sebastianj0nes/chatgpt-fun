import { useState } from "react";
import env from "react-dotenv";
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: env.REACT_APP_API_KEY,
})
const openai = new OpenAIApi(configuration);

// ChatGPT function
function ChatGPT() {
    // Getters/Setters of response
    const [pickupLine, setPickupLine] = useState(null);
    const [image, setImage] = useState(null);

    // Generate Pickup Line method
    const generatePickupLine = async () => {
        try {

            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": "Generate a short, smooth pickup line as if you were a goofy slightly cringe american pimp, using american slang, limit prose, don't start with hey" }],
                temperature: 1,
            });

            console.log(pickupLine);
            const generatedText = response.data.choices[0].message.content;
            setPickupLine(generatedText);
        } catch (err) {
            console.error(err);
        }
    }

    // Generate Image method
    const generateImage = async () => {

        try {
            const response = await openai.createImage({
                prompt: "Pepe meme face",
                n: 1,
                size: "512x512"
            })
            console.log(response);
            const image_url = response.data.data[0].url;
            setImage(image_url);

        } catch (err) {
            console.error(err);
        }
    }

    const generateAI = function () {
        generateImage();
        generatePickupLine();
    }

    return (
        <div className="text-center">
            <div className="">
                <button className="btn btn-primary" onClick={generateAI}>Click me for a response</button>
                <p>Here's your pickup line: </p>
                <h2>{pickupLine}</h2>
            </div>
            <div className="text-center">
                <img src={image}></img>
            </div>
        </div>

    )

}

export default ChatGPT;