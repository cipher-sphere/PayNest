# PayNest

PayNest is a payment app that allows users to securely manage their finances, view their account balance, and make money transfers. Built with Node.js, Express.js, and MongoDB, PayNest provides a user-friendly and efficient way to handle transactions.

## Features
- **User Authentication**: Secure login and registration system.
- **Dashboard**: A personalized dashboard displaying account balance and transaction history.
- **Send Money**: Send money to other users easily within the app.
- **Account Management**: View and manage account details.

## Installation

### Prerequisites
- Node.js
- MongoDB (or MongoDB Atlas)
- npm (Node package manager)

### Steps to Set Up

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cipher-sphere/PayNest.git
````

2. **Navigate to the project directory:**

   ```bash
   cd PayNest
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   * Create a `.env` file in the root directory.
   * Add the following variables (or refer to `.env.example`):

     ```
     PORT=your-port
     MONGODB_URI=your-mongo-uri
     JWT_SECRET=your-jwt-secret
     ```

5. **Start the server:**

   ```bash
   npm start
   ```

6. **Access the app:**

   * Visit `http://localhost:your-port` to access the app.

## Usage

* **Register**: Create an account with your email and password.
* **Login**: Log in with your credentials.
* **Dashboard**: View your account balance, transaction history, and send money to other users.

## Contributing

We welcome contributions to PayNest! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

* **MongoDB**: Database for storing user data and transaction history.
* **JWT**: For handling secure user authentication.
* **Express.js**: For building the server and handling routes.
