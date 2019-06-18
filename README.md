# Email Templates Generator for AWS SES

The following documentation explains the procedure for adding, modifying, deleting and deploying email templates to AWS SES.

## Adding a new template

To add a new email template first you will need this information/data:
- HTML: Template in HTML
- Subject: Text that will sent
- Text: Text version of the template (usually it's a summary of the email intent)
 
Then, follow this steps:
- Create a new folder in email-templates-aws-ses/templates/<new_folder>, the name can be anything, but usually you would want something representative like `<email-intent>`", for example: `welcome`.
- Inside this new folder, add the Template's HTML, the name again can be anything, but it MUST have the `.html` extension.
- Also inside this new folder, create a `config.json` file with the following content:
```json
{
  "name": "<template-name>", // welcome
  "subject": "<text-subject>", // ¡Hey {{name}}! Welcome to {{app}}!
  "text": "<template-text-version>" // ¡Hey {{name}}! Welcome to {{app}}!
}
```
- Lastly, run the generate script: 
```bash
npm run generate
```
The script should output something similar to the following:
```bash
Email deployment file generated for welcome
Create or update AWS SES template with any of the following commands:
aws ses create-template --cli-input-json file://.../email-templates-aws-ses/templates/welcome/deploy.json
aws ses update-template --cli-input-json file://.../email-templates-aws-ses/templates/welcome/deploy.json
```
- As you can see, it outputs two commands, one for creating and another for updating, pick the first one, and run it in the terminal to create the template in AWS SES.

## Modifying a existing template

- Modify the template's html or config.json as you wish
- Run the generate script: 
```bash
npm run generate
```
The script should output something similar to the following:
```bash
Email deployment file generated for welcome
Create or update AWS SES template with any of the following commands:
aws ses create-template --cli-input-json file://.../email-templates-aws-ses/templates/welcome/deploy.json
aws ses update-template --cli-input-json file://.../email-templates-aws-ses/templates/welcome/deploy.json
```
- As you can see, it outputs two commands, one for creating and another for updating, pick the second one, and run it in the terminal to update the template in AWS SES.

## Deleting a existing template

No additional scripts or steps needed! Just use the aws-cli, run:
```bash
aws ses delete-template --template-name <template-name>
```

Change `<template-name>` for the template's name shown in AWS Console > SES > Email Templates

# Credits

[leemunroe](https://github.com/leemunroe) for the sample html email template: [Responsive HTML Email Template](https://github.com/leemunroe/responsive-html-email-template)