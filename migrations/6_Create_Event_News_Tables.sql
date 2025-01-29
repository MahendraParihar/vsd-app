DROP TABLE IF EXISTS txn_event_interested;
DROP TABLE IF EXISTS txn_event_contact_person_number;
DROP TABLE IF EXISTS txn_event;

DROP TABLE IF EXISTS txn_inquiries;

-- ------------------------------------------ NEWS ---------------------------------------------
DROP TABLE IF EXISTS txn_current_affair;

CREATE TABLE IF NOT EXISTS txn_current_affair (
                                                current_affair_id  SERIAL      NOT NULL  PRIMARY KEY,
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
                                                updated_by        INT         NOT NULL
);

-- ------------------------------------------ EVENT ---------------------------------------------
CREATE TABLE IF NOT EXISTS txn_event (
                                       event_id      SERIAL      NOT NULL  PRIMARY KEY,
                                       title         VARCHAR(100)         DEFAULT NULL,
                                       description   TEXT                 DEFAULT NULL,
                                       date          DATE                 DEFAULT NULL,
                                       time          TIME                 DEFAULT NULL,
                                       address_id    INT         NULL,
                                       event_days    INT                  DEFAULT '1',
                                       image_path    jsonb         DEFAULT NULL,
                                       download_path VARCHAR(255)         DEFAULT NULL,
                                       agenda        JSON        NULL,
                                       visited_count INT                  DEFAULT 0,
                                       active        BOOLEAN     NOT NULL DEFAULT '1',
                                       created_ip    VARCHAR(20) NOT NULL,
                                       modified_ip   VARCHAR(20) NOT NULL,
                                       created_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                       updated_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                       created_by    INT         NOT NULL,
                                       updated_by   INT         NOT NULL,
                                       CONSTRAINT te_address_id_fk FOREIGN KEY (address_id) REFERENCES txn_address (address_id)
);
CREATE INDEX ix_event_address_id
  ON txn_event (address_id);

CREATE TABLE IF NOT EXISTS txn_event_coordinator (
                                                   event_contact_person_number_id SERIAL       NOT NULL  PRIMARY KEY,
                                                   event_id                       INT          NOT NULL,
                                                   family_id                      INT          NOT NULL,
                                                   post                           VARCHAR(100) NULL,
                                                   active                         BOOLEAN      NOT NULL DEFAULT '1',
                                                   created_ip                     VARCHAR(20)  NOT NULL,
                                                   modified_ip                    VARCHAR(20)  NOT NULL,
                                                   created_at                     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                   updated_at                     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                   created_by                     INT          NOT NULL,
                                                   updated_by                    INT          NOT NULL,
                                                   CONSTRAINT tecn_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
                                                   CONSTRAINT tecn_event_id_fk FOREIGN KEY (event_id) REFERENCES txn_event (event_id)
);
CREATE INDEX ix_contact_number_event_id
  ON txn_event_coordinator (event_id);
CREATE INDEX ix_contact_number_family_id
  ON txn_event_coordinator (family_id);

CREATE TABLE IF NOT EXISTS txn_event_interested_member (
                                                         id          SERIAL      NOT NULL  PRIMARY KEY,
                                                         event_id    INT         NOT NULL,
                                                         app_user_id INT         NOT NULL,
                                                         interested  BOOLEAN     NOT NULL DEFAULT '1',
                                                         active      BOOLEAN     NOT NULL DEFAULT '1',
                                                         created_ip  VARCHAR(20) NOT NULL,
                                                         modified_ip VARCHAR(20) NOT NULL,
                                                         created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                         updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                         CONSTRAINT tei_app_user_id_fk FOREIGN KEY (app_user_id) REFERENCES txn_app_user (app_user_id),
                                                         CONSTRAINT tei_event_id_fk FOREIGN KEY (event_id) REFERENCES txn_event (event_id)
);
CREATE INDEX ix_event_interest_event_id
  ON txn_event_interested_member (event_id);
CREATE INDEX ix_event_interest_app_user_id
  ON txn_event_interested_member (app_user_id);

-- ------------------------------------------ OTHERS ---------------------------------------------
CREATE TABLE IF NOT EXISTS txn_banner (
                                        banner_id   SERIAL       NOT NULL  PRIMARY KEY,
                                        title       VARCHAR(75)  NOT NULL,
                                        image_path  VARCHAR(75)  NOT NULL,
                                        from_date   VARCHAR(250) NULL,
                                        to_date     VARCHAR(10)           DEFAULT NULL,
                                        active      BOOLEAN      NOT NULL DEFAULT '1',
                                        created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                        updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                        created_by  INT          NOT NULL,
                                        updated_by INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS txn_email_status (
                                              email_status_id   SERIAL        NOT NULL  PRIMARY KEY,
                                              email_template_id INT           NOT NULL,
                                              app_user_id       INT           NOT NULL,
                                              subject           VARCHAR(1000) NOT NULL,
                                              body              TEXT          NOT NULL,
                                              status            BOOLEAN       NOT NULL DEFAULT '1',
                                              failure_reason    TEXT,
                                              created_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                              updated_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                              created_by        INT           NOT NULL,
                                              updated_by       INT           NOT NULL,
                                              CONSTRAINT tes_mst_email_template_id_fk FOREIGN KEY (email_template_id) REFERENCES mst_email_template (email_template_id),
                                              CONSTRAINT tes_mst_app_user_id_fk FOREIGN KEY (app_user_id) REFERENCES txn_app_user (app_user_id)
);
CREATE INDEX ix_email_status_mail_template_id
  ON txn_email_status (app_user_id);

-- ------------------------------------------ Inquiries ---------------------------------------------

CREATE TABLE IF NOT EXISTS txn_inquiry
(
  inquiries_id SERIAL      NOT NULL  PRIMARY KEY,
  app_user_id  INT         NULL,
  message      TEXT        NOT NULL,
  is_responded BOOLEAN     NOT NULL DEFAULT '0',
  active       BOOLEAN     NULL     DEFAULT '1',
  created_ip   VARCHAR(20) NOT NULL,
  modified_ip  VARCHAR(20) NOT NULL,
  created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by   INT         NOT NULL,
  updated_by  INT         NOT NULL,
  CONSTRAINT ti_mst_app_user_id_fk FOREIGN KEY (app_user_id) REFERENCES txn_app_user (app_user_id)
);

CREATE INDEX ix_inquiries_app_user_id
  ON txn_inquiry (app_user_id);

-- ------------------------------------------ FACILITY ---------------------------------------------
DROP TABLE IF EXISTS txn_facility;

CREATE TABLE IF NOT EXISTS txn_facility
(
    facility_id      SERIAL      NOT NULL PRIMARY KEY,
    address_id       INTEGER     NOT NULL,
    title            VARCHAR(100)         DEFAULT NULL,
    description      TEXT                 DEFAULT NULL,
    image_path       jsonb                DEFAULT NULL,
    tags             varchar[]            default null,
    url              text,
    meta_title       varchar(60),
    meta_description varchar(160),
    visited_count    INT                  DEFAULT 0,
    active           BOOLEAN     NOT NULL DEFAULT '1',
    created_ip       VARCHAR(20) NOT NULL,
    modified_ip      VARCHAR(20) NOT NULL,
    created_at       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by       INTEGER     NOT NULL,
    updated_by       INTEGER     NOT NULL,
    CONSTRAINT tf_address_id_fk FOREIGN KEY (address_id) REFERENCES txn_address (address_id)
);

CREATE INDEX ix_facility_address_id
    ON txn_facility (address_id);

CREATE TABLE IF NOT EXISTS txn_facility_member
(
    event_contact_person_number_id SERIAL      NOT NULL PRIMARY KEY,
    facility_id                    INT         NOT NULL,
    family_id                      INT         NOT NULL,
    post_id                        INTEGER     NOT NULL,
    active                         BOOLEAN     NOT NULL DEFAULT '1',
    created_ip                     VARCHAR(20) NOT NULL,
    modified_ip                    VARCHAR(20) NOT NULL,
    created_at                     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by                     INTEGER     NOT NULL,
    updated_by                     INTEGER     NOT NULL,
    CONSTRAINT tf_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
    CONSTRAINT tf_facility_id_fk FOREIGN KEY (facility_id) REFERENCES txn_facility (facility_id),
    CONSTRAINT tf_post_id_fk FOREIGN KEY (post_id) REFERENCES mst_post (post_id)
);
CREATE INDEX ix_facility_member_facility_id
    ON txn_facility_member (facility_id);
