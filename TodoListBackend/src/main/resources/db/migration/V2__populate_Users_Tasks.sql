INSERT INTO Users (name, email, password_hash, type, score)
VALUES
    ('Alice Smith', 'alice@example.com', '$2a$12$D8p7...', 'ADMIN', 150),
    ('Bob Jones', 'bob@example.com', '$2a$12$E9q8...', 'NORMAL', 45),
    ('Charlie Day', 'charlie@example.com', '$2a$12$F0r9...', 'NORMAL', 0);

INSERT INTO Tasks (name, status, priority, description, daily, due_date, user_id)
VALUES
    (
        'Setup Spring Security', 'TODO', 'PRIORITY_1',
        'Configure JWT and authentication filters', false,
        CURRENT_DATE + INTERVAL '2 days',
        (SELECT id FROM Users WHERE email = 'alice@example.com')
    ),
    (
        'Morning Exercise', 'COMPLETE', 'PRIORITY_3',
        '30 minute jog in the park', true,
        CURRENT_DATE,
        (SELECT id FROM Users WHERE email = 'bob@example.com')
    ),
    (
        'Buy Groceries', 'TODO', 'PRIORITY_2',
        'Milk, Eggs, Bread, and Coffee', false,
        CURRENT_DATE + INTERVAL '1 day',
        (SELECT id FROM Users WHERE email = 'bob@example.com')
    ),
    (
        'Project Documentation', 'TODO', 'PRIORITY_1',
        'Write the README and API docs', false,
        CURRENT_DATE + INTERVAL '5 days',
        (SELECT id FROM Users WHERE email = 'alice@example.com')
    );