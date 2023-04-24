DROP TABLE IF EXISTS log_errors;
CREATE TABLE IF NOT EXISTS log_errors (
  error_id              SERIAL       NOT NULL  PRIMARY KEY,
  environment           VARCHAR(1)   NOT NULL,
  browser               VARCHAR(100) NULL,
  hosturl               VARCHAR(100) NULL,
  servername            VARCHAR(50)  NULL,
  controller            VARCHAR(100) NULL,
  methodname            VARCHAR(100) NULL,
  exception_message     TEXT         NULL,
  exception_message_SQL TEXT         NULL,
  exception_type        VARCHAR(200) NULL,
  exception_source      VARCHAR(200) NULL,
  exception_target      VARCHAR(400) NULL,
  exception_stacktrace  TEXT         NULL,
  error_TIMESTAMP       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS mst_admin_menu;
CREATE TABLE IF NOT EXISTS mst_admin_menu (
  id           SERIAL       NOT NULL PRIMARY KEY,
  menu_name    VARCHAR(255) NOT NULL,
  parent       INT          NOT NULL,
  path         VARCHAR(255) NOT NULL,
  icon         VARCHAR(255) NOT NULL,
  sequence     INT                   DEFAULT NULL,
  active       BOOLEAN      NOT NULL DEFAULT '1',
  created_ip   VARCHAR(255) NOT NULL,
  created_by   INT          NOT NULL,
  modified_ip  VARCHAR(255) NOT NULL,
  modified_by  INT          NOT NULL,
  created_date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS mst_admin_role;
CREATE TABLE IF NOT EXISTS mst_admin_role (
  id   SERIAL       NOT NULL PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS mst_admin_role_permission;
CREATE TABLE IF NOT EXISTS mst_admin_role_permission (
  id          SERIAL       NOT NULL PRIMARY KEY,
  role_id     INT          NOT NULL,
  menu_id     INT          NOT NULL,
  active      BOOLEAN      NOT NULL DEFAULT '1',
  created_ip  VARCHAR(255) NOT NULL,
  created_by  INT          NOT NULL,
  modified_ip VARCHAR(255) NOT NULL,
  modified_by INT          NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS mst_admin_user;
CREATE TABLE IF NOT EXISTS mst_admin_user (
  id              SERIAL       NOT NULL PRIMARY KEY,
  role            INT          NOT NULL,
  username        VARCHAR(100) NOT NULL,
  profile_picture VARCHAR(255) NOT NULL,
  password        VARCHAR(255) NOT NULL,
  password_temp   VARCHAR(255)          DEFAULT NULL,
  first_name      VARCHAR(255) NOT NULL,
  last_name       VARCHAR(255) NOT NULL,
  contact_number  VARCHAR(16)  NOT NULL,
  email           VARCHAR(255) NOT NULL,
  address_id      INT          NOT NULL,
  start_date      TIMESTAMP    NOT NULL,
  end_date        TIMESTAMP    NULL,
  created_ip      VARCHAR(50)  NOT NULL,
  modified_ip     VARCHAR(50)  NOT NULL,
  active          BOOLEAN      NULL     DEFAULT '1',
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by      INT          NOT NULL,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by     INT          NOT NULL
);