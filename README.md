# jetai-fullstack-challenge: AI-Powered Jet Comparison Tool

This is a basic full-stack application utilizing AI to help a user make charter jet comparisons. It is built with TypeScript, React, Next.js, Node.js, SQLite, and Tailwind CSS.

## Overview:

On app start-up, a user is taken to a landing page before being redirected to the home page (where the main functionality of the app resides). A database is seeded with a CSV file containing charter jet data. A table with checkboxes is then populated with this jet data in the UI.

A user of the application can compare the jets in the table against each other by checking the checkboxes of jets they are interested in, and then selecting attributes to compare them by. This user clicks a submit button, and after a period of processing, ranked jet comparison results are displayed to them in a comparison table.

The comparison is done on the backend through the "Freeform prompt" [API](https://ai.google.dev/?gad_source=1&gclid=CjwKCAjwnv-vBhBdEiwABCYQA37TX9Um_QlzdGj1ui0bhhIVURwZrsFOsOUCRvNZlzLpwPgLzrp6zhoCQtsQAvD_BwE) provided by [Gemini](https://gemini.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=2024enUS_gemfeb&gad_source=1&gclid=CjwKCAjwnv-vBhBdEiwABCYQA1K96J4mnvyDKDLXjCEZoWoIkt0G6oYMO0NymXPTtM-o5WzSm5nv6RoCbBQQAvD_BwE) (Google's largest LLM AI model).

## Setup:

This application's tech stack:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Node.js version 21.6](https://nodejs.org/en/download)
- [Next.js version 14.1](https://nextjs.org/blog/next-14).
- [SQLite](https://www.sqlite.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

Be sure to install these packages through NPM:

<span style="color:green;">&#10004;</span> [csv-parser 3.0.0](https://www.npmjs.com/package/csv-parser) for use in importCsv.ts

<span style="color:green;">&#10004;</span> Use the following command to use the Gemini API: **npm install @google/generative-ai**. And get your Gemini API key [here](https://ai.google.dev/?gad_source=1&gclid=CjwKCAjwnv-vBhBdEiwABCYQA46wIsFZrcjCppvZXV0d0zP2d9bZ9C5PJLagcWNsNQCfHNhzLG0ioBoCGPkQAvD_BwE).

<span style="color:green;">&#10004;</span> Install [Font Awesome](https://fontawesome.com/): **npm install @fortawesome/fontawesome-free**

## Other Important Notes:

- I've included an example .env file in the root directory of the app called '.exampleEnv'. Here you'll find an example of the environment variables setup that you should recreate in your own .env file: DATABASE_URL and NEXT_PUBLIC_GEMINI_API_KEY. The former, DATABASE_URL, can be used as is for Prisma. You'll need to grab an API key from Gemini, [here](https://ai.google.dev/?gad_source=1&gclid=CjwKCAjwnv-vBhBdEiwABCYQA46wIsFZrcjCppvZXV0d0zP2d9bZ9C5PJLagcWNsNQCfHNhzLG0ioBoCGPkQAvD_BwE), so you can assign it to NEXT_PUBLIC_GEMINI_API_KEY.

- Use the following command in package.json to transpile importCsv.ts to importCsv.js for execution in Node.js when spinning up dev mode:

**"dev": "tsc utils/importCsv.ts && node utils/importCsv.js && next dev",**

- After addressing the previous two bullet points, you can start the application with **npm run dev**.

- The app has been manually tested successfully in the United State's [most popular browsers](https://www.similarweb.com/browsers/united-states/): Chrome and Safari. It was also tested successfully in the less popular browser, Edge.

- I initially tried to use the [OpenAI API](https://openai.com/blog/openai-api) instead of the Gemini API, but its prompt functionality was unfortunately blocked behind a $5 paywall.
