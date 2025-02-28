const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const os = require("os");

// Application configuration - can be passed via environment variables
const APP_CONFIG = {
  name: process.env.APP_NAME || "Express API",
  version: process.env.APP_VERSION || "1.0.0", // We'll use this for versioning
  environment: process.env.NODE_ENV || "development",
  image: process.env.DOCKER_IMAGE || "hello-world-api",
  tag: process.env.DOCKER_TAG || "latest",
  framework: "Express.js",
  nodeVersion: process.version,
  containerName: os.hostname(), // In Docker, hostname will be what we set in docker-compose
};

// CHANGEABLE TEXT: Now using APP_VERSION from docker-compose
// ===================================================
const CHANGEABLE_TEXT = {
  message: `Welcome to our application! This is version ${APP_CONFIG.version}.`,
  features: getFeaturesByVersion(APP_CONFIG.version),
  update_info: `Last updated: ${getCurrentDate()}`,
};
// ===================================================

// Function to determine features based on version
function getFeaturesByVersion(version) {
  // Default features
  let baseFeatures = "Docker containerization, health checks, and system info";

  // For 'latest' or if no specific features are defined for a version
  if (version === "1.0.0") {
    return `Current features include ${baseFeatures}.`;
  }

  // You can define specific features for different versions
  const featuresByVersion = {
    "1.1.0": "Improved UI, performance optimizations, and auto-scaling.",
    "1.2.0": "New dashboard, real-time monitoring, and alert notifications.",
    "2.0.0":
      "Complete redesign with microservices architecture and Kubernetes support.",
  };

  return (
    featuresByVersion[version] || `Enhanced features including ${baseFeatures}.`
  );
}

// Helper function to get current date in a readable format
function getCurrentDate() {
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Add middleware to serve static files if needed
app.use(express.static("public"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime() + " seconds",
    version: APP_CONFIG.version,
    message: CHANGEABLE_TEXT.message,
  });
});

// Technical details endpoint
app.get("/info", (req, res) => {
  res.json({
    ...APP_CONFIG,
    system: {
      platform: process.platform,
      memory: {
        total: Math.round(os.totalmem() / (1024 * 1024)) + " MB",
        free: Math.round(os.freemem() / (1024 * 1024)) + " MB",
      },
      cpus: os.cpus().length,
      uptime: Math.round(os.uptime() / 60) + " minutes",
    },
    releaseNotes: {
      message: CHANGEABLE_TEXT.message,
      features: CHANGEABLE_TEXT.features,
      lastUpdated: CHANGEABLE_TEXT.update_info,
    },
  });
});

// Main route with enhanced HTML response
app.get("/", (req, res) => {
  // Get current date and time for display
  const currentTime = new Date().toLocaleString();

  // Send an HTML response with CSS for better styling
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${APP_CONFIG.name} - ${APP_CONFIG.version}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
      <style>
        :root {
          --primary: #3498db;
          --secondary: #2ecc71;
          --accent: #9b59b6;
          --dark: #34495e;
          --light: #ecf0f1;
          --success: #2ecc71;
          --warning: #f39c12;
          --danger: #e74c3c;
          --radius: 12px;
          --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          color: var(--dark);
        }

        .container {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 800px;
          overflow: hidden;
        }

        .header {
          background: linear-gradient(to right, var(--primary), var(--accent));
          padding: 30px;
          color: white;
          text-align: center;
        }

        .header h1 {
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 2.2rem;
        }

        .header p {
          opacity: 0.9;
          font-size: 1.1rem;
          font-weight: 300;
        }

        .content {
          padding: 30px;
        }

        .card {
          background: var(--light);
          border-radius: var(--radius);
          padding: 20px;
          margin-bottom: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
        }

        .card h2 {
          color: var(--primary);
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          font-size: 1.3rem;
        }

        .card h2 span {
          margin-right: 10px;
          font-size: 1.5rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .info-item {
          background: white;
          padding: 15px;
          border-radius: var(--radius);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .info-item strong {
          display: block;
          margin-bottom: 5px;
          color: var(--primary);
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        .info-item span {
          color: var(--dark);
          font-size: 1.1rem;
        }

        .status-badge {
          display: inline-block;
          padding: 8px 15px;
          border-radius: 50px;
          background-color: var(--success);
          color: white;
          font-weight: 500;
          margin-top: 10px;
        }

        .footer {
          text-align: center;
          padding: 20px;
          background: var(--light);
          color: var(--dark);
          font-size: 0.9rem;
        }

        .endpoints {
          margin-top: 15px;
        }

        .endpoint {
          display: inline-block;
          margin: 5px;
          padding: 5px 10px;
          background: white;
          border-radius: 4px;
          font-size: 0.9rem;
          text-decoration: none;
          color: var(--primary);
          border: 1px solid var(--primary);
          transition: all 0.2s;
        }

        .endpoint:hover {
          background: var(--primary);
          color: white;
        }

        .changeable-content {
          background-color: rgba(46, 204, 113, 0.1);
          border-left: 4px solid var(--secondary);
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 var(--radius) var(--radius) 0;
        }

        .version-badge {
          display: inline-block;
          background-color: var(--primary);
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.9rem;
          margin-left: 10px;
          vertical-align: middle;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ ${APP_CONFIG.name} ✨</h1>
          <p>Version <span class="version-badge">${APP_CONFIG.version}</span> | ${APP_CONFIG.environment}</p>
        </div>

        <div class="content">
          <!-- Version Information Card -->
          <div class="card">
            <h2><span>📢</span> Release Information</h2>
            <div class="changeable-content">
              <p><strong>Message:</strong> ${CHANGEABLE_TEXT.message}</p>
              <p><strong>Features:</strong> ${CHANGEABLE_TEXT.features}</p>
              <p><strong>Last Updated:</strong> ${CHANGEABLE_TEXT.update_info}</p>
            </div>
          </div>

          <div class="card">
            <h2><span>🐳</span> Container Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Image</strong>
                <span>${APP_CONFIG.image}</span>
              </div>
              <div class="info-item">
                <strong>Tag</strong>
                <span>${APP_CONFIG.tag}</span>
              </div>
              <div class="info-item">
                <strong>Container Name</strong>
                <span>${APP_CONFIG.containerName}</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h2><span>🔧</span> Application Stack</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Framework</strong>
                <span>${APP_CONFIG.framework}</span>
              </div>
              <div class="info-item">
                <strong>Node.js</strong>
                <span>${APP_CONFIG.nodeVersion}</span>
              </div>
              <div class="info-item">
                <strong>Port</strong>
                <span>${PORT}</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h2><span>🚦</span> Status Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Current Time</strong>
                <span>${currentTime}</span>
              </div>
              <div class="info-item">
                <strong>Uptime</strong>
                <span>${Math.floor(process.uptime())} seconds</span>
              </div>
              <div class="info-item">
                <strong>Platform</strong>
                <span>${process.platform}</span>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <div class="status-badge">✅ Service Operational</div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <h3>Available Endpoints</h3>
            <div class="endpoints">
              <a href="/" class="endpoint">/ (Home)</a>
              <a href="/health" class="endpoint">/health</a>
              <a href="/info" class="endpoint">/info</a>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} | Containerized Application</p>
          <p>Server Time: ${currentTime}</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - Not Found</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          height: 100vh;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #34495e;
        }
        .error-container {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 90%;
        }
        h1 {
          font-size: 6rem;
          margin: 0;
          color: #e74c3c;
          opacity: 0.8;
        }
        h2 {
          margin: 10px 0 20px;
          font-weight: 600;
        }
        p {
          margin-bottom: 25px;
          opacity: 0.7;
        }
        a {
          display: inline-block;
          padding: 12px 25px;
          background: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        a:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a href="/">Return to Home</a>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Access it at http://localhost:${PORT}`);
  console.log(`ℹ️ Application info available at http://localhost:${PORT}/info`);
  console.log(`📊 Current version: ${APP_CONFIG.version}`);
  console.log(`📝 Current features: ${CHANGEABLE_TEXT.features}`);
});
