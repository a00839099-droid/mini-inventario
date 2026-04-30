CREATE DATABASE IF NOT EXISTS inventario;

USE inventario;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cantidad INT NOT NULL DEFAULT 0,
    precio DECIMAL(10,2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO productos (nombre, descripcion, cantidad, precio) VALUES
('Teclado mecanico', 'Teclado USB con switches azules', 15, 45.99),
('Monitor 24"', 'Monitor Full HD 75Hz', 8, 189.99),
('Mouse inalambrico', 'Mouse ergonomico 2.4GHz', 30, 22.50);