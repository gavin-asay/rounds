CREATE TABLE homes (
    id INTEGER UNSIGNED AUTO_INCREMENT,
    name VARCHAR(15) UNIQUE,
    program VARCHAR(15),
    phase VARCHAR(15),
    bedroom_count INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE bedrooms (
    id INTEGER UNSIGNED AUTO_INCREMENT,
    home_id INTEGER UNSIGNED,
    bed_count INTEGER UNSIGNED,
    PRIMARY KEY(id),
    FOREIGN KEY (home_id) REFERENCES homes(id)
);

CREATE TABLE beds (
    id INTEGER UNSIGNED AUTO_INCREMENT,
    bedroom_id INTEGER UNSIGNED,
    PRIMARY KEY(id)
);

CREATE TABLE students (
    id INTEGER UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    assigned_home INTEGER UNSIGNED NOT NULL,
    temp_home INTEGER UNSIGNED,
    bed INTEGER UNSIGNED,
    absence_code VARCHAR(4),
    risk_code VARCHAR(4),
    concern_code VARCHAR(4),
    PRIMARY KEY(id),
    FOREIGN KEY (assigned_home, temp_home) REFERENCES homes(id, id),
    FOREIGN KEY (bed) REFERENCES beds(id)
);