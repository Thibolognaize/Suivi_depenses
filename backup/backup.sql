-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: suivi_depenses
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('08ab6b17-586c-4640-840b-0a1572e789d2','dd511158a21387ba2ff344321148afb7a21579326e0696ad9a1b0339746b4581','2025-03-31 09:42:02.766','20250211152259_add_cascade_deletes',NULL,NULL,'2025-03-31 09:42:02.512',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Categorie_nom_key` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (5,'Accessoires'),(6,'Accessoires audio'),(3,'Autres'),(2,'Composants'),(4,'Consommables'),(1,'Materiel informatique');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commande`
--

DROP TABLE IF EXISTS `commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantite` int NOT NULL,
  `montant` decimal(10,2) NOT NULL,
  `ref_facture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commentaire` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_creation` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `date_modification` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `entiteId` int NOT NULL,
  `fournisseurId` int NOT NULL,
  `initiateurId` int NOT NULL,
  `utilisateurId` int NOT NULL,
  `categorieId` int NOT NULL,
  `etat` enum('commande','expedie','recu','retourne') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'commande',
  PRIMARY KEY (`id`),
  UNIQUE KEY `commande_ref_facture_key` (`ref_facture`),
  KEY `commande_categorieId_idx` (`categorieId`),
  KEY `commande_entiteId_idx` (`entiteId`),
  KEY `commande_fournisseurId_idx` (`fournisseurId`),
  KEY `commande_initiateurId_idx` (`initiateurId`),
  KEY `commande_utilisateurId_idx` (`utilisateurId`),
  CONSTRAINT `commande_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commande_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `entite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commande_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `fournisseur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commande_initiateurId_fkey` FOREIGN KEY (`initiateurId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commande_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commande`
--

LOCK TABLES `commande` WRITE;
/*!40000 ALTER TABLE `commande` DISABLE KEYS */;
INSERT INTO `commande` VALUES (1,'KitHDD+SSD SRV AGDE',1,250.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.175',1,2,1,2,2,'recu'),(2,'Chargeur Lenovo',2,29.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.181',1,1,1,2,3,'recu'),(3,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.186',1,1,1,3,1,'recu'),(4,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.189',1,1,1,3,5,'recu'),(5,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.193',1,1,1,4,5,'recu'),(6,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.197',1,1,1,5,1,'recu'),(7,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.201',1,1,1,5,5,'recu'),(8,'Chargeur Lenovo',1,25.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.205',1,1,6,6,3,'recu'),(9,'Scan Ads 4300',1,300.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.208',1,1,6,6,1,'recu'),(10,'PC Portable',1,500.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.212',1,1,1,7,1,'recu'),(11,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.216',1,1,1,8,1,'recu'),(12,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.219',1,1,1,9,1,'recu'),(13,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.223',1,1,1,10,1,'recu'),(14,'Casque Sans-Fils',1,160.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.227',1,1,1,11,6,'recu'),(15,'PC Portable',1,500.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.231',1,1,1,12,1,'recu'),(16,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.234',1,1,1,13,1,'recu'),(17,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.238',1,1,1,13,5,'recu'),(18,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.241',1,1,13,13,5,'recu'),(19,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.245',1,1,1,14,1,'recu'),(20,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.249',1,1,1,14,5,'recu'),(21,'Clavier',1,20.75,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.252',1,1,12,12,5,'recu'),(22,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.256',1,1,1,15,5,'recu'),(23,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.259',1,1,1,15,1,'recu'),(24,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.263',1,1,1,2,1,'recu'),(25,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.267',1,1,1,16,1,'recu'),(26,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.270',1,1,1,16,5,'recu'),(27,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.274',1,1,1,17,5,'recu'),(28,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.278',1,1,1,17,1,'recu'),(29,'Clavier Souris',1,20.75,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.281',1,1,18,18,5,'recu'),(30,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.285',1,1,1,18,1,'recu'),(31,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.290',1,1,1,18,5,'recu'),(32,'Clavier Souris',1,20.75,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.294',1,1,19,19,5,'recu'),(33,'Ecran Wide',1,203.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.297',1,1,1,20,1,'recu'),(34,'Hub USB',1,24.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.300',1,1,20,20,5,'recu'),(35,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.304',1,1,1,21,1,'recu'),(36,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.307',1,1,1,22,1,'recu'),(37,'Dock',1,90.83,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.311',1,1,1,2,5,'recu'),(38,'PC i7/Ryzen7',1,750.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.315',1,1,23,23,1,'recu'),(39,'PC i7/Ryzen7',1,750.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.318',1,1,24,24,1,'recu'),(40,'PC i5/Ryzen5',1,600.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.322',1,1,1,25,1,'recu'),(41,'Souris Ergonomique',1,79.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.326',1,1,26,26,5,'recu'),(42,'Tableau blanc + micro Jabra + câble USB',4,290.64,NULL,NULL,'2024-12-01 09:56:00.000','2025-03-31 13:27:33.329',1,2,26,26,3,'recu'),(43,'Clavier-souris',1,90.54,NULL,NULL,'2024-01-15 10:01:00.000','2025-03-31 13:27:33.332',1,2,26,26,5,'recu'),(44,'Chargeur PC Huawei',2,50.00,NULL,NULL,'2024-01-19 08:25:00.000','2025-03-31 13:27:33.335',1,1,26,23,1,'recu'),(45,'Ecran LG 29',2,189.00,NULL,NULL,'2024-01-29 16:17:00.000','2025-03-31 13:27:33.339',1,1,26,26,1,'recu'),(46,'Scann de bureau',1,250.00,NULL,NULL,'2024-01-02 17:02:00.000','2025-03-31 13:27:33.342',1,2,1,29,1,'recu'),(47,'HDMI',6,5.00,NULL,NULL,'2024-01-02 17:02:00.000','2025-03-31 13:27:33.345',1,2,1,29,3,'recu'),(48,'Scann de bureau',1,250.00,NULL,NULL,'2024-09-02 14:11:00.000','2025-03-31 13:27:33.349',1,2,1,29,1,'recu'),(49,'RAM',1,50.00,NULL,NULL,'2024-03-21 09:30:00.000','2025-03-31 13:27:33.352',1,1,26,30,2,'recu'),(50,'UsbC/Ethernet',7,133.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.356',2,1,1,31,3,'recu'),(51,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.359',2,1,1,32,1,'recu'),(52,'EarPods',1,17.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.363',2,1,1,33,6,'recu'),(53,'PC Portable',1,500.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.366',2,1,1,33,1,'recu'),(54,'EarPods',1,15.83,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.370',2,1,31,31,6,'recu'),(55,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.373',2,1,1,31,1,'recu'),(56,'PC Portable',1,500.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.377',2,1,23,31,1,'recu'),(57,'Scann de bureau',1,250.00,NULL,NULL,'2024-02-21 16:51:00.000','2025-03-31 13:27:33.381',2,2,1,34,1,'recu'),(58,'Ordinateur Portable',1,569.00,NULL,NULL,'2024-10-21 14:46:00.000','2025-03-31 13:27:33.384',2,1,26,31,3,'recu'),(59,'EarPods',1,15.83,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.387',4,1,35,35,6,'recu'),(60,'Dock',1,99.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.391',4,1,1,36,5,'recu'),(61,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.395',4,1,1,36,1,'recu'),(62,'EarPods',1,15.83,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.399',4,1,37,37,6,'recu'),(63,'Dock',1,109.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.403',4,1,38,39,5,'recu'),(64,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.406',4,1,38,38,1,'recu'),(65,'Adaptateur HDMI VGA',1,7.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.414',4,1,1,40,3,'recu'),(66,'Ecran 24',2,248.34,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.418',4,1,1,40,1,'recu'),(67,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.423',4,1,1,40,1,'recu'),(68,'Dock',1,109.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.429',4,1,1,41,5,'recu'),(69,'Ecran Portable',1,139.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.433',4,1,42,42,1,'recu'),(70,'Dock',1,99.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.437',4,1,1,43,5,'recu'),(71,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.448',4,1,1,43,1,'recu'),(72,'Ecran 24',2,248.34,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.464',4,1,1,44,1,'recu'),(73,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.469',4,1,1,45,1,'recu'),(74,'Dock',1,109.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.474',4,1,1,45,5,'recu'),(75,'Scan Ads 4300',1,300.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.481',4,1,46,46,1,'recu'),(76,'Dock',1,110.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.490',4,1,1,47,5,'recu'),(77,'Onduleur (Caméra video surveillance)',1,100.00,NULL,NULL,'2024-01-23 12:12:00.000','2025-03-31 13:27:33.494',4,2,1,15,3,'recu'),(78,'Ecran Lenovo 27',1,119.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.499',3,1,1,48,1,'recu'),(79,'Dock',1,109.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.503',3,1,49,49,5,'recu'),(80,'AirPods Pro 2',1,200.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.506',3,1,50,50,3,'recu'),(81,'Extension Garantie',1,75.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.510',3,1,1,50,3,'recu'),(82,'SSD 500GB',1,62.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.514',3,1,48,48,2,'recu'),(83,'SSD 500GB',1,62.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.517',3,1,51,51,2,'recu'),(84,'Chargeur Lenovo',1,25.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.521',3,1,51,51,3,'recu'),(85,'Ecran 24 2K IPS',1,169.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.526',3,1,1,48,1,'recu'),(86,'Ecran 29 Wide',1,192.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.531',3,1,1,1,1,'recu'),(87,'NVME',2,131.67,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.535',3,1,1,48,3,'recu'),(88,'Clavier Touches en RAB',1,10.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.540',3,1,1,24,5,'recu'),(89,'PC i5/Ryzen5',1,499.17,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.543',3,1,1,51,1,'recu'),(90,'Fond Noir Photo',1,31.44,NULL,NULL,'2024-01-22 18:10:00.000','2025-03-31 13:27:33.547',3,2,1,1,3,'recu'),(91,'SoftBox Photo',1,37.11,NULL,NULL,'2024-01-22 18:11:00.000','2025-03-31 13:27:33.551',3,2,1,1,3,'recu'),(92,'Ecran Portable',2,302.00,NULL,NULL,'2024-01-29 16:17:00.000','2025-03-31 13:27:33.554',3,2,26,49,1,'recu'),(93,'Ordinateur Portable',1,998.00,NULL,NULL,'2024-09-02 12:36:00.000','2025-03-31 13:27:33.565',3,1,1,26,3,'recu'),(94,'Testeur RJ45',2,11.00,NULL,NULL,'2024-02-23 14:55:00.000','2025-03-31 13:27:33.568',3,2,26,26,3,'recu'),(95,'Pile lr86 9v',1,6.00,NULL,NULL,'2024-02-23 14:56:00.000','2025-03-31 13:27:33.575',3,2,26,26,3,'recu'),(96,'Clefs USB',4,20.00,NULL,NULL,'2024-05-03 14:46:00.000','2025-03-31 13:27:33.579',3,2,26,26,3,'recu'),(97,'Ordinateur Portable',1,768.00,NULL,NULL,'2024-03-14 13:59:00.000','2025-03-31 13:27:33.582',3,1,1,50,3,'recu'),(98,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.586',6,1,52,53,1,'recu'),(99,'Casque Sans-Fils',1,160.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.590',6,1,53,53,6,'recu'),(100,'Clavier Silencieux',1,20.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.594',6,1,52,52,5,'recu'),(101,'Dock',2,100.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.598',6,1,52,54,5,'recu'),(102,'Ecrans 24 view',4,150.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.602',6,1,52,55,1,'recu'),(103,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.606',6,1,52,54,1,'recu'),(104,'Clavier',1,15.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.609',6,1,52,54,5,'recu'),(105,'HDMI',2,15.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.613',6,1,52,52,3,'recu'),(106,'EarPods',1,18.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.616',6,1,42,56,6,'recu'),(107,'PC Portable',1,500.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.620',6,1,42,56,1,'recu'),(108,'Ecran 24',1,119.00,NULL,NULL,'2024-02-20 08:48:00.000','2025-03-31 13:27:33.623',6,2,1,52,1,'recu'),(109,'Camera',1,21.00,NULL,NULL,'2024-02-20 08:49:00.000','2025-03-31 13:27:33.627',6,2,1,55,3,'recu'),(110,'RAM',1,27.48,NULL,NULL,'2024-06-03 16:53:00.000','2025-03-31 13:27:33.630',6,2,1,57,2,'recu'),(111,'Ecran Portable',1,142.00,NULL,NULL,'2024-02-16 15:23:00.000','2025-03-31 13:27:33.634',7,2,26,58,1,'recu'),(112,'Ethernet',1,2.90,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.638',8,1,59,60,3,'recu'),(113,'HUB USB',1,6.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.641',8,1,59,60,3,'recu'),(114,'PC Portable',1,482.50,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.644',8,1,59,60,1,'recu'),(115,'HDMI',1,10.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.647',8,1,59,60,3,'recu'),(116,'Ecran 24',1,200.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.651',8,1,61,61,1,'recu'),(117,'Ecran 24',1,200.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.654',8,1,62,62,1,'recu'),(118,'Scan Ads 4300',1,300.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.658',8,1,63,63,1,'recu'),(119,'Usb vers HDMI',1,20.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.661',8,1,61,61,3,'recu'),(120,'Usb vers HDMI',1,20.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.665',8,1,62,62,3,'recu'),(121,'Earpods',2,18.00,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.669',8,1,64,64,3,'recu'),(122,'Hub USB',1,9.00,NULL,NULL,'2024-02-21 16:55:00.000','2025-03-31 13:27:33.672',8,2,26,62,5,'recu'),(123,'Ecran 24',2,248.33,NULL,NULL,'2024-11-01 15:08:00.000','2025-03-31 13:27:33.675',9,1,65,66,1,'recu'),(124,'Ecran',1,89.99,NULL,NULL,'2024-01-16 14:26:00.000','2025-03-31 13:27:33.679',9,2,67,68,1,'recu'),(125,'Dock',1,100.00,NULL,NULL,'2024-01-22 18:20:00.000','2025-03-31 13:27:33.682',9,1,1,69,5,'recu'),(126,'Ecran 24',2,98.00,NULL,NULL,'2024-02-15 11:54:00.000','2025-03-31 13:27:33.686',9,2,65,70,1,'recu'),(127,'Ordinateur Portable',1,500.00,NULL,NULL,'2024-01-18 12:25:00.000','2025-03-31 13:27:33.690',11,1,1,44,3,'recu');
/*!40000 ALTER TABLE `commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entite`
--

DROP TABLE IF EXISTS `entite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Entite_nom_key` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entite`
--

LOCK TABLES `entite` WRITE;
/*!40000 ALTER TABLE `entite` DISABLE KEYS */;
INSERT INTO `entite` VALUES (1,'Agde'),(2,'Audit'),(4,'Bassin de thau'),(3,'ECS'),(6,'FBA'),(7,'Loïs Holding'),(8,'Mado'),(9,'Montpellier'),(10,'Patrimoine'),(5,'Pezenas'),(12,'Sauvian'),(11,'Thau Secretariat');
/*!40000 ALTER TABLE `entite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fournisseur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Fournisseur_nom_key` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fournisseur`
--

LOCK TABLES `fournisseur` WRITE;
/*!40000 ALTER TABLE `fournisseur` DISABLE KEYS */;
INSERT INTO `fournisseur` VALUES (2,'Amazon'),(1,'Denis');
/*!40000 ALTER TABLE `fournisseur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','associe','utilisateur') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'utilisateur',
  `entiteId` int NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `date_creation` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `derniere_connexion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_key` (`email`),
  KEY `User_entiteId_fkey` (`entiteId`),
  CONSTRAINT `user_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `entite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ramon','Antoine','antoine.ramon@augefi.fr','utilisateur',3,0,'2025-03-31 13:27:32.981',NULL),(2,'Affre','Johann','johann.affre@augefi.fr','associe',1,1,'2025-03-31 13:27:32.985',NULL),(3,'Madi','Annie','annie.madi@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:32.988',NULL),(4,'Villaret','Arlette','arlette.villaret@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:32.991',NULL),(5,'Sagner','Arnaud','arnaud.sagner@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:32.993',NULL),(6,'Sartore','Sandrine','sandrine.sartore@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:32.996',NULL),(7,'Gasc','Valentine','valentine.gasc@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:32.998',NULL),(8,'Blanc','Benoît','benoit.blanc@augefi.fr','associe',1,1,'2025-03-31 13:27:33.002',NULL),(9,'Gamito','Christèle','christele.gamito@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.006',NULL),(10,'Blancheteau','Clara','clara.blancheteau@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.011',NULL),(11,'Taputu guy','Delphine','delphine.taputuguy@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.016',NULL),(12,'Ninfosi','Enzo','enzo.ninfosi@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.020',NULL),(13,'Cavaillé','Emilie','emilie.cavaille@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.025',NULL),(14,'Verniere','Emilie','emilie.verniere@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.028',NULL),(15,'Barbut','Jean-Christophe','jcbarbut@augefi.fr','associe',1,1,'2025-03-31 13:27:33.032',NULL),(16,'Vahvanen','Kari','kari.vahvanen@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.035',NULL),(17,'Ros','Kévin','kevin.ros@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.038',NULL),(18,'Poujol','Manon','manon.poujol@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.041',NULL),(19,'Adli','Mathieu','mathieu.adli@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.043',NULL),(20,'Challier','Océane','oceane.challier@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.045',NULL),(21,'Poupin','Maëlle','maelle.poupin@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.048',NULL),(22,'Silva','Sonia','sonia.silva@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.050',NULL),(23,'Renaud','Tristan','tristan.renaud@augefi.fr','associe',1,1,'2025-03-31 13:27:33.052',NULL),(24,'Boutier','Nicolas','nicolas.boutier@augefi.fr','associe',1,1,'2025-03-31 13:27:33.054',NULL),(25,'Cocagnac','Guillaume','guillaume.cocagnac@augefi.fr','utilisateur',1,0,'2025-03-31 13:27:33.056',NULL),(26,'Lance','Jean-Baptiste','jean-baptiste.lance@augefi.fr','admin',3,1,'2025-03-31 13:27:33.058',NULL),(27,'Feat','Thibault','thibault.feat@augefi.fr','admin',3,1,'2025-03-31 13:27:33.062',NULL),(28,'Girard','Lucy','lucy.girard@augefi.fr','admin',3,1,'2025-03-31 13:27:33.064',NULL),(29,'Bourles','Laurent','laurent.bourles@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.066',NULL),(30,'Pecherand','Théo','theo.pecherand@augefi.fr','utilisateur',1,1,'2025-03-31 13:27:33.068',NULL),(31,'Cadars','Marion','marion.cadars@augefi.fr','utilisateur',2,1,'2025-03-31 13:27:33.070',NULL),(32,'David','Inès','ines.david@augefi.fr','utilisateur',2,1,'2025-03-31 13:27:33.072',NULL),(33,'Picavet','Valérie','valerie.picavet@augefi.fr','utilisateur',2,1,'2025-03-31 13:27:33.075',NULL),(34,'Sarniguet','Caroline','caroline.sarniguet@augefi.fr','utilisateur',2,1,'2025-03-31 13:27:33.077',NULL),(35,'Salat','Alice','alice.salat@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.079',NULL),(36,'Bernard','Amélie','amelie.bernard@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.082',NULL),(37,'Jaussan','Christophe','christophe.jaussan@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.084',NULL),(38,'Moragues','Francoise','francoise.moragues@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.086',NULL),(39,'Liguori','Ermine','ermine.liguori@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.089',NULL),(40,'Gomez','Lucas','lucas.gomez@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.091',NULL),(41,'Linguet','Miléna','milena.linguet@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.093',NULL),(42,'Giordano','Sébastien','sebastien.giordano@augefi.fr','utilisateur',6,1,'2025-03-31 13:27:33.095',NULL),(43,'Van Migom','Stéphane','stephane.van.migom@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.098',NULL),(44,'Conseils','Thau','thau.conseils@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.100',NULL),(45,'Bouhaddou','Younes','younes.bouhaddou@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.102',NULL),(46,'Carpentier','Cinderella','cinderella.carpentier.@augefi.fr','utilisateur',4,0,'2025-03-31 13:27:33.105',NULL),(47,'Jouge','Sherley','sherley.jouge@augefi.fr','utilisateur',4,1,'2025-03-31 13:27:33.107',NULL),(48,'Abadie Aoun','Marion','marion.abadie.aoun@augefi.fr','utilisateur',3,1,'2025-03-31 13:27:33.109',NULL),(49,'Alliès','Francois','francois.allies@augefi.fr','utilisateur',3,1,'2025-03-31 13:27:33.111',NULL),(50,'Michelon-Anastasy','Laure','laure.michelonanastasy@augefi.fr','utilisateur',3,1,'2025-03-31 13:27:33.113',NULL),(51,'Ferrere','Nathalie','nathalie.ferrere@augefi.fr','utilisateur',3,1,'2025-03-31 13:27:33.116',NULL),(52,'Goube','Jennifer','jennifer.goube@augefi.fr','utilisateur',6,1,'2025-03-31 13:27:33.118',NULL),(53,'Gatuingt','Florence','florence.gatuingt@augefi.fr','utilisateur',6,1,'2025-03-31 13:27:33.120',NULL),(54,'Deljanin-Stojanović','Thomas','thomas.deljaninstojanovic@augefi.fr','utilisateur',6,1,'2025-03-31 13:27:33.123',NULL),(55,'Martin','Carla','carla.martin@augefi.fr','utilisateur',6,1,'2025-03-31 13:27:33.125',NULL),(56,'Aubert','Clotilde','clotilde.aubert@augefi.fr','utilisateur',6,1,'2025-03-31 13:27:33.127',NULL),(57,'Molina','Claire','claire.molina@augefi.fr','utilisateur',6,1,'2025-03-31 13:27:33.129',NULL),(58,'Cavailles','Jérôme','jerome.cavailles@augefi.fr','utilisateur',7,1,'2025-03-31 13:27:33.131',NULL),(59,'Mado','Patrick','patrick.mado@augefi.fr','utilisateur',8,1,'2025-03-31 13:27:33.133',NULL),(60,'Copin','Aurélie','aurelie.copin@augefi.fr','utilisateur',8,1,'2025-03-31 13:27:33.135',NULL),(61,'Vella','Raphaël','raphael.vella@augefi.fr','utilisateur',8,1,'2025-03-31 13:27:33.137',NULL),(62,'Jaux','Isabelle','isabelle.jaux@augefi.fr','utilisateur',8,1,'2025-03-31 13:27:33.139',NULL),(63,'Cros','Laëtitia','laetitia.cros@augefi.fr','utilisateur',8,1,'2025-03-31 13:27:33.141',NULL),(64,'Figueiredo','Stéphanie','stephanie.figueiredo.@augefi.fr','utilisateur',8,0,'2025-03-31 13:27:33.143',NULL),(65,'Gout','Antoine','antoine.gout@augefi.fr','utilisateur',9,1,'2025-03-31 13:27:33.145',NULL),(66,'Tailhan','Perrine','perrine.tailhan@augefi.fr','utilisateur',9,1,'2025-03-31 13:27:33.147',NULL),(67,'Defossez','Fanny','fanny.defossez@augefi.fr','utilisateur',9,1,'2025-03-31 13:27:33.162',NULL),(68,'Pierre','Frederic','frederic.pierre@augefi.fr','utilisateur',9,1,'2025-03-31 13:27:33.165',NULL),(69,'Becker','Marina','marina.becker@augefi.fr','utilisateur',9,1,'2025-03-31 13:27:33.167',NULL),(70,'Saury','Benjamin','benjamin.saury@augefi.fr','utilisateur',9,1,'2025-03-31 13:27:33.170',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `validation`
--

DROP TABLE IF EXISTS `validation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `validation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commandeId` int NOT NULL,
  `statut` enum('en_attente','approuve','refuse') COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_validation` datetime(3) NOT NULL,
  `validateur_id` int NOT NULL,
  `commentaire` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `validation_commandeId_key` (`commandeId`),
  KEY `validation_validateur_id_idx` (`validateur_id`),
  CONSTRAINT `validation_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `commande` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `validation_validateur_id_fkey` FOREIGN KEY (`validateur_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `validation`
--

LOCK TABLES `validation` WRITE;
/*!40000 ALTER TABLE `validation` DISABLE KEYS */;
INSERT INTO `validation` VALUES (1,1,'approuve','2024-11-01 19:16:00.000',1,NULL),(2,2,'approuve','2024-11-01 19:19:00.000',1,NULL),(3,3,'approuve','2024-11-01 19:16:00.000',1,NULL),(4,4,'approuve','2024-11-01 19:16:00.000',1,NULL),(5,5,'approuve','2024-11-01 19:16:00.000',1,NULL),(6,6,'approuve','2024-11-01 19:16:00.000',1,NULL),(7,7,'approuve','2024-11-01 19:16:00.000',1,NULL),(8,8,'approuve','2024-11-01 19:18:00.000',6,NULL),(9,9,'approuve','2024-11-01 19:18:00.000',6,NULL),(10,10,'approuve','2024-11-01 19:16:00.000',1,NULL),(11,11,'approuve','2024-11-01 19:16:00.000',1,NULL),(12,12,'approuve','2024-11-01 19:16:00.000',1,NULL),(13,13,'approuve','2024-11-01 19:16:00.000',1,NULL),(14,14,'approuve','2024-11-01 19:16:00.000',1,NULL),(15,15,'approuve','2024-11-01 19:16:00.000',1,NULL),(16,16,'approuve','2024-11-01 19:16:00.000',1,NULL),(17,17,'approuve','2024-11-01 19:16:00.000',1,NULL),(18,18,'approuve','2024-11-01 19:17:00.000',13,NULL),(19,19,'approuve','2024-11-01 19:16:00.000',1,NULL),(20,20,'approuve','2024-11-01 19:16:00.000',1,NULL),(21,21,'approuve','2024-11-01 19:17:00.000',12,NULL),(22,22,'approuve','2024-11-01 19:16:00.000',1,NULL),(23,23,'approuve','2024-11-01 19:16:00.000',1,NULL),(24,24,'approuve','2024-11-01 19:16:00.000',1,NULL),(25,25,'approuve','2024-11-01 19:16:00.000',1,NULL),(26,26,'approuve','2024-11-01 19:16:00.000',1,NULL),(27,27,'approuve','2024-11-01 19:16:00.000',1,NULL),(28,28,'approuve','2024-11-01 19:16:00.000',1,NULL),(29,29,'approuve','2024-11-01 19:17:00.000',18,NULL),(30,30,'approuve','2024-11-01 19:16:00.000',1,NULL),(31,31,'approuve','2024-11-01 19:16:00.000',1,NULL),(32,32,'approuve','2024-11-01 19:17:00.000',19,NULL),(33,33,'approuve','2024-11-01 19:16:00.000',1,NULL),(34,34,'approuve','2024-11-01 19:18:00.000',20,NULL),(35,35,'approuve','2024-11-01 19:16:00.000',1,NULL),(36,36,'approuve','2024-11-01 19:16:00.000',1,NULL),(37,37,'approuve','2024-09-02 12:10:00.000',1,NULL),(38,38,'approuve','2024-01-22 19:05:00.000',23,NULL),(39,39,'approuve','2024-01-22 19:05:00.000',24,NULL),(40,40,'approuve','2024-01-22 19:05:00.000',1,NULL),(41,41,'approuve','2024-09-02 12:13:00.000',26,NULL),(42,42,'approuve','2024-01-22 18:17:00.000',26,NULL),(43,43,'approuve','2024-01-22 18:56:00.000',26,NULL),(44,44,'approuve','2024-09-02 11:59:00.000',26,NULL),(45,45,'approuve','2024-05-03 11:29:00.000',26,NULL),(46,46,'approuve','2024-02-19 08:52:00.000',1,NULL),(47,47,'approuve','2024-05-03 11:39:00.000',1,NULL),(48,48,'approuve','2024-02-19 08:52:00.000',1,NULL),(49,49,'approuve','2024-11-13 08:27:00.000',26,NULL),(50,50,'approuve','2024-11-01 19:16:00.000',1,NULL),(51,51,'approuve','2024-11-01 19:16:00.000',1,NULL),(52,52,'approuve','2024-03-14 13:28:00.000',1,NULL),(53,53,'approuve','2024-03-14 13:28:00.000',1,NULL),(54,54,'approuve','2024-11-01 19:17:00.000',31,NULL),(55,55,'approuve','2024-11-01 19:16:00.000',1,NULL),(56,56,'approuve','2024-11-01 19:18:00.000',23,NULL),(57,57,'approuve','2024-12-03 18:18:00.000',1,NULL),(58,58,'approuve','2024-10-21 14:46:00.000',26,NULL),(59,59,'approuve','2024-11-01 19:15:00.000',35,NULL),(60,60,'approuve','2024-11-01 19:16:00.000',1,NULL),(61,61,'approuve','2024-11-01 19:16:00.000',1,NULL),(62,62,'approuve','2024-11-01 19:16:00.000',37,NULL),(63,63,'approuve','2024-11-01 19:17:00.000',38,NULL),(64,64,'approuve','2024-11-01 19:17:00.000',38,NULL),(65,65,'approuve','2024-11-01 19:16:00.000',1,NULL),(66,66,'approuve','2024-11-01 19:16:00.000',1,NULL),(67,67,'approuve','2024-11-01 19:16:00.000',1,NULL),(68,68,'approuve','2024-11-01 19:16:00.000',1,NULL),(69,69,'approuve','2024-11-01 19:18:00.000',42,NULL),(70,70,'approuve','2024-11-01 19:16:00.000',1,NULL),(71,71,'approuve','2024-11-01 19:16:00.000',1,NULL),(72,72,'approuve','2024-11-01 19:16:00.000',1,NULL),(73,73,'approuve','2024-11-01 19:16:00.000',1,NULL),(74,74,'approuve','2024-05-03 11:17:00.000',1,NULL),(75,75,'approuve','2024-11-01 19:16:00.000',46,NULL),(76,76,'approuve','2024-05-03 11:17:00.000',1,NULL),(77,77,'approuve','2024-01-26 11:17:00.000',1,NULL),(78,78,'approuve','2024-11-01 19:16:00.000',1,NULL),(79,79,'approuve','2024-11-01 19:17:00.000',49,NULL),(80,80,'approuve','2024-11-01 19:17:00.000',50,NULL),(81,81,'approuve','2024-11-01 19:16:00.000',1,NULL),(82,82,'approuve','2024-11-01 19:17:00.000',48,NULL),(83,83,'approuve','2024-11-01 19:17:00.000',51,NULL),(84,84,'approuve','2024-11-01 19:17:00.000',51,NULL),(85,85,'approuve','2024-11-01 19:16:00.000',1,NULL),(86,86,'approuve','2024-11-01 19:16:00.000',1,NULL),(87,87,'approuve','2024-09-02 12:33:00.000',1,NULL),(88,88,'approuve','2024-09-02 12:37:00.000',1,NULL),(89,89,'approuve','2024-09-02 12:32:00.000',1,NULL),(90,90,'approuve','2024-01-22 18:10:00.000',1,NULL),(91,91,'approuve','2024-01-22 18:11:00.000',1,NULL),(92,92,'approuve','2024-02-02 10:31:00.000',26,NULL),(93,93,'approuve','2024-09-02 12:36:00.000',1,NULL),(94,94,'approuve','2024-08-03 09:09:00.000',26,NULL),(95,95,'approuve','2024-08-03 09:09:00.000',26,NULL),(96,96,'approuve','2024-05-03 14:46:00.000',26,NULL),(97,97,'approuve','2024-03-21 09:37:00.000',1,NULL),(98,98,'approuve','2024-11-01 19:17:00.000',52,NULL),(99,99,'approuve','2024-11-01 19:17:00.000',53,NULL),(100,100,'approuve','2024-11-01 19:17:00.000',52,NULL),(101,101,'approuve','2024-11-01 19:17:00.000',52,NULL),(102,102,'approuve','2024-11-01 19:17:00.000',52,NULL),(103,103,'approuve','2024-11-01 19:17:00.000',52,NULL),(104,104,'approuve','2024-11-01 19:17:00.000',52,NULL),(105,105,'approuve','2024-11-01 19:17:00.000',52,NULL),(106,106,'approuve','2024-11-01 19:18:00.000',42,NULL),(107,107,'approuve','2024-11-01 19:18:00.000',42,NULL),(108,108,'approuve','2024-02-21 18:21:00.000',1,NULL),(109,109,'approuve','2024-02-21 18:21:00.000',1,NULL),(110,110,'approuve','2024-03-14 13:27:00.000',1,NULL),(111,111,'approuve','2024-02-21 10:48:00.000',26,NULL),(112,112,'approuve','2024-11-01 19:18:00.000',59,NULL),(113,113,'approuve','2024-11-01 19:18:00.000',59,NULL),(114,114,'approuve','2024-11-01 19:18:00.000',59,NULL),(115,115,'approuve','2024-09-02 12:42:00.000',59,NULL),(116,116,'approuve','2024-09-02 12:42:00.000',61,NULL),(117,117,'approuve','2024-09-02 12:42:00.000',62,NULL),(118,118,'approuve','2024-09-02 12:42:00.000',63,NULL),(119,119,'approuve','2024-09-02 12:42:00.000',61,NULL),(120,120,'approuve','2024-09-02 12:42:00.000',62,NULL),(121,121,'approuve','2024-09-02 12:42:00.000',64,NULL),(122,122,'approuve','2024-03-14 12:16:00.000',26,NULL),(123,123,'approuve','2024-11-01 19:16:00.000',65,NULL),(124,124,'approuve','2024-01-22 19:00:00.000',67,NULL),(125,125,'approuve','2024-02-19 08:52:00.000',1,NULL),(126,126,'approuve','2024-05-03 11:20:00.000',65,NULL),(127,127,'approuve','2024-05-03 11:24:00.000',1,NULL);
/*!40000 ALTER TABLE `validation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-05  8:38:05
