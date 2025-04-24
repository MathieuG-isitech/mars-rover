DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des messages initiaux
INSERT INTO messages (content) VALUES ('Message 1');
INSERT INTO messages (content) VALUES ('Message 2'); 
INSERT INTO messages (content) VALUES ('Message 3'); 