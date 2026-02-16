# Message Helper - Gentle Communication Bridge

A compassionate web app that helps reframe text messages for people with BPD, PMDD, autism, and trauma.

## Features
- Reframes harsh or triggering messages into gentler interpretations
- Provides 3 suggested response options
- Calming, accessible design
- Works on any device

## Deploy to Vercel

### 1. Upload to GitHub
1. Create a new repository on GitHub
2. Upload these files:
   - `index.html`
   - `api/reframe.js`
   - `package.json`

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will auto-detect the setup

### 3. Add Environment Variable
⚠️ **CRITICAL STEP** - Without this, the app won't work:

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add a new variable:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key (get one at console.anthropic.com)
   - **Environment**: Production, Preview, Development (check all)
4. Click "Save"
5. Go to "Deployments" tab and click "Redeploy" on the latest deployment

### 4. Test It
Once redeployed, visit your Vercel URL and test with a sample message!

## Local Development
```bash
npm install -g vercel
vercel dev
```

Then visit http://localhost:3000

## Getting an Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to "API Keys"
4. Create a new key
5. Copy it and add to Vercel environment variables

## Privacy Note
Messages are processed through Claude AI but are not stored or used for training.
