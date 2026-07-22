UPDATE users
SET password = '$2a$10$F8NgTjUepWPZURo1FLAwO.sBHlgbr9GFh0z3NrFLNeYEKcObOAdeC',
    is_enabled = TRUE,
    is_deleted = FALSE
WHERE email IN ('john_doe@example.com', 'jane_smith@example.com');

UPDATE requests
SET date = CURRENT_DATE - ((2036 - id)::INTEGER)
WHERE id BETWEEN 2002 AND 2036;

UPDATE requests
SET is_confirm = FALSE,
    rating = NULL,
    review = NULL
WHERE id BETWEEN 2030 AND 2036;
