-- Insertar departamentos de Buenos Aires
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Avellaneda', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Balcarce', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Baradero', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Brandsen', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Campana', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Chascomús', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Dolores', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Ensenada', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Escobar', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('General Alvear', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('General Belgrano', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('General La Madrid', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('General Paz', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Hurlingham', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('La Plata', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Lanús', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Lomas de Zamora', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Merlo', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Morón', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Olavarría', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Pehuajó', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Pergamino', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Pilar', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('San Fernando', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('San Isidro', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('San Miguel', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Tigre', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires')),
    ('Vicente López', (SELECT id FROM provincias WHERE nombre = 'Buenos Aires'));

-- Insertar departamentos de Catamarca
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Catamarca')),
    ('Fray Mamerto Esquiú', (SELECT id FROM provincias WHERE nombre = 'Catamarca')),
    ('Santa María', (SELECT id FROM provincias WHERE nombre = 'Catamarca')),
    ('Tinogasta', (SELECT id FROM provincias WHERE nombre = 'Catamarca')),
    ('Antofagasta de la Sierra', (SELECT id FROM provincias WHERE nombre = 'Catamarca')),
    ('El Alto', (SELECT id FROM provincias WHERE nombre = 'Catamarca')),
    ('Capayán', (SELECT id FROM provincias WHERE nombre = 'Catamarca')),
    ('El Rodeo', (SELECT id FROM provincias WHERE nombre = 'Catamarca'));

-- Insertar departamentos de Chaco
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('Barranqueras', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('Fontana', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('Resistencia', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('San Fernando', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('Saenz Peña', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('General Güemes', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('General San Martín', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('Libertador General San Martín', (SELECT id FROM provincias WHERE nombre = 'Chaco')),
    ('Quitilipi', (SELECT id FROM provincias WHERE nombre = 'Chaco'));

-- Insertar departamentos de Chubut
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Chubut')),
    ('Comodoro Rivadavia', (SELECT id FROM provincias WHERE nombre = 'Chubut')),
    ('Esquel', (SELECT id FROM provincias WHERE nombre = 'Chubut')),
    ('Puerto Madryn', (SELECT id FROM provincias WHERE nombre = 'Chubut')),
    ('Rawson', (SELECT id FROM provincias WHERE nombre = 'Chubut')),
    ('Trelew', (SELECT id FROM provincias WHERE nombre = 'Chubut')),
    ('Dolavon', (SELECT id FROM provincias WHERE nombre = 'Chubut')),
    ('Gualjaina', (SELECT id FROM provincias WHERE nombre = 'Chubut'));

-- Insertar departamentos de Ciudad Autónoma de Buenos Aires
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Comuna 1', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 2', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 3', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 4', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 5', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 6', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 7', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 8', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 9', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 10', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 11', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires')),
    ('Comuna 12', (SELECT id FROM provincias WHERE nombre = 'Ciudad Autónoma de Buenos Aires'));

-- Insertar departamentos de Córdoba
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Colón', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Río Cuarto', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('San Francisco', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Villa María', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Alta Gracia', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Carlos Paz', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Jesús María', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Malagueño', (SELECT id FROM provincias WHERE nombre = 'Córdoba')),
    ('Pilar', (SELECT id FROM provincias WHERE nombre = 'Córdoba'));

-- Insertar departamentos de Corrientes
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Corrientes')),
    ('Goya', (SELECT id FROM provincias WHERE nombre = 'Corrientes')),
    ('Mercedes', (SELECT id FROM provincias WHERE nombre = 'Corrientes')),
    ('Paso de los Libres', (SELECT id FROM provincias WHERE nombre = 'Corrientes')),
    ('Bella Vista', (SELECT id FROM provincias WHERE nombre = 'Corrientes')),
    ('Esquina', (SELECT id FROM provincias WHERE nombre = 'Corrientes')),
    ('Saladas', (SELECT id FROM provincias WHERE nombre = 'Corrientes')),
    ('San Roque', (SELECT id FROM provincias WHERE nombre = 'Corrientes'));

-- Insertar departamentos de Entre Ríos
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos')),
    ('Concordia', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos')),
    ('Gualeguaychú', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos')),
    ('Paraná', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos')),
    ('Colón', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos')),
    ('Federación', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos')),
    ('La Paz', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos')),
    ('Villaguay', (SELECT id FROM provincias WHERE nombre = 'Entre Ríos'));

-- Insertar departamentos de Formosa
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Formosa')),
    ('Clorinda', (SELECT id FROM provincias WHERE nombre = 'Formosa')),
    ('Pirané', (SELECT id FROM provincias WHERE nombre = 'Formosa')),
    ('El Colorado', (SELECT id FROM provincias WHERE nombre = 'Formosa')),
    ('Formosa Capital', (SELECT id FROM provincias WHERE nombre = 'Formosa')),
    ('General Belgrano', (SELECT id FROM provincias WHERE nombre = 'Formosa')),
    ('Laguna Blanca', (SELECT id FROM provincias WHERE nombre = 'Formosa')),
    ('Ibarreta', (SELECT id FROM provincias WHERE nombre = 'Formosa'));

-- Insertar departamentos de Jujuy
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Jujuy')),
    ('Palpala', (SELECT id FROM provincias WHERE nombre = 'Jujuy')),
    ('San Pedro', (SELECT id FROM provincias WHERE nombre = 'Jujuy')),
    ('Perico', (SELECT id FROM provincias WHERE nombre = 'Jujuy')),
    ('La Quiaca', (SELECT id FROM provincias WHERE nombre = 'Jujuy')),
    ('Libertador General San Martín', (SELECT id FROM provincias WHERE nombre = 'Jujuy')),
    ('El Carmen', (SELECT id FROM provincias WHERE nombre = 'Jujuy')),
    ('Maimará', (SELECT id FROM provincias WHERE nombre = 'Jujuy'));

-- Insertar departamentos de La Pampa
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'La Pampa')),
    ('Santa Rosa', (SELECT id FROM provincias WHERE nombre = 'La Pampa')),
    ('General Pico', (SELECT id FROM provincias WHERE nombre = 'La Pampa')),
    ('Realicó', (SELECT id FROM provincias WHERE nombre = 'La Pampa')),
    ('General Acha', (SELECT id FROM provincias WHERE nombre = 'La Pampa')),
    ('Victorica', (SELECT id FROM provincias WHERE nombre = 'La Pampa')),
    ('Intendente Alvear', (SELECT id FROM provincias WHERE nombre = 'La Pampa')),
    ('Ingeniero Luiggi', (SELECT id FROM provincias WHERE nombre = 'La Pampa'));

-- Insertar departamentos de La Rioja
INSERT INTO departamentos (nombre, provincia_id) VALUES
            ('Capital', (SELECT id FROM provincias WHERE nombre = 'La Rioja')),
            ('Chilecito', (SELECT id FROM provincias WHERE nombre = 'La Rioja')),
            ('Famatina', (SELECT id FROM provincias WHERE nombre = 'La Rioja')),
            ('Sanagasta', (SELECT id FROM provincias WHERE nombre = 'La Rioja')),
            ('Villa Unión', (SELECT id FROM provincias WHERE nombre = 'La Rioja')),
            ('Atiles', (SELECT id FROM provincias WHERE nombre = 'La Rioja')),
            ('Malanzán', (SELECT id FROM provincias WHERE nombre = 'La Rioja'));

-- Insertar departamentos de Mendoza
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Mendoza')),
    ('San Rafael', (SELECT id FROM provincias WHERE nombre = 'Mendoza')),
    ('Malargüe', (SELECT id FROM provincias WHERE nombre = 'Mendoza')),
    ('Luján de Cuyo', (SELECT id FROM provincias WHERE nombre = 'Mendoza')),
    ('Maipú', (SELECT id FROM provincias WHERE nombre = 'Mendoza')),
    ('San Martín', (SELECT id FROM provincias WHERE nombre = 'Mendoza')),
    ('Tunuyán', (SELECT id FROM provincias WHERE nombre = 'Mendoza')),
    ('Rivadavia', (SELECT id FROM provincias WHERE nombre = 'Mendoza'));

-- Insertar departamentos de Misiones
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Misiones')),
    ('Posadas', (SELECT id FROM provincias WHERE nombre = 'Misiones')),
    ('Eldorado', (SELECT id FROM provincias WHERE nombre = 'Misiones')),
    ('Oberá', (SELECT id FROM provincias WHERE nombre = 'Misiones')),
    ('Apóstoles', (SELECT id FROM provincias WHERE nombre = 'Misiones')),
    ('San Vicente', (SELECT id FROM provincias WHERE nombre = 'Misiones')),
    ('Leandro N. Alem', (SELECT id FROM provincias WHERE nombre = 'Misiones')),
    ('San Pedro', (SELECT id FROM provincias WHERE nombre = 'Misiones'));

-- Insertar departamentos de Neuquén
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Neuquén')),
    ('San Martín de los Andes', (SELECT id FROM provincias WHERE nombre = 'Neuquén')),
    ('Junín de los Andes', (SELECT id FROM provincias WHERE nombre = 'Neuquén')),
    ('Zapala', (SELECT id FROM provincias WHERE nombre = 'Neuquén')),
    ('Plottier', (SELECT id FROM provincias WHERE nombre = 'Neuquén')),
    ('Villa La Angostura', (SELECT id FROM provincias WHERE nombre = 'Neuquén')),
    ('Aluminé', (SELECT id FROM provincias WHERE nombre = 'Neuquén')),
    ('Cutral-Có', (SELECT id FROM provincias WHERE nombre = 'Neuquén'));

-- Insertar departamentos de Río Negro
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Río Negro')),
    ('San Carlos de Bariloche', (SELECT id FROM provincias WHERE nombre = 'Río Negro')),
    ('Viedma', (SELECT id FROM provincias WHERE nombre = 'Río Negro')),
    ('Cipolletti', (SELECT id FROM provincias WHERE nombre = 'Río Negro')),
    ('General Roca', (SELECT id FROM provincias WHERE nombre = 'Río Negro')),
    ('Allen', (SELECT id FROM provincias WHERE nombre = 'Río Negro')),
    ('Catriel', (SELECT id FROM provincias WHERE nombre = 'Río Negro')),
    ('Las Grutas', (SELECT id FROM provincias WHERE nombre = 'Río Negro'));

-- Insertar departamentos de Salta
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Salta')),
    ('San Salvador de Jujuy', (SELECT id FROM provincias WHERE nombre = 'Salta')),
    ('Salta Capital', (SELECT id FROM provincias WHERE nombre = 'Salta')),
    ('Orán', (SELECT id FROM provincias WHERE nombre = 'Salta')),
    ('Tartagal', (SELECT id FROM provincias WHERE nombre = 'Salta')),
    ('Metán', (SELECT id FROM provincias WHERE nombre = 'Salta')),
    ('Cafayate', (SELECT id FROM provincias WHERE nombre = 'Salta')),
    ('General Güemes', (SELECT id FROM provincias WHERE nombre = 'Salta'));

-- Insertar departamentos de San Juan
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'San Juan')),
    ('San Martín', (SELECT id FROM provincias WHERE nombre = 'San Juan')),
    ('Rivadavia', (SELECT id FROM provincias WHERE nombre = 'San Juan')),
    ('Chimbas', (SELECT id FROM provincias WHERE nombre = 'San Juan')),
    ('Caucete', (SELECT id FROM provincias WHERE nombre = 'San Juan')),
    ('25 de Mayo', (SELECT id FROM provincias WHERE nombre = 'San Juan')),
    ('Albardón', (SELECT id FROM provincias WHERE nombre = 'San Juan')),
    ('Zonda', (SELECT id FROM provincias WHERE nombre = 'San Juan'));

-- Insertar departamentos de San Luis
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'San Luis')),
    ('Villa Mercedes', (SELECT id FROM provincias WHERE nombre = 'San Luis')),
    ('Merlo', (SELECT id FROM provincias WHERE nombre = 'San Luis')),
    ('La Punta', (SELECT id FROM provincias WHERE nombre = 'San Luis')),
    ('Justo Daract', (SELECT id FROM provincias WHERE nombre = 'San Luis')),
    ('Candelaria', (SELECT id FROM provincias WHERE nombre = 'San Luis')),
    ('San Francisco', (SELECT id FROM provincias WHERE nombre = 'San Luis')),
    ('San Martín', (SELECT id FROM provincias WHERE nombre = 'San Luis'));

-- Insertar departamentos de Santa Cruz
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz')),
    ('Río Gallegos', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz')),
    ('El Calafate', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz')),
    ('Caleta Olivia', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz')),
    ('Puerto Deseado', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz')),
    ('Las Heras', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz')),
    ('Gobernador Gregores', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz')),
    ('San Julián', (SELECT id FROM provincias WHERE nombre = 'Santa Cruz'));

-- Insertar departamentos de Santa Fe
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Santa Fe')),
    ('Rosario', (SELECT id FROM provincias WHERE nombre = 'Santa Fe')),
    ('Santa Fe', (SELECT id FROM provincias WHERE nombre = 'Santa Fe')),
    ('Venado Tuerto', (SELECT id FROM provincias WHERE nombre = 'Santa Fe')),
    ('Rafaela', (SELECT id FROM provincias WHERE nombre = 'Santa Fe')),
    ('San Lorenzo', (SELECT id FROM provincias WHERE nombre = 'Santa Fe')),
    ('Casilda', (SELECT id FROM provincias WHERE nombre = 'Santa Fe')),
    ('Esperanza', (SELECT id FROM provincias WHERE nombre = 'Santa Fe'));

-- Insertar departamentos de Santiago del Estero
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero')),
    ('La Banda', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero')),
    ('Termas de Río Hondo', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero')),
    ('Añatuya', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero')),
    ('Loreto', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero')),
    ('Quimilí', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero')),
    ('Ojo de Agua', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero')),
    ('Frías', (SELECT id FROM provincias WHERE nombre = 'Santiago del Estero'));

-- Insertar departamentos de Tierra del Fuego
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Tierra del Fuego')),
    ('Ushuaia', (SELECT id FROM provincias WHERE nombre = 'Tierra del Fuego')),
    ('Río Grande', (SELECT id FROM provincias WHERE nombre = 'Tierra del Fuego')),
    ('Tolhuin', (SELECT id FROM provincias WHERE nombre = 'Tierra del Fuego'));

-- Insertar departamentos de Tucumán
INSERT INTO departamentos (nombre, provincia_id) VALUES
    ('Capital', (SELECT id FROM provincias WHERE nombre = 'Tucumán')),
    ('San Miguel de Tucumán', (SELECT id FROM provincias WHERE nombre = 'Tucumán')),
    ('Tafí Viejo', (SELECT id FROM provincias WHERE nombre = 'Tucumán')),
    ('Yerba Buena', (SELECT id FROM provincias WHERE nombre = 'Tucumán')),
    ('Concepción', (SELECT id FROM provincias WHERE nombre = 'Tucumán')),
    ('Monteros', (SELECT id FROM provincias WHERE nombre = 'Tucumán')),
    ('Lules', (SELECT id FROM provincias WHERE nombre = 'Tucumán')),
    ('Famaillá', (SELECT id FROM provincias WHERE nombre = 'Tucumán'));
