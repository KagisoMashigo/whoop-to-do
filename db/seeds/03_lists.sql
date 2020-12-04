-- eventually needs to create first 4 categories default for each user
INSERT INTO lists (title, public, category_id, user_id)
VALUES ('Movies', true, 1, 2);
INSERT INTO lists (title, public, category_id, user_id)
VALUES ('Books', true, 4, 2);
INSERT INTO lists (title, public, category_id, user_id)
VALUES ('Restaurants', true, 2, 2);
INSERT INTO lists (title, public, category_id, user_id)
VALUES ('Products', false, 3, 2);
INSERT INTO lists (title, public, category_id, user_id)
VALUES ('Miscellaneous', false, 5, 14);
