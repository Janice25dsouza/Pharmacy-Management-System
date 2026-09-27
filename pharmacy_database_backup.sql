-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: pharamacy_management
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Customer_ID` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Contact_Number` varchar(20) NOT NULL,
  `Address` varchar(100) NOT NULL,
  PRIMARY KEY (`Customer_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_order`
--

DROP TABLE IF EXISTS `customer_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_order` (
  `Order_ID` int NOT NULL,
  `Customer_ID` int NOT NULL,
  `Order_Date` date NOT NULL,
  `Medicine_ID` int NOT NULL,
  `Med_Quantity` int NOT NULL,
  `Total_Amount` float DEFAULT NULL,
  KEY `Customer_ID` (`Customer_ID`),
  KEY `customer_order_ibfk_2` (`Medicine_ID`),
  CONSTRAINT `customer_order_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_order_ibfk_2` FOREIGN KEY (`Medicine_ID`) REFERENCES `medicine_catalog` (`Medicine_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `Amount` float NOT NULL,
  `Percentage` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Employee_ID` varchar(30) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Contact_Number` varchar(20) NOT NULL,
  `Email` varchar(20) NOT NULL,
  PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `Manufacturer_ID` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Contact_Number` varchar(20) NOT NULL,
  PRIMARY KEY (`Manufacturer_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medicine_catalog`
--

DROP TABLE IF EXISTS `medicine_catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine_catalog` (
  `Medicine_ID` int NOT NULL,
  `Medicine_Name` varchar(50) NOT NULL,
  `Price_Per_Unit` float NOT NULL,
  `Expiry_Date` date NOT NULL,
  `Quantity_In_Stock` int NOT NULL,
  `Manufacturer_ID` int NOT NULL,
  PRIMARY KEY (`Medicine_ID`),
  KEY `Manufacturer_ID` (`Manufacturer_ID`),
  CONSTRAINT `medicine_catalog_ibfk_1` FOREIGN KEY (`Manufacturer_ID`) REFERENCES `manufacturer` (`Manufacturer_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `Prescription_ID` int NOT NULL AUTO_INCREMENT,
  `Customer_ID` int NOT NULL,
  `Doctor_Name` varchar(50) NOT NULL,
  `Prescription_Date` date NOT NULL,
  `Validity_Date` date DEFAULT NULL,
  PRIMARY KEY (`Prescription_ID`),
  KEY `Customer_ID` (`Customer_ID`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `supplier_order`
--

DROP TABLE IF EXISTS `supplier_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_order` (
  `Sup_Ord_ID` int NOT NULL AUTO_INCREMENT,
  `Supplier_ID` int NOT NULL,
  `Medicine_ID` int NOT NULL,
  `Qty_Ordered` int NOT NULL,
  `Total_Amount` float NOT NULL,
  `Status` enum('Pending','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  `Order_Date` date NOT NULL,
  `Expiry_Date` date NOT NULL,
  PRIMARY KEY (`Sup_Ord_ID`),
  KEY `Supplier_ID` (`Supplier_ID`),
  KEY `Medicine_ID` (`Medicine_ID`),
  CONSTRAINT `supplier_order_ibfk_1` FOREIGN KEY (`Supplier_ID`) REFERENCES `manufacturer` (`Manufacturer_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `supplier_order_ibfk_2` FOREIGN KEY (`Medicine_ID`) REFERENCES `medicine_catalog` (`Medicine_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-12 23:06:49
