DROP TABLE IF EXISTS txn_job;

-- ------------------------------------------ NEWS ---------------------------------------------
CREATE TABLE IF NOT EXISTS txn_job (
  job_id  SERIAL      NOT NULL  PRIMARY KEY,
  title              VARCHAR(100)         DEFAULT NULL,
  description        TEXT                 DEFAULT NULL,
  date               DATE                 DEFAULT NULL,
  time               TIME                 DEFAULT NULL,
  image_path         VARCHAR(255)         DEFAULT NULL,
  is_approved        BOOLEAN              DEFAULT FALSE,
  approved_by        INT         NULL,
  comment_applicable BOOLEAN              DEFAULT FALSE,
  tags               TEXT        NULL,
  visited_count      INT                  DEFAULT 0,
  active             BOOLEAN     NOT NULL DEFAULT '1',
  created_ip         VARCHAR(20) NOT NULL,
  modified_ip        VARCHAR(20) NOT NULL,
  created_at         TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by         INT         NOT NULL,
  modified_by        INT         NOT NULL
);