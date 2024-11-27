// src/pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateAdvice } from '@/services/AIService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, userId } = req.body;
  try {
    const advice = await generateAdvice(query, userId);
    res.status(200).json({ advice });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
