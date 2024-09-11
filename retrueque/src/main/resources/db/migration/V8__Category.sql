-- Create table
CREATE TABLE IF NOT EXISTS category (
id SERIAL PRIMARY KEY,
name VARCHAR (50) NOT NULL UNIQUE
);

--- INSERT DATA
INSERT INTO category (id, name) VALUES
(1, 'Albañilería'),
(2, 'Astrología'),
(3, 'Barbería'),
(4, 'Cerrajería'),
(5, 'Clases de cocina'),
(6, 'Clases de idioma'),
(7, 'Diseño Gráfico'),
(8, 'Electricista'),
(9, 'Fotografía'),
(10, 'Fumigación'),
(11, 'Gasista'),
(12, 'Herrería'),
(13, 'Instructor de deporte'),
(14, 'Jardinería'),
(15, 'Limpieza'),
(16, 'Manicuria y pedicuría'),
(17, 'Mantenimiento de Computadoras'),
(18, 'Masajes'),
(19, 'Mecánica'),
(20, 'Mensajería'),
(21, 'Mudanza'),
(22, 'Peluquería'),
(23, 'Pintura'),
(24, 'Plomería'),
(25, 'Redacción'),
(26, 'Reparación de Electrodomésticos'),
(27, 'Yoga y Meditación');
