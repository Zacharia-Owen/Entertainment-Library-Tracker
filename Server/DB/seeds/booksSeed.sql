INSERT INTO authors (name, birth_year) VALUES
('J.K. Rowling', 1965),
('Brandon Sanderson', 1975);

INSERT INTO books (title, genre, publication_year) VALUES
('Harry Potter and the Sorcerer\'s Stone', 'Fantasy', 1997),
('Mistborn: The Final Empire', 'Fantasy', 2006);

INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1),  -- Harry Potter ↔ J.K. Rowling
(2, 2);  -- Mistborn ↔ Sanderson