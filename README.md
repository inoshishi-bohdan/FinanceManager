# Finance Manager

A modern single-page application built using React and a suite of TanStack libraries. This application utilizes React Router for client-side routing, TanStack Query for streamlined data management, and TanStack Table for dynamic and interactive data table displays.

## Features

- Track your income and expenses
- Categorize your transactions
- Visualize spending with graphs and statistics
- User-friendly interface
- Secure and private

## Technologies Used

- JavaScript
- TypeScript
- React
- CSS
- HTML

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- Backend server

### Installation

To run the application locally, follow these steps:

1.  **Clone and Install Dependencies:**
    * Move to the project's root directory in your terminal.
    * Run the following command to install the necessary npm packages:

    ```bash
    npm install
    ```

2.  **Create a `.env.local` file in the root directory of the project.**
    * **Important:** Do not use `.env.development` for local overrides. Use `.env.local` for your local settings.

3.  **Copy Environment Variables from `.env`:**
    * Open the `.env` file (which serves as a template) and copy the following environment variables to your newly created `.env.local` file:

        ```
        VITE_BASE_URL=your_local_backend_server_url
        ```

4.  **Replace Dummy Values:**
    * In your `.env.local` file, replace the dummy values (e.g., `your_local_backend_server_url`) with your actual API URLs and other necessary values.

5.  **Start the Development Server:**
    * After the dependencies are installed and you've configured `.env.local`, run the following command to start the development server:

        ```bash
        npm run dev
        ```

    * This will typically start the application on `http://localhost:5173` (or a similar port). You can then access the application in your web browser.
  
## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact
For any questions or support, please open an issue or contact the repository owner.
