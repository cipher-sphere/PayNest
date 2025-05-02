# PayNest

PayNest is a payment app that empowers users to securely manage their finances, effortlessly view their account balance, and seamlessly make money transfers. Architected with the robust technologies of Node.js, the flexible framework of Express.js, and the scalable database of MongoDB, PayNest delivers a user-friendly and efficient avenue for handling transactions.

## Features

* **User Authentication**: Implements a secure login and registration system to protect user accounts.
* **Dashboard**: Presents a personalized dashboard providing a clear overview of the user's account balance and transaction history.
* **Send Money**: Facilitates easy and quick money transfers to other users within the application.
* **Account Management**: Allows users to conveniently view and manage their account details.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) (or a [MongoDB Atlas](https://www.mongodb.com/atlas) account)
* [npm](https://www.npmjs.com/) (Node package manager, usually installed with Node.js)

### Steps to Set Up

Follow these steps to get PayNest up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/cipher-sphere/PayNest.git](https://github.com/cipher-sphere/PayNest.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd PayNest
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    * Create a `.env` file in the root directory of the project.
    * Add the necessary environment variables. You can refer to the `.env.example` file for the required variables and their format. A typical `.env` file might look like this:

        ```
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/paynest
        JWT_SECRET=your-secret-key
        ```

    **Note:** Replace the placeholder values with your actual configuration.

5.  **Start the server:**
    ```bash
    npm start
    ```

6.  **Access the app:**
    * Open your web browser and navigate to `http://localhost:your-port`. Replace `your-port` with the port number you specified in your `.env` file (e.g., `http://localhost:3000`).

## Usage

Once the application is running, you can perform the following actions:

* **Register**: Create a new user account by providing your email address and a secure password.
* **Login**: Access your account by entering your registered email address and password.
* **Dashboard**: Upon successful login, you will be directed to your personalized dashboard where you can view your current account balance, review your transaction history, and initiate money transfers to other users.

## Contributing

Contributions to PayNest are highly appreciated! If you'd like to contribute to the project, please follow these guidelines:

1.  **Fork the repository:** Create your own copy of the PayNest repository on GitHub.
2.  **Create a new branch:** For each feature or bug fix, create a separate branch:
    ```bash
    git checkout -b feature-branch
    ```
3.  **Make your changes and commit them:** Write your code and commit your changes with a descriptive message:
    ```bash
    git commit -am 'Add new feature'
    ```
4.  **Push to the branch:** Upload your local branch to your remote repository:
    ```bash
    git push origin feature-branch
    ```
5.  **Create a pull request:** Submit a pull request from your branch to the main repository, explaining the changes you've made.

## License

This project is licensed under the [MIT License](./LICENSE) - see the `LICENSE` file for more details regarding the terms and conditions.

## Acknowledgements

We extend our gratitude to the following technologies and libraries that power PayNest:

* **MongoDB**: Provides a flexible and scalable NoSQL database for storing user data and transaction history.
* **JSON Web Tokens (JWT)**: Enables secure handling of user authentication and authorization.
* **Express.js**: Serves as the foundation for building the server-side application and managing API routes.