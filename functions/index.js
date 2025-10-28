// Import v2 functions
const {onRequest} = require("firebase-functions/v2/https");
// Import the new way to define parameters
const {defineString} = require("firebase-functions/params");

const axios = require("axios");

// Define the API key as a parameter.
// The function will look for an environment variable named 'GEMINI_KEY'.
// This variable is set by your new .env.portfolio-da68d file during deploy.
const geminiApiKey = defineString("GEMINI_KEY");

exports.askGemini = onRequest(
  // Set CORS options for v2. This allows your website to call the function.
  // It allows your GitHub page, your local test server, and the Firebase emulator.
  { cors: [/mudlbum\.github\.io$/, /127\.0\.0\.1:5500$/, /localhost:5000$/] },
  
  async (request, response) => {
    try {
      // Access the API key's value
      const apiKey = geminiApiKey.value();

      if (!apiKey) {
        throw new Error("API key is not set. Set the GEMINI_KEY environment variable in your .env file and redeploy.");
      }

      // The Gemini API URL
      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      
      const payload = request.body; // Get the payload from the client
      
      // Call the Gemini API
      const apiResponse = await axios.post(geminiApiUrl, payload);
      
      // Send the response from Gemini back to the client
      response.json(apiResponse.data);

    } catch (error) {
      console.error("Error calling Gemini API:", error.message);
      response.status(500).send(`Error: Could not process your request. ${error.message}`);
    }
  }
);

