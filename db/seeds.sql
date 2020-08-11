INSERT INTO department (name) VALUES ('Legal'), ('Paralegal'), ('Professional Development');

INSERT INTO roles (title, salary, department_id) VALUES ('Associate', 100000.00, 1), ('Counsel', 250000.00, 1), ('Paralegal', 65000.00, 2), ('Advisor', 75000.00, 2), ('Director', 90000.00, 3), ('Manager', 80000.00, 3), ('Coordinator', 60000.00, 3), ('Assistant', 40000, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Asparagus', 2, NULL), ('John', 'Scallion', 1, 1), ('Jennifer', 'Aniston', 4, 1), ('Git', 'Hub', 3, 3), ('Karl', 'Marx', 3, NULL), ('James', 'Joyce', 3, 5), ('Sheryl', 'Sandberg', 3, 6), ('Milton', 'Friedman', 3, 7)