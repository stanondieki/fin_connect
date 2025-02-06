import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'OpenAI API key is missing.' });
  }
  if (req.method === 'POST') {
    try {
      const { userMessage } = req.body;

      if (!userMessage) {
        return res.status(400).json({ error: 'User message is required.' });
      }

      
      const openAIResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage },
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
      res.status(200).json({ message: aiMessage });

    } catch (error) {
      // Use a type guard to ensure error is an instance of AxiosError or a generic Error
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        res
          .status(error.response?.status || 500)
          .json({ error: error.response?.data || 'An error occurred with the OpenAI API.' });
      } else if (error instanceof Error) {
        console.error('General error:', error.message);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
}
