const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 3000;

// JSON డేటాను పార్స్ చేయడానికి మిడిల్‌వేర్
app.use(express.json());

// నోటిఫికేషన్ డేటాను స్వీకరించే ఎండ్‌పాయింట్
app.post('/log-notification', async (req, res) => {
  try {
    const notificationData = req.body;
    console.log('స్వీకరించిన నోటిఫికేషన్:', notificationData);

    // ఫైల్‌లో సేవ్ చేయడం (పర్సిస్టెంట్ స్టోరేజ్ కోసం డేటాబేస్ ఉపయోగించవచ్చు)
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(notificationData)}\n`;
    await fs.appendFile('logs.txt', logEntry).catch(err => {
      console.error('లాగ్ ఫైల్‌లో రాయడంలో లోపం:', err);
    });

    res.status(200).json({ message: 'నోటిఫికేషన్ విజయవంతంగా లాగ్ చేయబడింది' });
  } catch (error) {
    console.error('నోటిఫికేషన్ లాగ్ చేయడంలో లోపం:', error);
    res.status(500).json({ message: 'నోటిఫికేషన్ లాగ్ చేయడంలో లోపం' });
  }
});

// ఆరోగ్య తనిఖీ ఎండ్‌పాయింట్
app.get('/', (req, res) => {
  res.status(200).json({ message: 'సర్వర్ నడుస్తోంది' });
});

// సర్వర్ ప్రారంభం
app.listen(port, () => {
  console.log(`సర్వర్ పోర్ట్ ${port}లో నడుస్తోంది`);
});
