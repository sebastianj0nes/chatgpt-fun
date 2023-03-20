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
            // Generate a short, smooth pickup line as if you were a goofy slightly cringe american pimp, using american slang, limit prose, don't start with hey and less cringe
            // smooth pickup line as if you were a rude australian geezer looking to have a great night in the beach,
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": " Generate a short, smooth pickup line as if you were a goofy slightly cringe american pimp, using american slang, limit prose, don't start with hey and less cringe" }],
                temperature: 1,
            });

            // Initialise generated text using response from API call
            const generatedText = response.data.choices[0].message.content;
            // Set pickup line with generated text 
            setPickupLine(generatedText);
        } catch (err) {
            console.error(err);
        }
    }

    // Generate Image method
    const generateImage = async () => {

        try {
            // Create image api call
            const response = await openai.createImage({
                prompt: "Slightly creepy pepe meme face 3d version ",
                n: 1,
                size: "512x512"
            })
            console.log(response);
            // Initialise image url with generated response from API
            const image_url = response.data.data[0].url;
            // Set image url with response
            setImage(image_url);

        } catch (err) {
            console.error(err);
        }
    }

    // Join functions together to allow to load simultaenously on one button click
    const generateAI = function () {
        // Call both generate functions
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
                <img src={image} alt="Pepe"></img>
            </div>
        </div>

    )

}

export default ChatGPT;