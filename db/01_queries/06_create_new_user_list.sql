-- user_id would instead be equivalent to the new user's ID
-- This query would be repeated 4 times, with title and Category being 1: Movies, 2: Restaurants, 3: Products, and 4: Books.

INSERT INTO lists (title, category_id, user_id)
VALUES ('Movies', 1, 2);
