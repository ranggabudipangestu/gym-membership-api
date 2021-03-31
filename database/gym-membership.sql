/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : gym-membership

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2021-03-31 16:14:07
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `location`
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `city` varchar(255) NOT NULL DEFAULT '',
  `province` varchar(255) NOT NULL DEFAULT '',
  `country` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '0:inactive, 1:active',
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO location VALUES ('1', 'Suhat', 'JL Soekarno Hatta No 10', 'Malang', 'Jawa Timur', '', '1', '2021-03-23 12:19:42', '2021-03-23 12:24:27');

-- ----------------------------
-- Table structure for `member`
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `gender` int(255) NOT NULL COMMENT '0: female, 1:male',
  `date_of_birth` date NOT NULL DEFAULT '1900-01-01',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL DEFAULT '',
  `province` varchar(255) NOT NULL DEFAULT '',
  `country` varchar(255) NOT NULL DEFAULT '',
  `membership_type` int(11) NOT NULL DEFAULT '0',
  `joined_date` date NOT NULL DEFAULT '1900-01-01',
  `expired_date` date NOT NULL DEFAULT '1900-01-01',
  `joined_location` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `trainer_id` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT '1971-01-01 00:00:00',
  `updated_date` datetime NOT NULL DEFAULT '1971-01-01 00:00:00',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO member VALUES ('1', 'Rangga Budi Pangestu', '1', '1993-12-12', '+6282234473464', 'ranggabudipangestu@gmail.com', 'bedali, lawang', 'malang', 'jatim', 'indonesia', '1', '2021-03-24', '2021-03-29', '1', '1', '0', '2021-03-24 13:01:37', '2021-03-24 13:01:37', '0', '0');
INSERT INTO member VALUES ('2', 'alex pulalo', '1', '1988-11-01', '+628208893', 'cahyo_imoet@gmail.com', 'kendalsari, suhat', 'malang', 'jatim', 'indonesia', '1', '2021-03-24', '2021-07-27', '1', '1', '0', '2021-03-24 14:42:08', '2021-03-24 14:42:08', '0', '0');
INSERT INTO member VALUES ('3', 'Ahmad Bustomi', '1', '1988-11-01', '+628208893', 'cahyo_imoet@gmail.com', 'kendalsari, suhat', 'malang', 'jatim', 'indonesia', '1', '2021-03-24', '2021-04-28', '1', '1', '0', '2021-03-25 14:25:56', '2021-03-25 14:25:56', '0', '0');
INSERT INTO member VALUES ('5', 'Ardi Idrus', '1', '1990-11-01', '+628208893', 'cahyo_imoet@gmail.com', 'kendalsari, suhat', 'malang', 'jatim', '', '1', '2021-03-25', '2021-03-24', '1', '1', '0', '2021-03-25 15:14:42', '2021-03-25 15:14:42', '1', '0');

-- ----------------------------
-- Table structure for `membership_type`
-- ----------------------------
DROP TABLE IF EXISTS `membership_type`;
CREATE TABLE `membership_type` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of membership_type
-- ----------------------------
INSERT INTO membership_type VALUES ('1', 'GYM', '100000', '30', '1', '2021-03-23 14:20:47', '2021-03-23 14:20:47');
INSERT INTO membership_type VALUES ('2', 'ZUMBA', '150000', '30', '1', '2021-03-23 14:43:57', '2021-03-23 14:43:57');

-- ----------------------------
-- Table structure for `member_payment`
-- ----------------------------
DROP TABLE IF EXISTS `member_payment`;
CREATE TABLE `member_payment` (
  `payment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `payment_location` varchar(100) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_number` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(500) DEFAULT NULL,
  `payment_method` int(11) DEFAULT NULL,
  `member_id` bigint(20) NOT NULL DEFAULT '0',
  `member_amount` double NOT NULL DEFAULT '0',
  `use_trainer` int(11) NOT NULL DEFAULT '0',
  `trainer_id` bigint(20) NOT NULL DEFAULT '0',
  `trainer_amount` double NOT NULL DEFAULT '0',
  `tax_id` int(11) NOT NULL DEFAULT '0',
  `tax_amount` double NOT NULL DEFAULT '0',
  `pay_duration` int(11) NOT NULL DEFAULT '0' COMMENT 'default value from membership_type field duration',
  `disc_percent` double DEFAULT NULL,
  `disc_amount` double DEFAULT NULL,
  `charge_percent` double DEFAULT NULL,
  `charge_amount` double DEFAULT NULL,
  `total_amount` double NOT NULL DEFAULT '0',
  `prev_exp_date` date DEFAULT '1900-01-01',
  `created_date` datetime NOT NULL DEFAULT '1971-01-01 00:00:00',
  `updated_date` datetime NOT NULL DEFAULT '1971-01-01 00:00:00',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`payment_id`,`payment_number`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of member_payment
-- ----------------------------
INSERT INTO member_payment VALUES ('3', '1', '2021-03-29', '00001', 'march payment', '1', '1', '120000', '1', '1', '700000', '0', '0', '60', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 14:12:45', '2021-03-29 14:12:45', '1', '0');
INSERT INTO member_payment VALUES ('4', '1', '2021-03-29', '00001', 'march payment', '1', '1', '120000', '1', '1', '700000', '0', '0', '60', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 14:15:13', '2021-03-29 14:15:13', '1', '0');
INSERT INTO member_payment VALUES ('5', '1', '2021-03-29', '00001', 'march payment', '1', '1', '120000', '1', '1', '700000', '0', '0', '60', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 14:15:39', '2021-03-29 14:15:39', '1', '0');
INSERT INTO member_payment VALUES ('6', '1', '2021-03-29', '00001', 'march payment', '1', '2', '120000', '1', '1', '700000', '0', '0', '60', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 15:46:04', '2021-03-29 15:46:04', '1', '0');
INSERT INTO member_payment VALUES ('7', '1', '2021-03-29', '00002', 'march payment', '1', '2', '120000', '1', '1', '700000', '0', '0', '30', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 16:06:57', '2021-03-29 16:06:57', '1', '0');
INSERT INTO member_payment VALUES ('8', '1', '2021-03-29', '00002', 'march payment', '1', '2', '120000', '1', '1', '700000', '0', '0', '30', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 16:30:25', '2021-03-29 16:30:25', '1', '0');
INSERT INTO member_payment VALUES ('9', '1', '2021-03-29', '00002', 'march payment', '1', '2', '120000', '1', '1', '700000', '0', '0', '30', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 16:32:07', '2021-03-29 16:32:07', '1', '0');
INSERT INTO member_payment VALUES ('12', '1', '2021-03-29', '00002', 'march payment', '1', '3', '120000', '1', '1', '700000', '0', '0', '30', '0', '0', '0', '0', '820000', '1900-01-01', '2021-03-29 16:34:00', '2021-03-29 16:34:00', '1', '0');

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for `payment_method`
-- ----------------------------
DROP TABLE IF EXISTS `payment_method`;
CREATE TABLE `payment_method` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `charge` double DEFAULT NULL,
  `use_card` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of payment_method
-- ----------------------------
INSERT INTO payment_method VALUES ('1', 'Cash', '0', '0');

-- ----------------------------
-- Table structure for `tax`
-- ----------------------------
DROP TABLE IF EXISTS `tax`;
CREATE TABLE `tax` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `percentage` double DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tax
-- ----------------------------

-- ----------------------------
-- Table structure for `trainer`
-- ----------------------------
DROP TABLE IF EXISTS `trainer`;
CREATE TABLE `trainer` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `salary` double(11,2) unsigned DEFAULT '0.00',
  `status` tinyint(3) unsigned DEFAULT '0',
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of trainer
-- ----------------------------
INSERT INTO trainer VALUES ('1', 'Alex', 'Alex@gmail.com', '088181108', '', '700000.00', '1', '2021-03-22 12:20:00', '2021-03-22 12:20:00');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usename` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userlocation` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO user VALUES ('1', 'ranggabp', '082234473464', 'ranggabudipangestu@gmail.com', 'rhs', '1');
