ALTER TABLE IF EXISTS departamentos DROP CONSTRAINT IF EXISTS departamentos_provincia_id_fkey;
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS users_role_id_fkey;
ALTER TABLE IF EXISTS user_profiles DROP CONSTRAINT IF EXISTS user_profiles_departamento_id_fkey;
ALTER TABLE IF EXISTS user_profiles DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;
ALTER TABLE IF EXISTS shift_time_by_shift DROP CONSTRAINT IF EXISTS shift_time_by_shift_shift_id_fkey;
ALTER TABLE IF EXISTS services DROP CONSTRAINT IF EXISTS services_user_id_fkey;
ALTER TABLE IF EXISTS services DROP CONSTRAINT IF EXISTS services_category_id_fkey;
ALTER TABLE IF EXISTS services DROP CONSTRAINT IF EXISTS services_departamento_id_fkey;
ALTER TABLE IF EXISTS services DROP CONSTRAINT IF EXISTS services_shift_id_fkey;
ALTER TABLE IF EXISTS requests DROP CONSTRAINT IF EXISTS requests_user_origin_id_fkey;
ALTER TABLE IF EXISTS requests DROP CONSTRAINT IF EXISTS requests_service_target_id_fkey;
ALTER TABLE IF EXISTS report DROP CONSTRAINT IF EXISTS report_user_id_fkey;
ALTER TABLE IF EXISTS report DROP CONSTRAINT IF EXISTS report_service_id_fkey;

ALTER TABLE roles ALTER COLUMN id TYPE BIGINT;
ALTER TABLE provincias ALTER COLUMN id TYPE BIGINT;
ALTER TABLE departamentos ALTER COLUMN id TYPE BIGINT;
ALTER TABLE departamentos ALTER COLUMN provincia_id TYPE BIGINT;
ALTER TABLE category ALTER COLUMN id TYPE BIGINT;
ALTER TABLE users ALTER COLUMN id TYPE BIGINT;
ALTER TABLE user_profiles ALTER COLUMN id TYPE BIGINT;
ALTER TABLE shift ALTER COLUMN id TYPE BIGINT;
ALTER TABLE shift_time_by_shift ALTER COLUMN id TYPE BIGINT;
ALTER TABLE services ALTER COLUMN id TYPE BIGINT;
ALTER TABLE requests ALTER COLUMN id TYPE BIGINT;
ALTER TABLE report ALTER COLUMN id TYPE BIGINT;

ALTER SEQUENCE IF EXISTS roles_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS provincias_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS departamentos_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS category_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS users_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS user_profiles_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS shift_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS shift_time_by_shift_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS services_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS requests_id_seq AS BIGINT;
ALTER SEQUENCE IF EXISTS report_id_seq AS BIGINT;

ALTER TABLE departamentos
    ADD CONSTRAINT departamentos_provincia_id_fkey
    FOREIGN KEY (provincia_id) REFERENCES provincias(id);

ALTER TABLE users
    ADD CONSTRAINT users_role_id_fkey
    FOREIGN KEY (role_id) REFERENCES roles(id);

ALTER TABLE user_profiles
    ADD CONSTRAINT user_profiles_departamento_id_fkey
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id);

ALTER TABLE user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE shift_time_by_shift
    ADD CONSTRAINT shift_time_by_shift_shift_id_fkey
    FOREIGN KEY (shift_id) REFERENCES shift(id) ON DELETE CASCADE;

ALTER TABLE services
    ADD CONSTRAINT services_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE services
    ADD CONSTRAINT services_category_id_fkey
    FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE services
    ADD CONSTRAINT services_departamento_id_fkey
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id);

ALTER TABLE services
    ADD CONSTRAINT services_shift_id_fkey
    FOREIGN KEY (shift_id) REFERENCES shift(id);

ALTER TABLE requests
    ADD CONSTRAINT requests_user_origin_id_fkey
    FOREIGN KEY (user_origin_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE requests
    ADD CONSTRAINT requests_service_target_id_fkey
    FOREIGN KEY (service_target_id) REFERENCES services(id) ON DELETE CASCADE;

ALTER TABLE report
    ADD CONSTRAINT report_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE report
    ADD CONSTRAINT report_service_id_fkey
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL;

SELECT setval('roles_id_seq', COALESCE((SELECT MAX(id) FROM roles), 1), true);
SELECT setval('provincias_id_seq', COALESCE((SELECT MAX(id) FROM provincias), 1), true);
SELECT setval('departamentos_id_seq', COALESCE((SELECT MAX(id) FROM departamentos), 1), true);
SELECT setval('category_id_seq', COALESCE((SELECT MAX(id) FROM category), 1), true);
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1), true);
SELECT setval('user_profiles_id_seq', COALESCE((SELECT MAX(id) FROM user_profiles), 1), true);
SELECT setval('shift_id_seq', COALESCE((SELECT MAX(id) FROM shift), 1), true);
SELECT setval('shift_time_by_shift_id_seq', COALESCE((SELECT MAX(id) FROM shift_time_by_shift), 1), true);
SELECT setval('services_id_seq', COALESCE((SELECT MAX(id) FROM services), 1), true);
SELECT setval('requests_id_seq', COALESCE((SELECT MAX(id) FROM requests), 1), true);
SELECT setval('report_id_seq', COALESCE((SELECT MAX(id) FROM report), 1), true);
