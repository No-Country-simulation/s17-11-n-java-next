CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    profile_image_url TEXT,
    dni_front_url TEXT,
    dni_back_url TEXT,
    phone VARCHAR(30),
    departamento_id BIGINT,
    user_id BIGINT UNIQUE,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);