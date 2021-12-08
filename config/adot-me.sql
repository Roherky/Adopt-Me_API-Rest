<<<<<<< HEAD
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adot-me
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `adoptante`
--

DROP TABLE IF EXISTS `adoptante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoptante` (
  `id_Adoptante` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_Adoptante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoptante`
--

LOCK TABLES `adoptante` WRITE;
/*!40000 ALTER TABLE `adoptante` DISABLE KEYS */;
/*!40000 ALTER TABLE `adoptante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `idAnimal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `raza` varchar(45) DEFAULT NULL,
  `sexo` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `tipo_animal` varchar(45) DEFAULT NULL,
  `estado` enum('adoptado','adopcion','acogida','otros') DEFAULT NULL,
  `fecha_ingresso` date DEFAULT NULL,
  `id_protectora` int DEFAULT NULL,
  PRIMARY KEY (`idAnimal`),
  KEY `proctectora_idx` (`id_protectora`),
  CONSTRAINT `proctectora` FOREIGN KEY (`id_protectora`) REFERENCES `protectora` (`id_Proctectora`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finalesfelices`
--

DROP TABLE IF EXISTS `finalesfelices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finalesfelices` (
  `id_Final` int NOT NULL AUTO_INCREMENT,
  `fecha_Publicacion` date DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `id_adoptante` int DEFAULT NULL,
  PRIMARY KEY (`id_Final`),
  KEY `adoptante_idx` (`id_adoptante`),
  CONSTRAINT `adoptante` FOREIGN KEY (`id_adoptante`) REFERENCES `adoptante` (`id_Adoptante`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finalesfelices`
--

LOCK TABLES `finalesfelices` WRITE;
/*!40000 ALTER TABLE `finalesfelices` DISABLE KEYS */;
/*!40000 ALTER TABLE `finalesfelices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id_imagenes` int NOT NULL AUTO_INCREMENT,
  `id_adoptantes` int DEFAULT NULL,
  `id_protectora` int DEFAULT NULL,
  `id_animal` int DEFAULT NULL,
  `id_noticia` int DEFAULT NULL,
  `id_final_feliz` int DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_imagenes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id_login` int NOT NULL AUTO_INCREMENT,
  `id_adoptante` int DEFAULT NULL,
  `id_proctectora` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id_login`),
  KEY `login_adopta_idx` (`id_adoptante`),
  KEY `login_proctect_idx` (`id_proctectora`),
  CONSTRAINT `login_adopta` FOREIGN KEY (`id_adoptante`) REFERENCES `adoptante` (`id_Adoptante`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `login_proctect` FOREIGN KEY (`id_proctectora`) REFERENCES `protectora` (`id_Proctectora`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `idNoticias` int NOT NULL AUTO_INCREMENT,
  `titular` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `prioridad` varchar(45) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `id_Proctectora` int DEFAULT NULL,
  PRIMARY KEY (`idNoticias`),
  KEY `noticias_idx` (`id_Proctectora`),
  CONSTRAINT `noticias` FOREIGN KEY (`id_Proctectora`) REFERENCES `noticias` (`idNoticias`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protectora`
--

DROP TABLE IF EXISTS `protectora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protectora` (
  `id_Proctectora` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_Proctectora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protectora`
--

LOCK TABLES `protectora` WRITE;
/*!40000 ALTER TABLE `protectora` DISABLE KEYS */;
/*!40000 ALTER TABLE `protectora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabla_chat`
--

DROP TABLE IF EXISTS `tabla_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_chat` (
  `idTabla_Chat` int NOT NULL AUTO_INCREMENT,
  `id_logint` int DEFAULT NULL,
  `id_login2` int DEFAULT NULL,
  PRIMARY KEY (`idTabla_Chat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_chat`
--

LOCK TABLES `tabla_chat` WRITE;
/*!40000 ALTER TABLE `tabla_chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabla_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabla_imagenes`
--

DROP TABLE IF EXISTS `tabla_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_imagenes` (
  `idtabla_imagenes` int NOT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtabla_imagenes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_imagenes`
--

LOCK TABLES `tabla_imagenes` WRITE;
/*!40000 ALTER TABLE `tabla_imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabla_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabla_mensaje`
--

DROP TABLE IF EXISTS `tabla_mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_mensaje` (
  `idtabla_mensaje` int NOT NULL AUTO_INCREMENT,
  `id_chat` int DEFAULT NULL,
  `id_emissor` int DEFAULT NULL,
  `menssaje` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`idtabla_mensaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_mensaje`
--

LOCK TABLES `tabla_mensaje` WRITE;
/*!40000 ALTER TABLE `tabla_mensaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabla_mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'alex','123'),(2,'reinhard','123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-05 18:37:16
=======
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adot-me
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `adoptante`
--

DROP TABLE IF EXISTS `adoptante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoptante` (
  `id_Adoptante` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_Adoptante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoptante`
--

LOCK TABLES `adoptante` WRITE;
/*!40000 ALTER TABLE `adoptante` DISABLE KEYS */;
/*!40000 ALTER TABLE `adoptante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `idAnimal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `raza` varchar(45) DEFAULT NULL,
  `sexo` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `tipo_animal` varchar(45) DEFAULT NULL,
  `estado` enum('adoptado','adopcion','acogida','otros') DEFAULT NULL,
  `fecha_ingresso` date DEFAULT NULL,
  `id_protectora` int DEFAULT NULL,
  PRIMARY KEY (`idAnimal`),
  KEY `proctectora_idx` (`id_protectora`),
  CONSTRAINT `proctectora` FOREIGN KEY (`id_protectora`) REFERENCES `protectora` (`id_Proctectora`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finalesfelices`
--

DROP TABLE IF EXISTS `finalesfelices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finalesfelices` (
  `id_Final` int NOT NULL AUTO_INCREMENT,
  `fecha_Publicacion` date DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `id_adoptante` int DEFAULT NULL,
  PRIMARY KEY (`id_Final`),
  KEY `adoptante_idx` (`id_adoptante`),
  CONSTRAINT `adoptante` FOREIGN KEY (`id_adoptante`) REFERENCES `adoptante` (`id_Adoptante`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finalesfelices`
--

LOCK TABLES `finalesfelices` WRITE;
/*!40000 ALTER TABLE `finalesfelices` DISABLE KEYS */;
/*!40000 ALTER TABLE `finalesfelices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id_imagenes` int NOT NULL AUTO_INCREMENT,
  `id_adoptantes` int DEFAULT NULL,
  `id_protectora` int DEFAULT NULL,
  `id_animal` int DEFAULT NULL,
  `id_noticia` int DEFAULT NULL,
  `id_final_feliz` int DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_imagenes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id_login` int NOT NULL AUTO_INCREMENT,
  `id_adoptante` int DEFAULT NULL,
  `id_proctectora` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id_login`),
  KEY `login_adopta_idx` (`id_adoptante`),
  KEY `login_proctect_idx` (`id_proctectora`),
  CONSTRAINT `login_adopta` FOREIGN KEY (`id_adoptante`) REFERENCES `adoptante` (`id_Adoptante`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `login_proctect` FOREIGN KEY (`id_proctectora`) REFERENCES `protectora` (`id_Proctectora`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `idNoticias` int NOT NULL AUTO_INCREMENT,
  `titular` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `prioridad` varchar(45) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `id_Proctectora` int DEFAULT NULL,
  PRIMARY KEY (`idNoticias`),
  KEY `noticias_idx` (`id_Proctectora`),
  CONSTRAINT `noticias` FOREIGN KEY (`id_Proctectora`) REFERENCES `noticias` (`idNoticias`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protectora`
--

DROP TABLE IF EXISTS `protectora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protectora` (
  `id_Proctectora` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_Proctectora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protectora`
--

LOCK TABLES `protectora` WRITE;
/*!40000 ALTER TABLE `protectora` DISABLE KEYS */;
/*!40000 ALTER TABLE `protectora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabla_chat`
--

DROP TABLE IF EXISTS `tabla_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_chat` (
  `idTabla_Chat` int NOT NULL AUTO_INCREMENT,
  `id_logint` int DEFAULT NULL,
  `id_login2` int DEFAULT NULL,
  PRIMARY KEY (`idTabla_Chat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_chat`
--

LOCK TABLES `tabla_chat` WRITE;
/*!40000 ALTER TABLE `tabla_chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabla_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabla_imagenes`
--

DROP TABLE IF EXISTS `tabla_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_imagenes` (
  `idtabla_imagenes` int NOT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtabla_imagenes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_imagenes`
--

LOCK TABLES `tabla_imagenes` WRITE;
/*!40000 ALTER TABLE `tabla_imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabla_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabla_mensaje`
--

DROP TABLE IF EXISTS `tabla_mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_mensaje` (
  `idtabla_mensaje` int NOT NULL AUTO_INCREMENT,
  `id_chat` int DEFAULT NULL,
  `id_emissor` int DEFAULT NULL,
  `menssaje` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`idtabla_mensaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_mensaje`
--

LOCK TABLES `tabla_mensaje` WRITE;
/*!40000 ALTER TABLE `tabla_mensaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabla_mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'alex','123'),(2,'reinhard','123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-05 18:37:16
>>>>>>> fe04b48154e540fe8e6feb352cf8e7d5fb620771
