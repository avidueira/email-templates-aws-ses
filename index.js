const { lstatSync, readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } = require('fs');
const { join, parse } = require('path');

const isDirectory = (source) => lstatSync(source).isDirectory();
const isFile = (source) => lstatSync(source).isFile();
const getDirectories = (source) => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const getFiles = (source) => readdirSync(source).map(name => join(source, name)).filter(isFile);
const encodeHtml = (html) => html.replace(/(\r\n|\n|\r)/gm, ' ');

const templatesDirectories = getDirectories('templates');

templatesDirectories.forEach((folder) => {
   let rawHtml = false, rawConfig = false;
   const folderObj = parse(folder);

   if (existsSync(folder + '/deploy.json')) {
      unlinkSync(folder + '/deploy.json');
   }

   const files = getFiles(folder);
   files.forEach((file) => {
      const fileObj = parse(file);
      if (fileObj.ext === '.html') {
         rawHtml = readFileSync(file, 'utf8');
      } else if (fileObj.ext === '.json') {
         rawConfig = readFileSync(file, 'utf8');
      }
   });

   if (!rawHtml) {
      throw new Error('No html file found for template in: ' + folderObj.name);
   }

   if (!rawConfig) {
      throw new Error('No json file found for template in: ' + folderObj.name);
   }

   const config = JSON.parse(rawConfig);

   writeFileSync(folder + '/deploy.json', JSON.stringify({
      Template : {
         TemplateName: config.name,
         SubjectPart: config.subject,
         TextPart: config.text,
         HtmlPart: encodeHtml(rawHtml)
      }
   }));

   console.log('\x1b[32m%s\x1b[0m', `Email deployment file generated for ${config.name}`);
   console.log('\x1b[33m%s\x1b[0m', 'Create or update AWS SES template with any of the following commands:');
   console.log(`aws ses create-template --cli-input-json file://${__dirname}/templates/${folderObj.name}/deploy.json`);
   console.log(`aws ses update-template --cli-input-json file://${__dirname}/templates/${folderObj.name}/deploy.json`);
});
