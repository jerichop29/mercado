-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 24, 2025 at 05:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS=0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mercado-database_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admintbl`
--

CREATE TABLE `admintbl` (
  `Admin_Id` int(11) NOT NULL,
  `Username` varchar(60) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `role` varchar(60) NOT NULL,
  `Person_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admintbl`
--

INSERT INTO `admintbl` (`Admin_Id`, `Username`, `Password`, `role`, `Person_Id`) VALUES
(1, 'admin', '$2y$10$01s7AX.F1ojyatwKNmmpqOXc4lgHmnUBdti8X4dgsAb46hy33iGGK', 'admin', 2),
(2, 'superadmin', '$2y$10$01s7AX.F1ojyatwKNmmpqOXc4lgHmnUBdti8X4dgsAb46hy33iGGK', 'superadmin', 3);

-- --------------------------------------------------------

--
-- Table structure for table `buildingtbl`
--

CREATE TABLE `buildingtbl` (
  `Id` int(11) NOT NULL,
  `BuildingName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buildingtbl`
--

INSERT INTO `buildingtbl` (`Id`, `BuildingName`) VALUES
(1, 'Building 1'),
(2, 'Building 2'),
(3, 'Building 3'),
(4, 'Building 4'),
(5, 'Building 5');

-- --------------------------------------------------------

--
-- Table structure for table `discovertbl`
--

CREATE TABLE `discovertbl` (
  `discover_Id` int(11) NOT NULL,
  `Title` varchar(60) NOT NULL,
  `image` blob NOT NULL COMMENT 'image upload',
  `Activity` varchar(60) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Date_Start` date NOT NULL,
  `Date_End` date NOT NULL,
  `Link` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discovertbl`
--

INSERT INTO `discovertbl` (`discover_Id`, `Title`, `image`, `Activity`, `Description`, `Date_Start`, `Date_End`, `Link`) VALUES
(1, 'Test', '', 'TEst', 'The \"Table Tennis Tournament at Mercado De Calamba for Youth\" is an exciting event aimed at promoting sportsmanship, skill development, and community engagement among young people. Held at the Mercado De Calamba, this tournament invites local youth to participate in friendly yet competitive table tennis matches. The event provides a platform for young players to showcase their talents, improve their game, and interact with peers in a vibrant and supportive environment.', '2025-02-06', '2025-02-21', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=mercado-database_test&table=discovertbl'),
(2, 'Test', '', 'TEst', 'The \"Table Tennis Tournament at Mercado De Calamba for Youth\" is an exciting event aimed at promoting sportsmanship, skill development, and community engagement among young people. Held at the Mercado De Calamba, this tournament invites local youth to participate in friendly yet competitive table tennis matches. The event provides a platform for young players to showcase their talents, improve their game, and interact with peers in a vibrant and supportive environment.', '2025-02-06', '2025-02-21', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=mercado-database_test&table=discovertbl');

-- --------------------------------------------------------

--
-- Table structure for table `eventtbl`
--

CREATE TABLE `eventtbl` (
  `Event_Id` int(11) NOT NULL,
  `facilities_Id` int(11) NOT NULL,
  `Event_Name` varchar(60) NOT NULL,
  `Event_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventtbl`
--

INSERT INTO `eventtbl` (`Event_Id`, `facilities_Id`, `Event_Name`, `Event_Date`) VALUES
(1, 1, 'Valentines Day', '2025-02-14'),
(2, 1, 'G asdasd', '2025-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `facilitiestbl`
--

CREATE TABLE `facilitiestbl` (
  `facilities_Id` int(11) NOT NULL,
  `facilities_Name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facilitiestbl`
--

INSERT INTO `facilitiestbl` (`facilities_Id`, `facilities_Name`) VALUES
(1, 'Event Hall'),
(2, 'Table Tennis');

-- --------------------------------------------------------

--
-- Table structure for table `ownertbl`
--

CREATE TABLE `ownertbl` (
  `Owner_Id` int(11) NOT NULL,
  `Person_Id` int(11) NOT NULL,
  `Admin_Id` int(11) NOT NULL,
  `Date_Start` date NOT NULL,
  `Username` varchar(60) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ownertbl`
--

INSERT INTO `ownertbl` (`Owner_Id`, `Person_Id`, `Admin_Id`, `Date_Start`, `Username`, `Password`, `role`) VALUES
(1, 1, 1, '2025-02-21', 'test', '$2y$10$xr7Aq3von6ec94nsWiTLSuOQ6gBChTWwcjkUcACkkCffU5RqWbopG', 'Owner');

-- --------------------------------------------------------

--
-- Table structure for table `owner_paymenttbl`
--

CREATE TABLE `owner_paymenttbl` (
  `Owner_PaymentId` int(11) NOT NULL,
  `DueDate` date NOT NULL,
  `Status` tinyint(1) NOT NULL COMMENT '1 = Paid\r\n0 = Not Paid',
  `Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `persontbl`
--

CREATE TABLE `persontbl` (
  `Person_Id` int(11) NOT NULL,
  `FName` varchar(60) NOT NULL,
  `LName` varchar(60) NOT NULL,
  `MName` varchar(60) DEFAULT NULL,
  `Gender` varchar(60) NOT NULL,
  `Address` varchar(60) NOT NULL,
  `Contact` varchar(13) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `persontbl`
--

INSERT INTO `persontbl` (`Person_Id`, `FName`, `LName`, `MName`, `Gender`, `Address`, `Contact`, `Email`, `Birthdate`) VALUES
(1, 'Test', 'Test', 'Test', 'Male', 'Test', '0912346789', 'test@gmail.com', '2025-02-10'),
(2, 'admin', 'admin', 'admin', 'Male', 'admin', '0912345678', 'admin@gmail.com', '2025-02-13'),
(3, 'super admin', 'admin', 'admin', 'Female', 'admin', '0912345678', 'admin@gmail.com', '2025-02-13');

-- --------------------------------------------------------

--
-- Table structure for table `stalltbl`
--

CREATE TABLE `stalltbl` (
  `Stall_Id` int(11) NOT NULL,
  `Type_Id` int(11) NOT NULL,
  `StallCode` varchar(60) NOT NULL,
  `BuildingName` int(11) NOT NULL,
  `Owner_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stalltbl`
--

INSERT INTO `stalltbl` (`Stall_Id`, `Type_Id`, `StallCode`, `BuildingName`, `Owner_Id`) VALUES
(1, 3, 'C-24', 1, NULL),
(2, 4, 'C-24C', 1, NULL),
(3, 4, 'C-24B', 1, NULL),
(4, 4, 'C-24D', 1, NULL),
(5, 4, 'C-24A', 1, NULL),
(6, 4, 'A-95', 1, NULL),
(7, 4, 'A-96', 1, NULL),
(8, 4, 'A-97', 1, NULL),
(9, 4, 'A-98', 1, NULL),
(10, 4, 'A-99', 1, NULL),
(11, 4, 'A-100', 1, NULL),
(12, 4, 'A-101', 1, NULL),
(13, 4, 'A-102', 1, NULL),
(14, 4, 'C-8C', 1, NULL),
(15, 4, 'C-8B', 1, NULL),
(16, 4, 'C-8D', 1, NULL),
(17, 4, 'C-8A', 1, NULL),
(18, 4, 'C-8X', 1, NULL),
(19, 4, 'C-8Y', 1, NULL),
(20, 4, 'C-6X', 1, NULL),
(21, 4, 'C-6Y', 1, NULL),
(22, 4, 'C-6C', 1, NULL),
(23, 4, 'C-6B', 1, NULL),
(24, 4, 'C-6D', 1, NULL),
(25, 4, 'C-6A', 1, NULL),
(26, 4, 'A-17', 1, NULL),
(27, 4, 'A-16', 1, NULL),
(28, 4, 'A-19', 1, NULL),
(29, 4, 'A-18', 1, NULL),
(30, 4, 'A-21', 1, NULL),
(31, 4, 'A-20', 1, NULL),
(32, 4, 'A-23', 1, NULL),
(33, 4, 'A-22', 1, NULL),
(34, 4, 'A-25', 1, NULL),
(35, 4, 'A-24', 1, NULL),
(36, 4, 'C-4', 1, NULL),
(37, 4, 'A-1', 1, NULL),
(38, 4, 'A-2', 1, NULL),
(39, 4, 'C-3C', 1, NULL),
(40, 4, 'C-3B', 1, NULL),
(41, 4, 'C-3A', 1, NULL),
(42, 4, 'C-3', 1, NULL),
(43, 4, '27', 1, NULL),
(44, 4, '78', 1, NULL),
(45, 4, '25', 1, NULL),
(46, 4, '26', 1, NULL),
(47, 4, '22', 1, NULL),
(48, 4, '23', 1, NULL),
(49, 4, '21', 1, NULL),
(50, 4, '32', 1, NULL),
(51, 4, '18', 1, NULL),
(52, 4, '175', 1, NULL),
(53, 4, '17', 1, NULL),
(54, 4, '174', 1, NULL),
(55, 4, '12', 1, NULL),
(56, 4, '167', 1, NULL),
(57, 4, '9', 1, NULL),
(58, 4, '159', 1, NULL),
(59, 4, '8', 1, NULL),
(60, 4, '77', 1, NULL),
(61, 4, 'T-4', 1, NULL),
(62, 4, 'T-3', 1, NULL),
(63, 4, '79', 1, NULL),
(64, 4, '106', 1, NULL),
(65, 4, '115', 1, NULL),
(66, 4, '116', 1, NULL),
(67, 4, '125', 1, NULL),
(68, 4, '124', 1, NULL),
(69, 4, '195', 1, NULL),
(70, 4, '183', 1, NULL),
(71, 4, '129', 1, NULL),
(72, 4, '126', 1, NULL),
(73, 4, '172', 1, NULL),
(74, 4, '171', 1, NULL),
(75, 4, '157', 1, NULL),
(76, 4, '156', 1, NULL),
(77, 4, '123', 1, NULL),
(78, 4, '133', 1, NULL),
(79, 4, '73', 1, NULL),
(80, 4, '107', 1, NULL),
(81, 4, 'T-66', 1, NULL),
(82, 4, 'T-89', 1, NULL),
(83, 4, 'A-131', 1, NULL),
(84, 4, 'C-29B', 1, NULL),
(85, 4, 'C-29A', 1, NULL),
(86, 4, 'MB-21', 1, NULL),
(87, 4, 'CO-99', 1, NULL),
(88, 4, 'MB-22', 1, NULL),
(89, 4, 'G-31', 1, NULL),
(90, 4, 'MB-49', 1, NULL),
(91, 4, 'MB-33', 1, NULL),
(92, 4, 'CO-98', 1, NULL),
(93, 4, 'CO-100', 1, NULL),
(94, 4, 'MB-24', 1, NULL),
(95, 4, 'MB-34', 1, NULL),
(96, 4, 'MB-25', 1, NULL),
(97, 4, 'MB-35A_MB-35B', 1, NULL),
(98, 4, 'MB-33A_B-36', 1, NULL),
(99, 4, 'MB-26', 1, NULL),
(100, 4, 'MB-55A_MB-55B', 1, NULL),
(101, 4, 'MB-34A_MB-59A', 1, NULL),
(102, 4, 'MB-59', 1, NULL),
(103, 4, 'MB-65', 1, NULL),
(104, 4, 'MB-28', 1, NULL),
(105, 4, 'MB-64', 1, NULL),
(106, 4, 'MB-29A_MB-29B', 1, NULL),
(107, 4, 'MB-63', 1, NULL),
(108, 4, 'MB-30', 1, NULL),
(109, 4, 'MB-62', 1, NULL),
(110, 4, 'MB-27A', 1, NULL),
(111, 4, 'MB-27B', 1, NULL),
(112, 4, 'C-27', 1, NULL),
(113, 4, 'CO-101', 1, NULL),
(114, 4, 'CO-102', 1, NULL),
(115, 4, 'CO-107', 1, NULL),
(116, 4, 'CO-103', 1, NULL),
(117, 4, 'CO-108', 1, NULL),
(118, 4, 'CO-104', 1, NULL),
(119, 4, 'CO-109', 1, NULL),
(120, 4, 'CO-105', 1, NULL),
(121, 4, 'CO-110', 1, NULL),
(122, 4, 'MB4-253A', 1, NULL),
(123, 4, 'MB4-253B', 1, NULL),
(124, 4, 'CO-106', 1, NULL),
(125, 4, 'CO-111', 1, NULL),
(126, 4, 'CO-119', 1, NULL),
(127, 4, 'CO-124', 1, NULL),
(128, 4, 'CO-120', 1, NULL),
(129, 4, 'CO-125', 1, NULL),
(130, 4, 'CO-121', 1, NULL),
(131, 4, 'CO-126', 1, NULL),
(132, 4, 'MB-58A', 1, NULL),
(133, 4, 'MB-58B', 1, NULL),
(134, 4, 'CO-122', 1, NULL),
(135, 4, 'CO-127', 1, NULL),
(136, 4, 'CO-123', 1, NULL),
(137, 4, 'CO-128', 1, NULL),
(138, 4, 'T-122', 1, NULL),
(139, 4, 'A-133', 1, NULL),
(140, 4, 'C-28B', 1, NULL),
(141, 4, 'C-28A', 1, NULL),
(142, 4, 'CO-112', 1, NULL),
(143, 4, 'CO-116', 1, NULL),
(144, 4, 'CO-113', 1, NULL),
(145, 4, 'CO-117', 1, NULL),
(146, 4, 'CO-114', 1, NULL),
(147, 4, 'CO-118', 1, NULL),
(148, 4, 'CO-115', 1, NULL),
(149, 4, 'T-47', 1, NULL),
(150, 4, 'MB-3_GF-15', 1, NULL),
(151, 4, 'MB-14B', 1, NULL),
(152, 4, 'MB-15', 1, NULL),
(153, 4, 'MB-5', 1, NULL),
(154, 4, 'MB-16', 1, NULL),
(155, 4, 'MB-6', 1, NULL),
(156, 4, 'MB-53', 1, NULL),
(157, 4, 'MB-17B', 1, NULL),
(158, 4, 'MB-54', 1, NULL),
(159, 4, 'MB-17A', 1, NULL),
(160, 4, 'MB-57', 1, NULL),
(161, 4, 'MB-18A_MB-18B', 1, NULL),
(162, 4, 'MB-9', 1, NULL),
(163, 4, 'MB-19B', 1, NULL),
(164, 4, 'MB-10', 1, NULL),
(165, 4, 'MB-20B', 1, NULL),
(166, 4, 'C-26B', 1, NULL),
(167, 4, 'C-26A', 1, NULL),
(168, 4, 'C-26', 1, NULL),
(169, 4, 'C-22', 1, NULL),
(170, 4, 'C-22C', 1, NULL),
(171, 4, 'C-22B', 1, NULL),
(172, 4, 'A-82', 1, NULL),
(173, 4, 'A-83', 1, NULL),
(174, 4, 'A-94', 1, NULL),
(175, 4, 'A-93', 1, NULL),
(176, 4, 'A-92', 1, NULL),
(177, 4, 'A-66', 1, NULL),
(178, 4, 'A-90', 1, NULL),
(179, 4, 'A-89', 1, NULL),
(180, 4, 'A-88', 1, NULL),
(181, 4, 'A-87', 1, NULL),
(182, 4, 'C-7C', 1, NULL),
(183, 4, 'C-7B', 1, NULL),
(184, 4, 'C-7D', 1, NULL),
(185, 4, 'C-7A', 1, NULL),
(186, 4, 'C-7X', 1, NULL),
(187, 4, 'C-7Y', 1, NULL),
(188, 4, 'C-5X', 1, NULL),
(189, 4, 'C-5Y', 1, NULL),
(190, 4, 'C-5C', 1, NULL),
(191, 4, 'C-5B', 1, NULL),
(192, 4, 'C-5D', 1, NULL),
(193, 4, 'C-5A', 1, NULL),
(194, 4, 'A-15', 1, NULL),
(195, 4, 'A-14', 1, NULL),
(196, 4, 'A-11', 1, NULL),
(197, 4, 'A-12', 1, NULL),
(198, 4, 'A-9', 1, NULL),
(199, 4, 'A-10', 1, NULL),
(200, 4, 'A-7', 1, NULL),
(201, 4, 'A-8', 1, NULL),
(202, 4, 'A-5', 1, NULL),
(203, 4, 'A-6', 1, NULL),
(204, 4, 'C-1', 1, NULL),
(205, 4, 'A-3', 1, NULL),
(206, 4, 'A-4', 1, NULL),
(207, 4, 'C-2B', 1, NULL),
(208, 4, 'C-2C', 1, NULL),
(209, 4, 'C-2', 1, NULL),
(210, 4, 'C-2A', 1, NULL),
(211, 4, 'C-25A', 2, NULL),
(212, 4, 'C-25', 2, NULL),
(213, 4, 'C-25B', 2, NULL),
(214, 4, 'C-25D', 2, NULL),
(215, 4, 'C-25C', 2, NULL),
(216, 4, 'A-123', 2, NULL),
(217, 4, 'A-121', 2, NULL),
(218, 4, 'A-120', 2, NULL),
(219, 4, 'A-111', 2, NULL),
(220, 4, 'A-112', 2, NULL),
(221, 4, 'A-115', 2, NULL),
(222, 4, 'A-114', 2, NULL),
(223, 4, 'A-117', 2, NULL),
(224, 4, 'A-129', 2, NULL),
(225, 4, 'A-119', 2, NULL),
(226, 4, 'A-118', 2, NULL),
(227, 4, 'C-17C', 2, NULL),
(228, 4, 'A-17B', 2, NULL),
(229, 4, 'C-17D', 2, NULL),
(230, 4, 'C-17A', 2, NULL),
(231, 4, 'C-17X', 2, NULL),
(232, 4, 'C-17Y', 2, NULL),
(233, 4, 'C-15X', 2, NULL),
(234, 4, 'C-15Y', 2, NULL),
(235, 4, 'C-15C', 2, NULL),
(236, 4, 'C-15B', 2, NULL),
(237, 4, 'C-15D', 2, NULL),
(238, 4, 'C-15A', 2, NULL),
(239, 4, 'A-45', 2, NULL),
(240, 4, 'A-44', 2, NULL),
(241, 4, 'A-47', 2, NULL),
(242, 4, 'A-46', 2, NULL),
(243, 4, 'A-49', 2, NULL),
(244, 4, 'A-48', 2, NULL),
(245, 4, 'A-51', 2, NULL),
(246, 4, 'A-50', 2, NULL),
(247, 4, 'A-53', 2, NULL),
(248, 4, 'A-52', 2, NULL),
(249, 4, 'C-12', 2, NULL),
(250, 4, 'A-26', 2, NULL),
(251, 4, 'A-27', 2, NULL),
(252, 4, 'A-28', 2, NULL),
(253, 4, 'A-29A', 2, NULL),
(254, 4, 'C-11A', 2, NULL),
(255, 4, 'C-11', 2, NULL),
(256, 4, 'C-11B', 2, NULL),
(257, 4, 'C-11C', 2, NULL),
(258, 4, '61', 2, NULL),
(259, 4, '74', 2, NULL),
(260, 4, '60', 2, NULL),
(261, 4, '71', 2, NULL),
(262, 4, '55', 2, NULL),
(263, 4, '62', 2, NULL),
(264, 4, '54', 2, NULL),
(265, 4, '49', 2, NULL),
(266, 4, '56', 2, NULL),
(267, 4, '59', 2, NULL),
(268, 4, '48', 2, NULL),
(269, 4, '53', 2, NULL),
(270, 4, '44', 2, NULL),
(271, 4, '50', 2, NULL),
(272, 4, '43', 2, NULL),
(273, 4, '45', 2, NULL),
(274, 4, '40', 2, NULL),
(275, 4, '42', 2, NULL),
(276, 4, '39', 2, NULL),
(277, 4, '41', 2, NULL),
(278, 4, '34', 2, NULL),
(279, 4, '38', 2, NULL),
(280, 4, '33', 2, NULL),
(281, 4, '184', 2, NULL),
(282, 4, '30', 2, NULL),
(283, 4, '31', 2, NULL),
(284, 4, 'T-29', 2, NULL),
(285, 4, 'T-72', 2, NULL),
(286, 4, '85', 2, NULL),
(287, 4, '98', 2, NULL),
(288, 4, '97', 2, NULL),
(289, 4, '100', 2, NULL),
(290, 4, '114', 2, NULL),
(291, 4, '101', 2, NULL),
(292, 4, '112', 2, NULL),
(293, 4, '105', 2, NULL),
(294, 4, '109', 2, NULL),
(295, 4, '108', 2, NULL),
(296, 4, '117', 2, NULL),
(297, 4, '149', 2, NULL),
(298, 4, '118', 2, NULL),
(299, 4, '146-20', 2, NULL),
(300, 4, '131', 2, NULL),
(301, 4, '141', 2, NULL),
(302, 4, '130', 2, NULL),
(303, 4, '132', 2, NULL),
(304, 4, '139', 2, NULL),
(305, 4, '140', 2, NULL),
(306, 4, '147-2', 2, NULL),
(307, 4, '148', 2, NULL),
(308, 4, '193', 2, NULL),
(309, 4, '194', 2, NULL),
(310, 4, '92', 2, NULL),
(311, 4, '93', 2, NULL),
(312, 4, '91', 2, NULL),
(313, 4, '99', 2, NULL),
(314, 4, 'A-124', 2, NULL),
(315, 4, 'A-126', 2, NULL),
(316, 4, 'A-128', 2, NULL),
(317, 4, 'A-134', 2, NULL),
(318, 4, 'A-80', 2, NULL),
(319, 4, 'A-81', 2, NULL),
(320, 4, 'A-132', 2, NULL),
(321, 4, 'A-130', 2, NULL),
(322, 4, 'C-122', 2, NULL),
(323, 4, 'C-28', 2, NULL),
(324, 4, 'A-78', 2, NULL),
(325, 4, 'A-79', 2, NULL),
(326, 4, 'A-135', 2, NULL),
(327, 4, 'C-30_MB4', 2, NULL),
(328, 4, 'CO-128', 2, NULL),
(329, 4, 'C-23', 2, NULL),
(330, 4, 'MB3-GF-50', 2, NULL),
(331, 4, 'A-76', 2, NULL),
(332, 4, 'A-68', 2, NULL),
(333, 4, 'A-69', 2, NULL),
(334, 4, 'A-29B', 2, NULL),
(335, 4, 'A-85', 2, NULL),
(336, 4, 'A-70', 2, NULL),
(337, 4, 'A-73', 2, NULL),
(338, 4, 'C-75', 2, NULL),
(339, 4, 'A-84', 2, NULL),
(340, 4, 'T-203', 2, NULL),
(341, 4, 'C-23B', 2, NULL),
(342, 4, 'A-77', 2, NULL),
(343, 4, 'C-22A', 2, NULL),
(344, 4, 'MB-57', 2, NULL),
(345, 4, 'C-31_MB4', 2, NULL),
(346, 4, 'A-71', 2, NULL),
(347, 4, 'MB-46', 2, NULL),
(348, 4, 'A-127', 2, NULL),
(349, 4, 'A-116', 2, NULL),
(350, 4, 'A-74', 2, NULL),
(351, 4, 'A-125', 2, NULL),
(352, 4, 'C-23A', 2, NULL),
(353, 4, 'A-23D', 2, NULL),
(354, 4, 'A-67', 2, NULL),
(355, 4, 'A-23C', 2, NULL),
(356, 4, 'A-110', 2, NULL),
(357, 4, 'A-109', 2, NULL),
(358, 4, 'A-108', 2, NULL),
(359, 4, 'A-107', 2, NULL),
(360, 4, 'A-106', 2, NULL),
(361, 4, 'A-105', 2, NULL),
(362, 4, 'A-104', 2, NULL),
(363, 4, 'A-103', 2, NULL),
(364, 4, 'C-16C', 2, NULL),
(365, 4, 'C-16B', 2, NULL),
(366, 4, 'A-72', 2, NULL),
(367, 4, 'C-16A', 2, NULL),
(368, 4, 'C-16X', 2, NULL),
(369, 4, 'C-16Y', 2, NULL),
(370, 4, 'C-14X', 2, NULL),
(371, 4, 'C-14Y', 2, NULL),
(372, 4, 'C-14C', 2, NULL),
(373, 4, 'C-14B', 2, NULL),
(374, 4, 'C-14D', 2, NULL),
(375, 4, 'C-14A', 2, NULL),
(376, 4, 'A-43', 2, NULL),
(377, 4, 'A-42', 2, NULL),
(378, 4, 'A-41', 2, NULL),
(379, 4, 'A-40', 2, NULL),
(380, 4, 'A-39', 2, NULL),
(381, 4, 'A-38', 2, NULL),
(382, 4, 'A-37', 2, NULL),
(383, 4, 'A-36', 2, NULL),
(384, 4, 'A-35', 2, NULL),
(385, 4, 'A-34', 2, NULL),
(386, 4, 'C-9', 2, NULL),
(387, 4, 'A-32', 2, NULL),
(388, 4, 'A-33', 2, NULL),
(389, 4, 'A-30', 2, NULL),
(390, 4, 'A-31', 2, NULL),
(391, 4, 'C-10B', 2, NULL),
(392, 4, 'C-10C', 2, NULL),
(393, 4, 'C-10', 2, NULL),
(394, 4, 'C-10A', 2, NULL),
(395, 4, '1', 4, NULL),
(396, 4, '2', 4, NULL),
(397, 4, '3', 4, NULL),
(398, 4, '4', 4, NULL),
(399, 4, '5', 4, NULL),
(400, 4, '6', 4, NULL),
(401, 4, '7', 4, NULL),
(402, 4, '8', 4, NULL),
(403, 4, '9', 4, NULL),
(404, 4, '10', 4, NULL),
(405, 4, '11', 4, NULL),
(406, 4, '12', 4, NULL),
(407, 4, '13', 4, NULL),
(408, 4, '14', 4, NULL),
(409, 4, '15', 4, NULL),
(410, 4, '16', 4, NULL),
(411, 4, 'Buko', 4, NULL),
(412, 4, 'Saging', 4, NULL),
(413, 4, 'Ice_Dealer', 4, NULL),
(414, 4, 'CALAMBA_TOURISM_&_TRADE_EXPO', 5, NULL),
(415, 4, 'C-31B', 5, NULL),
(416, 4, 'C-34AB', 5, NULL),
(417, 4, 'C-35AB', 5, NULL),
(418, 4, 'C-9A', 5, NULL),
(419, 4, 'C-32', 5, NULL),
(420, 4, 'C-29', 5, NULL),
(421, 4, 'C-11B', 5, NULL),
(422, 4, 'C-65', 5, NULL),
(423, 4, 'C-66', 5, NULL),
(424, 4, 'C-67', 5, NULL),
(425, 4, 'LAGUNA_TOURISM_&_TRADE_EXPO', 5, NULL),
(426, 4, 'C-62', 5, NULL),
(427, 4, 'C-63', 5, NULL),
(428, 4, 'C-41C', 5, NULL),
(429, 4, 'Jollibee_Conducting', 5, NULL),
(430, 4, 'C-47', 5, NULL),
(431, 4, 'C-48', 5, NULL),
(432, 4, 'C-49', 5, NULL),
(433, 4, 'C-50', 5, NULL),
(434, 4, 'C-59', 5, NULL),
(435, 4, 'C-64', 5, NULL),
(436, 4, 'C-30_MB1', 5, NULL),
(437, 4, 'C-2_MB1', 5, NULL),
(438, 4, 'C-30A_MB1', 5, NULL),
(439, 4, 'C-31', 5, NULL),
(440, 4, 'C-31A', 5, NULL),
(441, 4, 'C-34', 5, NULL),
(442, 4, 'C-35', 5, NULL),
(443, 4, 'C-36', 5, NULL),
(444, 4, 'C-37', 5, NULL),
(445, 4, 'C-38', 5, NULL),
(446, 4, 'C-20', 5, NULL),
(447, 4, 'C-40_MB2', 5, NULL),
(448, 4, 'C-18', 5, NULL),
(449, 4, 'C-21', 5, NULL),
(450, 4, 'C-43A', 5, NULL),
(451, 4, 'C-43B_MB2', 5, NULL),
(452, 4, 'C-44', 5, NULL),
(453, 4, 'C-45_MB2', 5, NULL),
(454, 4, 'C-46', 5, NULL),
(455, 4, 'C-41', 5, NULL),
(456, 4, 'C-42', 5, NULL),
(466, 1, 'Test', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tenanttbl`
--

CREATE TABLE `tenanttbl` (
  `TenantId` int(11) NOT NULL,
  `Person_Id` int(11) NOT NULL,
  `Stall_Id` int(11) NOT NULL,
  `Owner_Id` int(11) NOT NULL,
  `Date_Start` date NOT NULL,
  `Market Fee` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tenant_paymenttbl`
--

CREATE TABLE `tenant_paymenttbl` (
  `Tenant_PaymentId` int(11) NOT NULL,
  `Stall_Id` int(11) NOT NULL,
  `Owner_Id` int(11) NOT NULL,
  `Price` int(60) NOT NULL,
  `DueDate` date NOT NULL,
  `Status` tinyint(1) NOT NULL COMMENT '1= Paid\r\n0 = Not Paid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `typestbl`
--

CREATE TABLE `typestbl` (
  `Types_Id` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `typestbl`
--

INSERT INTO `typestbl` (`Types_Id`, `Name`) VALUES
(1, 'Arcade'),
(2, 'Fish'),
(3, 'Meat'),
(4, 'None');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admintbl`
--
ALTER TABLE `admintbl`
  ADD PRIMARY KEY (`Admin_Id`),
  ADD KEY `fk_Person_Id-Admin` (`Person_Id`);

--
-- Indexes for table `buildingtbl`
--
ALTER TABLE `buildingtbl`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `discovertbl`
--
ALTER TABLE `discovertbl`
  ADD PRIMARY KEY (`discover_Id`);

--
-- Indexes for table `eventtbl`
--
ALTER TABLE `eventtbl`
  ADD PRIMARY KEY (`Event_Id`),
  ADD KEY `fk_facilities_id` (`facilities_Id`);

--
-- Indexes for table `facilitiestbl`
--
ALTER TABLE `facilitiestbl`
  ADD PRIMARY KEY (`facilities_Id`);

--
-- Indexes for table `ownertbl`
--
ALTER TABLE `ownertbl`
  ADD PRIMARY KEY (`Owner_Id`),
  ADD KEY `fk_Person_Id_2` (`Person_Id`),
  ADD KEY `fk_Admin_Id` (`Admin_Id`);

--
-- Indexes for table `owner_paymenttbl`
--
ALTER TABLE `owner_paymenttbl`
  ADD PRIMARY KEY (`Owner_PaymentId`);

--
-- Indexes for table `persontbl`
--
ALTER TABLE `persontbl`
  ADD PRIMARY KEY (`Person_Id`);

--
-- Indexes for table `stalltbl`
--
ALTER TABLE `stalltbl`
  ADD PRIMARY KEY (`Stall_Id`),
  ADD KEY `fk_Type_Id` (`Type_Id`),
  ADD KEY `fk_Buildingname` (`BuildingName`),
  ADD KEY `fk_Owner_Id` (`Owner_Id`);

--
-- Indexes for table `tenanttbl`
--
ALTER TABLE `tenanttbl`
  ADD PRIMARY KEY (`TenantId`),
  ADD KEY `fk_Person_Id` (`Person_Id`),
  ADD KEY `fk_Stall_Id` (`Stall_Id`);

--
-- Indexes for table `tenant_paymenttbl`
--
ALTER TABLE `tenant_paymenttbl`
  ADD PRIMARY KEY (`Tenant_PaymentId`),
  ADD KEY `fk_Stall_Id-tenantPayment` (`Stall_Id`),
  ADD KEY `fk_Owner_Id-tenantPayment` (`Owner_Id`);

--
-- Indexes for table `typestbl`
--
ALTER TABLE `typestbl`
  ADD PRIMARY KEY (`Types_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admintbl`
--
ALTER TABLE `admintbl`
  MODIFY `Admin_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `buildingtbl`
--
ALTER TABLE `buildingtbl`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `discovertbl`
--
ALTER TABLE `discovertbl`
  MODIFY `discover_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `eventtbl`
--
ALTER TABLE `eventtbl`
  MODIFY `Event_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `facilitiestbl`
--
ALTER TABLE `facilitiestbl`
  MODIFY `facilities_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ownertbl`
--
ALTER TABLE `ownertbl`
  MODIFY `Owner_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `owner_paymenttbl`
--
ALTER TABLE `owner_paymenttbl`
  MODIFY `Owner_PaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persontbl`
--
ALTER TABLE `persontbl`
  MODIFY `Person_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stalltbl`
--
ALTER TABLE `stalltbl`
  MODIFY `Stall_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=467;

--
-- AUTO_INCREMENT for table `tenanttbl`
--
ALTER TABLE `tenanttbl`
  MODIFY `TenantId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tenant_paymenttbl`
--
ALTER TABLE `tenant_paymenttbl`
  MODIFY `Tenant_PaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `typestbl`
--
ALTER TABLE `typestbl`
  MODIFY `Types_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admintbl`
--
ALTER TABLE `admintbl`
  ADD CONSTRAINT `fk_Person_Id-Admin` FOREIGN KEY (`Person_Id`) REFERENCES `persontbl` (`Person_Id`);

--
-- Constraints for table `eventtbl`
--
ALTER TABLE `eventtbl`
  ADD CONSTRAINT `fk_facilities_id` FOREIGN KEY (`facilities_Id`) REFERENCES `facilitiestbl` (`facilities_Id`);

--
-- Constraints for table `ownertbl`
--
ALTER TABLE `ownertbl`
  ADD CONSTRAINT `fk_Admin_Id` FOREIGN KEY (`Admin_Id`) REFERENCES `admintbl` (`Admin_Id`),
  ADD CONSTRAINT `fk_Person_Id_2` FOREIGN KEY (`Person_Id`) REFERENCES `persontbl` (`Person_Id`);

--
-- Constraints for table `stalltbl`
--
ALTER TABLE `stalltbl`
  ADD CONSTRAINT `fk_Buildingname` FOREIGN KEY (`BuildingName`) REFERENCES `buildingtbl` (`Id`),
  ADD CONSTRAINT `fk_Owner_Id` FOREIGN KEY (`Owner_Id`) REFERENCES `ownertbl` (`Owner_Id`),
  ADD CONSTRAINT `fk_Type_Id` FOREIGN KEY (`Type_Id`) REFERENCES `typestbl` (`Types_Id`);

--
-- Constraints for table `tenanttbl`
--
ALTER TABLE `tenanttbl`
  ADD CONSTRAINT `fk_Person_Id` FOREIGN KEY (`Person_Id`) REFERENCES `persontbl` (`Person_Id`),
  ADD CONSTRAINT `fk_Stall_Id` FOREIGN KEY (`Stall_Id`) REFERENCES `stalltbl` (`Stall_Id`);

--
-- Constraints for table `tenant_paymenttbl`
--
ALTER TABLE `tenant_paymenttbl`
  ADD CONSTRAINT `fk_Owner_Id-tenantPayment` FOREIGN KEY (`Owner_Id`) REFERENCES `ownertbl` (`Owner_Id`),
  ADD CONSTRAINT `fk_Stall_Id-tenantPayment` FOREIGN KEY (`Stall_Id`) REFERENCES `stalltbl` (`Stall_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
