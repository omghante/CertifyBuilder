require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const pdf = require('html-pdf');
const { google } = require('googleapis');
const path = require('path');


const imagePath = 'public/background_image.png';
const imageData = fs.readFileSync(imagePath);

const imageVariable = Buffer.from(imageData).toString('base64');
const server = express();

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/data');
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}
main();

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  password: String
});

const certificateSchema = new mongoose.Schema({
  adminname: String,
  fullname: String,
  email: String,
  phone: String,
  selectedcourse: String,
  certificateId: String,
  certificatedate: String,
  certificatelink: String
});

const User = mongoose.model('User', userSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);

server.use(cors());
server.use(bodyParser.json());

server.post('/register', async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    const user = new User({
      fullname: fullName,
      email: email,
      phone: phoneNumber,
      password: password
    });
    const savedUser = await user.save();
    console.log('User registered:', savedUser);
    res.json({ success: true, user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.post('/certificate', async (req, res) => {
  const { fullName, email, phoneNumber, certificateLink, adminName, selectedCourse } = req.body;

  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const currentDateVariable = formattedDate;

    const certificateId = generateCertificateId(fullName, phoneNumber);

    const certificateData = {
      fullname: fullName,
      selectedcourse: selectedCourse,
      certificatedate: currentDateVariable,
      certificateId: certificateId
    };

    const htmlContent = generateHTML(certificateData);

    pdf.create(htmlContent).toFile('./certificate.pdf', function (error, result) {
      if (error) {
        console.error('Error generating PDF:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      console.log('PDF created:', result);

      authorize()
        .then(authClient => uploadFile(authClient, './certificate.pdf'))
        .then(certificatelink => {
          console.log('Certificate uploaded:', certificatelink);
          const certificate = new Certificate({
            adminname: adminName,
            fullname: fullName,
            email: email,
            phone: phoneNumber,
            selectedcourse: selectedCourse,
            certificateId: certificateId,
            certificatedate: currentDateVariable,
            certificatelink: certificatelink
          });
          return certificate.save();
        })
        .then(savedCertificate => {
          console.log('Certificate saved to database:', savedCertificate);
          res.json({ success: true, certificate: savedCertificate });
        })
        .catch(error => {
          console.error('Error uploading file to Google Drive:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateHTML(data) {
  return `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="" style="position:relative;width:1188px;height:900px;transform: rotate(180deg);>
  <head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <style type="text/css">
  <!--
    p {margin: 0; padding: 0;}
    .ft10 {font-size: 17px; font-family: Times; color: #000033;}
    .ft11 {font-size: 14px; font-family: Times; color: #000033;}
    .ft12 {font-size: 26px; font-family: Times; color: #000033;}
    .ft13 {font-size: 24px; font-family: Times; color: #000033;}
    .ft14 {font-size: 50px; font-family: Times; color: #000033;}
    .ft15 {font-size: 18px; font-family: Times; color: #000000;}
    .ft16 {font-size: 64px; font-family: Times; color: #e4a51a;}
    .ft17 {font-size: 25px; font-family: Times; color: #000000;}
    .ft18 {font-size: 13px; font-family: Times; color: #000000;}
  -->
  </style>
  </head>
  <body bgcolor="#A0A0A0" vlink="blue" link="blue" style="position:relative;width:1188px;height:900px;transform: rotate(180deg);">
<div id="page1-div" style="position:relative;width:1188px;height:917px;">
    <img width="1188" height="917" src="data:image/png;base64,${imageVariable}" alt="background image"/>
    <p style="position:absolute;top:661px;left:766px;white-space:nowrap" class="ft10"><b>A&#160;B&#160;H&#160;I&#160;S&#160;H&#160;E&#160;K&#160;&#160;&#160;G&#160;A&#160;N&#160;G&#160;W&#160;A&#160;R</b></p>
    <p style="position:absolute;top:690px;left:842px;white-space:nowrap" class="ft11">Co-Founder</p>
    <p style="position:absolute;top:661px;left:203px;white-space:nowrap" class="ft10"><b>S&#160;H&#160;I&#160;V&#160;A&#160;M&#160;&#160;&#160;G&#160;O&#160;Y&#160;A&#160;L</b></p>
    <p style="position:absolute;top:690px;left:244px;white-space:nowrap" class="ft11">Co-Founder</p>
    <p style="position:absolute;top:233px;left:350px;white-space:nowrap" class="ft12"><b>This&#160;certificate&#160;is&#160;proudly&#160;presented&#160;to</b></p>
    <p style="position:absolute;top:516px;left:255px;white-space:nowrap" class="ft13"><b>Tutedude&#160;wishes&#160;you&#160;the&#160;best&#160;for&#160;your&#160;future&#160;endeavours.</b></p>
    <p style="position:absolute;top:105px;left:163px;white-space:nowrap" class="ft14"><b>CERTIFICATE&#160;OF&#160;COMPLETION</b></p>
    <p style="position:absolute;top:811px;left:835px;white-space:nowrap" class="ft15">Certificate&#160;id&#160;:&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</p>
    <p style="position:absolute;top:297px;left:362px;white-space:nowrap" class="ft16"><b>${data.fullname}</b></p>
    <p style="position:absolute;top:401px;left:298px;white-space:nowrap" class="ft17"><b>For successfully completing the Tutedude ${data.selectedcourse}</b></p>
    <p style="position:absolute;top:446px;left:457px;white-space:nowrap" class="ft17"><b>course on ${data.certificatedate}</b></p>
    <p style="position:absolute;top:817px;left:965px;white-space:nowrap" class="ft18"><b>${data.certificateId}</b></p>
  </div>
  </body>
  </html>
  
  `;
}

function generateCertificateId(fullName, phoneNumber) {
  const phoneLastFour = phoneNumber.slice(-4);
  const nameFirstFour = fullName.slice(0, 4).toLowerCase();
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `${nameFirstFour}-${phoneLastFour}-${currentDate}`;
}

const apikeys = require('./apikey.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );

  await jwtClient.authorize();

  return jwtClient;
}

async function uploadFile(authClient, filePath) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetaData = {
      name: 'certificate.pdf',
      parents: ['#GOOGLE-DRIVE-FOLDER-ID'] 
    };

    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath)
    };

    drive.files.create({
      resource: fileMetaData,
      media: media,
      fields: 'id'
    }, (error, file) => {
      if (error) {
        console.error('Error uploading file to Google Drive:', error);
        return reject(error);
      }
      console.log('File ID:', file.data.id);
      const certificateLink = `https://drive.google.com/file/d/${file.data.id}/view`;
      resolve(certificateLink);
    });
  });
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
