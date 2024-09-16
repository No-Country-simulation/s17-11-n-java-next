CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    user_origin_id BIGINT NOT NULL,
    service_target_id BIGINT NOT NULL,
    is_confirm BOOLEAN,
    description TEXT,
    rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    FOREIGN KEY (user_origin_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_target_id) REFERENCES services(id) ON DELETE CASCADE
);