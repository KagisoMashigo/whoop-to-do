SELECT items.name, items.description, categories.category AS category
FROM lists
JOIN  items ON list_id = lists.id
JOIN categories ON category_id = categories.id
WHERE lists.public = true --- can insert another WHERE clause to specify which category
ORDER BY categories.category;
