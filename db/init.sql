CREATE TABLE IF NOT EXISTS people (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (person_id) REFERENCES people(person_id)
);

CREATE TABLE IF NOT EXISTS purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    description VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rol (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuario_rol (
    usuario_id BIGINT NOT NULL,
    rol_id BIGINT NOT NULL,
    PRIMARY KEY (usuario_id, rol_id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_rol FOREIGN KEY (rol_id) REFERENCES rol(id)
);

INSERT IGNORE INTO rol (nombre) VALUES ('USER'), ('ADMIN');