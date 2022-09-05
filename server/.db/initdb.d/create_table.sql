CREATE DATABASE IF NOT EXISTS dev_portfolio;

USE dev_portfolio;

CREATE TABLE IF NOT EXISTS `number_of_visitors` (
  `visitor_id` int NOT NULL AUTO_INCREMENT,
  `total_count` int NOT NULL DEFAULT '0',
  `today_count` int DEFAULT '0',
  `today_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`visitor_id`)
);

CREATE TABLE IF NOT EXISTS `visitor_comments` (
  `visitor_comment_id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `description` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`visitor_comment_id`)
);

INSERT INTO number_of_visitors (total_count, today_count) VALUES (0, 0);
