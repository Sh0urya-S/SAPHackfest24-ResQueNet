-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2024 at 01:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maps_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `coordinates`
--

CREATE TABLE `coordinates` (
  `id` int(11) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coordinates`
--

INSERT INTO `coordinates` (`id`, `latitude`, `longitude`) VALUES
(1, 17.6655, 83.2165),
(2, 17.6775, 83.2214),
(3, 17.6462, 83.2075),
(4, 17.6525, 83.2391),
(5, 17.6809, 83.1931),
(6, 17.6556, 83.231),
(7, 17.6625, 83.2149),
(8, 17.67, 83.2267),
(9, 17.6752, 83.2199),
(10, 17.6643, 83.2114),
(11, 17.715, 83.315),
(12, 17.525, 83.215),
(13, 17.345, 83.125),
(14, 17.435, 83.355),
(15, 17.665, 83.475),
(16, 17.785, 83.595),
(17, 17.875, 83.125),
(18, 17.935, 83.335),
(19, 17.865, 83.415),
(20, 17.815, 83.235),
(21, 17.655, 83.445),
(22, 17.725, 83.255),
(23, 17.615, 83.265),
(24, 17.485, 83.135),
(25, 17.555, 83.215),
(26, 17.625, 83.225),
(27, 17.675, 83.325),
(28, 17.735, 83.435),
(29, 17.785, 83.525),
(30, 17.825, 83.615),
(31, 17.685, 83.195),
(32, 17.725, 83.305),
(33, 17.735, 83.415),
(34, 17.655, 83.225),
(35, 17.675, 83.315),
(36, 17.715, 83.405),
(37, 17.625, 83.175),
(38, 17.685, 83.285),
(39, 17.695, 83.365),
(40, 17.605, 83.215),
(41, 17.565, 83.135),
(42, 17.515, 83.095),
(43, 17.485, 83.045),
(44, 17.445, 83.025),
(45, 17.405, 82.985),
(46, 17.365, 82.945),
(47, 17.325, 82.915),
(48, 17.285, 82.875),
(49, 17.245, 82.835),
(50, 17.205, 82.795);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coordinates`
--
ALTER TABLE `coordinates`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coordinates`
--
ALTER TABLE `coordinates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
