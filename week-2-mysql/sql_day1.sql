CREATE database mysql_week2_training;

SELECT * FROM mysql_week2_training.users;

SELECT DATABASE();

SHOW DATABASES;

CREATE TABLE users(
id INT PRIMARY KEY auto_increment,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
role VARCHAR(20) DEFAULT TRUE,
active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
 
 DESCRIBE users;
 
ALTER TABLE users
MODIFY role VARCHAR(20) DEFAULT 'USER';
INSERT into users(name,email,role,active) values ('Akash', 'akash@example.com', 'ADMIN', TRUE),
    ('Rahul', 'rahul@example.com', 'USER', TRUE),
    ('Priya', 'priya@example.com', DEFAULT, TRUE);
    
SELECT * FROM users;

-- display all users as total user
SELECT count(*)AS total_user  from users;

select * from users where email ='akash@example.com';

select * from users where email LIKE '%example.com';

SELECT name,role
FROM users
WHERE role IN ('ADMIN','USER');

SELECT *
FROM users
WHERE id >= 3 AND id <= 7;

select name from users order by id desc;
select id from users order by id desc;

select * from users order by id asc LIMIT 3 OFFSET 1;

UPDATE users SET role = 'ADMIN' Where id = 3;

select * from users;

select count(*) from users;

Insert into users (name,email,role,active) Values 
('Sneha', 'sneha@example.com', 'USER', TRUE),
('Kiran', 'kiran@example.com', 'MANAGER', TRUE),
('Divya', 'divya@example.com', 'USER', FALSE),
('Arjun', 'arjun@example.com', 'USER', TRUE),
('Meera', 'meera@example.com', 'ADMIN', TRUE),
('Ravi', 'ravi@example.com', 'USER', FALSE),
('Ananya', 'ananya@example.com', 'MANAGER', TRUE),
('Vikram', 'vikram@example.com', 'USER', TRUE),
('Pooja', 'pooja@example.com', 'USER', TRUE),
('Sanjay', 'sanjay@example.com', 'ADMIN', FALSE),
('Neha', 'neha@example.com', 'USER', TRUE),
('Manoj', 'manoj@example.com', 'MANAGER', TRUE),
('Kavya', 'kavya@example.com', 'USER', FALSE),
('Rohit', 'rohit@example.com', 'USER', TRUE),
('Asha', 'asha@example.com', 'ADMIN', TRUE),
('Varun', 'varun@example.com', 'USER', TRUE),
('Lakshmi', 'lakshmi@example.com', 'MANAGER', FALSE);

SELECT COUNT(*) AS total_users,
       MIN(id) AS first_id,
       MAX(id) AS last_id
FROM users;

SELECT COUNT(*) AS total_users
FROM users;

SELECT id, name, email
FROM users
ORDER BY id;