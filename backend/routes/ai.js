const express = require('express');
const router = express.Router();

// نقطة نهاية وهمية للذكاء الاصطناعي
router.post('/', (req, res) => {
  const { message } = req.body;
  // رد افتراضي (سيتم ربطه لاحقًا بـ LLM حقيقي)
  res.json({ reply: `رد ذكي على: ${message}` });
});

module.exports = router;
