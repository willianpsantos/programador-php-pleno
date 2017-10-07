-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 201.73.144.20    Database: cotton_sementes_testing
-- ------------------------------------------------------
-- Server version	5.6.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pessoa_cultivares_remessas`
--

DROP TABLE IF EXISTS `pessoa_cultivares_remessas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa_cultivares_remessas` (
  `idpessoa_cultivar_remessa` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idpessoa` int(10) unsigned NOT NULL,
  `idcultivar` int(10) unsigned NOT NULL,
  `idremessa` int(10) unsigned NOT NULL,
  `situacao` enum('A','I') DEFAULT 'A' COMMENT 'A - Ativo, I - Inativo',
  `dt_cadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  `idusuario_cadastro` int(10) unsigned DEFAULT NULL,
  `dt_alteracao` datetime DEFAULT NULL,
  `idusuario_alteracao` int(10) unsigned DEFAULT NULL,
  `dt_inativacao` datetime DEFAULT NULL,
  `idusuario_inativacao` int(10) unsigned DEFAULT NULL,
  `dt_reativacao` datetime DEFAULT NULL,
  `idusuario_reativacao` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idpessoa_cultivar_remessa`),
  KEY `idusuario_cadastro` (`idusuario_cadastro`),
  KEY `idusuario_alteracao` (`idusuario_alteracao`),
  KEY `idusuario_inativacao` (`idusuario_inativacao`),
  KEY `idusuario_reativacao` (`idusuario_reativacao`),
  KEY `idpessoa` (`idpessoa`),
  KEY `idcultivar` (`idcultivar`),
  KEY `idremessa` (`idremessa`),
  CONSTRAINT `pessoa_cultivares_remessas_ibfk_1` FOREIGN KEY (`idusuario_cadastro`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `pessoa_cultivares_remessas_ibfk_2` FOREIGN KEY (`idusuario_alteracao`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `pessoa_cultivares_remessas_ibfk_3` FOREIGN KEY (`idusuario_inativacao`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `pessoa_cultivares_remessas_ibfk_4` FOREIGN KEY (`idusuario_reativacao`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `pessoa_cultivares_remessas_ibfk_5` FOREIGN KEY (`idpessoa`) REFERENCES `pessoas` (`idpessoa`),
  CONSTRAINT `pessoa_cultivares_remessas_ibfk_6` FOREIGN KEY (`idcultivar`) REFERENCES `cultivares` (`idcultivar`),
  CONSTRAINT `pessoa_cultivares_remessas_ibfk_7` FOREIGN KEY (`idremessa`) REFERENCES `remessas` (`idremessa`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-12  8:38:51
