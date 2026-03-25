const { onRequest } = require("firebase-functions/v2/https");
const { google } = require("googleapis");
const cors = require('cors')({ origin: true });

const getDriveClient = async () => {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  return google.drive({ version: 'v3', auth });
};

exports.getDriveFile = onRequest({ region: "us-central1" }, async (req, res) => {
  cors(req, res, async () => {
    try {
      const fileId = req.query.id;
      if (!fileId) {
        res.status(400).send("No file ID specified");
        return;
      }

      const drive = await getDriveClient();
      const fileMetadata = await drive.files.get({
        fileId: fileId,
        fields: 'mimeType, name'
      });

      res.setHeader('Content-Type', fileMetadata.data.mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${fileMetadata.data.name}"`);

      const response = await drive.files.get(
        { fileId: fileId, alt: 'media' },
        { responseType: 'stream' }
      );

      response.data
        .on('error', (err) => {
          console.error('Stream Error:', err);
          res.status(500).end();
        })
        .pipe(res);

    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error fetching file from Drive");
    }
  });
});