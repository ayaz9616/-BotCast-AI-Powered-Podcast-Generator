<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BotCast - AI-Powered Podcast Platform</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
      max-width: 900px;
      color: #222;
    }
    h1, h2, h3 {
      color: #0d6efd;
    }
    pre {
      background: #f4f4f4;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      font-family: Consolas, monospace;
      background: #f4f4f4;
      padding: 2px 4px;
      border-radius: 3px;
    }
    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 30px 0;
    }
    ul {
      list-style-type: disc;
      margin-left: 20px;
    }
  </style>
</head>
<body>
  <h1>BotCast - AI-Powered Podcast Platform</h1>

  <p>BotCast is a modern, full-stack web application that enables users to create, customize, and publish podcasts using advanced AI technologies. It features a sleek neon-themed UI and leverages ElevenLabs, HuggingFace, and OpenAI APIs to generate podcast audio and thumbnails, while also supporting manual uploads for maximum flexibility.</p>

  <hr />

  <h2>Table of Contents</h2>
  <ul>
    <li>Introduction</li>
    <li>Tech Stack</li>
    <li>Features</li>
    <li>Quick Start</li>
    <li>Assets</li>
  </ul>

  <hr />

  <h2>Introduction</h2>
  <p>BotCast is a cutting-edge AI SaaS platform that allows users to create, discover, and enjoy podcasts with advanced capabilities such as multi-voice AI text-to-speech conversion, AI-powered podcast thumbnail generation, and seamless playback functionality.</p>

  <hr />

  <h2>Tech Stack</h2>
  <ul>
    <li>Next.js</li>
    <li>TypeScript</li>
    <li>Convex</li>
    <li>OpenAI</li>
    <li>Clerk</li>
    <li>ShadCN UI</li>
    <li>Tailwind CSS</li>
  </ul>

  <hr />

  <h2>Features</h2>
  <ul>
    <li>Secure and reliable user authentication</li>
    <li>Trending podcasts showcase with sticky podcast player</li>
    <li>Dedicated podcast discovery page</li>
    <li>Fully functional search for podcasts</li>
    <li>Podcast creation with AI text-to-audio and image generation</li>
    <li>Support for multiple AI-generated voices</li>
    <li>Profile page displaying all created podcasts</li>
    <li>Detailed podcast pages with transcripts and listener stats</li>
    <li>Responsive design for all device sizes</li>
  </ul>

  <hr />

  <h2>Quick Start</h2>

  <h3>Prerequisites</h3>
  <p>Ensure the following are installed on your machine:</p>
  <ul>
    <li>Git</li>
    <li>Node.js</li>
    <li>npm (Node Package Manager)</li>
  </ul>

  <h3>Clone the repository</h3>
  <pre><code>git clone https://github.com/ayaz9616/-BotCast-AI-Powered-Podcast-Generator.git
cd botcast</code></pre>

  <h3>Install dependencies</h3>
  <pre><code>npm install</code></pre>

  <h3>Setup environment variables</h3>
  <p>Create a <code>.env</code> file in the root directory and add:</p>
  <pre><code>CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'</code></pre>
ELEVENLABS_API_KEY=
HUGGINGFACE_API_KEY=
  <p>Replace the placeholders with your actual Convex and Clerk credentials.</p>

  <h3>Run the project locally</h3>
  <pre><code>npm run dev</code></pre>
  <p>Open your browser and go to <code>http://localhost:3000</code> to view the app.</p>

  <hr />

  <h2>Assets</h2>
  <p>Public assets such as images and icons used in the project are located in the <code>/public</code> folder.</p>

  <hr />

  <p>Feel free to contribute or raise issues to improve BotCast!</p>
</body>
</html>
