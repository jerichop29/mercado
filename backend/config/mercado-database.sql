-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2025 at 03:25 PM
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
-- Database: `mercado-database`
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
(2, 'superadmin', '$2y$10$95JxqQT/Unu/kGebX891teqsLwnaeKwTpR6Yq6MMY1i/kK329FNNy', 'superadmin', 3);

-- --------------------------------------------------------

--
-- Table structure for table `appointmenttbl`
--

CREATE TABLE `appointmenttbl` (
  `Appointment_Id` int(11) NOT NULL,
  `Stall_Id` int(11) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contact` varchar(13) NOT NULL,
  `POI` longblob NOT NULL,
  `Status` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `avatartbl`
--

CREATE TABLE `avatartbl` (
  `Avatar_Id` int(11) NOT NULL,
  `Person_Id` int(11) NOT NULL,
  `image` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avatartbl`
--

INSERT INTO `avatartbl` (`Avatar_Id`, `Person_Id`, `image`) VALUES
(4, 3, 0x2e2f2e2e2f2e2e2f2e2e2f2e2e2f7372632f6173736574732f75706c6f6164732f6176617461722f363765306433386533366330342e6a7067),
(5, 182, 0x2e2f2e2e2f2e2e2f2e2e2f2e2e2f7372632f6173736574732f75706c6f6164732f6176617461722f363765306433646239323536312e6a7067);

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
-- Table structure for table `categoriestbl`
--

CREATE TABLE `categoriestbl` (
  `Categories_Id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoriestbl`
--

INSERT INTO `categoriestbl` (`Categories_Id`, `Title`, `Description`) VALUES
(3, 'TEST', '<p><em>asdasdasd <u>asdasdasd</u></em></p>'),
(4, 'kljhhlkjhkl', '<p><br></p>');

-- --------------------------------------------------------

--
-- Table structure for table `categoriestbl-sub`
--

CREATE TABLE `categoriestbl-sub` (
  `SubCategories_Id` int(11) NOT NULL,
  `Category_Id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoriestbl-sub`
--

INSERT INTO `categoriestbl-sub` (`SubCategories_Id`, `Category_Id`, `Title`, `Description`) VALUES
(5, 3, 'TEst', '<p><u>asdfasdfasdf</u></p>');

-- --------------------------------------------------------

--
-- Table structure for table `complaintstable`
--

CREATE TABLE `complaintstable` (
  `Complaint_Id` int(11) NOT NULL,
  `Complainant` varchar(100) NOT NULL,
  `Category_Id` int(11) NOT NULL,
  `SubCategory_Id` int(11) NOT NULL,
  `Complaint_Message` varchar(10000) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Complaint_Image` longblob NOT NULL,
  `Request` date NOT NULL,
  `Date_End` date NOT NULL,
  `Date_Start` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discovertbl`
--

CREATE TABLE `discovertbl` (
  `discover_Id` int(11) NOT NULL,
  `Title` varchar(60) NOT NULL,
  `image` longblob NOT NULL COMMENT 'image upload',
  `Activity` varchar(60) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Date_Start` datetime NOT NULL,
  `Date_End` datetime NOT NULL,
  `Link` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(26, 182, 1, '2025-03-20', 'gagi_terrible', '$2y$10$sWw1mV0g3ezscjV9E.Ows.puiPrXB2Qx52o15.OFk9mIGjh9n3l8K', 'Owner');

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
(2, 'super admink', 'admin', 'admin', 'Female', 'admin', '09123456789', 'admin@gmail.com', '2025-02-13'),
(3, 'Mercado', 'Calamba', 'De', 'Female', 'Calamba City,Laguna,4027', '09123456789', 'mercadodecalamba@gmail.com', '2025-02-13'),
(182, 'Glenn Christian', 'Terrible', 'Delos Reyes', 'Female', '#98', '09888883333', 'gcterrible@gmail.com', '2025-03-18');

-- --------------------------------------------------------

--
-- Table structure for table `stallimagetbl`
--

CREATE TABLE `stallimagetbl` (
  `stallImage_Id` int(11) NOT NULL,
  `Stall_Id` int(11) NOT NULL,
  `image` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stalltbl`
--

CREATE TABLE `stalltbl` (
  `Stall_Id` int(11) NOT NULL,
  `Type_Id` int(11) NOT NULL,
  `StallCode` varchar(60) NOT NULL,
  `BuildingName` int(11) NOT NULL,
  `Owner_Id` int(11) DEFAULT NULL,
  `Status_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stalltbl`
--

INSERT INTO `stalltbl` (`Stall_Id`, `Type_Id`, `StallCode`, `BuildingName`, `Owner_Id`, `Status_Id`) VALUES
(1, 6, 'C-24', 1, NULL, 4),
(2, 6, 'C-24C', 1, NULL, 3),
(3, 1, 'C-24B', 1, NULL, 4),
(4, 6, 'C-24D', 1, NULL, 1),
(5, 5, 'C-24A', 1, NULL, 1),
(6, 6, 'A-95', 1, NULL, 1),
(7, 6, 'A-96', 1, NULL, 1),
(8, 6, 'A-97', 1, NULL, 1),
(9, 6, 'A-98', 1, NULL, 1),
(10, 6, 'A-99', 1, NULL, 1),
(11, 6, 'A-100', 1, NULL, 1),
(12, 6, 'A-101', 1, NULL, 1),
(13, 6, 'A-102', 1, NULL, 1),
(14, 6, 'C-8C', 1, NULL, 1),
(15, 6, 'C-8B', 1, NULL, 1),
(16, 6, 'C-8D', 1, NULL, 1),
(17, 6, 'C-8A', 1, NULL, 1),
(18, 6, 'C-8X', 1, NULL, 1),
(19, 6, 'C-8Y', 1, NULL, 1),
(20, 6, 'C-6X', 1, NULL, 1),
(21, 6, 'C-6Y', 1, NULL, 1),
(22, 6, 'C-6C', 1, NULL, 1),
(23, 6, 'C-6B', 1, NULL, 1),
(24, 6, 'C-6D', 1, NULL, 1),
(25, 6, 'C-6A', 1, NULL, 1),
(26, 6, 'A-17', 1, NULL, 1),
(27, 6, 'A-16', 1, NULL, 1),
(28, 6, 'A-19', 1, NULL, 1),
(29, 6, 'A-18', 1, NULL, 1),
(30, 6, 'A-21', 1, NULL, 1),
(31, 6, 'A-20', 1, NULL, 1),
(32, 6, 'A-23', 1, NULL, 1),
(33, 6, 'A-22', 1, NULL, 1),
(34, 6, 'A-25', 1, NULL, 1),
(35, 6, 'A-24', 1, NULL, 1),
(36, 6, 'C-4', 1, NULL, 1),
(37, 6, 'A-1', 1, NULL, 1),
(38, 6, 'A-2', 1, NULL, 1),
(39, 6, 'C-3C', 1, NULL, 1),
(40, 6, 'C-3B', 1, NULL, 1),
(41, 6, 'C-3A', 1, NULL, 1),
(42, 6, 'C-3', 1, NULL, 1),
(43, 6, '27', 1, NULL, 1),
(44, 6, '78', 1, NULL, 1),
(45, 6, '25', 1, NULL, 1),
(46, 6, '26', 1, NULL, 1),
(47, 6, '22', 1, NULL, 1),
(48, 6, '23', 1, NULL, 1),
(49, 6, '21', 1, NULL, 1),
(50, 6, '32', 1, NULL, 1),
(51, 6, '18', 1, NULL, 1),
(52, 6, '175', 1, NULL, 1),
(53, 6, '17', 1, NULL, 1),
(54, 6, '174', 1, NULL, 1),
(55, 6, '12', 1, NULL, 1),
(56, 6, '167', 1, NULL, 1),
(57, 6, '9', 1, NULL, 1),
(58, 6, '159', 1, NULL, 1),
(59, 6, '8', 1, NULL, 1),
(60, 6, '77', 1, NULL, 1),
(61, 6, 'T-4', 1, NULL, 1),
(62, 6, 'T-3', 1, NULL, 1),
(63, 6, '79', 1, NULL, 1),
(64, 6, '106', 1, NULL, 1),
(65, 6, '115', 1, NULL, 1),
(66, 6, '116', 1, NULL, 1),
(67, 6, '125', 1, NULL, 1),
(68, 6, '124', 1, NULL, 1),
(69, 6, '195', 1, NULL, 1),
(70, 6, '183', 1, NULL, 1),
(71, 6, '129', 1, NULL, 1),
(72, 6, '126', 1, NULL, 1),
(73, 6, '172', 1, NULL, 1),
(74, 6, '171', 1, NULL, 1),
(75, 6, '157', 1, NULL, 1),
(76, 6, '156', 1, NULL, 1),
(77, 6, '123', 1, NULL, 1),
(78, 6, '133', 1, NULL, 1),
(79, 6, '73', 1, NULL, 1),
(80, 6, '107', 1, NULL, 1),
(81, 6, 'T-66', 1, NULL, 1),
(82, 6, 'T-89', 1, NULL, 1),
(83, 6, 'A-131', 1, NULL, 1),
(84, 6, 'C-29B', 1, NULL, 1),
(85, 6, 'C-29A', 1, NULL, 1),
(86, 6, 'MB-21', 1, NULL, 1),
(87, 6, 'CO-99', 1, NULL, 1),
(88, 6, 'MB-22', 1, NULL, 1),
(89, 6, 'G-31', 1, NULL, 1),
(90, 6, 'MB-49', 1, NULL, 1),
(91, 6, 'MB-33', 1, NULL, 1),
(92, 6, 'CO-98', 1, NULL, 1),
(93, 6, 'CO-100', 1, NULL, 1),
(94, 6, 'MB-24', 1, NULL, 1),
(95, 6, 'MB-34', 1, NULL, 1),
(96, 6, 'MB-25', 1, NULL, 1),
(97, 6, 'MB-35A_MB-35B', 1, NULL, 1),
(98, 6, 'MB-33A_B-36', 1, NULL, 1),
(99, 6, 'MB-26', 1, NULL, 1),
(100, 6, 'MB-55A_MB-55B', 1, NULL, 1),
(101, 6, 'MB-34A_MB-59A', 1, NULL, 1),
(102, 6, 'MB-59', 1, NULL, 1),
(103, 6, 'MB-65', 1, NULL, 1),
(104, 6, 'MB-28', 1, NULL, 1),
(105, 6, 'MB-64', 1, NULL, 1),
(106, 6, 'MB-29A_MB-29B', 1, NULL, 1),
(107, 6, 'MB-63', 1, NULL, 1),
(108, 6, 'MB-30', 1, NULL, 1),
(109, 6, 'MB-62', 1, NULL, 1),
(110, 6, 'MB-27A', 1, NULL, 1),
(111, 6, 'MB-27B', 1, NULL, 1),
(112, 6, 'C-27', 1, NULL, 1),
(113, 6, 'CO-101', 1, NULL, 1),
(114, 6, 'CO-102', 1, NULL, 1),
(115, 6, 'CO-107', 1, NULL, 1),
(116, 6, 'CO-103', 1, NULL, 1),
(117, 6, 'CO-108', 1, NULL, 1),
(118, 6, 'CO-104', 1, NULL, 1),
(119, 6, 'CO-109', 1, NULL, 1),
(120, 6, 'CO-105', 1, NULL, 1),
(121, 6, 'CO-110', 1, NULL, 1),
(122, 6, 'MB4-253A', 1, NULL, 1),
(123, 6, 'MB4-253B', 1, NULL, 1),
(124, 6, 'CO-106', 1, NULL, 1),
(125, 6, 'CO-111', 1, NULL, 1),
(126, 6, 'CO-119', 1, NULL, 1),
(127, 6, 'CO-124', 1, NULL, 1),
(128, 6, 'CO-120', 1, NULL, 1),
(129, 6, 'CO-125', 1, NULL, 1),
(130, 6, 'CO-121', 1, NULL, 1),
(131, 6, 'CO-126', 1, NULL, 1),
(132, 6, 'MB-58A', 1, NULL, 1),
(133, 6, 'MB-58B', 1, NULL, 1),
(134, 6, 'CO-122', 1, NULL, 1),
(135, 6, 'CO-127', 1, NULL, 1),
(136, 6, 'CO-123', 1, NULL, 1),
(137, 6, 'CO-128', 1, NULL, 1),
(138, 6, 'T-122', 1, NULL, 1),
(139, 6, 'A-133', 1, NULL, 1),
(140, 6, 'C-28B', 1, NULL, 1),
(141, 6, 'C-28A', 1, NULL, 1),
(142, 6, 'CO-112', 1, NULL, 1),
(143, 6, 'CO-116', 1, NULL, 1),
(144, 6, 'CO-113', 1, NULL, 1),
(145, 6, 'CO-117', 1, NULL, 1),
(146, 6, 'CO-114', 1, NULL, 1),
(147, 6, 'CO-118', 1, NULL, 1),
(148, 6, 'CO-115', 1, NULL, 1),
(149, 6, 'T-47', 1, NULL, 1),
(150, 6, 'MB-3_GF-15', 1, NULL, 1),
(151, 6, 'MB-14B', 1, NULL, 1),
(152, 6, 'MB-15', 1, NULL, 1),
(153, 6, 'MB-5', 1, NULL, 1),
(154, 6, 'MB-16', 1, NULL, 1),
(155, 6, 'MB-6', 1, NULL, 1),
(156, 6, 'MB-53', 1, NULL, 1),
(157, 6, 'MB-17B', 1, NULL, 1),
(158, 6, 'MB-54', 1, NULL, 1),
(159, 6, 'MB-17A', 1, NULL, 1),
(160, 6, 'MB-57', 1, NULL, 1),
(161, 6, 'MB-18A_MB-18B', 1, NULL, 1),
(162, 6, 'MB-9', 1, NULL, 1),
(163, 6, 'MB-19B', 1, NULL, 1),
(164, 6, 'MB-10', 1, NULL, 1),
(165, 6, 'MB-20B', 1, NULL, 1),
(166, 6, 'C-26B', 1, NULL, 1),
(167, 6, 'C-26A', 1, NULL, 1),
(168, 6, 'C-26', 1, NULL, 1),
(169, 6, 'C-22', 1, NULL, 1),
(170, 6, 'C-22C', 1, NULL, 1),
(171, 6, 'C-22B', 1, NULL, 1),
(172, 6, 'A-82', 1, NULL, 1),
(173, 6, 'A-83', 1, NULL, 1),
(174, 6, 'A-94', 1, NULL, 1),
(175, 6, 'A-93', 1, NULL, 1),
(176, 6, 'A-92', 1, NULL, 1),
(177, 6, 'A-66', 1, NULL, 1),
(178, 6, 'A-90', 1, NULL, 1),
(179, 6, 'A-89', 1, NULL, 1),
(180, 6, 'A-88', 1, NULL, 1),
(181, 6, 'A-87', 1, NULL, 1),
(182, 6, 'C-7C', 1, NULL, 1),
(183, 6, 'C-7B', 1, NULL, 1),
(184, 6, 'C-7D', 1, NULL, 1),
(185, 6, 'C-7A', 1, NULL, 1),
(186, 6, 'C-7X', 1, NULL, 1),
(187, 6, 'C-7Y', 1, NULL, 1),
(188, 6, 'C-5X', 1, NULL, 1),
(189, 6, 'C-5Y', 1, NULL, 1),
(190, 6, 'C-5C', 1, NULL, 1),
(191, 6, 'C-5B', 1, NULL, 1),
(192, 6, 'C-5D', 1, NULL, 1),
(193, 6, 'C-5A', 1, NULL, 1),
(194, 6, 'A-15', 1, NULL, 1),
(195, 6, 'A-14', 1, NULL, 1),
(196, 6, 'A-11', 1, NULL, 1),
(197, 6, 'A-12', 1, NULL, 1),
(198, 6, 'A-9', 1, NULL, 1),
(199, 6, 'A-10', 1, NULL, 1),
(200, 6, 'A-7', 1, NULL, 1),
(201, 6, 'A-8', 1, NULL, 1),
(202, 6, 'A-5', 1, NULL, 1),
(203, 6, 'A-6', 1, NULL, 1),
(204, 6, 'C-1', 1, NULL, 1),
(205, 6, 'A-3', 1, NULL, 1),
(206, 6, 'A-4', 1, NULL, 1),
(207, 6, 'C-2B', 1, NULL, 1),
(208, 6, 'C-2C', 1, NULL, 1),
(209, 6, 'C-2', 1, NULL, 1),
(210, 6, 'C-2A', 1, NULL, 1),
(211, 6, 'C-25A', 2, NULL, 1),
(212, 6, 'C-25', 2, NULL, 1),
(213, 6, 'C-25B', 2, NULL, 1),
(214, 6, 'C-25D', 2, NULL, 1),
(215, 6, 'C-25C', 2, NULL, 1),
(216, 6, 'A-123', 2, NULL, 1),
(217, 6, 'A-121', 2, NULL, 1),
(218, 6, 'A-120', 2, NULL, 1),
(219, 6, 'A-111', 2, NULL, 1),
(220, 6, 'A-112', 2, NULL, 1),
(221, 6, 'A-115', 2, NULL, 1),
(222, 6, 'A-114', 2, NULL, 1),
(223, 6, 'A-117', 2, NULL, 1),
(224, 6, 'A-129', 2, NULL, 1),
(225, 6, 'A-119', 2, NULL, 1),
(226, 6, 'A-118', 2, NULL, 1),
(227, 6, 'C-17C', 2, NULL, 1),
(228, 6, 'A-17B', 2, NULL, 1),
(229, 6, 'C-17D', 2, NULL, 1),
(230, 6, 'C-17A', 2, NULL, 1),
(231, 6, 'C-17X', 2, NULL, 1),
(232, 6, 'C-17Y', 2, NULL, 1),
(233, 6, 'C-15X', 2, NULL, 1),
(234, 6, 'C-15Y', 2, NULL, 1),
(235, 6, 'C-15C', 2, NULL, 1),
(236, 6, 'C-15B', 2, NULL, 1),
(237, 6, 'C-15D', 2, NULL, 1),
(238, 6, 'C-15A', 2, NULL, 1),
(239, 6, 'A-45', 2, NULL, 1),
(240, 6, 'A-44', 2, NULL, 1),
(241, 6, 'A-47', 2, NULL, 1),
(242, 6, 'A-46', 2, NULL, 1),
(243, 6, 'A-49', 2, NULL, 1),
(244, 6, 'A-48', 2, NULL, 1),
(245, 6, 'A-51', 2, NULL, 1),
(246, 6, 'A-50', 2, NULL, 1),
(247, 6, 'A-53', 2, NULL, 1),
(248, 6, 'A-52', 2, NULL, 1),
(249, 6, 'C-12', 2, NULL, 1),
(250, 6, 'A-26', 2, NULL, 1),
(251, 6, 'A-27', 2, NULL, 1),
(252, 6, 'A-28', 2, NULL, 1),
(253, 6, 'A-29A', 2, NULL, 1),
(254, 6, 'C-11A', 2, NULL, 1),
(255, 6, 'C-11', 2, NULL, 1),
(256, 6, 'C-11B', 2, NULL, 1),
(257, 6, 'C-11C', 2, NULL, 1),
(258, 6, '61', 2, NULL, 1),
(259, 6, '74', 2, NULL, 1),
(260, 6, '60', 2, NULL, 1),
(261, 6, '71', 2, NULL, 1),
(262, 6, '55', 2, NULL, 1),
(263, 6, '62', 2, NULL, 1),
(264, 6, '54', 2, NULL, 1),
(265, 6, '49', 2, NULL, 1),
(266, 6, '56', 2, NULL, 1),
(267, 6, '59', 2, NULL, 1),
(268, 6, '48', 2, NULL, 1),
(269, 6, '53', 2, NULL, 1),
(270, 6, '44', 2, NULL, 1),
(271, 6, '50', 2, NULL, 1),
(272, 6, '43', 2, NULL, 1),
(273, 6, '45', 2, NULL, 1),
(274, 6, '40', 2, NULL, 1),
(275, 6, '42', 2, NULL, 1),
(276, 6, '39', 2, NULL, 1),
(277, 6, '41', 2, NULL, 1),
(278, 6, '34', 2, NULL, 1),
(279, 6, '38', 2, NULL, 1),
(280, 6, '33', 2, NULL, 1),
(281, 6, '184', 2, NULL, 1),
(282, 6, '30', 2, NULL, 1),
(283, 6, '31', 2, NULL, 1),
(284, 6, 'T-29', 2, NULL, 1),
(285, 6, 'T-72', 2, NULL, 1),
(286, 6, '85', 2, NULL, 1),
(287, 6, '98', 2, NULL, 1),
(288, 6, '97', 2, NULL, 1),
(289, 6, '100', 2, NULL, 1),
(290, 6, '114', 2, NULL, 1),
(291, 6, '101', 2, NULL, 1),
(292, 6, '112', 2, NULL, 1),
(293, 6, '105', 2, NULL, 1),
(294, 6, '109', 2, NULL, 1),
(295, 6, '108', 2, NULL, 1),
(296, 6, '117', 2, NULL, 1),
(297, 6, '149', 2, NULL, 1),
(298, 6, '118', 2, NULL, 1),
(299, 6, '146-20', 2, NULL, 1),
(300, 6, '131', 2, NULL, 1),
(301, 6, '141', 2, NULL, 1),
(302, 6, '130', 2, NULL, 1),
(303, 6, '132', 2, NULL, 1),
(304, 6, '139', 2, NULL, 1),
(305, 6, '140', 2, NULL, 1),
(306, 6, '147-2', 2, NULL, 1),
(307, 6, '148', 2, NULL, 1),
(308, 6, '193', 2, NULL, 1),
(309, 6, '194', 2, NULL, 1),
(310, 6, '92', 2, NULL, 1),
(311, 6, '93', 2, NULL, 1),
(312, 6, '91', 2, NULL, 1),
(313, 6, '99', 2, NULL, 1),
(314, 6, 'A-124', 2, NULL, 1),
(315, 6, 'A-126', 2, NULL, 1),
(316, 6, 'A-128', 2, NULL, 1),
(317, 6, 'A-134', 2, NULL, 1),
(318, 6, 'A-80', 2, NULL, 1),
(319, 6, 'A-81', 2, NULL, 1),
(320, 6, 'A-132', 2, NULL, 1),
(321, 6, 'A-130', 2, NULL, 1),
(322, 6, 'C-122', 2, NULL, 1),
(323, 6, 'C-28', 2, NULL, 1),
(324, 6, 'A-78', 2, NULL, 1),
(325, 6, 'A-79', 2, NULL, 1),
(326, 6, 'A-135', 2, NULL, 1),
(327, 6, 'C-30_MB4', 2, NULL, 1),
(328, 6, 'CO-128', 2, NULL, 1),
(329, 6, 'C-23', 2, NULL, 1),
(330, 6, 'MB3-GF-50', 2, NULL, 1),
(331, 6, 'A-76', 2, NULL, 1),
(332, 6, 'A-68', 2, NULL, 1),
(333, 6, 'A-69', 2, NULL, 1),
(334, 6, 'A-29B', 2, NULL, 1),
(335, 6, 'A-85', 2, NULL, 1),
(336, 6, 'A-70', 2, NULL, 1),
(337, 6, 'A-73', 2, NULL, 1),
(338, 6, 'C-75', 2, NULL, 1),
(339, 6, 'A-84', 2, NULL, 1),
(340, 6, 'T-203', 2, NULL, 1),
(341, 6, 'C-23B', 2, NULL, 1),
(342, 6, 'A-77', 2, NULL, 1),
(343, 6, 'C-22A', 2, NULL, 1),
(344, 6, 'MB-57', 2, NULL, 1),
(345, 6, 'C-31_MB4', 2, NULL, 1),
(346, 6, 'A-71', 2, NULL, 1),
(347, 6, 'MB-46', 2, NULL, 1),
(348, 6, 'A-127', 2, NULL, 1),
(349, 6, 'A-116', 2, NULL, 1),
(350, 6, 'A-74', 2, NULL, 1),
(351, 6, 'A-125', 2, NULL, 1),
(352, 6, 'C-23A', 2, NULL, 1),
(353, 6, 'A-23D', 2, NULL, 1),
(354, 6, 'A-67', 2, NULL, 1),
(355, 6, 'A-23C', 2, NULL, 1),
(356, 6, 'A-110', 2, NULL, 1),
(357, 6, 'A-109', 2, NULL, 1),
(358, 6, 'A-108', 2, NULL, 1),
(359, 6, 'A-107', 2, NULL, 1),
(360, 6, 'A-106', 2, NULL, 1),
(361, 6, 'A-105', 2, NULL, 1),
(362, 6, 'A-104', 2, NULL, 1),
(363, 6, 'A-103', 2, NULL, 1),
(364, 6, 'C-16C', 2, NULL, 1),
(365, 6, 'C-16B', 2, NULL, 1),
(366, 6, 'A-72', 2, NULL, 1),
(367, 6, 'C-16A', 2, NULL, 1),
(368, 6, 'C-16X', 2, NULL, 1),
(369, 6, 'C-16Y', 2, NULL, 1),
(370, 6, 'C-14X', 2, NULL, 1),
(371, 6, 'C-14Y', 2, NULL, 1),
(372, 6, 'C-14C', 2, NULL, 1),
(373, 6, 'C-14B', 2, NULL, 1),
(374, 6, 'C-14D', 2, NULL, 1),
(375, 6, 'C-14A', 2, NULL, 1),
(376, 6, 'A-43', 2, NULL, 1),
(377, 6, 'A-42', 2, NULL, 1),
(378, 6, 'A-41', 2, NULL, 1),
(379, 6, 'A-40', 2, NULL, 1),
(380, 6, 'A-39', 2, NULL, 1),
(381, 6, 'A-38', 2, NULL, 1),
(382, 6, 'A-37', 2, NULL, 1),
(383, 6, 'A-36', 2, NULL, 1),
(384, 6, 'A-35', 2, NULL, 1),
(385, 6, 'A-34', 2, NULL, 1),
(386, 6, 'C-9', 2, NULL, 1),
(387, 6, 'A-32', 2, NULL, 1),
(388, 6, 'A-33', 2, NULL, 1),
(389, 6, 'A-30', 2, NULL, 1),
(390, 6, 'A-31', 2, NULL, 1),
(391, 6, 'C-10B', 2, NULL, 1),
(392, 6, 'C-10C', 2, NULL, 1),
(393, 6, 'C-10', 2, NULL, 1),
(394, 6, 'C-10A', 2, NULL, 1),
(395, 6, '1', 4, NULL, 1),
(396, 6, '2', 4, NULL, 1),
(397, 6, '3', 4, NULL, 1),
(398, 6, '4', 4, NULL, 1),
(399, 6, '5', 4, NULL, 1),
(400, 6, '6', 4, NULL, 1),
(401, 6, '7', 4, NULL, 1),
(402, 6, '8', 4, NULL, 1),
(403, 6, '9', 4, NULL, 1),
(404, 6, '10', 4, NULL, 1),
(405, 6, '11', 4, NULL, 1),
(406, 6, '12', 4, NULL, 1),
(407, 6, '13', 4, NULL, 1),
(408, 6, '14', 4, NULL, 1),
(409, 6, '15', 4, NULL, 1),
(410, 6, '16', 4, NULL, 1),
(411, 6, 'Buko', 4, NULL, 1),
(412, 6, 'Saging', 4, NULL, 1),
(413, 6, 'Ice_Dealer', 4, NULL, 1),
(414, 6, 'CALAMBA_TOURISM_&_TRADE_EXPO', 5, NULL, 1),
(415, 6, 'C-31B', 5, NULL, 1),
(416, 6, 'C-34AB', 5, NULL, 1),
(417, 6, 'C-35AB', 5, NULL, 1),
(418, 6, 'C-9A', 5, NULL, 1),
(419, 6, 'C-32', 5, NULL, 1),
(420, 6, 'C-29', 5, NULL, 1),
(421, 6, 'C-11B', 5, NULL, 1),
(422, 6, 'C-65', 5, NULL, 1),
(423, 6, 'C-66', 5, NULL, 1),
(424, 6, 'C-67', 5, NULL, 1),
(425, 6, 'LAGUNA_TOURISM_&_TRADE_EXPO', 5, NULL, 1),
(426, 6, 'C-62', 5, NULL, 1),
(427, 6, 'C-63', 5, NULL, 1),
(428, 6, 'C-41C', 5, NULL, 1),
(429, 6, 'Jollibee_Conducting', 5, NULL, 1),
(430, 6, 'C-47', 5, NULL, 1),
(431, 6, 'C-48', 5, NULL, 1),
(432, 6, 'C-49', 5, NULL, 1),
(433, 6, 'C-50', 5, NULL, 1),
(434, 6, 'C-59', 5, NULL, 1),
(435, 6, 'C-64', 5, NULL, 1),
(436, 6, 'C-30_MB1', 5, NULL, 1),
(437, 6, 'C-2_MB1', 5, NULL, 1),
(438, 6, 'C-30A_MB1', 5, NULL, 1),
(439, 6, 'C-31', 5, NULL, 1),
(440, 6, 'C-31A', 5, NULL, 1),
(441, 6, 'C-34', 5, NULL, 1),
(442, 6, 'C-35', 5, NULL, 1),
(443, 6, 'C-36', 5, NULL, 1),
(444, 6, 'C-37', 5, NULL, 1),
(445, 6, 'C-38', 5, NULL, 1),
(446, 6, 'C-20', 5, NULL, 1),
(447, 6, 'C-40_MB2', 5, NULL, 1),
(448, 6, 'C-18', 5, NULL, 1),
(449, 6, 'C-21', 5, NULL, 1),
(450, 6, 'C-43A', 5, NULL, 1),
(451, 6, 'C-43B_MB2', 5, NULL, 1),
(452, 6, 'C-44', 5, NULL, 1),
(453, 6, 'C-45_MB2', 5, NULL, 1),
(454, 6, 'C-46', 5, NULL, 1),
(455, 6, 'C-41', 5, NULL, 1),
(456, 6, 'C-42', 5, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `statustbl`
--

CREATE TABLE `statustbl` (
  `Status_Id` int(11) NOT NULL,
  `Status` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statustbl`
--

INSERT INTO `statustbl` (`Status_Id`, `Status`) VALUES
(1, 'Available'),
(2, 'Unavailable'),
(3, 'Reserved'),
(4, 'Occupied'),
(5, 'Maintenance');

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
(1, 'Meat'),
(2, 'Fish'),
(3, 'Vegetable'),
(4, 'Variety'),
(5, 'Other'),
(6, 'None');

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
-- Indexes for table `appointmenttbl`
--
ALTER TABLE `appointmenttbl`
  ADD PRIMARY KEY (`Appointment_Id`);

--
-- Indexes for table `avatartbl`
--
ALTER TABLE `avatartbl`
  ADD PRIMARY KEY (`Avatar_Id`),
  ADD KEY `fk_avatar_personId` (`Person_Id`);

--
-- Indexes for table `buildingtbl`
--
ALTER TABLE `buildingtbl`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `categoriestbl`
--
ALTER TABLE `categoriestbl`
  ADD PRIMARY KEY (`Categories_Id`);

--
-- Indexes for table `categoriestbl-sub`
--
ALTER TABLE `categoriestbl-sub`
  ADD PRIMARY KEY (`SubCategories_Id`),
  ADD KEY `fk_Category_Id` (`Category_Id`);

--
-- Indexes for table `complaintstable`
--
ALTER TABLE `complaintstable`
  ADD PRIMARY KEY (`Complaint_Id`),
  ADD KEY `fk_Category` (`Category_Id`),
  ADD KEY `fk_SubCategory` (`SubCategory_Id`);

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
-- Indexes for table `stallimagetbl`
--
ALTER TABLE `stallimagetbl`
  ADD PRIMARY KEY (`stallImage_Id`),
  ADD KEY `fk_stall_stallimageId` (`Stall_Id`);

--
-- Indexes for table `stalltbl`
--
ALTER TABLE `stalltbl`
  ADD PRIMARY KEY (`Stall_Id`),
  ADD KEY `fk_Type_Id` (`Type_Id`),
  ADD KEY `fk_Buildingname` (`BuildingName`),
  ADD KEY `fk_Owner_Id` (`Owner_Id`),
  ADD KEY `fk_Status_Id` (`Status_Id`);

--
-- Indexes for table `statustbl`
--
ALTER TABLE `statustbl`
  ADD PRIMARY KEY (`Status_Id`);

--
-- Indexes for table `tenanttbl`
--
ALTER TABLE `tenanttbl`
  ADD PRIMARY KEY (`TenantId`),
  ADD KEY `fk_Person_Id` (`Person_Id`),
  ADD KEY `fk_Stall_Id` (`Stall_Id`),
  ADD KEY `fk_Owner_Id_Tenant` (`Owner_Id`);

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
  MODIFY `Admin_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `appointmenttbl`
--
ALTER TABLE `appointmenttbl`
  MODIFY `Appointment_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `avatartbl`
--
ALTER TABLE `avatartbl`
  MODIFY `Avatar_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `buildingtbl`
--
ALTER TABLE `buildingtbl`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categoriestbl`
--
ALTER TABLE `categoriestbl`
  MODIFY `Categories_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `categoriestbl-sub`
--
ALTER TABLE `categoriestbl-sub`
  MODIFY `SubCategories_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `complaintstable`
--
ALTER TABLE `complaintstable`
  MODIFY `Complaint_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discovertbl`
--
ALTER TABLE `discovertbl`
  MODIFY `discover_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  MODIFY `Owner_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `owner_paymenttbl`
--
ALTER TABLE `owner_paymenttbl`
  MODIFY `Owner_PaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persontbl`
--
ALTER TABLE `persontbl`
  MODIFY `Person_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `stallimagetbl`
--
ALTER TABLE `stallimagetbl`
  MODIFY `stallImage_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stalltbl`
--
ALTER TABLE `stalltbl`
  MODIFY `Stall_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=467;

--
-- AUTO_INCREMENT for table `statustbl`
--
ALTER TABLE `statustbl`
  MODIFY `Status_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tenanttbl`
--
ALTER TABLE `tenanttbl`
  MODIFY `TenantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tenant_paymenttbl`
--
ALTER TABLE `tenant_paymenttbl`
  MODIFY `Tenant_PaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `typestbl`
--
ALTER TABLE `typestbl`
  MODIFY `Types_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admintbl`
--
ALTER TABLE `admintbl`
  ADD CONSTRAINT `fk_Person_Id-Admin` FOREIGN KEY (`Person_Id`) REFERENCES `persontbl` (`Person_Id`);

--
-- Constraints for table `avatartbl`
--
ALTER TABLE `avatartbl`
  ADD CONSTRAINT `fk_avatar_personId` FOREIGN KEY (`Person_Id`) REFERENCES `persontbl` (`Person_Id`) ON DELETE NO ACTION;

--
-- Constraints for table `categoriestbl-sub`
--
ALTER TABLE `categoriestbl-sub`
  ADD CONSTRAINT `fk_Category_Id` FOREIGN KEY (`Category_Id`) REFERENCES `categoriestbl` (`Categories_Id`);

--
-- Constraints for table `complaintstable`
--
ALTER TABLE `complaintstable`
  ADD CONSTRAINT `fk_Category` FOREIGN KEY (`Category_Id`) REFERENCES `categoriestbl` (`Categories_Id`),
  ADD CONSTRAINT `fk_SubCategory` FOREIGN KEY (`SubCategory_Id`) REFERENCES `categoriestbl-sub` (`SubCategories_Id`);

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
-- Constraints for table `stallimagetbl`
--
ALTER TABLE `stallimagetbl`
  ADD CONSTRAINT `fk_stall_stallimageId` FOREIGN KEY (`Stall_Id`) REFERENCES `stalltbl` (`Stall_Id`) ON DELETE NO ACTION;

--
-- Constraints for table `stalltbl`
--
ALTER TABLE `stalltbl`
  ADD CONSTRAINT `fk_Buildingname` FOREIGN KEY (`BuildingName`) REFERENCES `buildingtbl` (`Id`),
  ADD CONSTRAINT `fk_Owner_Id` FOREIGN KEY (`Owner_Id`) REFERENCES `ownertbl` (`Owner_Id`),
  ADD CONSTRAINT `fk_Status_Id` FOREIGN KEY (`Status_Id`) REFERENCES `statustbl` (`Status_Id`),
  ADD CONSTRAINT `fk_Type_Id` FOREIGN KEY (`Type_Id`) REFERENCES `typestbl` (`Types_Id`);

--
-- Constraints for table `tenanttbl`
--
ALTER TABLE `tenanttbl`
  ADD CONSTRAINT `fk_Owner_Id_Tenant` FOREIGN KEY (`Owner_Id`) REFERENCES `ownertbl` (`Owner_Id`),
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
