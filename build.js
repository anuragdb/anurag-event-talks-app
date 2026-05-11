const fs = require('fs');
const path = require('path');
const scheduledTalks = require('./generate_talk_data');

const templatePath = path.join(__dirname, 'index_template.html');
const stylePath = path.join(__dirname, 'style.css');
const scriptPath = path.join(__dirname, 'script.js');
const outputPath = path.join(__dirname, 'index.html');

// Read template, CSS, and JS files
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
const cssContent = fs.readFileSync(stylePath, 'utf8');
let jsContent = fs.readFileSync(scriptPath, 'utf8');

// Inject scheduledTalksData into the script content
const talksDataString = JSON.stringify(scheduledTalks);
jsContent = jsContent.replace('let scheduledTalksData = [];', `let scheduledTalksData = ${talksDataString};`);

// Combine all parts into the final HTML
const finalHtml = htmlTemplate
    .replace('<!-- CSS will be injected here -->', `<style>${cssContent}</style>`)
    .replace('// JavaScript will be injected here', jsContent);

// Write the final HTML to index.html
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log('Successfully generated index.html');