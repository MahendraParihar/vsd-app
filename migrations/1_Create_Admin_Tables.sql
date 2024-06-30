DROP TABLE IF EXISTS mst_permission_set;
CREATE TABLE IF NOT EXISTS mst_permission_set
(
    permission_set_id SERIAL    NOT NULL PRIMARY KEY,
    permission        varchar   NOT NULL,
    permission_set    varchar[] NOT NULL
);

DROP TABLE IF EXISTS mst_admin_role;
CREATE TABLE IF NOT EXISTS mst_admin_role
(
    admin_role_id  SERIAL       NOT NULL PRIMARY KEY,
    admin_role     VARCHAR(255) NOT NULL,
    permission_set integer[]    NOT NULL
);


DROP TABLE IF EXISTS mst_user_status;
CREATE TABLE IF NOT EXISTS mst_user_status
(
    user_status_id SERIAL      NOT NULL PRIMARY KEY,
    user_status    VARCHAR(50) NOT NULL
);


DROP TABLE IF EXISTS mst_admin_user;
CREATE TABLE IF NOT EXISTS mst_admin_user
(
    admin_user_id        SERIAL        NOT NULL PRIMARY KEY,
    first_name           VARCHAR(50)   NOT NULL,
    last_name            VARCHAR(50)   NOT NULL,
    profile_picture      jsonb         NULL,
    password             text          NOT NULL,
    password_temp        text                   DEFAULT NULL,
    country_code         VARCHAR(5)    NOT NULL,
    contact_number       VARCHAR(16)   NOT NULL,
    email_id             VARCHAR(100)  NOT NULL,
    address_id           INTEGER       NULL,
    start_date           TIMESTAMP     NOT NULL,
    end_date             TIMESTAMP     NULL,
    admin_user_status_id INTEGER       NOT NULL,
    deactivation_reason  varchar(1000) NULL     DEFAULT NULL,
    verification_code    TEXT          NULL     DEFAULT NULL,
    created_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by           INTEGER       NULL,
    updated_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by          INTEGER       NULL,
    created_ip           VARCHAR(50)   NOT NULL,
    modified_ip          VARCHAR(50)   NOT NULL,
    CONSTRAINT fk_mst_admin_user_mst_admin_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_admin_user_mst_admin_modified_by FOREIGN KEY (modified_by) REFERENCES mst_admin_user (admin_user_id)
);

create index idx_mst_admin_user_email on mst_admin_user (email_id);

DROP TABLE IF EXISTS mst_admin_user_role_mapping;
CREATE TABLE IF NOT EXISTS mst_admin_user_role_mapping
(
    admin_user_role_mapping_id SERIAL      NOT NULL PRIMARY KEY,
    admin_user_id              INTEGER     NOT NULL,
    admin_role_id              INTEGER     NOT NULL,
    created_at                 TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by                 INTEGER     NULL,
    updated_at                 TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by                INTEGER     NULL,
    created_ip                 VARCHAR(50) NOT NULL,
    modified_ip                VARCHAR(50) NOT NULL,
    CONSTRAINT fk_mst_admin_user_role_mapping_created_by FOREIGN KEY (created_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_admin_user_role_mapping_modified_by FOREIGN KEY (modified_by) REFERENCES mst_admin_user (admin_user_id),
    CONSTRAINT fk_mst_admin_user_admin_role FOREIGN KEY (admin_role_id) REFERENCES mst_admin_role (admin_role_id)
);

create index idx_mst_admin_user_role_mapping_admin on mst_admin_user_role_mapping (admin_user_id);

DROP TABLE IF EXISTS txn_admin_last_login_detail;
CREATE TABLE IF NOT EXISTS txn_admin_last_login_detail
(
    admin_last_login_detail_id SERIAL      NOT NULL PRIMARY KEY,
    admin_user_id              INT         NOT NULL,
    device_detail              jsonb       NOT NULL,
    last_login_timestamp       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_latest                  BOOLEAN     NOT NULL DEFAULT true,
    created_ip                 VARCHAR(50) NOT NULL,
    CONSTRAINT fk_admin_last_login_detail_admin_admin_id FOREIGN KEY (admin_user_id) REFERENCES mst_admin_user (admin_user_id)
);

CREATE INDEX ix_txn_admin_last_login_details_admin_id
    ON txn_admin_last_login_detail (admin_user_id);

INSERT INTO mst_permission_set (permission_set_id, permission, permission_set)
VALUES (1, 'Super Admin',
        '{"BLOG_LIST","BLOG_CREATE","BLOG_EDIT","BLOG_VIEW","FAMILY_LIST","FAMILY_CREATE","FAMILY_EDIT","FAMILY_VIEW","NEWS_LIST","NEWS_CREATE","NEWS_EDIT", "NEWS_VIEW","MANDAL_LIST","MANDAL_CREATE","MANDAL_EDIT", "MANDAL_VIEW", "TEMPLE_LIST","TEMPLE_CREATE","TEMPLE_EDIT", "TEMPLE_VIEW","JOB_LIST","JOB_CREATE","JOB_EDIT","JOB_VIEW", "MATRIMONIAL_LIST","MATRIMONIAL_CREATE","MATRIMONIAL_EDIT","MATRIMONIAL_VIEW"}');
INSERT INTO mst_permission_set (permission_set_id, permission, permission_set)
VALUES (2, 'Blog Admin', '{"BLOG_LIST","BLOG_CREATE","BLOG_EDIT", "BLOG_VIEW"}'),
       (3, 'Family Admin', '{"FAMILY_LIST","FAMILY_CREATE","FAMILY_EDIT", "FAMILY_VIEW"}'),
       (4, 'News Admin', '{"NEWS_LIST","NEWS_CREATE","NEWS_EDIT", "NEWS_VIEW"}'),
       (5, 'Site Admin',
        '{"MANDAL_LIST","MANDAL_CREATE","MANDAL_EDIT", "MANDAL_VIEW", "TEMPLE_LIST","TEMPLE_CREATE","TEMPLE_EDIT", "TEMPLE_VIEW"}'),
       (6, 'Job Admin', '{"JOB_LIST","JOB_CREATE","JOB_EDIT","JOB_VIEW"}'),
       (7, 'Matrimonial Admin', '{"MATRIMONIAL_LIST","MATRIMONIAL_CREATE","MATRIMONIAL_EDIT","MATRIMONIAL_VIEW"}');

INSERT INTO mst_user_status(user_status_id, user_status)
VALUES (1, 'Active'),
       (-1, 'Verification Pending'),
       (0, 'In Active');

INSERT INTO mst_admin_role
VALUES (1, 'Admin', '{1}');

INSERT INTO mst_admin_user (admin_user_id, first_name, last_name, profile_picture, password, password_temp,
                             country_code, contact_number, email_id, address_id, start_date, end_date,
                             admin_user_status_id, created_by, created_at, modified_by, updated_at,
                             created_ip,
                             modified_ip)
VALUES (1, 'Mahendra', 'Parihar', null, '$2b$10$uD/EEC7obsr4TnoZvh/MGulUye1adlYmmZ1d5TrdylSzb5HOrEjcG',
        '$2b$10$uD/EEC7obsr4TnoZvh/MGulUye1adlYmmZ1d5TrdylSzb5HOrEjcG', '+91', '8097421877',
        'mahendra.parihar10@gmail.com', null, '2022-10-02', null, 1, null, current_timestamp, null,
        current_timestamp, '::1', '::1');

INSERT INTO mst_admin_user_role_mapping (admin_user_id, admin_role_id, created_at, created_by, updated_at, modified_by,
                                         created_ip, modified_ip)
VALUES (1, 1, NOW(), 1, NOW(), 1, ':0', ':0');