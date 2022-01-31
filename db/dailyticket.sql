-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 22, 2021 alle 18:45
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dailyticket`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `idEvento` bigint(20) UNSIGNED NOT NULL,
  `quantita` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `eventi`
--

CREATE TABLE `eventi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `descrizione` text NOT NULL,
  `data` date DEFAULT NULL,
  `prezzo` text NOT NULL,
  `categoria` text NOT NULL,
  `sottocategoria` text NOT NULL,
  `citta` text NOT NULL,
  `luogo` text NOT NULL,
  `ora` text NOT NULL,
  `url` text NOT NULL,
  `titolo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `eventi`
--

INSERT INTO `eventi` (`id`, `descrizione`, `data`, `prezzo`, `categoria`, `sottocategoria`, `citta`, `luogo`, `ora`, `url`, `titolo`) VALUES
(3, '', '2021-10-04', '39,10 €', 'Concerti', 'Pop e Rock', 'Torino', 'Pala Alpitour', '21:00', '../img/pinguini.jpg', 'Pinguini Tattici Nucleari'),
(4, '', '2021-02-02', '29,50 €', 'Concerti', 'Pop e Rock', 'Torino', 'Teatro Alfieri', '21:00', '../img/queen.jpg', 'Long Live The Queen'),
(5, 'Confermati System of a Down e Korn nell\'ambito di I-Days 2021.', '2021-06-10', '69,00 €', 'Concerti', 'Metal', 'Milano', 'I-DAYS, address to be confirmed.', '17:00', '../img/systemofadown.jpg', 'System of a Down + Korn'),
(6, 'Gli Slipknot tornano in Italia!', '2021-07-27', '196,25 €', 'Concerti', 'Metal', 'Villafranca di Verona', 'Castello Scaligero', '21:00', '../img/slipknot.jpg', 'Slipknot'),
(7, 'Sergio Cammariere torna in concerto.', '2021-02-08', '35,00 €', 'Concerti', 'Jazz', 'Roma', 'Auditorium Parco della Musica - Sala S.Cecilia', '21:00', '../img/cammariere.jpg', 'Sergio Cammariere'),
(8, '', '2021-06-12', '69,00 €', 'Concerti', 'Jazz', 'Mantova', 'Esedra di Palazzo Te', '21:30', '../img/conte.jpg', 'Paolo Conte'),
(9, 'Reload Music Festival è stato posticipato nel 2021.', '2021-03-05', '30,00 €', 'Concerti', 'Festival', 'Torino', 'Pala Alpitour (ingresso Corso Sebastopoli)', '18:00', '../img/reload.jpg', 'Reload Music Festival'),
(10, 'I Powerwolf si aggiungono alla line-up nella giornata del 26 giungo 2021 con headliner i Judad Priest.', '2021-06-26', '69,00 €', 'Concerti', 'Festival', 'Villafranca di Verona', 'Castello Scaligero', '14:15', '../img/castle.jpg', 'Rock the Castle 2021'),
(11, '', '2021-02-05', '45,00 €', 'Sport', 'Calcio', 'Milano', 'Stadio San Siro', '20:45', '../img/milan.jpg', 'Milan - Crotone'),
(12, '', '2021-02-06', '60,00 €', 'Sport', 'Calcio', 'Torino', 'Stadio \'Allianz Stadium\'', '18:00', '../img/juventus.jpg', 'Juventus - Roma'),
(13, '', '2021-02-08', '30,00 €', 'Sport', 'Tennis', 'Melbourne, Australia', 'Melbourne Park', '16:00', '../img/australian.jpg', 'Australian Open'),
(14, '', '2021-03-07', '32,00 €', 'Sport', 'Tennis', 'Marsiglia, Francia', 'Palais des Sports de Marseille', '17:30', '../img/atp250.jpg', 'ATP 250'),
(15, '', '2021-04-03', '25,00 €', 'Sport', 'Basket', 'Milano', 'Mediolanum Forum', '20:30', '../img/olimpia.jpg', 'Olimpia Milano - Varese'),
(16, '', '2021-04-03', '32,00 €', 'Sport', 'Basket', 'Trento', 'BLM Group Arena', '21:00', '../img/trento.jpg', 'Trento - Venezia'),
(19, 'Acquista la carta Azzurro XV, la tessera di fidelizzazione del pubblico del Rugby!', '2023-04-07', '15,00 €', 'Sport', 'Rugby', 'Online', 'Spedizione a casa', 'Nessun orario', '../img/rugby.jpg', 'Tessera Azzurro XV - Federazione Italiana Rugby'),
(20, 'Frida Kahlo Il Caos Dentro arriva a Milano!', '2021-02-04', '16,50 €', 'Mostre e Musei', 'Mostre d\'arte e storia', 'Milano', 'Fabbrica del Vapore - Spazio Messina', '09:30', '../img/frida.jpg', 'Frida Kahlo Il Caos Dentro'),
(21, 'La mostra per conoscere genio, creatività ed innovazione del padre della Pop Art.', '2021-01-31', '13,50 €', 'Mostre e Musei', 'Mostre d\'arte e storia', 'Stupinigi', 'Palazzina di Caccia di Stupinigi', '10:00', '../img/warhol.jpg', 'Andy Warhol Super Pop'),
(22, '', '2021-02-20', '11,00 €', 'Mostre e Musei', 'Musei e siti archeologici', 'Pienza', 'Palazzo Piccolomini', '10:00', '../img/pienza.jpg', 'Pienza Città di Luce'),
(23, 'Acquista ora il tuo biglietto OPEN per visitare il Museo del Risparmio!', '2021-12-31', '6,00 €', 'Mostre e Musei', 'Musei e siti archeologici', 'Torino', 'Museo del Risparmio', '00:00', '../img/risparmio.jpg', 'Open - Museo del Risparmio'),
(24, '', '2021-12-12', '24,00 €', 'Teatro', 'Musical e varietà', 'Varese', 'Teatro di Varese', '17:00', '../img/alice.jpg', 'Alice nel Paese delle Meraviglie'),
(25, 'Torna Grease il Musical!', '2021-03-11', '19,00 €', 'Teatro', 'Musical e varietà', 'Assago', 'Teatro Repower', '20:45', '../img/grease.jpg', 'Grease'),
(26, 'Lillo e Greg tornano con il loro show!', '2021-02-25', '25,00 €', 'Teatro', 'Prosa', 'Ferrara', 'Teatro Nuovo', '21:00', '../img/lillo.jpg', 'Lillo e Greg in Gagmen'),
(27, 'Il nuovo spettacolo di Andrea Pucci.', '2021-02-26', '36,00 €', 'Teatro', 'Prosa', 'Bassano Del Grappa', 'Palabassano2 (ex Palabruel)', '21:00', '../img/pucci.jpg', 'Lillo e Greg in Gagmen'),
(28, '', '2021-02-07', '22,00 €', 'Teatro', 'Teatro lirico', 'Venaria Reale', 'Teatro della Concordia', '16:00', '../img/madama.jpg', 'Madama Butterfly'),
(29, '', '2021-03-07', '33,00 €', 'Teatro', 'Teatro lirico', 'Prato', 'Teatro Politeama Pratese - Camerata C19', '16:00', '../img/traviata.jpg', 'La Traviata Melodramma in tre atti'),
(30, '', '2021-03-03', '27,50 €', 'Teatro', 'Balletto classico e moderno', 'Torino', 'Teatro Alfieri', '20:45', '../img/momix.jpg', ''),
(31, 'Parsons Dance torna nel 2021!', '2021-03-03', '23,00 €', 'Teatro', 'Balletto classico e moderno', 'Milano', 'Teatro degli Arcimboldi', '21:00', '../img/parsons.jpg', '');

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini`
--

CREATE TABLE `ordini` (
  `id` int(11) NOT NULL,
  `idEvento` bigint(20) UNSIGNED NOT NULL,
  `quantita` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `ordini`
--

INSERT INTO `ordini` (`id`, `idEvento`, `quantita`, `username`, `data`) VALUES
(1, 3, 2, 'mario', '2021-01-22'),
(1, 20, 2, 'mario', '2021-01-22'),
(2, 11, 2, 'mario', '2021-01-22'),
(2, 15, 4, 'mario', '2021-01-22'),
(2, 25, 5, 'mario', '2021-01-22'),
(3, 4, 3, 'roberto', '2021-01-22');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `email` text NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`email`, `username`, `password`) VALUES
('mario@gmail.com', 'mario', 'b00291b575356a2cb238c79d3c87c445fc7873c8'),
('roberto@gmail.com', 'roberto', '97c9ede706788ed439a6beb37413273c8af14ddb');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD PRIMARY KEY (`idEvento`,`username`),
  ADD KEY `idEvento` (`idEvento`),
  ADD KEY `username` (`username`),
  ADD KEY `idEvento_2` (`idEvento`),
  ADD KEY `username_2` (`username`);

--
-- Indici per le tabelle `eventi`
--
ALTER TABLE `eventi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`);

--
-- Indici per le tabelle `ordini`
--
ALTER TABLE `ordini`
  ADD PRIMARY KEY (`id`,`idEvento`),
  ADD KEY `idEvento` (`idEvento`),
  ADD KEY `username` (`username`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `eventi`
--
ALTER TABLE `eventi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `carrello`
--
ALTER TABLE `carrello`
  ADD CONSTRAINT `fk_idEvento2` FOREIGN KEY (`idEvento`) REFERENCES `eventi` (`id`),
  ADD CONSTRAINT `fk_username2` FOREIGN KEY (`username`) REFERENCES `utenti` (`username`);

--
-- Limiti per la tabella `ordini`
--
ALTER TABLE `ordini`
  ADD CONSTRAINT `fk_idEvento` FOREIGN KEY (`idEvento`) REFERENCES `eventi` (`id`),
  ADD CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `utenti` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
