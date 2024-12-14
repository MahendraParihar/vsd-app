create database vishwakarma with owner postgres;

create sequence public.mst_matrimonial_requested_status_requested_status_id_seq
    as integer;

alter sequence public.mst_matrimonial_requested_status_requested_status_id_seq owner to postgres;

create sequence public.txn_family_relationship_mappi_family_relationship_mapping_i_seq
    as integer;

alter sequence public.txn_family_relationship_mappi_family_relationship_mapping_i_seq owner to postgres;

create sequence public.txn_mandal_member_member_post_id_seq
    as integer;

alter sequence public.txn_mandal_member_member_post_id_seq owner to postgres;

create sequence public.txn_matrimonial_profile_matrimonial_id_seq
    as integer;

alter sequence public.txn_matrimonial_profile_matrimonial_id_seq owner to postgres;

create table public.log_error
(
    error_id              serial
        primary key,
    environment           varchar(100)                        not null,
    browser               varchar(100),
    host_url              varchar(100),
    server_name           varchar(50),
    controller            varchar(100),
    method_name           varchar(100),
    exception_message     text,
    exception_message_sql text,
    exception_type        varchar(200),
    exception_source      varchar(200),
    exception_target      varchar(400),
    exception_stacktrace  text,
    error_timestamp       timestamp default CURRENT_TIMESTAMP not null
);

alter table public.log_error
    owner to postgres;

create table public.mst_admin_role
(
    admin_role_id  serial
        primary key,
    admin_role     varchar(255) not null,
    permission_set integer[]    not null
);

alter table public.mst_admin_role
    owner to postgres;

create table public.mst_admin_user
(
    admin_user_id        serial
        primary key,
    first_name           varchar(50)                             not null,
    last_name            varchar(50)                             not null,
    profile_picture      jsonb,
    password             text                                    not null,
    password_temp        text,
    country_code         varchar(5)                              not null,
    contact_number       varchar(16)                             not null,
    email_id             varchar(100)                            not null,
    address_id           integer,
    start_date           timestamp                               not null,
    end_date             timestamp,
    admin_user_status_id integer                                 not null,
    deactivation_reason  varchar(1000) default NULL::character varying,
    verification_code    text,
    created_at           timestamp     default CURRENT_TIMESTAMP not null,
    created_by           integer
        constraint fk_mst_admin_user_mst_admin_created_by
            references public.mst_admin_user,
    updated_at           timestamp     default CURRENT_TIMESTAMP not null,
    updated_by          integer
        constraint fk_mst_admin_user_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip           varchar(50)                             not null,
    modified_ip          varchar(50)                             not null
);

alter table public.mst_admin_user
    owner to postgres;

create table public.mst_addiction
(
    addiction_id serial
        primary key,
    addiction    varchar(50)                         not null,
    active       boolean   default true,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    created_by   integer                             not null
        constraint fk_mst_addiction_mst_admin_created_by
            references public.mst_admin_user,
    updated_at   timestamp default CURRENT_TIMESTAMP not null,
    updated_by  integer                             not null
        constraint fk_mst_addiction_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip   varchar(50),
    modified_ip  varchar(50),
    image_path   jsonb
);

alter table public.mst_addiction
    owner to postgres;

create table public.mst_address_type
(
    address_type_id serial
        primary key,
    address_type    varchar(50)                         not null,
    active          boolean   default true,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_mst_address_type_mst_admin_created_by
            references public.mst_admin_user,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_by     integer                             not null
        constraint fk_mst_address_type_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50),
    modified_ip     varchar(50),
    image_path      jsonb
);

alter table public.mst_address_type
    owner to postgres;

create index idx_mst_admin_user_email
    on public.mst_admin_user (email_id);

create table public.mst_admin_user_role_mapping
(
    admin_user_role_mapping_id serial
        primary key,
    admin_user_id              integer                             not null,
    admin_role_id              integer                             not null,
    created_at                 timestamp default CURRENT_TIMESTAMP not null,
    created_by                 integer
        constraint fk_mst_admin_user_role_mapping_created_by
            references public.mst_admin_user,
    updated_at                 timestamp default CURRENT_TIMESTAMP not null,
    updated_by                integer
        constraint fk_mst_admin_user_role_mapping_updated_by
            references public.mst_admin_user,
    created_ip                 varchar(50)                         not null,
    modified_ip                varchar(50)                         not null
);

alter table public.mst_admin_user_role_mapping
    owner to postgres;

create index idx_mst_admin_user_role_mapping_admin
    on public.mst_admin_user_role_mapping (admin_user_id);

create table public.mst_business
(
    business_id serial
        primary key,
    business    varchar(50)                         not null,
    image_path  varchar(100),
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_business_mst_admin_created_by
            references public.mst_admin_user,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_by integer                             not null
        constraint fk_mst_business_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50),
    modified_ip varchar(50)
);

alter table public.mst_business
    owner to postgres;

create table public.mst_caste
(
    caste_id    serial
        primary key,
    caste       varchar(50)                         not null,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_caste_mst_admin_created_by
            references public.mst_admin_user,
    updated_by integer                             not null
        constraint fk_mst_caste_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50)                         not null,
    modified_ip varchar(50)                         not null,
    image_path  jsonb
);

alter table public.mst_caste
    owner to postgres;

create table public.mst_config
(
    config_id    serial
        primary key,
    config_name  varchar(100)                                  not null,
    config_value jsonb,
    module       varchar(20) default 'core'::character varying not null
);

alter table public.mst_config
    owner to postgres;

create table public.mst_contact_type
(
    contact_type_id serial
        primary key,
    contact_type    varchar(50)                         not null,
    active          boolean   default true,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_mst_contact_type_mst_admin_created_by
            references public.mst_admin_user,
    updated_by     integer                             not null
        constraint fk_mst_contact_type_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50)                         not null,
    modified_ip     varchar(50)                         not null,
    image_path      jsonb
);

alter table public.mst_contact_type
    owner to postgres;

create table public.mst_country
(
    country_id        serial
        primary key,
    country           varchar(100)                         not null,
    country_code      varchar(5),
    phone_number_code varchar(5) default NULL::character varying,
    active            boolean    default true,
    created_at        timestamp  default CURRENT_TIMESTAMP not null,
    created_by        integer                              not null
        constraint fk_mst_country_mst_admin_created_by
            references public.mst_admin_user,
    updated_at        timestamp  default CURRENT_TIMESTAMP not null,
    updated_by       integer                              not null
        constraint fk_mst_country_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip        varchar(50)                          not null,
    modified_ip       varchar(50)                          not null
);

alter table public.mst_country
    owner to postgres;

create table public.mst_education_degree
(
    education_degree_id serial
        primary key,
    degree              varchar(50)                         not null,
    active              boolean   default true,
    created_at          timestamp default CURRENT_TIMESTAMP not null,
    updated_at          timestamp default CURRENT_TIMESTAMP not null,
    created_by          integer                             not null
        constraint fk_mst_education_degree_mst_admin_created_by
            references public.mst_admin_user,
    updated_by         integer                             not null
        constraint fk_mst_education_degree_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip          varchar(50)                         not null,
    modified_ip         varchar(50)                         not null,
    image_path          jsonb
);

alter table public.mst_education_degree
    owner to postgres;

create table public.mst_email_template
(
    email_template_id    serial
        primary key,
    email_template_title varchar(250)                        not null,
    email_from           text,
    subject              varchar(1000)                       not null,
    file_path            varchar(500)                        not null,
    active               boolean   default true,
    created_at           timestamp default CURRENT_TIMESTAMP not null,
    updated_at           timestamp default CURRENT_TIMESTAMP not null,
    created_by           integer                             not null
        constraint fk_mst_email_template_mst_admin_created_by
            references public.mst_admin_user,
    updated_by          integer                             not null
        constraint fk_mst_email_template_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip           varchar(50)                         not null,
    modified_ip          varchar(50)                         not null
);

alter table public.mst_email_template
    owner to postgres;

create table public.mst_faq_category
(
    faq_category_id serial
        primary key,
    faq_category    varchar(100)                        not null,
    url             varchar(250)                        not null,
    active          boolean   default true,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_mst_faq_category_mst_admin_created_by
            references public.mst_admin_user,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_by     integer                             not null
        constraint fk_mst_faq_category_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50)                         not null,
    modified_ip     varchar(50)                         not null
);

alter table public.mst_faq_category
    owner to postgres;

create table public.mst_gender
(
    gender_id   serial
        primary key,
    gender      varchar(50)                         not null,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_gender_mst_admin_created_by
            references public.mst_admin_user,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_by integer                             not null
        constraint fk_mst_gender_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50)                         not null,
    modified_ip varchar(50)                         not null,
    image_path  jsonb
);

alter table public.mst_gender
    owner to postgres;

create table public.mst_gotra
(
    gotra_id    serial
        primary key,
    gotra       varchar(50)                         not null,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_gotra_mst_admin_created_by
            references public.mst_admin_user,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_by integer                             not null
        constraint fk_mst_gotra_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50),
    modified_ip varchar(50),
    image_path  jsonb
);

alter table public.mst_gotra
    owner to postgres;

create table public.mst_health_parameter_unit
(
    health_parameter_unit_id serial
        primary key,
    health_parameter_unit    varchar(50)                         not null,
    active                   boolean   default true,
    created_at               timestamp default CURRENT_TIMESTAMP not null,
    created_by               integer                             not null
        constraint fk_mst_health_parameters_unit_mst_admin_created_by
            references public.mst_admin_user,
    updated_at               timestamp default CURRENT_TIMESTAMP not null,
    updated_by              integer                             not null
        constraint fk_mst_health_parameters_unit_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip               varchar(50)                         not null,
    modified_ip              varchar(50)                         not null,
    image_path               jsonb
);

alter table public.mst_health_parameter_unit
    owner to postgres;

create table public.mst_job_category
(
    job_category_id serial
        primary key,
    job_category    varchar(100)                        not null,
    active          boolean   default true,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_job_category_admin_created_by
            references public.mst_admin_user,
    updated_by     integer                             not null
        constraint fk_job_category_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50)                         not null,
    modified_ip     varchar(50)                         not null,
    image_path      jsonb
);

alter table public.mst_job_category
    owner to postgres;

create table public.mst_job_status
(
    job_status_id serial
        primary key,
    job_status    varchar(100)                        not null,
    active        boolean   default true,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    updated_at    timestamp default CURRENT_TIMESTAMP not null,
    created_by    integer                             not null
        constraint fk_job_status_admin_created_by
            references public.mst_admin_user,
    updated_by   integer                             not null
        constraint fk_job_status_admin_updated_by
            references public.mst_admin_user,
    created_ip    varchar(50)                         not null,
    modified_ip   varchar(50)                         not null
);

alter table public.mst_job_status
    owner to postgres;

create table public.mst_job_sub_category
(
    job_sub_category_id serial
        primary key,
    job_sub_category    varchar(100)                        not null,
    job_category_id     integer                             not null
        constraint mst_job_category_id_fk
            references public.mst_job_category,
    active              boolean   default true,
    created_at          timestamp default CURRENT_TIMESTAMP not null,
    updated_at          timestamp default CURRENT_TIMESTAMP not null,
    created_by          integer                             not null
        constraint fk_job_sub_category_admin_created_by
            references public.mst_admin_user,
    updated_by         integer                             not null
        constraint fk_job_sub_category_admin_updated_by
            references public.mst_admin_user,
    created_ip          varchar(50)                         not null,
    modified_ip         varchar(50)                         not null,
    image_path          jsonb
);

alter table public.mst_job_sub_category
    owner to postgres;

create index ix_job_sub_category_category
    on public.mst_job_sub_category (job_category_id);

create table public.mst_job_type
(
    job_type_id serial
        primary key,
    job_type    varchar(100)                        not null,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_job_type_admin_created_by
            references public.mst_admin_user,
    updated_by integer                             not null
        constraint fk_job_type_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50)                         not null,
    modified_ip varchar(50)                         not null,
    image_path  jsonb
);

alter table public.mst_job_type
    owner to postgres;

create table public.mst_label
(
    label_id      serial
        primary key,
    label_key     varchar(100) not null,
    label         text,
    applicability varchar(10)
);

alter table public.mst_label
    owner to postgres;

create unique index mst_label_label_key_applicability_uindex
    on public.mst_label (label_key, applicability);

create table public.mst_legal_page
(
    legal_pages_id serial
        primary key,
    title          varchar(50)                         not null,
    details        text                                not null,
    active         boolean   default true,
    created_at     timestamp default CURRENT_TIMESTAMP not null,
    created_by     integer                             not null
        constraint fk_mst_legal_page_mst_admin_created_by
            references public.mst_admin_user,
    updated_at     timestamp default CURRENT_TIMESTAMP not null,
    updated_by    integer                             not null
        constraint fk_mst_legal_page_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip     varchar(50)                         not null,
    modified_ip    varchar(50)                         not null,
    image_path     jsonb
);

alter table public.mst_legal_page
    owner to postgres;

create table public.mst_mandal
(
    mandal_id       serial
        primary key,
    mandal_name     varchar(150)                        not null,
    address_id      integer                             not null,
    active          boolean   default true              not null,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_mst_mandal_mst_admin_created_by
            references public.mst_admin_user,
    updated_by     integer                             not null
        constraint fk_mst_mandal_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50)                         not null,
    modified_ip     varchar(50)                         not null,
    image_path      jsonb,
    additional_info jsonb
);

alter table public.mst_mandal
    owner to postgres;

create table public.mst_marital_status
(
    marital_status_id serial
        primary key,
    marital_status    varchar(50)                         not null,
    active            boolean   default true,
    created_at        timestamp default CURRENT_TIMESTAMP not null,
    created_by        integer                             not null
        constraint fk_mst_marital_status_mst_admin_created_by
            references public.mst_admin_user,
    updated_at        timestamp default CURRENT_TIMESTAMP not null,
    updated_by       integer                             not null
        constraint fk_mst_marital_status_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip        varchar(50),
    modified_ip       varchar(50),
    image_path        jsonb
);

alter table public.mst_marital_status
    owner to postgres;

create table public.mst_matrimonial_requested_status
(
    matrimonial_requested_status_id integer   default nextval('mst_matrimonial_requested_status_requested_status_id_seq'::regclass) not null
        primary key,
    matrimonial_requested_status    varchar(50)                                                                                     not null,
    active                          boolean   default true,
    created_at                      timestamp default CURRENT_TIMESTAMP                                                             not null,
    updated_at                      timestamp default CURRENT_TIMESTAMP                                                             not null,
    created_by                      integer                                                                                         not null
        constraint fk_matrimonial_requested_statuses_admin_created_by
            references public.mst_admin_user,
    updated_by                     integer                                                                                         not null
        constraint fk_matrimonial_requested_statuses_admin_updated_by
            references public.mst_admin_user,
    created_ip                      varchar(50)                                                                                     not null,
    modified_ip                     varchar(50)                                                                                     not null,
    image_path                      jsonb
);

alter table public.mst_matrimonial_requested_status
    owner to postgres;

alter sequence public.mst_matrimonial_requested_status_requested_status_id_seq owned by public.mst_matrimonial_requested_status.matrimonial_requested_status_id;

create table public.mst_matrimonial_status
(
    matrimonial_status_id serial
        primary key,
    status                varchar(50)                         not null,
    active                boolean   default true,
    created_at            timestamp default CURRENT_TIMESTAMP not null,
    updated_at            timestamp default CURRENT_TIMESTAMP not null,
    created_by            integer                             not null
        constraint fk_matrimonial_status_admin_created_by
            references public.mst_admin_user,
    updated_by           integer                             not null
        constraint fk_matrimonial_status_admin_updated_by
            references public.mst_admin_user,
    created_ip            varchar(50)                         not null,
    modified_ip           varchar(50)                         not null,
    image_path            jsonb
);

alter table public.mst_matrimonial_status
    owner to postgres;

create table public.mst_media_src
(
    media_src_id serial
        primary key,
    media_src    varchar(50)                         not null,
    active       boolean   default true,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    created_by   integer                             not null
        constraint fk_mst_media_src_mst_admin_created_by
            references public.mst_admin_user,
    updated_at   timestamp default CURRENT_TIMESTAMP not null,
    updated_by  integer                             not null
        constraint fk_mst_media_src_mst_admin_updated_by
            references public.mst_admin_user
);

alter table public.mst_media_src
    owner to postgres;

create table public.mst_media_type
(
    media_type_id serial
        primary key,
    media_type    varchar(50)                         not null,
    active        boolean   default true,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    created_by    integer                             not null
        constraint fk_mst_media_type_mst_admin_created_by
            references public.mst_admin_user,
    updated_at    timestamp default CURRENT_TIMESTAMP not null,
    updated_by   integer                             not null
        constraint fk_mst_media_type_mst_admin_updated_by
            references public.mst_admin_user
);

alter table public.mst_media_type
    owner to postgres;

create table public.mst_notification
(
    notification_id serial
        primary key,
    title           varchar(100)                        not null,
    message         varchar(250)                        not null,
    image_path      varchar(250),
    active          boolean   default true              not null,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null,
    updated_by     integer                             not null
);

alter table public.mst_notification
    owner to postgres;

create table public.mst_payment_mode
(
    payment_mode_id serial
        primary key,
    payment_mode    varchar(100)                        not null,
    active          boolean   default true,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_mst_payment_mode_mst_admin_created_by
            references public.mst_admin_user,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_by     integer                             not null
        constraint fk_mst_payment_mode_mst_admin_updated_by
            references public.mst_admin_user
);

alter table public.mst_payment_mode
    owner to postgres;

create table public.mst_permission_set
(
    permission_set_id serial
        primary key,
    permission        varchar             not null,
    permission_set    character varying[] not null
);

alter table public.mst_permission_set
    owner to postgres;

create table public.mst_post
(
    post_id     serial
        primary key,
    post        varchar(50)                         not null,
    active      boolean   default true              not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_post_mst_admin_created_by
            references public.mst_admin_user,
    updated_by integer                             not null
        constraint fk_mst_post_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50)                         not null,
    modified_ip varchar(50)                         not null,
    image_path  jsonb
);

alter table public.mst_post
    owner to postgres;

create table public.mst_raasi
(
    raasi_id    serial
        primary key,
    raasi       varchar(50)                         not null,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_raasi_faqs_mst_admin_created_by
            references public.mst_admin_user,
    updated_by integer                             not null
        constraint fk_mst_raasi_faqs_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50)                         not null,
    modified_ip varchar(50)                         not null,
    image_path  jsonb
);

alter table public.mst_raasi
    owner to postgres;

create table public.mst_relationship
(
    relationship_id serial
        primary key,
    relationship    varchar(50)                         not null,
    active          boolean   default true,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_mst_relationship_mst_admin_created_by
            references public.mst_admin_user,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_by     integer                             not null
        constraint fk_mst_relationship_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50),
    modified_ip     varchar(50),
    image_path      jsonb
);

alter table public.mst_relationship
    owner to postgres;

create table public.mst_religion
(
    religion_id serial
        primary key,
    religion    varchar(50)                         not null,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_religion_mst_admin_created_by
            references public.mst_admin_user,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_by integer                             not null
        constraint fk_mst_religion_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50),
    modified_ip varchar(50),
    image_path  jsonb
);

alter table public.mst_religion
    owner to postgres;

create table public.mst_service
(
    service_id  serial
        primary key,
    service     varchar(50)                         not null,
    image_path  varchar(100),
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_service_mst_admin_created_by
            references public.mst_admin_user,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_by integer                             not null
        constraint fk_mst_service_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50),
    modified_ip varchar(50)
);

alter table public.mst_service
    owner to postgres;

create table public.mst_state
(
    state_id    serial
        primary key,
    state       varchar(100)                        not null,
    code        varchar(10)                         not null,
    country_id  integer                             not null
        constraint fk_mst_state_mst_countries_country_id
            references public.mst_country,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_state_mst_admin_created_by
            references public.mst_admin_user,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_by integer                             not null
        constraint fk_mst_state_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50)                         not null,
    modified_ip varchar(50)                         not null
);

alter table public.mst_state
    owner to postgres;

create table public.mst_district
(
    district_id serial
        primary key,
    state_id    integer                             not null
        constraint md_mst_state_id_fk
            references public.mst_state
            on delete cascade,
    district    varchar(100)                        not null,
    active      boolean   default true              not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer
        constraint fk_mst_district_mst_admin_created_by
            references public.mst_admin_user,
    updated_by integer
        constraint fk_mst_district_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50)                         not null,
    modified_ip varchar(50)                         not null
);

alter table public.mst_district
    owner to postgres;

create table public.mst_city_village
(
    city_village_id serial
        primary key,
    type_id         integer                               not null,
    district_id     integer                               not null
        constraint mcv_district_id_fk
            references public.mst_district
            on delete cascade,
    city_vilage     varchar(75)                           not null,
    pin_code        varchar(10) default NULL::character varying,
    std_code        varchar(10) default NULL::character varying,
    active          boolean     default true,
    created_at      timestamp   default CURRENT_TIMESTAMP not null,
    updated_at      timestamp   default CURRENT_TIMESTAMP not null,
    created_by      integer                               not null
        constraint fk_mst_city_villages_mst_admin_created_by
            references public.mst_admin_user,
    updated_by     integer                               not null
        constraint fk_mst_city_villages_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50)                           not null,
    modified_ip     varchar(50)                           not null
);

alter table public.mst_city_village
    owner to postgres;

create index ix_city_village_district_id
    on public.mst_city_village (district_id);

create index ix_district_state_id
    on public.mst_district (state_id);

create table public.mst_table
(
    table_id    serial
        primary key,
    table_name  varchar(100)                        not null,
    active      boolean   default true,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_mst_table_src_mst_admin_created_by
            references public.mst_admin_user,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_by integer                             not null
        constraint fk_mst_table_src_mst_admin_updated_by
            references public.mst_admin_user
);

alter table public.mst_table
    owner to postgres;

create table public.mst_user_status
(
    user_status_id serial
        primary key,
    user_status    varchar(50) not null
);

alter table public.mst_user_status
    owner to postgres;

create table public.txn_address
(
    address_id      serial
        primary key,
    address_type_id integer   default 1                 not null
        constraint tf_address_type_id_fk
            references public.mst_address_type,
    address         varchar(100)                        not null,
    pin_code        integer,
    latitude        varchar(255),
    longitude       varchar(255),
    country_id      integer                             not null,
    state_id        integer                             not null,
    district_id     integer                             not null,
    city_village_id integer                             not null,
    active          boolean   default true              not null,
    created_ip      varchar(20)                         not null,
    modified_ip     varchar(20)                         not null,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null,
    updated_by     integer                             not null
);

alter table public.txn_address
    owner to postgres;

create table public.mst_temple
(
    temple_id   serial
        primary key,
    address_id  integer
        constraint tt_address_id_fk
            references public.txn_address,
    temple_name varchar(75)                         not null,
    image_path  jsonb,
    active      boolean   default true              not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null
        constraint fk_temple_mst_admin_created_by
            references public.mst_admin_user,
    updated_by integer                             not null
        constraint fk_temple_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip  varchar(50),
    modified_ip varchar(50)
);

alter table public.mst_temple
    owner to postgres;

create table public.txn_admin_last_login_detail
(
    admin_last_login_detail_id serial
        primary key,
    admin_user_id              integer                             not null
        constraint fk_admin_last_login_detail_admin_admin_id
            references public.mst_admin_user,
    device_detail              jsonb                               not null,
    last_login_timestamp       timestamp default CURRENT_TIMESTAMP not null,
    is_latest                  boolean   default true              not null,
    created_ip                 varchar(50)                         not null
);

alter table public.txn_admin_last_login_detail
    owner to postgres;

create index ix_txn_admin_last_login_details_admin_id
    on public.txn_admin_last_login_detail (admin_user_id);

create table public.txn_app_user
(
    app_user_id        serial
        primary key,
    first_name         varchar(50)  default NULL::character varying,
    last_name          varchar(50)  default NULL::character varying,
    email_id           varchar(100) default NULL::character varying,
    password           text,
    city_village_id    integer                                not null
        constraint mau_city_village_id_fk
            references public.mst_city_village,
    contact_no         varchar(15)  default NULL::character varying,
    verification_code  varchar(20)  default NULL::character varying,
    app_user_status_id integer                                not null,
    deactive_reason    varchar(500) default NULL::character varying,
    created_ip         varchar(50)                            not null,
    modified_ip        varchar(50)                            not null,
    created_at         timestamp    default CURRENT_TIMESTAMP not null,
    updated_at         timestamp    default CURRENT_TIMESTAMP not null,
    created_by         integer      default 0                 not null,
    updated_by        integer      default 0                 not null
);

alter table public.txn_app_user
    owner to postgres;

create index ix_app_user_city_village
    on public.txn_app_user (city_village_id);

create index ix_app_user_email
    on public.txn_app_user (email_id);

create table public.txn_app_user_device
(
    app_user_device_id serial
        primary key,
    app_user_id        integer
        constraint mai_app_user_id_fk
            references public.txn_app_user,
    device_name        varchar(255) default NULL::character varying,
    platform           varchar(50)  default NULL::character varying,
    device_id          varchar(250) default NULL::character varying,
    push_token         text,
    is_login           boolean      default false,
    app_version        varchar(10)                            not null,
    created_ip         varchar(50)                            not null,
    modified_ip        varchar(50)                            not null,
    active             boolean      default true,
    created_at         timestamp    default CURRENT_TIMESTAMP not null,
    updated_at         timestamp    default CURRENT_TIMESTAMP not null,
    created_by         integer                                not null,
    updated_by        integer                                not null
);

alter table public.txn_app_user_device
    owner to postgres;

create index ix_app_user_device
    on public.txn_app_user_device (app_user_id);

create table public.txn_app_user_login_history
(
    app_login_history_id serial
        primary key,
    app_user_device_id   integer                             not null
        constraint txn_app_user_login_history_au_fk
            references public.txn_app_user_device
            on delete cascade,
    created_at           timestamp default CURRENT_TIMESTAMP not null,
    created_ip           varchar(50)                         not null
);

alter table public.txn_app_user_login_history
    owner to postgres;

create index ix_app_user_login_history_au
    on public.txn_app_user_login_history (app_user_device_id);

create table public.txn_banner
(
    banner_id   serial
        primary key,
    title       varchar(75)                           not null,
    image_path  varchar(75)                           not null,
    from_date   varchar(250),
    to_date     varchar(10) default NULL::character varying,
    active      boolean     default true              not null,
    created_at  timestamp   default CURRENT_TIMESTAMP not null,
    updated_at  timestamp   default CURRENT_TIMESTAMP not null,
    created_by  integer                               not null,
    updated_by integer                               not null
);

alter table public.txn_banner
    owner to postgres;

create table public.txn_current_affair
(
    current_affair_id  serial
        primary key,
    title              varchar(100) default NULL::character varying,
    description        text,
    date               date,
    time               time,
    image_path         varchar(255) default NULL::character varying,
    is_approved        boolean      default false,
    approved_by        integer,
    comment_applicable boolean      default false,
    tags               character varying[],
    visited_count      integer      default 0,
    active             boolean      default true              not null,
    created_ip         varchar(20)                            not null,
    modified_ip        varchar(20)                            not null,
    created_at         timestamp    default CURRENT_TIMESTAMP not null,
    updated_at         timestamp    default CURRENT_TIMESTAMP not null,
    created_by         integer                                not null,
    updated_by        integer                                not null
);

alter table public.txn_current_affair
    owner to postgres;

create table public.txn_email_status
(
    email_status_id   serial
        primary key,
    email_template_id integer                             not null
        constraint tes_mst_email_template_id_fk
            references public.mst_email_template,
    app_user_id       integer                             not null
        constraint tes_mst_app_user_id_fk
            references public.txn_app_user,
    subject           varchar(1000)                       not null,
    body              text                                not null,
    status            boolean   default true              not null,
    failure_reason    text,
    created_at        timestamp default CURRENT_TIMESTAMP not null,
    updated_at        timestamp default CURRENT_TIMESTAMP not null,
    created_by        integer                             not null,
    updated_by       integer                             not null
);

alter table public.txn_email_status
    owner to postgres;

create index ix_email_status_mail_template_id
    on public.txn_email_status (app_user_id);

create table public.txn_event
(
    event_id      serial
        primary key,
    title         varchar(100) default NULL::character varying,
    description   text,
    date          date,
    time          time,
    address_id    integer
        constraint te_address_id_fk
            references public.txn_address,
    event_days    integer      default 1,
    image_path    jsonb,
    download_path varchar(255) default NULL::character varying,
    agenda        json,
    visited_count integer      default 0,
    active        boolean      default true              not null,
    created_ip    varchar(20)                            not null,
    modified_ip   varchar(20)                            not null,
    created_at    timestamp    default CURRENT_TIMESTAMP not null,
    updated_at    timestamp    default CURRENT_TIMESTAMP not null,
    created_by    integer                                not null,
    updated_by   integer                                not null,
    tags          character varying[]
);

alter table public.txn_event
    owner to postgres;

create index ix_event_address_id
    on public.txn_event (address_id);

create table public.txn_family
(
    family_id     serial
        primary key,
    app_user_id   integer
        constraint tf_mst_app_user_id_fk
            references public.txn_app_user,
    first_name    varchar(50)                         not null,
    middle_name   varchar(50)                         not null,
    last_name     varchar(50)                         not null,
    email_id      varchar(100)                        not null,
    image_path    varchar(250),
    visited_count integer   default 0                 not null,
    active        boolean   default true              not null,
    created_ip    varchar(20)                         not null,
    modified_ip   varchar(20)                         not null,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    updated_at    timestamp default CURRENT_TIMESTAMP not null,
    created_by    integer                             not null,
    updated_by   integer                             not null
);

alter table public.txn_family
    owner to postgres;

create table public.txn_city_village_chovtiya
(
    city_village_chovtiya_id serial
        primary key,
    city_village_id          integer                             not null
        constraint tcvc_city_village_id_fk
            references public.mst_city_village,
    family_id                integer                             not null
        constraint tcvc_family_id_fk
            references public.txn_family,
    start_date               date                                not null,
    end_date                 date,
    active                   boolean   default true              not null,
    created_at               timestamp default CURRENT_TIMESTAMP not null,
    updated_at               timestamp default CURRENT_TIMESTAMP not null,
    created_by               integer                             not null,
    updated_by              integer                             not null,
    created_ip               varchar(20)                         not null,
    modified_ip              varchar(20)                         not null
);

alter table public.txn_city_village_chovtiya
    owner to postgres;

create table public.txn_event_coordinator
(
    event_contact_person_number_id serial
        primary key,
    event_id                       integer                             not null
        constraint tecn_event_id_fk
            references public.txn_event,
    family_id                      integer                             not null
        constraint tecn_family_id_fk
            references public.txn_family,
    post                           varchar(100),
    active                         boolean   default true              not null,
    created_ip                     varchar(20)                         not null,
    modified_ip                    varchar(20)                         not null,
    created_at                     timestamp default CURRENT_TIMESTAMP not null,
    updated_at                     timestamp default CURRENT_TIMESTAMP not null,
    created_by                     integer                             not null,
    updated_by                    integer                             not null
);

alter table public.txn_event_coordinator
    owner to postgres;

create index ix_contact_number_event_id
    on public.txn_event_coordinator (event_id);

create index ix_contact_number_family_id
    on public.txn_event_coordinator (family_id);

create table public.txn_event_interested_member
(
    id          serial
        primary key,
    event_id    integer                             not null
        constraint tei_event_id_fk
            references public.txn_event,
    family_id   integer                             not null
        constraint tei_app_user_id_fk
            references public.txn_family,
    interested  boolean   default true              not null,
    active      boolean   default true              not null,
    created_ip  varchar(20)                         not null,
    modified_ip varchar(20)                         not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null
);

alter table public.txn_event_interested_member
    owner to postgres;

create index ix_event_interest_app_user_id
    on public.txn_event_interested_member (family_id);

create index ix_event_interest_event_id
    on public.txn_event_interested_member (event_id);

create table public.txn_family_addiction_mapping
(
    addiction_mapping_id serial
        primary key,
    family_id            integer                             not null
        constraint tmam_matrimonial_id_fk
            references public.txn_family,
    addiction_id         integer                             not null
        constraint tmam_addiction_id_fk
            references public.mst_addiction,
    active               boolean   default true              not null,
    created_ip           varchar(50)                         not null,
    modified_ip          varchar(50)                         not null,
    created_at           timestamp default CURRENT_TIMESTAMP not null,
    updated_at           timestamp default CURRENT_TIMESTAMP not null,
    created_by           integer   default 0                 not null,
    updated_by          integer   default 0                 not null
);

alter table public.txn_family_addiction_mapping
    owner to postgres;

create index ix_family_addiction_m_id
    on public.txn_family_addiction_mapping (family_id);

create table public.txn_family_business
(
    family_business_id serial
        primary key,
    business_id        integer                             not null
        constraint tfbm_business_id_fk
            references public.mst_business,
    address_id         integer
        constraint tfbm_address_id_fk
            references public.txn_address,
    website_link       varchar(255),
    contact_number     varchar(50),
    email_id           varchar(255),
    image_path         jsonb,
    active             boolean   default true              not null,
    created_ip         varchar(20)                         not null,
    modified_ip        varchar(20)                         not null,
    created_at         timestamp default CURRENT_TIMESTAMP not null,
    updated_at         timestamp default CURRENT_TIMESTAMP not null,
    created_by         integer                             not null,
    updated_by        integer                             not null
);

comment on column public.txn_family_business.image_path is 'Banner Path';

alter table public.txn_family_business
    owner to postgres;

create index ix_family_business_id
    on public.txn_family_business (business_id);

create table public.txn_family_business_mapping
(
    family_business_mapping_id serial
        primary key,
    family_business_id         integer                             not null
        constraint tfbm_family_business_id_fk
            references public.txn_family_business,
    family_id                  integer
        constraint tfbm_family_id_fk
            references public.txn_family,
    active                     boolean   default true              not null,
    created_ip                 varchar(20)                         not null,
    modified_ip                varchar(20)                         not null,
    created_at                 timestamp default CURRENT_TIMESTAMP not null,
    updated_at                 timestamp default CURRENT_TIMESTAMP not null,
    created_by                 integer                             not null,
    updated_by                integer                             not null
);

alter table public.txn_family_business_mapping
    owner to postgres;

create index ix_family_business_mapping_buz_id
    on public.txn_family_business_mapping (family_business_id);

create index ix_family_business_mapping_family_id
    on public.txn_family_business_mapping (family_id);

create table public.txn_family_contact_number
(
    family_contact_number_id serial
        primary key,
    family_id                integer
        constraint tfcn_family_id_fk
            references public.txn_family,
    contact_type_id          integer     default 1
        constraint tfcn_contact_type_id_fk
            references public.mst_contact_type,
    contact_number           varchar(16) default NULL::character varying,
    active                   boolean     default true              not null,
    created_ip               varchar(20)                           not null,
    modified_ip              varchar(20)                           not null,
    created_at               timestamp   default CURRENT_TIMESTAMP not null,
    updated_at               timestamp   default CURRENT_TIMESTAMP not null,
    created_by               integer                               not null,
    updated_by              integer                               not null
);

alter table public.txn_family_contact_number
    owner to postgres;

create index ix_family_contact_family_id
    on public.txn_family_contact_number (family_id);

create table public.txn_family_education
(
    education_mapping_id serial
        primary key,
    family_id            integer                             not null
        constraint tmps_matrimonial_id_fk
            references public.txn_family,
    education_degree_id  integer                             not null
        constraint tmps_edu_degree_id_fk
            references public.mst_education_degree,
    scored_marks         double precision                    not null,
    active               boolean   default true              not null,
    created_ip           varchar(50)                         not null,
    modified_ip          varchar(50)                         not null,
    created_at           timestamp default CURRENT_TIMESTAMP not null,
    updated_at           timestamp default CURRENT_TIMESTAMP not null,
    created_by           integer   default 0                 not null,
    updated_by          integer   default 0                 not null,
    unit                 varchar(10)
);

alter table public.txn_family_education
    owner to postgres;

create index ix_matrimonial_eduction_m_id
    on public.txn_family_education (family_id);

create table public.txn_family_profile
(
    family_profile_id serial
        primary key,
    family_id         integer               not null,
    gender_id         integer
        constraint tf_mst_gender_id_fk
            references public.mst_gender
        constraint tf_txn_family_family_id_fk
            references public.txn_family,
    marital_status_id integer
        constraint tf_mst_marital_status_id_fk
            references public.mst_marital_status,
    date_of_birth     date,
    height            double precision,
    religion_id       integer               not null
        constraint tm_religion_id_fk
            references public.mst_religion,
    caste_id          integer
        constraint tm_caste_id_fk
            references public.mst_caste,
    gotra_id          integer               not null
        constraint tm_gotra_id_fk
            references public.mst_gotra,
    raasi_id          integer
        constraint tm_raasi_id_fk
            references public.mst_raasi,
    is_maglik         boolean default false not null,
    description       varchar(500),
    hobbies           varchar(500),
    monthly_income    integer
);

alter table public.txn_family_profile
    owner to postgres;

create table public.txn_family_relationship_mapping
(
    family_relationship_mapping_id integer   default nextval('txn_family_relationship_mappi_family_relationship_mapping_i_seq'::regclass) not null
        primary key,
    parent_id                      integer                                                                                                not null
        constraint tfrm_parent_id_fk
            references public.txn_family,
    child_id                       integer                                                                                                not null
        constraint tfrm_child_id_fk
            references public.txn_family,
    relationship_id                integer                                                                                                not null
        constraint tfcvm_family_id_fk
            references public.mst_relationship,
    active                         boolean   default true                                                                                 not null,
    created_ip                     varchar(20)                                                                                            not null,
    modified_ip                    varchar(20)                                                                                            not null,
    created_at                     timestamp default CURRENT_TIMESTAMP                                                                    not null,
    updated_at                     timestamp default CURRENT_TIMESTAMP                                                                    not null,
    created_by                     integer                                                                                                not null,
    updated_by                    integer                                                                                                not null
);

alter table public.txn_family_relationship_mapping
    owner to postgres;

alter sequence public.txn_family_relationship_mappi_family_relationship_mapping_i_seq owned by public.txn_family_relationship_mapping.family_relationship_mapping_id;

create index ix_family_relationship_parent_id
    on public.txn_family_relationship_mapping (parent_id);

create table public.txn_family_service_mapping
(
    family_service_mapping_id serial
        primary key,
    family_id                 integer                             not null
        constraint tfsm_family_id_fk
            references public.txn_family,
    service_id                integer                             not null
        constraint tfsm_service_id_fk
            references public.mst_service,
    job_profile               varchar(500),
    company_name              varchar(200),
    active                    boolean   default true              not null,
    created_ip                varchar(20)                         not null,
    modified_ip               varchar(20)                         not null,
    created_at                timestamp default CURRENT_TIMESTAMP not null,
    updated_at                timestamp default CURRENT_TIMESTAMP not null,
    created_by                integer                             not null,
    updated_by               integer                             not null
);

alter table public.txn_family_service_mapping
    owner to postgres;

create index ix_family_service_mapping_family_id
    on public.txn_family_service_mapping (family_id);

create index ix_family_service_mapping_service_id
    on public.txn_family_service_mapping (service_id);

create table public.txn_faq
(
    faq_id          serial
        primary key,
    faq_category_id integer                             not null
        constraint fk_txn_faq_mst_faq_category_faq_category_id
            references public.mst_faq_category,
    faq             varchar(500)                        not null,
    answer          text                                not null,
    active          boolean   default true,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    created_by      integer                             not null
        constraint fk_txn_faq_mst_admin_created_by
            references public.mst_admin_user,
    updated_at      timestamp default CURRENT_TIMESTAMP not null,
    updated_by     integer                             not null
        constraint fk_txn_faq_mst_admin_updated_by
            references public.mst_admin_user,
    created_ip      varchar(50)                         not null,
    modified_ip     varchar(50)                         not null
);

alter table public.txn_faq
    owner to postgres;

create table public.txn_gallery
(
    gallery_id  serial
        primary key,
    table_id    integer                             not null,
    pk_of_table integer                             not null,
    title       varchar(100),
    active      boolean   default true              not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null,
    updated_by integer                             not null
);

alter table public.txn_gallery
    owner to postgres;

create table public.txn_gallery_media
(
    gallery_image_id serial
        primary key,
    gallery_id       integer      not null
        constraint mgi_txn_gallery_id_fk
            references public.txn_gallery,
    thumb_image_path varchar(250) not null,
    media_src_id     integer      not null
        constraint mgi_txn_gallery_media_src_id_fk
            references public.mst_media_src,
    media_path       varchar(250) not null
);

alter table public.txn_gallery_media
    owner to postgres;

create index ix_gallery_image_gallery_id
    on public.txn_gallery_media (gallery_id);

create table public.txn_inquiry
(
    inquiries_id serial
        primary key,
    app_user_id  integer
        constraint ti_mst_app_user_id_fk
            references public.txn_app_user,
    message      text                                not null,
    is_responded boolean   default false             not null,
    active       boolean   default true,
    created_ip   varchar(20)                         not null,
    modified_ip  varchar(20)                         not null,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    updated_at   timestamp default CURRENT_TIMESTAMP not null,
    created_by   integer                             not null,
    updated_by  integer                             not null
);

alter table public.txn_inquiry
    owner to postgres;

create index ix_inquiries_app_user_id
    on public.txn_inquiry (app_user_id);

create table public.txn_job
(
    job_id             serial
        primary key,
    title              varchar(100) default NULL::character varying,
    description        text,
    date               date,
    time               time,
    image_path         varchar(255) default NULL::character varying,
    is_approved        boolean      default false,
    approved_by        integer,
    comment_applicable boolean      default false,
    tags               character varying[],
    visited_count      integer      default 0,
    active             boolean      default true              not null,
    created_ip         varchar(20)                            not null,
    modified_ip        varchar(20)                            not null,
    created_at         timestamp    default CURRENT_TIMESTAMP not null,
    updated_at         timestamp    default CURRENT_TIMESTAMP not null,
    created_by         integer                                not null,
    updated_by        integer                                not null,
    no_of_position     integer      default 1                 not null
);

alter table public.txn_job
    owner to postgres;

create table public.txn_mandal_member
(
    mandal_member_id integer   default nextval('txn_mandal_member_member_post_id_seq'::regclass) not null
        primary key,
    family_id        integer                                                                     not null
        constraint tmp_txn_family_id_fk
            references public.txn_family,
    post_id          integer                                                                     not null
        constraint tmp_mst_post_id_fk
            references public.mst_post,
    mandal_id        integer
        constraint tmp_mst_mandal_id_fk
            references public.mst_mandal,
    from_year        integer                                                                     not null,
    to_year          integer,
    created_ip       varchar(20)                                                                 not null,
    modified_ip      varchar(20)                                                                 not null,
    active           boolean   default true                                                      not null,
    created_at       timestamp default CURRENT_TIMESTAMP                                         not null,
    updated_at       timestamp default CURRENT_TIMESTAMP                                         not null,
    created_by       integer                                                                     not null,
    updated_by      integer                                                                     not null
);

alter table public.txn_mandal_member
    owner to postgres;

alter sequence public.txn_mandal_member_member_post_id_seq owned by public.txn_mandal_member.mandal_member_id;

create table public.txn_matrimonial_profile
(
    matrimonial_profile_id integer   default nextval('txn_matrimonial_profile_matrimonial_id_seq'::regclass) not null
        primary key,
    family_id              integer                                                                           not null
        constraint tm_family_id_fk
            references public.txn_family,
    profile_viewed_count   integer   default 0                                                               not null,
    matrimonial_status_id  integer   default 1                                                               not null
        constraint tm_m_status_id_fk
            references public.mst_matrimonial_status,
    status_change_reason   varchar(250)                                                                      not null,
    status_change_by       integer,
    created_ip             varchar(50)                                                                       not null,
    modified_ip            varchar(50)                                                                       not null,
    created_at             timestamp default CURRENT_TIMESTAMP                                               not null,
    updated_at             timestamp default CURRENT_TIMESTAMP                                               not null
);

alter table public.txn_matrimonial_profile
    owner to postgres;

alter sequence public.txn_matrimonial_profile_matrimonial_id_seq owned by public.txn_matrimonial_profile.matrimonial_profile_id;

create index ix_matrimonial_family_id
    on public.txn_matrimonial_profile (family_id);

create table public.txn_matrimonial_profile_requested
(
    profile_requested_id serial
        primary key,
    requested_from_id    integer                             not null
        constraint tmpreq_from_id_fk
            references public.txn_matrimonial_profile,
    requested_to_id      integer                             not null
        constraint tmpreq_to_id_fk
            references public.txn_matrimonial_profile,
    request_status_id    integer                             not null
        constraint tmpr_status_id_fk
            references public.mst_matrimonial_requested_status,
    created_ip           varchar(50)                         not null,
    modified_ip          varchar(50)                         not null,
    created_at           timestamp default CURRENT_TIMESTAMP not null,
    updated_at           timestamp default CURRENT_TIMESTAMP not null,
    created_by           integer   default 0                 not null,
    updated_by          integer   default 0                 not null,
    status_id            integer   default 0                 not null
);

alter table public.txn_matrimonial_profile_requested
    owner to postgres;

create table public.txn_matrimonial_profile_shortlisted
(
    profile_shortlisted_id serial
        primary key,
    matrimonial_id         integer                             not null
        constraint tmpshort_matrimonial_id_fk
            references public.txn_matrimonial_profile,
    shortlisted_id         integer                             not null
        constraint tmpshort_shortlisted_id_fk
            references public.txn_matrimonial_profile,
    active                 boolean   default true              not null,
    created_ip             varchar(50)                         not null,
    modified_ip            varchar(50)                         not null,
    created_at             timestamp default CURRENT_TIMESTAMP not null,
    updated_at             timestamp default CURRENT_TIMESTAMP not null,
    created_by             integer   default 0                 not null,
    updated_by            integer   default 0                 not null
);

alter table public.txn_matrimonial_profile_shortlisted
    owner to postgres;

create table public.txn_trustee
(
    trustee_id  serial
        primary key,
    family_id   integer                             not null
        constraint txn_trustee_txn_family_id_fk
            references public.txn_family,
    from_year   integer                             not null,
    to_year     integer,
    active      boolean   default true              not null,
    created_ip  varchar(20)                         not null,
    modified_ip varchar(20)                         not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null,
    created_by  integer                             not null,
    updated_by integer                             not null
);

alter table public.txn_trustee
    owner to postgres;

