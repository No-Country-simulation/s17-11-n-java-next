INSERT INTO requests (
    date,
    description,
    is_confirm,
    rating,
    review,
    service_target_id,
    user_origin_id
)
SELECT
    CURRENT_DATE,
    'Hola Jane, me interesa intercambiar una reparacion de paredes por una lectura astral.',
    NULL,
    NULL,
    NULL,
    2002,
    2002
WHERE NOT EXISTS (
    SELECT 1
    FROM requests
    WHERE service_target_id = 2002
      AND user_origin_id = 2002
);

INSERT INTO requests (
    date,
    description,
    is_confirm,
    rating,
    review,
    service_target_id,
    user_origin_id
)
SELECT
    CURRENT_DATE - 2,
    'Hola John, quisiera solicitar tu servicio de reparacion de paredes.',
    TRUE,
    5,
    'Excelente intercambio. John fue puntual, claro y muy cuidadoso con el trabajo.',
    2001,
    2003
WHERE NOT EXISTS (
    SELECT 1
    FROM requests
    WHERE service_target_id = 2001
      AND user_origin_id = 2003
);
