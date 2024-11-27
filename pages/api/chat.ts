import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define the handler with proper types 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userMessage } = req.body;  // body contains the expected userMessage

      const openAIResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions', // API URL
        {
          model: 'gpt-3.5-turbo',  
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: userMessage,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiMessage = openAIResponse.data.choices[0].message.content;

      // Return the AI's response to the frontend
      res.status(200).json({ message: aiMessage });

    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
