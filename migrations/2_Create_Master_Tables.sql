DROP TABLE IF EXISTS mst_address_type;
CREATE TABLE IF NOT EXISTS mst_address_type
(
    address_type_id SERIAL      NOT NULL PRIMARY KEY,
    address_type    VARCHAR(50) NOT NULL,
    active          BOOLEAN     NULL     DEFAULT '1',
    created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT         NOT NULL,
    updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by     INT         NOT NULL,
    CONSTRAINT fk_mst_address_type_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_address_type_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_payment_mode;
CREATE TABLE IF NOT EXISTS mst_payment_mode
(
    payment_mode_id SERIAL       NOT NULL PRIMARY KEY,
    payment_mode    VARCHAR(100) NOT NULL,
    active          BOOLEAN      NULL     DEFAULT '1',
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT          NOT NULL,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by     INT          NOT NULL,
    CONSTRAINT fk_mst_payment_mode_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_payment_mode_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_health_parameter_unit;
CREATE TABLE IF NOT EXISTS mst_health_parameter_unit
(
    health_parameter_unit_id SERIAL      NOT NULL PRIMARY KEY,
    health_parameter_unit    VARCHAR(50) NOT NULL,
    active                   BOOLEAN     NULL     DEFAULT '1',
    created_at               TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by               INT         NOT NULL,
    updated_at               TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by              INT         NOT NULL,
    created_ip               VARCHAR(50) NOT NULL,
    modified_ip              VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_health_parameters_unit_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_health_parameters_unit_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_media_src;
CREATE TABLE IF NOT EXISTS mst_media_src
(
    media_src_id SERIAL      NOT NULL PRIMARY KEY,
    media_src    VARCHAR(50) NOT NULL,
    active       BOOLEAN     NULL     DEFAULT '1',
    created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by   INT         NOT NULL,
    updated_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by  INT         NOT NULL,
    CONSTRAINT fk_mst_media_src_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_media_src_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_table;
CREATE TABLE IF NOT EXISTS mst_table
(
    table_id    SERIAL       NOT NULL PRIMARY KEY,
    table_name  VARCHAR(100) NOT NULL,
    active      BOOLEAN      NULL     DEFAULT '1',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT          NOT NULL,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT          NOT NULL,
    CONSTRAINT fk_mst_table_src_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_table_src_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_media_type;
CREATE TABLE IF NOT EXISTS mst_media_type
(
    media_type_id SERIAL      NOT NULL PRIMARY KEY,
    media_type    VARCHAR(50) NOT NULL,
    active        BOOLEAN     NULL     DEFAULT '1',
    created_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by    INT         NOT NULL,
    updated_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by   INT         NOT NULL,
    CONSTRAINT fk_mst_media_type_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_media_type_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_legal_page;
CREATE TABLE IF NOT EXISTS mst_legal_page
(
    legal_pages_id SERIAL      NOT NULL PRIMARY KEY,
    title          varchar(50) NOT NULL,
    details        TEXT        NOT NULL,
    active         BOOLEAN     NULL     DEFAULT true,
    created_at     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by     INT         NOT NULL,
    updated_at     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by    INT         NOT NULL,
    created_ip     VARCHAR(50) NOT NULL,
    modified_ip    VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_legal_page_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_legal_page_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_gender;
CREATE TABLE IF NOT EXISTS mst_gender
(
    gender_id   SERIAL      NOT NULL PRIMARY KEY,
    gender      VARCHAR(50) NOT NULL,
    active      BOOLEAN     NULL     DEFAULT true,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT         NOT NULL,
    created_ip  VARCHAR(50) NOT NULL,
    modified_ip VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_gender_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_gender_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);
-- ------------------------------------------ DIRECTORY ---------------------------------------------

DROP TABLE IF EXISTS mst_business;
CREATE TABLE IF NOT EXISTS mst_business
(
    business_id SERIAL       NOT NULL PRIMARY KEY,
    business    VARCHAR(50)  NOT NULL,
    image_path  VARCHAR(100) NULL,
    active      BOOLEAN      NULL     DEFAULT '1',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT          NOT NULL,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT          NOT NULL,
    CONSTRAINT fk_mst_business_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_business_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_service;
CREATE TABLE IF NOT EXISTS mst_service
(
    service_id  SERIAL       NOT NULL PRIMARY KEY,
    service     VARCHAR(50)  NOT NULL,
    image_path  VARCHAR(100) NULL,
    active      BOOLEAN      NULL     DEFAULT '1',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT          NOT NULL,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT          NOT NULL,
    CONSTRAINT fk_mst_service_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_service_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_marital_status;
CREATE TABLE IF NOT EXISTS mst_marital_status
(
    marital_status_id SERIAL      NOT NULL PRIMARY KEY,
    marital_status    VARCHAR(50) NOT NULL,
    active            BOOLEAN     NULL     DEFAULT '1',
    created_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by        INT         NOT NULL,
    updated_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by       INT         NOT NULL,
    CONSTRAINT fk_mst_marital_status_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_marital_status_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_relationship;
CREATE TABLE IF NOT EXISTS mst_relationship
(
    relationship_id SERIAL      NOT NULL PRIMARY KEY,
    relationship    VARCHAR(50) NOT NULL,
    active          BOOLEAN     NULL     DEFAULT '1',
    created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT         NOT NULL,
    updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by     INT         NOT NULL,
    CONSTRAINT fk_mst_relationship_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_relationship_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_religion;
CREATE TABLE IF NOT EXISTS mst_religion
(
    religion_id SERIAL      NOT NULL PRIMARY KEY,
    religion    VARCHAR(50) NOT NULL,
    active      BOOLEAN     NULL     DEFAULT '1',
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT         NOT NULL,
    CONSTRAINT fk_mst_religion_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_religion_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_gotra;
CREATE TABLE IF NOT EXISTS mst_gotra
(
    gotra_id    SERIAL      NOT NULL PRIMARY KEY,
    gotra       VARCHAR(50) NOT NULL,
    active      BOOLEAN     NULL     DEFAULT '1',
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT         NOT NULL,
    CONSTRAINT fk_mst_gotra_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_gotra_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_addiction;
CREATE TABLE IF NOT EXISTS mst_addiction
(
    addiction_id SERIAL      NOT NULL PRIMARY KEY,
    addiction    VARCHAR(50) NOT NULL,
    active       BOOLEAN     NULL     DEFAULT '1',
    created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by   INT         NOT NULL,
    updated_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by  INT         NOT NULL,
    CONSTRAINT fk_mst_addiction_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_addiction_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_country;
CREATE TABLE IF NOT EXISTS mst_country
(
    country_id        SERIAL       NOT NULL PRIMARY KEY,
    country           VARCHAR(100) NOT NULL,
    country_code      VARCHAR(5)   NULL,
    phone_number_code VARCHAR(5)   NULL     DEFAULT NULL,
    active            BOOLEAN      NULL     DEFAULT true,
    created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by        INT          NOT NULL,
    updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by       INT          NOT NULL,
    created_ip        VARCHAR(50)  NOT NULL,
    modified_ip       VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_mst_country_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_country_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_state;
CREATE TABLE IF NOT EXISTS mst_state
(
    state_id    SERIAL       NOT NULL PRIMARY KEY,
    state       VARCHAR(100) NOT NULL,
    code        VARCHAR(10)  NOT NULL,
    country_id  INT          NOT NULL,
    active      BOOLEAN      NULL     DEFAULT true,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT          NOT NULL,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT          NOT NULL,
    created_ip  VARCHAR(50)  NOT NULL,
    modified_ip VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_mst_state_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_state_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_state_mst_countries_country_id FOREIGN KEY (country_id) REFERENCES mst_country (country_id)
);

DROP TABLE IF EXISTS mst_district;
CREATE TABLE mst_district
(
    district_id SERIAL PRIMARY KEY,
    state_id    INT          NOT NULL,
    district    VARCHAR(100) NOT NULL,
    active      BOOLEAN               DEFAULT '1' NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT          NULL,
    updated_by INT          NULL,
    created_ip  VARCHAR(50)  NOT NULL,
    modified_ip VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_mst_district_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_district_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT md_mst_state_id_fk FOREIGN KEY (state_id) REFERENCES mst_state (state_id)
        ON DELETE CASCADE
);

DROP INDEX if exists ix_district_state_id;;

CREATE INDEX ix_district_state_id
    ON mst_district (state_id);

DROP TABLE IF EXISTS mst_city_village;
CREATE TABLE IF NOT EXISTS mst_city_village
(
    city_village_id SERIAL      NOT NULL PRIMARY KEY,
    type_id         INT         NOT NULL,
    district_id     INT         NOT NULL,
    city_vilage     VARCHAR(75) NOT NULL,
    pin_code        VARCHAR(10)          DEFAULT NULL,
    std_code        VARCHAR(10)          DEFAULT NULL,
    active          BOOLEAN     NULL     DEFAULT '1',
    created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT         NOT NULL,
    updated_by     INT         NOT NULL,
    created_ip      VARCHAR(50) NOT NULL,
    modified_ip     VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_city_villages_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_city_villages_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT mcv_district_id_fk FOREIGN KEY (district_id) REFERENCES mst_district (district_id)
        ON DELETE CASCADE
);


DROP INDEX if exists ix_city_village_district_id;

CREATE INDEX ix_city_village_district_id
    ON mst_city_village (district_id);

DROP TABLE IF EXISTS mst_post;
CREATE TABLE IF NOT EXISTS mst_post
(
    post_id     SERIAL      NOT NULL PRIMARY KEY,
    post_name   VARCHAR(50) NOT NULL,
    active      BOOLEAN     NOT NULL DEFAULT '1',
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    updated_by INT         NOT NULL,
    created_ip  VARCHAR(50) NOT NULL,
    modified_ip VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_post_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_post_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

-- ------------------------------------------ MANDAL ---------------------------------------------

DROP TABLE IF EXISTS mst_mandal;
CREATE TABLE IF NOT EXISTS mst_mandal
(
    mandal_id   SERIAL       NOT NULL PRIMARY KEY,
    mandal_name VARCHAR(150) NOT NULL,
    address_id  INT          NOT NULL,
    active      BOOLEAN      NOT NULL DEFAULT '1',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT          NOT NULL,
    updated_by INT          NOT NULL,
    created_ip  VARCHAR(50)  NOT NULL,
    modified_ip VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_mst_mandal_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_mandal_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

-- ------------------------------------------ Contact Type ---------------------------------------------

DROP TABLE IF EXISTS mst_contact_type;
CREATE TABLE IF NOT EXISTS mst_contact_type
(
    contact_type_id SERIAL      NOT NULL PRIMARY KEY,
    contact_type    VARCHAR(50) NOT NULL,
    active          BOOLEAN     NULL     DEFAULT '1',
    created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT         NOT NULL,
    updated_by     INT         NOT NULL,
    created_ip      VARCHAR(50) NOT NULL,
    modified_ip     VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_contact_type_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_contact_type_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

-- ------------------------------------------ ADDRESS ---------------------------------------------
DROP TABLE IF EXISTS txn_address;
CREATE TABLE IF NOT EXISTS txn_address
(
    address_id      SERIAL       NOT NULL PRIMARY KEY,
    table_id        INT          NULL,
    pk_of_table     INT          NULL,
    address_type_id INT          NOT NULL DEFAULT '1',
    address         VARCHAR(100) NOT NULL,
    pin_code        INT          NULL,
    latitude        VARCHAR(255) NULL,
    longitude       VARCHAR(255) NULL,
    country_id      INT          NOT NULL,
    state_id        INT          NOT NULL,
    district_id     INT          NOT NULL,
    city_village_id INT          NOT NULL,
    active          BOOLEAN      NOT NULL DEFAULT '1',
    created_ip      VARCHAR(20)  NOT NULL,
    modified_ip     VARCHAR(20)  NOT NULL,
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT          NOT NULL,
    updated_by     INT          NOT NULL,
    CONSTRAINT tf_address_type_id_fk FOREIGN KEY (address_type_id) REFERENCES mst_address_type (address_type_id)
);

-- ------------------------------------------ Notification ---------------------------------------------
DROP TABLE IF EXISTS mst_notification;
CREATE TABLE IF NOT EXISTS mst_notification
(
    notification_id SERIAL       NOT NULL PRIMARY KEY,
    title           VARCHAR(100) NOT NULL,
    message         VARCHAR(250) NOT NULL,
    image_path      VARCHAR(250) NULL,
    active          BOOLEAN      NOT NULL DEFAULT '1',
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT          NOT NULL,
    updated_by     INT          NOT NULL
);

DROP TABLE IF EXISTS mst_faq_category;
CREATE TABLE IF NOT EXISTS mst_faq_category
(
    faq_category_id SERIAL       NOT NULL PRIMARY KEY,
    faq_category    VARCHAR(100) NOT NULL,
    url             VARCHAR(250) NOT NULL,
    active          BOOLEAN      NULL     DEFAULT true,
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT          NOT NULL,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by     INT          NOT NULL,
    created_ip      VARCHAR(50)  NOT NULL,
    modified_ip     VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_mst_faq_category_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_faq_category_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS txn_faq;
CREATE TABLE IF NOT EXISTS txn_faq
(
    faq_id          SERIAL       NOT NULL PRIMARY KEY,
    faq_category_id INT          NOT NULL,
    faq             VARCHAR(500) NOT NULL,
    answer          text         NOT NULL,
    active          BOOLEAN      NULL     DEFAULT true,
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT          NOT NULL,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by     INT          NOT NULL,
    created_ip      VARCHAR(50)  NOT NULL,
    modified_ip     VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_txn_faq_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_txn_faq_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_txn_faq_mst_faq_category_faq_category_id FOREIGN KEY (faq_category_id) REFERENCES mst_faq_category (faq_category_id)
);


-- ------------------------------------------ Email Template ---------------------------------------------
DROP TABLE IF EXISTS mst_email_template;
CREATE TABLE IF NOT EXISTS mst_email_template
(
    email_template_id    SERIAL        NOT NULL PRIMARY KEY,
    email_template_title VARCHAR(250)  NOT NULL,
    email_from           TEXT          NULL,
    subject              VARCHAR(1000) NOT NULL,
    file_path            VARCHAR(500)  NOT NULL,
    active               BOOLEAN       NULL     DEFAULT '1',
    created_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by           INT           NOT NULL,
    updated_by          INT           NOT NULL,
    created_ip           VARCHAR(50)   NOT NULL,
    modified_ip          VARCHAR(50)   NOT NULL,
    CONSTRAINT fk_mst_email_template_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_email_template_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

-- ------------------------------------------ Matrimonial ---------------------------------------------
DROP TABLE IF EXISTS mst_education_degree;
CREATE TABLE IF NOT EXISTS mst_education_degree
(
    education_degree_id SERIAL      NOT NULL PRIMARY KEY,
    degree              VARCHAR(50) NOT NULL,
    active              BOOLEAN     NULL     DEFAULT '1',
    created_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by          INT         NOT NULL,
    updated_by         INT         NOT NULL,
    created_ip          VARCHAR(50) NOT NULL,
    modified_ip         VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_education_degree_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_education_degree_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_matrimonial_requested_status;
CREATE TABLE IF NOT EXISTS mst_matrimonial_requested_status
(
    requested_status_id SERIAL      NOT NULL PRIMARY KEY,
    status              VARCHAR(50) NOT NULL,
    active              BOOLEAN     NULL     DEFAULT '1',
    created_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by          INT         NOT NULL,
    updated_by         INT         NOT NULL,
    created_ip          VARCHAR(50) NOT NULL,
    modified_ip         VARCHAR(50) NOT NULL,
    CONSTRAINT fk_matrimonial_requested_statuses_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_matrimonial_requested_statuses_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_matrimonial_status;
CREATE TABLE IF NOT EXISTS mst_matrimonial_status
(
    matrimonial_status_id SERIAL      NOT NULL PRIMARY KEY,
    status                VARCHAR(50) NOT NULL,
    active                BOOLEAN     NULL     DEFAULT '1',
    created_at            TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by            INT         NOT NULL,
    updated_by           INT         NOT NULL,
    created_ip            VARCHAR(50) NOT NULL,
    modified_ip           VARCHAR(50) NOT NULL,
    CONSTRAINT fk_matrimonial_status_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_matrimonial_status_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_raasi;
CREATE TABLE IF NOT EXISTS mst_raasi
(
    raasi_id    SERIAL      NOT NULL PRIMARY KEY,
    raasi       VARCHAR(50) NOT NULL,
    active      BOOLEAN     NULL     DEFAULT '1',
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    updated_by INT         NOT NULL,
    created_ip  VARCHAR(50) NOT NULL,
    modified_ip VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_raasi_faqs_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_raasi_faqs_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_caste;
CREATE TABLE IF NOT EXISTS mst_caste
(
    caste_id    SERIAL      NOT NULL PRIMARY KEY,
    caste       VARCHAR(50) NOT NULL,
    active      BOOLEAN     NULL     DEFAULT '1',
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    updated_by INT         NOT NULL,
    created_ip  VARCHAR(50) NOT NULL,
    modified_ip VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_caste_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_caste_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

-- ------------------------------------------ Job ---------------------------------------------

DROP TABLE IF EXISTS mst_job_status;
CREATE TABLE IF NOT EXISTS mst_job_status
(
    job_status_id SERIAL       NOT NULL PRIMARY KEY,
    job_status    VARCHAR(100) NOT NULL,
    active        BOOLEAN      NULL     DEFAULT '1',
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by    INT          NOT NULL,
    updated_by   INT          NOT NULL,
    created_ip    VARCHAR(50)  NOT NULL,
    modified_ip   VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_job_status_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_job_status_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_job_type;
CREATE TABLE IF NOT EXISTS mst_job_type
(
    job_type_id SERIAL       NOT NULL PRIMARY KEY,
    job_type    VARCHAR(100) NOT NULL,
    active      BOOLEAN      NULL     DEFAULT '1',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT          NOT NULL,
    updated_by INT          NOT NULL,
    created_ip  VARCHAR(50)  NOT NULL,
    modified_ip VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_job_type_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_job_type_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_job_category;
CREATE TABLE IF NOT EXISTS mst_job_category
(
    job_category_id SERIAL       NOT NULL PRIMARY KEY,
    job_category    VARCHAR(100) NOT NULL,
    active          BOOLEAN      NULL     DEFAULT '1',
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      INT          NOT NULL,
    updated_by     INT          NOT NULL,
    created_ip      VARCHAR(50)  NOT NULL,
    modified_ip     VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_job_category_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_job_category_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id)
);

DROP TABLE IF EXISTS mst_email_template;
CREATE TABLE IF NOT EXISTS mst_job_sub_category
(
    job_sub_category_id SERIAL       NOT NULL PRIMARY KEY,
    job_sub_category    VARCHAR(100) NOT NULL,
    job_category_id     INT          NOT NULL,
    active              BOOLEAN      NULL     DEFAULT '1',
    created_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by          INT          NOT NULL,
    updated_by         INT          NOT NULL,
    created_ip          VARCHAR(50)  NOT NULL,
    modified_ip         VARCHAR(50)  NOT NULL,
    CONSTRAINT fk_job_sub_category_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_job_sub_category_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT mst_job_category_id_fk FOREIGN KEY (job_category_id) REFERENCES mst_job_category (job_category_id)
);

CREATE INDEX ix_job_sub_category_category
    ON mst_job_sub_category (job_category_id);

-- ------------------------------------------ Media ---------------------------------------------

DROP TABLE IF EXISTS txn_media;
CREATE TABLE IF NOT EXISTS txn_media
(
    media_id    SERIAL    NOT NULL PRIMARY KEY,
    table_id    INT       NOT NULL,
    pk_of_table INT       NOT NULL,
    media_path  VARCHAR(255)       DEFAULT NULL,
    media_type  VARCHAR(255)       DEFAULT NULL,
    active      BOOLEAN   NOT NULL DEFAULT '1',
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT       NOT NULL,
    updated_by INT       NOT NULL,
    CONSTRAINT tm_table_id_fk FOREIGN KEY (table_id) REFERENCES mst_table (table_id)
);

CREATE INDEX ix_media_table_id
    ON txn_media (table_id);


-- ------------------------------------------ Temple ---------------------------------------------
DROP TABLE IF EXISTS mst_temple;
CREATE TABLE IF NOT EXISTS mst_temple
(
    temple_id   SERIAL      NOT NULL PRIMARY KEY,
    address_id  INT         NULL,
    temple_name VARCHAR(75) NOT NULL,
    image_path  jsonb       NULL,
    active      BOOLEAN     NOT NULL DEFAULT '1',
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by  INT         NOT NULL,
    updated_by INT         NOT NULL,
    CONSTRAINT fk_temple_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_temple_mst_admin_updated_by FOREIGN KEY (updated_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT tt_address_id_fk FOREIGN KEY (address_id) REFERENCES txn_address (address_id)
);
