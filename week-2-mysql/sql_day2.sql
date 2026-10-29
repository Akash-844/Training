use mysql_week2_training;

create table assignment (
id Int primary key auto_increment,
name varchar(100)not null,
role varchar(150) unique not null,
active Boolean default True,
created_at timestamp default current_timestamp
);

select * from assignment;

alter table assignment MODIFY role VARCHAR(20) DEFAULT 'USER';

alter table assignment add column email varchar(150) unique not null;

alter table assignment  modify column email varchar(150) unique not null after name; 

ALTER TABLE assignment
DROP INDEX role;

SHOW CREATE TABLE assignment;

Insert into assignment(name,email,role,active) values 
('Akash', 'akash.practice@example.com', 'ADMIN', TRUE),
('Rahul', 'rahul.practice@example.com', 'USER', TRUE),
('Priya', 'priya.practice@example.com', 'USER', TRUE),
('Sneha', 'sneha.practice@example.com', 'USER', TRUE),
('Kiran', 'kiran.practice@example.com', 'MANAGER', TRUE),
('Divya', 'divya.practice@example.com', 'USER', FALSE),
('Arjun', 'arjun.practice@example.com', 'USER', TRUE),
('Meera', 'meera.practice@example.com', 'ADMIN', TRUE),
('Ravi', 'ravi.practice@example.com', 'USER', FALSE),
('Ananya', 'ananya.practice@example.com', 'MANAGER', TRUE),
('Vikram', 'vikram.practice@example.com', 'USER', TRUE),
('Pooja', 'pooja.practice@example.com', 'USER', TRUE),
('Sanjay', 'sanjay.practice@example.com', 'ADMIN', FALSE),
('Neha', 'neha.practice@example.com', 'USER', TRUE),
('Manoj', 'manoj.practice@example.com', 'MANAGER', TRUE),
('Kavya', 'kavya.practice@example.com', 'USER', FALSE),
('Rohit', 'rohit.practice@example.com', 'USER', TRUE),
('Asha', 'asha.practice@example.com', 'ADMIN', TRUE),
('Varun', 'varun.practice@example.com', 'USER', TRUE),
('Lakshmi', 'lakshmi.practice@example.com', 'MANAGER', FALSE);


select * from assignment where name ='Rahul';
select name,email from assignment where active = TRUE;
select name,email,role from assignment where role = 'ADMIN';
select * from assignment where name Like 'A%';
select name, email, role from assignment where role in ('ADMIN','USER');
select * from assignment where id between 40 and 50;
select name, email, role from assignment  order by  name asc;
select * from assignment order By id DESC;
select * from assignment order by id ASC Limit 5;
select * from assignment order by id asc limit 5 offset 5;
select count(*) as total_users from assignment;
select count(*) from assignment where  active = true;
update assignment set role = 'Manager' where email = 'rahul.practice@example.com';
select id,name,email from assignment where active = false;
delete from assignment where email ='lakshmi.practice@example.com';

SELECT COUNT(*) AS total_users FROM assignment;

SELECT name, email, role FROM assignment WHERE email = 'rahul.practice@example.com';
SELECT * FROM assignment WHERE email = 'lakshmi.practice@example.com';

insert into assignment(name,email,role,active) values ('Teja','teja.practice@example.com','USER',true);
select name,email from assignment where role = 'MANAGER' order by name asc;
update assignment set role = 'ADMIN' where email = 'teja.practice@example.com';

select * from assignment where email = 'teja.practice@example.com';
delete from assignment where email = 'teja.practice@example.com';
select * from assignment;