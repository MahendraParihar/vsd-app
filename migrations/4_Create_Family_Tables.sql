DROP TABLE IF EXISTS txn_family_education_mapping;
DROP TABLE IF EXISTS txn_trustee;
DROP TABLE IF EXISTS txn_member_post;
DROP TABLE IF EXISTS txn_family_service_mapping;
DROP TABLE IF EXISTS txn_family_business_mapping;
DROP TABLE IF EXISTS txn_family_contact_number;
DROP TABLE IF EXISTS txn_family_city_village_mapping;
DROP TABLE IF EXISTS txn_family;

-- ------------------------------------------ FAMILY ---------------------------------------------
CREATE TABLE IF NOT EXISTS txn_family
(
    family_id     SERIAL       NOT NULL PRIMARY KEY,
    app_user_id   INT          NULL     DEFAULT NULL,
    first_name    VARCHAR(50)  NOT NULL,
    middle_name   VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    email_id      VARCHAR(100) NOT NULL,
    image_path    VARCHAR(250) NULL,
    visited_count INT          NOT NULL DEFAULT 0,
    active        BOOLEAN      NOT NULL DEFAULT '1',
    created_ip    VARCHAR(20)  NOT NULL,
    modified_ip   VARCHAR(20)  NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by    INT          NOT NULL,
    modified_by   INT          NOT NULL,
    CONSTRAINT tf_mst_app_user_id_fk FOREIGN KEY (app_user_id) REFERENCES txn_app_user (app_user_id)
);

CREATE TABLE IF NOT EXISTS txn_family_profile
(
    family_profile_id SERIAL       NOT NULL PRIMARY KEY,
    family_id         INT          NOT NULL,
    gender_id         INT          NULL,
    marital_status_id INT          NULL,
    date_of_birth     DATE         NULL,
    height            FLOAT        NULL,
    religion_id       INT          NOT NULL,
    caste_id          INT          NULL,
    gotra_id          INT          NOT NULL,
    raasi_id          INT          NULL,
    is_maglik         BOOLEAN      NOT NULL DEFAULT FALSE,
    description       VARCHAR(500) NULL,
    hobbies           VARCHAR(500) NULL,
    monthly_income    INT          NULL,
    CONSTRAINT tm_religion_id_fk FOREIGN KEY (religion_id) REFERENCES mst_religion (religion_id),
    CONSTRAINT tm_gotra_id_fk FOREIGN KEY (gotra_id) REFERENCES mst_gotra (gotra_id),
    CONSTRAINT tm_raasi_id_fk FOREIGN KEY (raasi_id) REFERENCES mst_raasi (raasi_id),
    CONSTRAINT tm_caste_id_fk FOREIGN KEY (caste_id) REFERENCES mst_caste (caste_id),
    CONSTRAINT tf_txn_family_family_id_fk FOREIGN KEY (gender_id) REFERENCES txn_family (family_id),
    CONSTRAINT tf_mst_gender_id_fk FOREIGN KEY (gender_id) REFERENCES mst_gender (gender_id),
    CONSTRAINT tf_mst_marital_status_id_fk FOREIGN KEY (marital_status_id) REFERENCES mst_marital_status (marital_status_id)
);

CREATE TABLE IF NOT EXISTS txn_family_relationship_mapping
(
    family_relationship_mapping_id SERIAL      NOT NULL PRIMARY KEY,
    parent_id                      INT         NOT NULL,
    child_id                       INT         NOT NULL,
    relationship_id                INT         NOT NULL,
    active                         BOOLEAN     NOT NULL DEFAULT '1',
    created_ip                     VARCHAR(20) NOT NULL,
    modified_ip                    VARCHAR(20) NOT NULL,
    created_at                     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by                     INT         NOT NULL,
    modified_by                    INT         NOT NULL,
    CONSTRAINT tfcvm_family_id_fk FOREIGN KEY (relationship_id) REFERENCES mst_relationship (relationship_id),
    CONSTRAINT tfrm_parent_id_fk FOREIGN KEY (parent_id) REFERENCES txn_family (family_id),
    CONSTRAINT tfrm_child_id_fk FOREIGN KEY (child_id) REFERENCES txn_family (family_id)
);

CREATE INDEX ix_family_relationship_parent_id
    ON txn_family_relationship_mapping (parent_id);

CREATE TABLE IF NOT EXISTS txn_family_contact_number
(
    family_contact_number_id SERIAL      NOT NULL PRIMARY KEY,
    family_id                INT                  DEFAULT NULL,
    contact_type_id          INT                  DEFAULT '1',
    contact_number           VARCHAR(16)          DEFAULT NULL,
    active                   BOOLEAN     NOT NULL DEFAULT '1',
    created_ip               VARCHAR(20) NOT NULL,
    modified_ip              VARCHAR(20) NOT NULL,
    created_at               TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at               TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by               INT         NOT NULL,
    modified_by              INT         NOT NULL,
    CONSTRAINT tfcn_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
    CONSTRAINT tfcn_contact_type_id_fk FOREIGN KEY (contact_type_id) REFERENCES mst_contact_type (contact_type_id)
);
CREATE INDEX ix_family_contact_family_id
    ON txn_family_contact_number (family_id);

CREATE TABLE IF NOT EXISTS txn_family_business
(
    family_business_id SERIAL       NOT NULL PRIMARY KEY,
    business_id        INT          NOT NULL,
    address_id         INT          NULL,
    website_link       VARCHAR(255) NULL,
    contact_number     VARCHAR(50)  NULL,
    email_id           VARCHAR(255) NULL,
    banner_path        VARCHAR(500) NULL,
    active             BOOLEAN      NOT NULL DEFAULT '1',
    created_ip         VARCHAR(20)  NOT NULL,
    modified_ip        VARCHAR(20)  NOT NULL,
    created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by         INT          NOT NULL,
    modified_by        INT          NOT NULL,
    CONSTRAINT tfbm_business_id_fk FOREIGN KEY (business_id) REFERENCES mst_business (business_id),
    CONSTRAINT tfbm_address_id_fk FOREIGN KEY (address_id) REFERENCES txn_address (address_id)
);


DROP INDEX if exists ix_family_business_id;;
CREATE INDEX ix_family_business_id
    ON txn_family_business (business_id);

CREATE TABLE IF NOT EXISTS txn_family_business_mapping
(
    family_business_mapping_id SERIAL      NOT NULL PRIMARY KEY,
    family_business_id         INT         NOT NULL,
    family_id                  INT         NULL,
    active                     BOOLEAN     NOT NULL DEFAULT '1',
    created_ip                 VARCHAR(20) NOT NULL,
    modified_ip                VARCHAR(20) NOT NULL,
    created_at                 TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                 TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by                 INT         NOT NULL,
    modified_by                INT         NOT NULL,
    CONSTRAINT tfbm_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
    CONSTRAINT tfbm_family_business_id_fk FOREIGN KEY (family_business_id) REFERENCES txn_family_business (family_business_id)
);
DROP INDEX if exists ix_family_business_mapping_buz_id;
CREATE INDEX ix_family_business_mapping_buz_id
    ON txn_family_business_mapping (family_business_id);
DROP INDEX if exists ix_family_business_mapping_family_id;
CREATE INDEX ix_family_business_mapping_family_id
    ON txn_family_business_mapping (family_id);

CREATE TABLE IF NOT EXISTS txn_family_service_mapping
(
    family_service_mapping_id SERIAL       NOT NULL PRIMARY KEY,
    family_id                 INT          NOT NULL,
    service_id                INT          NOT NULL,
    job_profile               VARCHAR(500) NULL,
    job_description           TEXT         NULL,
    company_name              VARCHAR(200) NULL,
    active                    BOOLEAN      NOT NULL DEFAULT '1',
    created_ip                VARCHAR(20)  NOT NULL,
    modified_ip               VARCHAR(20)  NOT NULL,
    created_at                TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by                INT          NOT NULL,
    modified_by               INT          NOT NULL,
    CONSTRAINT tfsm_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
    CONSTRAINT tfsm_service_id_fk FOREIGN KEY (service_id) REFERENCES mst_service (service_id)
);

drop index if exists ix_family_service_mapping_service_id;
CREATE INDEX ix_family_service_mapping_service_id
    ON txn_family_service_mapping (service_id);
drop index if exists ix_family_service_mapping_family_id;
CREATE INDEX ix_family_service_mapping_family_id
    ON txn_family_service_mapping (family_id);

CREATE TABLE IF NOT EXISTS txn_family_education
(
    education_mapping_id SERIAL      NOT NULL PRIMARY KEY,
    family_id            INT         NOT NULL,
    education_degree_id  INT         NOT NULL,
    scored_marks         FLOAT       NOT NULL,
    active               BOOLEAN     NOT NULL DEFAULT '1',
    created_ip           VARCHAR(50) NOT NULL,
    modified_ip          VARCHAR(50) NOT NULL,
    created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by           INT         NOT NULL DEFAULT 0,
    modified_by          INT         NOT NULL DEFAULT 0,
    CONSTRAINT tmps_matrimonial_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
    CONSTRAINT tmps_edu_degree_id_fk FOREIGN KEY (education_degree_id) REFERENCES mst_education_degree (education_degree_id)
);

drop index if exists ix_matrimonial_eduction_m_id;
CREATE INDEX ix_matrimonial_eduction_m_id
    ON txn_family_education (family_id);

CREATE TABLE IF NOT EXISTS txn_family_addiction_mapping
(
    addiction_mapping_id SERIAL      NOT NULL PRIMARY KEY,
    family_id            INT         NOT NULL,
    addiction_id         INT         NOT NULL,
    active               BOOLEAN     NOT NULL DEFAULT '1',
    created_ip           VARCHAR(50) NOT NULL,
    modified_ip          VARCHAR(50) NOT NULL,
    created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by           INT         NOT NULL DEFAULT 0,
    modified_by          INT         NOT NULL DEFAULT 0,
    CONSTRAINT tmam_matrimonial_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
    CONSTRAINT tmam_addiction_id_fk FOREIGN KEY (addiction_id) REFERENCES mst_addiction (addiction_id)
);

CREATE INDEX ix_family_addiction_m_id
    ON txn_family_addiction_mapping (family_id);

-- ------------------------------------------ POST N TRUSTEE ---------------------------------------------

CREATE TABLE IF NOT EXISTS txn_mandal_member
(
    member_post_id SERIAL      NOT NULL PRIMARY KEY,
    family_id      INT         NOT NULL,
    post_id        INT         NOT NULL,
    mandal_id      INT         NULL     DEFAULT NULL,
    from_year      INT         NOT NULL,
    to_year        INT                  DEFAULT NULL,
    created_ip     VARCHAR(20) NOT NULL,
    modified_ip    VARCHAR(20) NOT NULL,
    active         BOOLEAN     NOT NULL DEFAULT '1',
    created_at     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by     INT         NOT NULL,
    modified_by    INT         NOT NULL,
    CONSTRAINT tmp_txn_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id),
    CONSTRAINT tmp_mst_post_id_fk FOREIGN KEY (post_id) REFERENCES mst_post (post_id),
    CONSTRAINT tmp_mst_mandal_id_fk FOREIGN KEY (mandal_id) REFERENCES mst_mandal (mandal_id)
);

CREATE TABLE IF NOT EXISTS txn_trustee
(
    trustee_id  SERIAL      NOT NULL PRIMARY KEY,
    family_id   INT         NOT NULL,
    from_year   INT         NOT NULL,
    to_year     INT                  DEFAULT NULL,
    active      BOOLEAN     NOT NULL DEFAULT '1',
    created_ip  VARCHAR(20) NOT NULL,
    modified_ip VARCHAR(20) NOT NULL,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    modified_by INT         NOT NULL,
    CONSTRAINT txn_trustee_txn_family_id_fk FOREIGN KEY (family_id) REFERENCES txn_family (family_id)
);
