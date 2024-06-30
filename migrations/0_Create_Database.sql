DROP TABLE IF EXISTS log_error;
CREATE TABLE IF NOT EXISTS log_error
(
  error_id              SERIAL       NOT NULL PRIMARY KEY,
  environment           VARCHAR(1)   NOT NULL,
  browser               VARCHAR(100) NULL,
  host_url              VARCHAR(100) NULL,
  server_name           VARCHAR(50)  NULL,
  controller            VARCHAR(100) NULL,
  method_name           VARCHAR(100) NULL,
  exception_message     TEXT         NULL,
  exception_message_SQL TEXT         NULL,
  exception_type        VARCHAR(200) NULL,
  exception_source      VARCHAR(200) NULL,
  exception_target      VARCHAR(400) NULL,
  exception_stacktrace  TEXT         NULL,
  error_TIMESTAMP       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS mst_config;
CREATE TABLE IF NOT EXISTS mst_config
(
  config_id    SERIAL       NOT NULL PRIMARY KEY,
  config_name  VARCHAR(100) NOT NULL,
  config_value VARCHAR(200) NULL
);
