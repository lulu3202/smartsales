import express from 'express';
import cors from 'cors';
import Joi from 'joi';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// FIR validation schema
const firSchema = Joi.object({
  caseNumber: Joi.string().required(),
  policeStation: Joi.string().required(),
  district: Joi.string().required(),
  complainant: Joi.object({
    name: Joi.string().required(),
    fatherName: Joi.string().required(),
    age: Joi.number().min(1).max(120).required(),
    address: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required()
  }).required(),
  incident: Joi.object({
    date: Joi.date().required(),
    time: Joi.string().required(),
    place: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  accused: Joi.object({
    name: Joi.string().allow(''),
    age: Joi.string().allow(''),
    address: Joi.string().allow('')
  }),
  charges: Joi.array().items(Joi.object({
    section: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('BNS', 'BSA', 'BNSS').required()
  })).min(1).required()
});

// Generate PDF endpoint
app.post('/api/generate-fir', async (req, res) => {
  try {
    const { error, value } = firSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const html = generateFIRHTML(value);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(html);
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });
    
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="FIR_${value.caseNumber}.pdf"`);
    res.send(pdf);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

function generateFIRHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        .section { margin-bottom: 15px; }
        .label { font-weight: bold; display: inline-block; width: 150px; }
        .charges { border: 1px solid #000; padding: 10px; margin-top: 10px; }
        .charge-item { margin-bottom: 8px; padding: 5px; border-left: 3px solid #007bff; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        td, th { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>FIRST INFORMATION REPORT (FIR)</h2>
        <h3>Under Bharatiya Nyaya Sanhita (BNS) 2023</h3>
      </div>
      
      <div class="section">
        <span class="label">FIR No:</span> ${data.caseNumber}<br>
        <span class="label">Police Station:</span> ${data.policeStation}<br>
        <span class="label">District:</span> ${data.district}<br>
        <span class="label">Date:</span> ${new Date().toLocaleDateString('en-IN')}
      </div>

      <h3>Complainant Details</h3>
      <table>
        <tr><td><strong>Name</strong></td><td>${data.complainant.name}</td></tr>
        <tr><td><strong>Father's Name</strong></td><td>${data.complainant.fatherName}</td></tr>
        <tr><td><strong>Age</strong></td><td>${data.complainant.age}</td></tr>
        <tr><td><strong>Address</strong></td><td>${data.complainant.address}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.complainant.phone}</td></tr>
      </table>

      <h3>Incident Details</h3>
      <table>
        <tr><td><strong>Date of Incident</strong></td><td>${new Date(data.incident.date).toLocaleDateString('en-IN')}</td></tr>
        <tr><td><strong>Time</strong></td><td>${data.incident.time}</td></tr>
        <tr><td><strong>Place of Occurrence</strong></td><td>${data.incident.place}</td></tr>
      </table>
      
      <div class="section">
        <strong>Description of Incident:</strong><br>
        <p style="border: 1px solid #ccc; padding: 10px; margin-top: 5px;">${data.incident.description}</p>
      </div>

      ${data.accused.name ? `
      <h3>Accused Details</h3>
      <table>
        <tr><td><strong>Name</strong></td><td>${data.accused.name || 'Unknown'}</td></tr>
        <tr><td><strong>Age</strong></td><td>${data.accused.age || 'Unknown'}</td></tr>
        <tr><td><strong>Address</strong></td><td>${data.accused.address || 'Unknown'}</td></tr>
      </table>
      ` : ''}

      <h3>Charges Applied</h3>
      <div class="charges">
        ${data.charges.map(charge => `
          <div class="charge-item">
            <strong>${charge.type} Section ${charge.section}:</strong> ${charge.description}
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 30px;">
        <p><strong>Investigating Officer:</strong> _________________________</p>
        <p><strong>Signature:</strong> _________________________</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
      </div>
    </body>
    </html>
  `;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});