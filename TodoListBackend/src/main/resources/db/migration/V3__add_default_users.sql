INSERT INTO Users (name, email, password_hash, type, score)
VALUES
    ('admin', 'admin@gmail.com', '$2a$10$sBMwTNfgJ7/1R.RQVevHHu4lHItjgyzwrIHKhGeo9z2I48A8wGNv2', 'ADMIN', 1000),
    ('user', 'user@gmail.com', '$2a$10$Sb4EiWYiT0/xWDrWTSBhFuTh9QHmbTM7SdszUoWF4M0rFEFePLM52', 'NORMAL', 100);