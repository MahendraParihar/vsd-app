-- ------------------------------------------ Application Users ---------------------------------------------
--
-- Table structure for table mst_app_user
--
DROP TABLE IF EXISTS txn_app_user_login_history;
DROP TABLE IF EXISTS txn_app_user_device;
DROP TABLE IF EXISTS txn_app_user;

CREATE TABLE IF NOT EXISTS txn_app_user (
  app_user_id        SERIAL      NOT NULL  PRIMARY KEY,
  first_name         VARCHAR(50)          DEFAULT NULL,
  last_name          VARCHAR(50)          DEFAULT NULL,
  email_id           VARCHAR(100)         DEFAULT NULL,
  password           TEXT,
  city_village_id    INT         NOT NULL,
  contact_no         VARCHAR(15)          DEFAULT NULL,
  verification_code  VARCHAR(20)          DEFAULT NULL,
  app_user_status_id INT         NOT NULL,
  deactive_reason    VARCHAR(500)         DEFAULT NULL,
  created_ip         VARCHAR(50) NOT NULL,
  modified_ip        VARCHAR(50) NOT NULL,
  created_at         TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by         INT         NOT NULL DEFAULT 0,
  modified_by        INT         NOT NULL DEFAULT 0,
  CONSTRAINT mau_city_village_id_fk FOREIGN KEY (city_village_id) REFERENCES mst_city_village (city_village_id)
);

CREATE INDEX ix_app_user_city_village
  ON txn_app_user (city_village_id);
CREATE INDEX ix_app_user_email
  ON txn_app_user (email_id);

--
-- Table structure for table mst_app_user_device_mapping
--

CREATE TABLE IF NOT EXISTS txn_app_user_device (
  app_user_device_id SERIAL       NOT NULL  PRIMARY KEY,
  app_user_id        INT          NULL,
  device_name        VARCHAR(255) NULL     DEFAULT NULL,
  platform           VARCHAR(50)  NULL     DEFAULT NULL,
  device_id          VARCHAR(250) NULL     DEFAULT NULL,
  push_token         TEXT                  DEFAULT NULL,
  is_login           BOOLEAN      NULL     DEFAULT '0',
  app_version        VARCHAR(10)  NOT NULL,
  created_ip         VARCHAR(50)  NOT NULL,
  modified_ip        VARCHAR(50)  NOT NULL,
  active             BOOLEAN      NULL     DEFAULT '1',
  created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by         INT          NOT NULL,
  modified_by        INT          NOT NULL,
  CONSTRAINT mai_app_user_id_fk FOREIGN KEY (app_user_id) REFERENCES txn_app_user (app_user_id)
);

CREATE INDEX ix_app_user_device
  ON txn_app_user_device (app_user_id);

--
-- Table structure for table txn_app_user_login_history
--

CREATE TABLE IF NOT EXISTS txn_app_user_login_history (
  app_login_history_id SERIAL      NOT NULL  PRIMARY KEY,
  app_user_device_id   INT         NOT NULL,
  created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_ip           VARCHAR(50) NOT NULL
);
CREATE INDEX ix_app_user_login_history_au
  ON txn_app_user_login_history (app_user_device_id);
ALTER TABLE txn_app_user_login_history
  ADD CONSTRAINT txn_app_user_login_history_au_fk FOREIGN KEY (app_user_device_id) REFERENCES txn_app_user_device (app_user_device_id)
  ON DELETE CASCADE;