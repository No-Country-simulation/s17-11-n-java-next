-- V2__insert_roles.sql
INSERT INTO roles (name) VALUES ('USER')
    ON CONFLICT (name) DO NOTHING;

INSERT INTO roles (name) VALUES ('ADMIN')
    ON CONFLICT (name) DO NOTHING;