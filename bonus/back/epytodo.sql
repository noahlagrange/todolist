CREATE DATABASE IF NOT EXISTS epytodo;

USE epytodo;

CREATE TABLE IF NOT EXISTS user
  (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS todo
  (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_time DATETIME NOT NULL,
    status ENUM('not started', 'todo', 'in progress', 'done') NOT NULL DEFAULT 'not started',
    user_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
  );

CREATE USER 'epytodo'@'localhost' IDENTIFIED BY 'epytodo';

GRANT ALL PRIVILEGES ON epytodo.* TO 'epytodo'@'localhost';
