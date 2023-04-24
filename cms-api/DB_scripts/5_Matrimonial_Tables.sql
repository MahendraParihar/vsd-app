-- ------------------------------------------ Matrimonial ---------------------------------------------

DROP TABLE IF EXISTS txn_matrimonial_addiction_mapping;
DROP TABLE IF EXISTS txn_matrimonial_profession_mapping;
DROP TABLE IF EXISTS txn_matrimonial_education_mapping;
DROP TABLE IF EXISTS txn_matrimonial_profile_shortlisted;
DROP TABLE IF EXISTS txn_matrimonial_profile_requested;
DROP TABLE IF EXISTS txn_matrimonial_profile;

CREATE TABLE IF NOT EXISTS txn_matrimonial_profile (
  matrimonial_id        SERIAL       NOT NULL  PRIMARY KEY,
  family_id      INT          NOT NULL,
  profile_viewed_count  INT          NOT NULL DEFAULT 0,
  matrimonial_status_id INT          NOT NULL DEFAULT 1,
  status_change_reason  VARCHAR(250) NOT NULL,
  status_change_by      INT          NULL,
  created_ip            VARCHAR(50)  NOT NULL,
  modified_ip           VARCHAR(50)  NOT NULL,
  created_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tm_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
  CONSTRAINT tm_m_status_id_fk FOREIGN KEY (matrimonial_status_id) REFERENCES mst_matrimonial_status (matrimonial_status_id)
);

CREATE INDEX ix_matrimonial_family_id
  ON txn_matrimonial_profile (family_id);

CREATE TABLE IF NOT EXISTS txn_matrimonial_profile_requested (
  profile_requested_id SERIAL      NOT NULL  PRIMARY KEY,
  requested_from_id    INT         NOT NULL,
  requested_to_id      INT         NOT NULL,
  request_status_id    INT         NOT NULL,
  created_ip           VARCHAR(50) NOT NULL,
  modified_ip          VARCHAR(50) NOT NULL,
  created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by           INT         NOT NULL DEFAULT 0,
  modified_by          INT         NOT NULL DEFAULT 0,
  status_id            INT         NOT NULL DEFAULT 0,
  CONSTRAINT tmpreq_from_id_fk FOREIGN KEY (requested_from_id) REFERENCES txn_matrimonial_profile (matrimonial_id),
  CONSTRAINT tmpreq_to_id_fk FOREIGN KEY (requested_to_id) REFERENCES txn_matrimonial_profile (matrimonial_id),
  CONSTRAINT tmpr_status_id_fk FOREIGN KEY (request_status_id) REFERENCES mst_matrimonial_requested_status (requested_status_id)
);

CREATE TABLE IF NOT EXISTS txn_matrimonial_profile_shortlisted (
  profile_shortlisted_id SERIAL      NOT NULL            PRIMARY KEY,
  matrimonial_id         INT         NOT NULL,
  shortlisted_id         INT         NOT NULL,
  active                 BOOLEAN     NOT NULL           DEFAULT '1',
  created_ip             VARCHAR(50) NOT NULL,
  modified_ip            VARCHAR(50) NOT NULL,
  created_at             TIMESTAMP   NOT NULL           DEFAULT CURRENT_TIMESTAMP,
  updated_at             TIMESTAMP   NOT NULL           DEFAULT CURRENT_TIMESTAMP,
  created_by             INT         NOT NULL           DEFAULT 0,
  modified_by            INT         NOT NULL           DEFAULT 0,
  CONSTRAINT tmpshort_matrimonial_id_fk FOREIGN KEY (matrimonial_id) REFERENCES txn_matrimonial_profile (matrimonial_id),
  CONSTRAINT tmpshort_shortlisted_id_fk FOREIGN KEY (shortlisted_id) REFERENCES txn_matrimonial_profile (matrimonial_id)
);
