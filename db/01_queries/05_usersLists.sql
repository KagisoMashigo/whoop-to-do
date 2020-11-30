SELECT items.name, items.description, categories.category AS category
FROM lists
JOIN  items ON list_id = lists.id
JOIN categories ON category_id = categories.id
JOIN users ON user_id = users.id
WHERE users.id = 8  --- place holder
ORDER BY categories.category;
