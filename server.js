const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Nexora Digital’s helpful assistant. Be concise, professional, and explain Nexora services clearly.' },
        { role: 'user', content: message }
      ]
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI error:', error.message);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

app.get('/', (req, res) => res.send('NexoraBot backend is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));