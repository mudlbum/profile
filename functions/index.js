/*
* This is the code for your Firebase Cloud Function.
* It lives in the `functions/index.js` file.
*/

const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });

// This is your new secure endpoint
exports.askGemini = functions.https.onRequest((req, res) => {
  // Use cors to handle security rules
  cors(req, res, async () => {
    try {
      // 1. Get the secret API key from Firebase configuration
      const geminiApiKey = functions.config().gemini.key;

      // 2. This is the official Gemini API URL
      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

      // 3. Get the message history ('contents') from the website's request
      const contents = req.body.contents;

      if (!contents) {
        res.status(400).send("Error: 'contents' are missing from the request body.");
        return;
      }

      // 4. Call the Gemini API from the server, adding the secret key
      const geminiResponse = await axios.post(geminiApiUrl, {
        contents: contents,
      });

      // 5. Send the response from Gemini back to your website
      res.status(200).send(geminiResponse.data);
    } catch (error) {
      console.error("Error calling Gemini API:", error.response ? error.response.data : error.message);
      res.status(500).send("Error: Could not get a response from the AI.");
    }
  });
});
