// API وهمي للمعاملات (لأغراض لوحة التحكم)
import type { NextApiRequest, NextApiResponse } from 'next';

const mockTransactions = [
  { id: 1, property: 'شقة فاخرة قرب المدارس', user: 'أحمد', amount: '2 ETH', status: 'مكتملة' },
  { id: 2, property: 'فيلا حديثة في التجمع', user: 'سارة', amount: '5 ETH', status: 'قيد التنفيذ' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(mockTransactions);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
