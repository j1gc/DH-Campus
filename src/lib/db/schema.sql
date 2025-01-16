-- bunx wrangler d1 execute dhcampus-prod-d1 --local --command="SELECT * FROM Users"
-- bunx wrangler d1 execute dhcampus-prod-d1 --local --file=./src/lib/db/schema.sql
-- bunx wrangler kv key list --binding kv --local
-- bunx wrangler pages deployment tail --project-name dh-campus

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    ReceiveNewsletter BOOLEAN DEFAULT FALSE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM Users;

--DROP TABLE IF EXISTS Buildings;
--CREATE TABLE Buildings (
--    Name TEXT NOT NULL,
--    Address TEXT NOT NULL,
--    Capacity TEXT,
--    ImgAddr TEXT,
--    Price TEXT,
--    Benefits TEXT,
--    PRIMARY KEY (Name, Address)
--);
--INSERT INTO Buildings (Name, Address, Capacity, ImgAddr, Price, Benefits) VALUES
--('Schuster Platz', 'Schuster Platz 1, 49356 Diepholz', '20+', '/images/findlocation/PXL_20241213_140001630.webp', '10€', 'Kostenloses WLAN, Kostenlose Parkplätze, Kostenlose Getränke'),
--('Grafenplatz', 'Grafenplatz 1, 49356 Diepholz', '20+', '/images/findlocation/PXL_20241213_140153336.webp', '13€', 'Kostenloses WLAN, Kostenlose Parkplätze, Kostenlose Getränke, Kostenloses Essen'),
--('Königsplatz', 'Königsplatz 1, 49356 Diepholz', '16', '/images/findlocation/PXL_20241213_140206383.webp', '15€', 'Kostenloses WLAN, Kostenlose Parkplätze, Kostenlose Getränke'),
--('Kaiserplatz', 'Kaiserplatz 1, 49356 Diepholz', '7', '/images/findlocation/PXL_20241213_140445588.webp', '20€', 'Kostenloses WLAN, Kostenlose Parkplätze, Kostenlose Getränke'),
--('Kurfürstenplatz', 'Kurfürstenplatz 1, 49356 Diepholz', '5', '/images/findlocation/PXL_20241213_140538373.webp', '25€', 'Kostenloses WLAN, Kostenlose Parkplätze, Kostenlose Getränke'),
--('Herzogplatz', 'Herzogplatz 1, 49356 Diepholz', '3', '/images/findlocation/PXL_20241213_140830870.webp', '30€', 'Kostenloses WLAN, Kostenlose Parkplätze, Kostenlose Getränke');
--
--DROP TABLE IF EXISTS SearchBuildings;
--CREATE VIRTUAL TABLE SearchBuildings USING FTS5(Name, Address);
--INSERT INTO SearchBuildings (Name, Address) VALUES
--('Schuster Platz', 'Schuster Platz 1, 49356 Diepholz'),
--('Grafenplatz', 'Grafenplatz 1, 49356 Diepholz'),
--('Königsplatz', 'Königsplatz 1, 49356 Diepholz'),
--('Kaiserplatz', 'Kaiserplatz 1, 49356 Diepholz'),
--('Kurfürstenplatz', 'Kurfürstenplatz 1, 49356 Diepholz'),
--('Herzogplatz', 'Herzogplatz 1, 49356 Diepholz');
--
--SELECT * FROM SearchBuildings WHERE SearchBuildings MATCH 'Diepholz';

