# React + TypeScript + Vite Quiz App

This project is a quiz application designed to help users practice identifying errors in written text. It's built using React, TypeScript, and Vite, with Tailwind CSS for styling.

## Project Overview

The "Error Find" quiz app presents users with a series of activities. Each activity contains questions where users must identify whether a given sentence is grammatically correct or incorrect. Some activities may include rounds with multiple questions. After completing an activity, users can view their results. The application saves progress to session storage, allowing users to resume their quiz.

## Features

-   **Multiple Quiz Activities**: Users can choose from different sets of questions.
-   **Simple and Round-Based Questions**: Supports straightforward questions and activities with multiple rounds.
-   **Session Persistence**: User answers are saved in session storage, enabling them to pick up where they left off.
-   **Results Summary**: A dedicated page displays the user's performance for each completed activity.
-   **Responsive Design**: Adapts to various screen sizes for a good user experience on desktop and mobile.
-   **Built with Modern Technologies**: Utilizes React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd quiz-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser. The page will reload if you make edits.

## Available Scripts

In the project directory, you can run the following npm scripts:

-   `npm run dev`:
    Runs the app in development mode.

-   `npm run build`:
    Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

-   `npm run lint`:
    Lints the project files using ESLint to check for code quality and potential errors.

-   `npm run preview`:
    Serves the production build locally. This is useful for testing the production build before deploying.

## Deployment

To deploy this application, you first need to build the static assets:

```bash
npm run build
```
This command creates a `dist` folder in your project root with all the static files needed for deployment.

You can then deploy the contents of the `dist` folder to any static site hosting service, such as:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

Ensure your hosting service is configured to serve `index.html` for all routes if you are using client-side routing, to allow direct navigation to sub-pages (e.g., `/activity/1/question/1`). This is often referred to as a "single-page application" (SPA) mode or "rewrite all to index.html".

## Key Dependencies

This project utilizes several key libraries and frameworks:

-   **React**: A JavaScript library for building user interfaces.
-   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
-   **Vite**: A fast build tool and development server.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **React Router**: For handling navigation and routing within the application.
-   **TanStack Query (React Query)**: For data fetching, caching, and state synchronization.
-   **Heroicons**: A set of free, MIT-licensed high-quality SVG icons.
