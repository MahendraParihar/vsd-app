CREATE TABLE IF NOT EXISTS mst_media_src (
  media_src_id SERIAL      NOT NULL  PRIMARY KEY,
  media_src    VARCHAR(50) NOT NULL,
  active       BOOLEAN     NULL     DEFAULT '1',
  created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by   INT         NOT NULL,
  updated_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by  INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_media_type (
  media_type_id SERIAL      NOT NULL  PRIMARY KEY,
  media_type    VARCHAR(50) NOT NULL,
  active       BOOLEAN     NULL     DEFAULT '1',
  created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by   INT         NOT NULL,
  updated_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by  INT         NOT NULL
);

-- ------------------------------------------ DIRECTORY ---------------------------------------------

CREATE TABLE IF NOT EXISTS mst_business (
  business_id SERIAL       NOT NULL  PRIMARY KEY,
  business    VARCHAR(50)  NOT NULL,
  image_path  VARCHAR(100) NULL,
  active      BOOLEAN      NULL     DEFAULT '1',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT          NOT NULL,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_service (
  service_id  SERIAL       NOT NULL  PRIMARY KEY,
  service     VARCHAR(50)  NOT NULL,
  image_path  VARCHAR(100) NULL,
  active      BOOLEAN      NULL     DEFAULT '1',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT          NOT NULL,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_gender (
  gender_id   SERIAL      NOT NULL  PRIMARY KEY,
  gender      VARCHAR(50) NOT NULL,
  active      BOOLEAN     NULL     DEFAULT '1',
  created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT         NOT NULL,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_marital_status (
  marital_status_id SERIAL      NOT NULL  PRIMARY KEY,
  marital_status    VARCHAR(50) NOT NULL,
  active            BOOLEAN     NULL     DEFAULT '1',
  created_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by        INT         NOT NULL,
  updated_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by       INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_relationship (
  relationship_id SERIAL      NOT NULL  PRIMARY KEY,
  relationship    VARCHAR(50) NOT NULL,
  active          BOOLEAN     NULL     DEFAULT '1',
  created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by      INT         NOT NULL,
  updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by     INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_religion (
  religion_id SERIAL      NOT NULL  PRIMARY KEY,
  religion    VARCHAR(50) NOT NULL,
  active      BOOLEAN     NULL     DEFAULT '1',
  created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT         NOT NULL,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_gotra (
  gotra_id    SERIAL      NOT NULL  PRIMARY KEY,
  gotra       VARCHAR(50) NOT NULL,
  active      BOOLEAN     NULL     DEFAULT '1',
  created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT         NOT NULL,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_addiction (
  addiction_id SERIAL      NOT NULL  PRIMARY KEY,
  addiction    VARCHAR(50) NOT NULL,
  active       BOOLEAN     NULL     DEFAULT '1',
  created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by   INT         NOT NULL,
  updated_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by  INT         NOT NULL
);

CREATE TABLE mst_country
(
  country_id        SERIAL PRIMARY KEY,
  country           VARCHAR(100)                    NOT NULL,
  phone_number_code VARCHAR(10)                     NULL,
  active            BOOLEAN DEFAULT '1'             NOT NULL,
  created_at        TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by        INT                             NULL,
  modified_by       INT                             NULL
);

CREATE TABLE mst_state
(
  state_id    SERIAL PRIMARY KEY,
  country_id  INT                             NOT NULL,
  state_name  VARCHAR(100)                    NOT NULL,
  state_code  INT                             NULL,
  active      BOOLEAN DEFAULT '1'             NOT NULL,
  created_at  TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT                             NULL,
  modified_by INT                             NULL,
  CONSTRAINT ms_mst_countries_id_fk FOREIGN KEY (country_id) REFERENCES mst_country (country_id)
    ON DELETE CASCADE
);

CREATE INDEX ix_states_country_id
  ON mst_state (country_id);

CREATE TABLE mst_district
(
  district_id SERIAL PRIMARY KEY,
  state_id    INT                             NOT NULL,
  district    VARCHAR(100)                    NOT NULL,
  active      BOOLEAN DEFAULT '1'             NOT NULL,
  created_at  TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT                             NULL,
  modified_by INT                             NULL,
  CONSTRAINT md_mst_state_id_fk FOREIGN KEY (state_id) REFERENCES mst_state (state_id)
    ON DELETE CASCADE
);

CREATE INDEX ix_district_state_id
  ON mst_district (state_id);

CREATE TABLE IF NOT EXISTS mst_city_village (
  city_village_id SERIAL      NOT NULL  PRIMARY KEY,
  type_id         INT         NOT NULL,
  district_id     INT         NOT NULL,
  city_vilage     VARCHAR(75) NOT NULL,
  pin_code        VARCHAR(10)          DEFAULT NULL,
  std_code        VARCHAR(10)          DEFAULT NULL,
  active          BOOLEAN     NULL     DEFAULT '1',
  created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by      INT         NOT NULL,
  modified_by     INT         NOT NULL,
  CONSTRAINT mcv_district_id_fk FOREIGN KEY (district_id) REFERENCES mst_district (district_id)
    ON DELETE CASCADE
);

CREATE INDEX ix_city_village_district_id
  ON mst_city_village (district_id);

CREATE TABLE IF NOT EXISTS mst_post (
  post_id     SERIAL      NOT NULL  PRIMARY KEY,
  post_name   VARCHAR(50) NOT NULL,
  active      BOOLEAN     NOT NULL DEFAULT '1',
  created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT         NOT NULL,
  modified_by INT         NOT NULL
);

-- ------------------------------------------ MANDAL ---------------------------------------------

CREATE TABLE IF NOT EXISTS mst_mandal (
  mandal_id   SERIAL       NOT NULL  PRIMARY KEY,
  mandal_name VARCHAR(150) NOT NULL,
  address_id  INT          NOT NULL,
  active      BOOLEAN      NOT NULL DEFAULT '1',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT          NOT NULL,
  modified_by INT          NOT NULL
);

-- ------------------------------------------ Table ---------------------------------------------
CREATE TABLE IF NOT EXISTS mst_table (
  table_id   SERIAL      NOT NULL  PRIMARY KEY,
  table_name VARCHAR(75) NOT NULL
);

-- ------------------------------------------ Address Type ---------------------------------------------

CREATE TABLE IF NOT EXISTS mst_address_type (
  address_type_id SERIAL      NOT NULL  PRIMARY KEY,
  address_type    VARCHAR(50) NOT NULL,
  active          BOOLEAN     NULL     DEFAULT '1',
  created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by      INT         NOT NULL,
  modified_by     INT         NOT NULL
);

-- ------------------------------------------ Contact Type ---------------------------------------------

CREATE TABLE IF NOT EXISTS mst_contact_type (
  contact_type_id SERIAL      NOT NULL  PRIMARY KEY,
  contact_type    VARCHAR(50) NOT NULL,
  active          BOOLEAN     NULL     DEFAULT '1',
  created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by      INT         NOT NULL,
  modified_by     INT         NOT NULL
);

-- ------------------------------------------ ADDRESS ---------------------------------------------
CREATE TABLE IF NOT EXISTS txn_address (
  address_id      SERIAL       NOT NULL  PRIMARY KEY,
  table_id        INT          NULL,
  pk_of_table     INT          NULL,
  address_type_id INT          NOT NULL         DEFAULT '1',
  address         VARCHAR(100) NOT NULL,
  pin_code        INT          NULL,
  latitude        VARCHAR(255) NULL,
  longitude       VARCHAR(255) NULL,
  country_id       INT NOT NULL,
  state_id       INT NOT NULL,
  district_id       INT NOT NULL,
  city_village_id       INT NOT NULL,
  active          BOOLEAN      NOT NULL         DEFAULT '1',
  created_ip      VARCHAR(20)  NOT NULL,
  modified_ip     VARCHAR(20)  NOT NULL,
  created_at      TIMESTAMP    NOT NULL         DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL         DEFAULT CURRENT_TIMESTAMP,
  created_by      INT          NOT NULL,
  modified_by     INT          NOT NULL,
  CONSTRAINT tf_address_type_id_fk FOREIGN KEY (address_type_id) REFERENCES mst_address_type (address_type_id)
);

-- ------------------------------------------ Configration ---------------------------------------------

CREATE TABLE IF NOT EXISTS mst_config_params (
  config_params_id   SERIAL       NOT NULL  PRIMARY KEY,
  config_param       VARCHAR(50)  NOT NULL,
  config_param_value VARCHAR(100) NOT NULL,
  active             BOOLEAN      NULL     DEFAULT '1',
  created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by         INT          NOT NULL,
  modified_by        INT          NOT NULL
);

-- ------------------------------------------ Notification ---------------------------------------------
CREATE TABLE IF NOT EXISTS mst_notification (
  notification_id SERIAL       NOT NULL  PRIMARY KEY,
  title           VARCHAR(100) NOT NULL,
  message         VARCHAR(250) NOT NULL,
  image_path      VARCHAR(250) NULL,
  active          BOOLEAN      NOT NULL DEFAULT '1',
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by      INT          NOT NULL,
  modified_by     INT          NOT NULL
);

-- ------------------------------------------ Legal ---------------------------------------------

CREATE TABLE IF NOT EXISTS mst_legal_pages (
  id           SERIAL       NOT NULL      PRIMARY KEY,
  page_title   VARCHAR(250) NOT NULL,
  page_details TEXT         NOT NULL,
  active       BOOLEAN      NOT NULL     DEFAULT '1',
  created_by   INT          NOT NULL,
  modified_by  INT          NOT NULL,
  created_at   TIMESTAMP    NOT NULL     DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL     DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------ FAQs ---------------------------------------------
CREATE TABLE mst_faq_category (
  id          SERIAL       NOT NULL  PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  active      BOOLEAN      NOT NULL DEFAULT '1',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT          NOT NULL,
  modified_by INT          NOT NULL
);


CREATE TABLE txn_faq (
  id          SERIAL    NOT NULL   PRIMARY KEY,
  category_id INT       NOT NULL,
  question    TEXT      NOT NULL,
  answer      TEXT      NOT NULL,
  active      BOOLEAN   NOT NULL  DEFAULT '1',
  created_at  TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  created_by  INT       NULL,
  modified_by INT       NULL,
  CONSTRAINT txn_faq_mst_faq_category_id_fk FOREIGN KEY (category_id) REFERENCES mst_faq_category (id)
);

CREATE INDEX txn_faq_mst_faq_category_id_fk
  ON mst_faq (category_id);

-- ------------------------------------------ Email Template ---------------------------------------------
CREATE TABLE IF NOT EXISTS mst_email_template (
  email_template_id    SERIAL        NOT NULL  PRIMARY KEY,
  email_template_title VARCHAR(250)  NOT NULL,
  email_from           TEXT          NULL,
  subject              VARCHAR(1000) NOT NULL,
  file_path            VARCHAR(500)  NOT NULL,
  active               BOOLEAN       NULL     DEFAULT '1',
  created_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by           INT           NOT NULL,
  modified_by          INT           NOT NULL
);

-- ------------------------------------------ Matrimonial ---------------------------------------------
CREATE TABLE IF NOT EXISTS mst_education_degree (
  education_degree_id SERIAL      NOT NULL  PRIMARY KEY,
  degree              VARCHAR(50) NOT NULL,
  active              BOOLEAN     NULL     DEFAULT '1',
  created_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by          INT         NOT NULL,
  modified_by         INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_matrimonial_requested_status (
  requested_status_id SERIAL      NOT NULL  PRIMARY KEY,
  status              VARCHAR(50) NOT NULL,
  active              BOOLEAN     NULL     DEFAULT '1',
  created_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by          INT         NOT NULL,
  modified_by         INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_matrimonial_status (
  matrimonial_status_id SERIAL      NOT NULL  PRIMARY KEY,
  status                VARCHAR(50) NOT NULL,
  active                BOOLEAN     NULL     DEFAULT '1',
  created_at            TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by            INT         NOT NULL,
  modified_by           INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_raasi (
  raasi_id    SERIAL      NOT NULL  PRIMARY KEY,
  raasi       VARCHAR(50) NOT NULL,
  active      BOOLEAN     NULL     DEFAULT '1',
  created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT         NOT NULL,
  modified_by INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_caste (
  caste_id    SERIAL      NOT NULL  PRIMARY KEY,
  caste       VARCHAR(50) NOT NULL,
  active      BOOLEAN     NULL     DEFAULT '1',
  created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT         NOT NULL,
  modified_by INT         NOT NULL
);

-- ------------------------------------------ Job ---------------------------------------------
CREATE TABLE IF NOT EXISTS mst_job_status (
  job_status_id SERIAL       NOT NULL  PRIMARY KEY,
  job_status    VARCHAR(100) NOT NULL,
  active        BOOLEAN      NULL     DEFAULT '1',
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by    INT          NOT NULL,
  modified_by   INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_job_type (
  job_type_id SERIAL       NOT NULL  PRIMARY KEY,
  job_type    VARCHAR(100) NOT NULL,
  active      BOOLEAN      NULL     DEFAULT '1',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT          NOT NULL,
  modified_by INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_job_category (
  job_category_id SERIAL       NOT NULL  PRIMARY KEY,
  job_category    VARCHAR(100) NOT NULL,
  active          BOOLEAN      NULL     DEFAULT '1',
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by      INT          NOT NULL,
  modified_by     INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_job_sub_category (
  job_sub_category_id SERIAL       NOT NULL  PRIMARY KEY,
  job_sub_category    VARCHAR(100) NOT NULL,
  job_category_id     INT          NOT NULL,
  active              BOOLEAN      NULL     DEFAULT '1',
  created_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by          INT          NOT NULL,
  modified_by         INT          NOT NULL,
  CONSTRAINT mst_job_category_id_fk FOREIGN KEY (job_category_id) REFERENCES mst_job_category (job_category_id)
);

CREATE INDEX ix_job_sub_category_category
  ON mst_job_sub_category (job_category_id);

-- ------------------------------------------ Media ---------------------------------------------

CREATE TABLE IF NOT EXISTS txn_media (
  media_id    SERIAL    NOT NULL  PRIMARY KEY,
  table_id    INT       NOT NULL,
  pk_of_table INT       NOT NULL,
  media_path  VARCHAR(255)       DEFAULT NULL,
  media_type  VARCHAR(255)       DEFAULT NULL,
  active      BOOLEAN   NOT NULL DEFAULT '1',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT       NOT NULL,
  modified_by INT       NOT NULL,
  CONSTRAINT tm_table_id_fk FOREIGN KEY (table_id) REFERENCES mst_table (table_id)
);

CREATE INDEX ix_media_table_id
  ON txn_media (table_id);


-- ------------------------------------------ Temple ---------------------------------------------
DROP TABLE IF EXISTS mst_temple;

CREATE TABLE IF NOT EXISTS mst_temple (
  temple_id   SERIAL       NOT NULL  PRIMARY KEY,
  address_id  INT          NULL,
  temple_name VARCHAR(75)  NOT NULL,
  image_path  jsonb NULL,
  active      BOOLEAN      NOT NULL DEFAULT '1',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT          NOT NULL,
  modified_by INT          NOT NULL,
  CONSTRAINT tt_address_id_fk FOREIGN KEY (address_id) REFERENCES txn_address (address_id)
);
