# jetai-fullstack-challenge: AI-Powered Jet Comparison Tool

This is a basic full-stack application utilizing AI to help a user make charter jet comparisons. It is built with TypeScript, React, Next.js (v.14), SQLite, and Tailwind CSS.

A brief overview of the application:

A SQLite database is seeded with a CSV file containing charter jet data. A table with checkboxes is then populated with this jet data.

A user of the application can compare the jets in the table against each other by checking jets they are interested in, and then selecting attributes to compare them by. This user clicks a submit button, and after a period of processing, ranked comparison results are displayed to them in table.

The comparison is done on the backend through an [API](https://ai.google.dev/?gad_source=1&gclid=CjwKCAjwnv-vBhBdEiwABCYQA37TX9Um_QlzdGj1ui0bhhIVURwZrsFOsOUCRvNZlzLpwPgLzrp6zhoCQtsQAvD_BwE) provided by Gemini (Google's largest LLM AI model).
