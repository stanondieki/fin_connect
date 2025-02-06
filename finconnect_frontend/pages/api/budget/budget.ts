// src/pages/api/budget.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { saveBudget, getBudget } from '@/services/BudgetService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { income, expenses, userId } = req.body;
    try {
      const budgetData = await saveBudget(userId, income, expenses);
      res.status(200).json(budgetData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save budget' });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;
    try {
      const budgetData = await getBudget(userId as string);
      res.status(200).json(budgetData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve budget' });
    }
  }
}
