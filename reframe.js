export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a compassionate communication helper for someone with BPD, PMDD, and trauma history who sometimes experiences emotional dysregulation and splitting (seeing things as all good or all bad).

Original message received:
"${message}"

Please provide:

1. A GENTLER INTERPRETATION (2-3 sentences):
Reframe this message by:
- Removing harsh tone while keeping the actual meaning
- Converting absolutes (always/never) to specific instances
- Assuming good intent where possible
- Acknowledging the sender might be stressed or frustrated too
- Being honest about genuine concerns but softening delivery

2. THREE RESPONSE OPTIONS labeled as:
- OPTION 1: [Brief label like "Set a boundary" or "Ask for clarity"]
[The actual response text]

- OPTION 2: [Brief label]
[The actual response text]

- OPTION 3: [Brief label]
[The actual response text]

Make responses range from self-protective to warm, giving options for different emotional states.

Format as:
REFRAME: [your reframed interpretation]

OPTION 1: [label]
[response text]

OPTION 2: [label]
[response text]

OPTION 3: [label]
[response text]`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const fullText = data.content.map(item => item.type === 'text' ? item.text : '').join('\n');
    
    res.status(200).json({ result: fullText });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process message', details: error.message });
  }
}
