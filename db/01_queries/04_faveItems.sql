SELECT name, description, categories.category AS category
FROM items
JOIN lists ON list_id = lists.id
JOIN categories ON category_id = categories.id
WHERE favourite = true;
