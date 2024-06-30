-- Dashboard
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (1, 'Home', 0, 'home-page', 'dashboard', 1, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`id`, `role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 1, 1, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');

-- Admin Users
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (2, 'Users', 0, 'list-admin', 'users', 2, 1, '0', 0, '0', 0, '2017-04-05 15:51:00', '2017-04-05 15:51:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 2, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Application User
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (3, 'Application Users', 0, 'app-user-list', 'user', 3, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 3, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Family
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (4, 'Family', 0, 'family-list', 'users', 4, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 4, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Event
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (5, 'Events', 0, 'event-list', 'calendar', 5, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 5, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- News
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (6, 'News', 0, 'news-list', 'rss', 6, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 6, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Gallery
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (7, 'Gallery', 0, 'gallery-list', 'picture-o', 7, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 7, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Banners
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (8, 'Banners', 0, 'banner-list', 'home', 8, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 8, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Adds
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (9, 'Adds', 0, 'adds-list', 'home', 9, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 9, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Member Post
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (10, 'Member Post', 0, 'member-post-list', 'home', 10, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 10, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Trustee
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (11, 'Trustee', 0, 'trustee-list', 'home', 11, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 11, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Templates
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (12, 'Temples', 0, 'temple-list', 'home', 12, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 12, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Mandal
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (13, 'Mandal', 0, 'mandal-list', 'home', 13, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 13, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Master Tables = Village, City, Business, Services, Post
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (14, 'Master Data', 0, '', 'list', 14, 1, '0', 0, '0', 0, '2017-04-05 15:50:14', '2017-04-05 15:50:14'),
  (15, 'Village', 14, 'village-list', '', 1, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00'),
  (16, 'City', 14, 'city-list', '', 2, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00'),
  (17, 'Business', 14, 'business-list', '', 3, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00'),
  (18, 'Services', 14, 'service-list', '', 4, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00'),
  (19, 'Post', 14, 'post-list', '', 5, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 14, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 15, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 16, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 17, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 18, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 19, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Setting = Notifications
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (20, 'Setting', 0, '', 'cog', 15, 1, '0', 0, '0', 0, '2017-04-05 15:50:14', '2017-04-05 15:50:14'),
  (21, 'Notifications', 20, 'notification-list', '', 1, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');

INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 20, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 21, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (22, 'Counties', 14, 'countries-list', '', 6, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 22, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Gender, Marital Status, Relationship
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (23, 'Gender', 14, 'gender-list', '', 16, 1, '0', 0, '0', 0, '2017-04-05 15:50:14', '2017-04-05 15:50:14'),
  (24, 'Marital Status', 14, 'marital-status-list', '', 17, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00'),
  (25, 'Relationship', 14, 'relationship-list', '', 18, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');

INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 23, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 24, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00'),
  (1, 25, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');

-- Matrimonial
INSERT INTO `mst_menus` (`id`, `menu_name`, `parent`, `path`, `icon`, `sequence`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_date`, `updated_date`) VALUES
  (26, 'Matrimonial', 0, 'matrimonial-list', 'home', 16, 1, '', 0, '', 0, '2014-09-04 00:00:00', '2014-09-04 00:00:00');
INSERT INTO `mst_roles_permission` (`role_id`, `menu_id`, `active`, `created_ip`, `created_by`, `modified_ip`, `modified_by`, `created_at`, `updated_at`) VALUES
  (1, 26, 1, '0', 0, '0', 0, '2017-04-05 00:00:00', '2017-04-05 00:00:00');
