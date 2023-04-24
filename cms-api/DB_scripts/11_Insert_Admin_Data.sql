INSERT INTO mst_admin_roles
VALUES (1, 'Admin');

INSERT INTO mst_admin_users
("adminId", "roleId", "firstName", "lastName", "imagePath", "emailId", "contactNo", password, "cityVillageId", "startDate",
 "endDate", "verificationCode", "adminUserStatusId", "deactiveReason", "createdBy", "modifiedBy", "createdIp",
 "modifiedIp", "createdAt", "updatedAt")
VALUES (1, 1, 'Mahendra', 'Parihar', NULL, 'mahendra.parihar10@gmail.com', '8097421877',
        '$2b$10$uD/EEC7obsr4TnoZvh/MGulUye1adlYmmZ1d5TrdylSzb5HOrEjcG', null, '2021-11-14', NULL, NULL, 1, NULL, NULL,
        NULL, '::1', '1:1:1:1', '2021-12-26 10:58:57.551+05:30', '2021-12-26 17:02:05.331+05:30');

select * from mst_admin_users;
