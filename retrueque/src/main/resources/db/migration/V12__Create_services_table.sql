-- Tabla 'services'
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    rules TEXT,
    img_url TEXT,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    departamento_id BIGINT,
    shift_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
    FOREIGN KEY (shift_id) REFERENCES shift(id)
);