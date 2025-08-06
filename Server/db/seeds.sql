INSERT INTO user_movies (user_id, movie_id, watched, rating) VALUES
(1, 1, TRUE, 5),
(1, 2, TRUE, 4),
(2, 1, FALSE, NULL),
(2, 3, TRUE, 5);

INSERT INTO user_tv_shows (user_id, tv_show_id, watched, rating) VALUES
(1, 1, TRUE, 5),
(1, 2, FALSE, NULL),
(2, 1, TRUE, 4),
(2, 3, TRUE, 5);

INSERT INTO user_books (user_id, book_id, read, rating) VALUES
(1, 1, TRUE, 5),
(1, 2, FALSE, NULL),
(2, 1, TRUE, 4),
(2, 3, TRUE, 5);

INSERT INTO user_games (user_id, game_id, played, rating) VALUES
(1, 1, TRUE, 5),
(1, 2, FALSE, NULL),
(2, 1, TRUE, 4),
(2, 3, TRUE, 5);
