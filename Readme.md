# Node.js medicalApplication

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/)
- [Mysql](https://www.mysql.com/downloads/)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Lord-Vesta/MedicalApplication.git

   ```
2. Navigate to the project directory:

   ```
   cd node-db-assignment
   ```
3. Install dependencies
    ```
    npm install
    ```
4. Paste MA.sql in sql workbench

5. create .env folder into the project directory:
    ```
    DB_HOST="HOSTNAME"  //give your hostname
    DB_USER="root"      //give your username most of the times it is root by default
    DB_NAME="medical"   //its database name
    DB_PASSWORD="PASSWORD" // give your password

    secretKey = "secretKey" //create a secret key and enter it
    ```