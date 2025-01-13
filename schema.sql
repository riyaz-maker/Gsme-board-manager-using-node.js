-- Create the table for board games
CREATE TABLE BoardGames (
    GameID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    MinPlayers INT,
    MaxPlayers INT,
    ImagePath VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the table for game sessions
CREATE TABLE GameSessions (
    SessionID INT AUTO_INCREMENT PRIMARY KEY,
    GameID INT NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    Notes TEXT,
    FOREIGN KEY (GameID) REFERENCES BoardGames(GameID) ON DELETE CASCADE
);

INSERT INTO BoardGames (Name, Description, MinPlayers, MaxPlayers, ImagePath)
VALUES
    ('Chess', 'A strategy war game for two players.', 2, 2, '/images/chess.png'),
    ('Checkers', 'A strategy board game played with 64 squares.', 2, 2, '/images/checkers.png'),
    ('Monopoly', 'A property trading board game for multiple players.', 2, 6, '/images/monopoly.png'),
    ('Ludo', 'A strategy game for two to four players.', 2, 4, '/images/ludo.png');

INSERT INTO GameSessions (GameID, StartTime, EndTime, Notes)
VALUES
    (1, '2024-12-15 14:30:00', '2024-12-15 16:00:00', 'A practice match of Chess.'),
    (2, '2024-12-18 16:45:00', '2024-12-18 18:15:00', 'Checkers match with a close finish.'),
    (3, '2024-12-21 18:00:00', '2024-12-21 20:00:00', 'Monopoly session ended in a draw.'),
    (4, '2024-12-23 20:15:00', '2024-12-23 21:45:00', 'Ludo game played with neighbours.'),
    (1, '2024-12-25 15:00:00', '2024-12-25 16:30:00', 'Chess match with strategic gameplay.'),
    (3, '2024-12-27 17:30:00', '2024-12-27 19:00:00', 'Monopoly session with heated discussions.'),
    (2, '2024-12-29 13:00:00', '2024-12-29 14:30:00', 'Checkers match ended with a win.'),
    (4, '2025-01-01 14:00:00', '2025-01-01 16:00:00', 'Ludo match to celebrate the new year.'),
    (1, '2025-01-03 16:20:00', '2025-01-03 17:50:00', 'Another thrilling Chess game.'),
    (3, '2025-01-05 19:45:00', '2025-01-05 21:15:00', 'Monopoly session with family fun.');

UPDATE GameSessions
SET StartTime = CASE SessionID
    WHEN 1 THEN '2024-12-15 14:30:00'    
    WHEN 2 THEN '2024-12-18 16:45:00'
    WHEN 3 THEN '2024-12-21 18:00:00'    
    WHEN 4 THEN '2024-12-23 20:15:00'    
    WHEN 5 THEN '2024-12-25 15:00:00'    
    WHEN 6 THEN '2024-12-27 17:30:00'
    WHEN 7 THEN '2024-12-29 13:00:00'
    WHEN 8 THEN '2025-01-01 14:00:00'    
    WHEN 9 THEN '2025-01-03 16:20:00'    
    WHEN 10 THEN '2025-01-05 19:45:00'
    END,
    EndTime = CASE SessionID
    WHEN 1 THEN '2024-12-15 16:00:00'  
    WHEN 2 THEN '2024-12-18 18:15:00'  
    WHEN 3 THEN '2024-12-21 20:00:00'  
    WHEN 4 THEN '2024-12-23 21:45:00'  
    WHEN 5 THEN '2024-12-25 16:30:00'  
    WHEN 6 THEN '2024-12-27 19:00:00'  
    WHEN 7 THEN '2024-12-29 14:30:00'  
    WHEN 8 THEN '2025-01-01 16:00:00'  
    WHEN 9 THEN '2025-01-03 17:50:00'  
    WHEN 10 THEN '2025-01-05 21:15:00' 
    END
WHERE SessionID IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
