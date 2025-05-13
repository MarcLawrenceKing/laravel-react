# Laravel CRUD App

A simple Laravel-based CRUD (Create, Read, Update, Delete) application.

## Requirements

- PHP >= 8.1  
- Composer  
- Node.js & NPM  
- MySQL  

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MarcLawrenceKing/laravel-react.git
   cd laravel-react
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install frontend dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

5. **Configure `.env`**
   Update the following lines with your local database credentials:
   ```env
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   ```

6. **Generate application key**
   ```bash
   php artisan key:generate
   ```

7. **Run migrations**
   ```bash
   php artisan migrate
   ```

8. **Create storage symlink**
   ```bash
   php artisan storage:link
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

## Usage

Visit [http://localhost:8000](http://localhost:8000) in your browser to access the app.
