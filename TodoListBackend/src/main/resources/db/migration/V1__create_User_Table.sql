CREATE TABLE Users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    type TEXT CHECK ( type IN ('ADMIN', 'NORMAL') ),
    score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE Tasks(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL CHECK ( status IN ('COMPLETE', 'TODO')),
    priority TEXT CHECK ( priority IN ('PRIORITY_1', 'PRIORITY_2', 'PRIORITY_3') ),
    description TEXT,
    daily BOOLEAN DEFAULT false,
    due_date DATE,
    user_id INTEGER references Users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_task_user_id ON Tasks(user_id);