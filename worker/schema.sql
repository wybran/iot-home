CREATE TABLE IF NOT EXISTS TempIndoor (Id INTEGER PRIMARY KEY, temperature REAL, humidity REAL, timestamp REAL);
CREATE TABLE IF NOT EXISTS TempOutdoor (Id INTEGER PRIMARY KEY, temperature REAL, timestamp REAL);
CREATE TABLE IF NOT EXISTS Waterflow (Id INTEGER PRIMARY KEY, count REAL, total REAL, time REAL, timestamp REAL);