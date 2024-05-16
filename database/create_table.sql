CREATE DATABASE IF NOT EXISTS `moflix` /*!40100 COLLATE 'utf8mb4_general_ci' */;

USE moflix;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'accepted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);


CREATE TABLE IF NOT EXISTS movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    release_year INT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INT,
    directors TEXT,
    actors TEXT,
    cover_img_url TEXT,
    trailer_url TEXT,
    film_url TEXT,
    status VARCHAR(20) DEFAULT 'show'
);




CREATE TABLE IF NOT EXISTS genre (
    name VARCHAR(50) UNIQUE PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS pricing_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    price DECIMAL(10, 2),
    duration INT,
    film_quality VARCHAR(50),
    description TEXT
);


CREATE TABLE IF NOT EXISTS label (
    name VARCHAR(50) UNIQUE PRIMARY KEY,
    description TEXT
);


CREATE TABLE IF NOT EXISTS purchase_method (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE,
    description TEXT
);


CREATE TABLE IF NOT EXISTS movie_label (
    movie_id INT,
    label_name VARCHAR(50),
    PRIMARY KEY (movie_id, label_name),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    FOREIGN KEY (label_name) REFERENCES label(name) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS movie_genre (
    movie_id INT,
    genre_name VARCHAR(50),
    PRIMARY KEY (movie_id, genre_name),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_name) REFERENCES genre(name) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS subtitle (
    movie_id INT,
    language VARCHAR(50),
    sub_text TEXT UNIQUE,
    PRIMARY KEY (movie_id, language),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS user_rating (
    user_id INT,
    movie_id INT,
    value INT,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    CONSTRAINT CHK_RatingValue CHECK (value >= 1 AND value <= 10)
);


CREATE TABLE IF NOT EXISTS user_purchase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pricing_plan_id INT,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    purchase_method VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (pricing_plan_id) REFERENCES pricing_plan(id) ON DELETE CASCADE,
    FOREIGN KEY (purchase_method) REFERENCES purchase_method(name) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    detail TEXT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_plan (
    user_id INT,
    plan_id INT DEFAULT 1,
    start_date TIMESTAMP DEFAULT CURRENT_DATE ON UPDATE CURRENT_TIMESTAMP,
    exp_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES pricing_plan(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS user_favorite (
    user_id INT,
    movie_id INT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS user_watchlist (
    user_id INT,
    movie_id INT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS user_history (
    user_id INT,
    movie_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS movie_view (
    movie_id INT PRIMARY KEY,
    view INT,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    plan VARCHAR(50),
    purchase_date TIMESTAMP,
    purchase_method VARCHAR(50),
    amount DECIMAL(10, 2)
);