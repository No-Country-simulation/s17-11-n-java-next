CREATE TABLE IF NOT EXISTS report (
    id SERIAL PRIMARY KEY,
    description TEXT,
    date DATE NOT NULL,
    report_status VARCHAR(50) NOT NULL CHECK (report_status IN ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    user_id BIGINT,
    service_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);