require('dotenv').config();
// Express Server
const express = require('express');
const app = express();

// Cors
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Styles
app.use(express.static('public'));

// Render Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API Routes
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  if (!dateParam) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }

  const date = formatDate(dateParam);

  return res.json(date);
});

// API Listener
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

function formatDate(input) {
  let date;
  if (/^\d+$/.test(input)) {
    date = new Date(parseInt(input) * 1000);
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return { error: 'Invalid Date' };
  }

  const formattedDate = {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };

  return formattedDate;
}
