use mysql_week2_training;

create table join_users(
id INT primary key auto_increment,
name varchar(100) not null,
email varchar(150) unique not null
);

create table join_projects(
id int primary key not null,
project_name varchar(100) not null,
description varchar(255) ,
created_by Int Not null,
constraint fk_join_projects foreign key (created_by) references join_users(id)
);

CREATE TABLE join_project_members (
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, project_id),

    CONSTRAINT fk_join_members_user
        FOREIGN KEY (user_id)
        REFERENCES join_users(id),

    CONSTRAINT fk_join_members_project
        FOREIGN KEY (project_id)
        REFERENCES join_projects(id)
);

INSERT INTO join_users (name, email)
VALUES
    ('Akash', 'akash@example.com'),
    ('Rahul', 'rahul@example.com'),
    ('Priya', 'priya@example.com'),
    ('Sneha', 'sneha@example.com'),
    ('Kiran', 'kiran@example.com'),
    ('Divya', 'divya@example.com'),
    ('Arjun', 'arjun@example.com'),
    ('Meera', 'meera@example.com'),
    ('Ravi', 'ravi@example.com'),
    ('Ananya', 'ananya@example.com'),
    ('Vikram', 'vikram@example.com'),
    ('Pooja', 'pooja@example.com'),
    ('Sanjay', 'sanjay@example.com'),
    ('Neha', 'neha@example.com'),
    ('Manoj', 'manoj@example.com');
    
select * from join_users;

select id,name from join_users order by id;

INSERT INTO join_projects (project_name, description, created_by)
VALUES
    ('Website Redesign', 'Redesign company website', 1),
    ('Library Management', 'Manage books and members', 1),
    ('E-commerce Platform', 'Online shopping system', 2),
    ('Task Management', 'Track tasks and deadlines', 3),
    ('Employee Portal', 'Manage employee records', 4),
    ('Mobile Banking', 'Banking application', 5),
    ('Inventory System', 'Track products and stock', 6),
    ('Learning Platform', 'Online courses and lessons', 7);

ALTER TABLE join_project_members
DROP FOREIGN KEY fk_join_members_project;

ALTER TABLE join_projects
MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE join_project_members
ADD CONSTRAINT fk_join_members_project
FOREIGN KEY (project_id)
REFERENCES join_projects(id);

