-- Would use the user ID of currently logged in used, and the category ID between 1 and 4.
-- It would append the list ID to the url -> /list/*listID*

SELECT lists.id
FROM lists
JOIN users ON user_id = users.id
JOIN categories ON category_id = categories.id
WHERE users.id = 2
AND categories.id = 1;
