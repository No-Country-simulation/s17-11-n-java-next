-- Tabla 'shift'
CREATE TABLE IF NOT EXISTS shift (
    id SERIAL PRIMARY KEY,
    days VARCHAR(255) NOT NULL
);

-- Tabla 'shift_time_by_shift'
CREATE TABLE IF NOT EXISTS shift_time_by_shift (
    id SERIAL PRIMARY KEY,
    shift_time VARCHAR(50) NOT NULL,
    shift_id BIGINT NOT NULL,
    FOREIGN KEY (shift_id) REFERENCES shift(id) ON DELETE CASCADE
);