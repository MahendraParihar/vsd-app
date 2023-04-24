import {NavItem} from "../../interfaces/nav-item";
import {StringResources} from "../../enum/string-resources";
import {NavigationPathEnum} from "../../enum/navigation-path-enum";

export let menuList: NavItem[] = [
  {title: StringResources.HOME, path: NavigationPathEnum.HOME, iconName: 'home'},
  {title: StringResources.APP_USER_LIST, path: NavigationPathEnum.APP_USER_LIST, iconName: 'people'},
  {title: StringResources.ADMIN_LIST, path: NavigationPathEnum.ADMIN_LIST, iconName: 'admin_panel_settings'},
  {title: StringResources.FAMILY_LIST, path: NavigationPathEnum.FAMILY_LIST, iconName: 'group_add'},
  {title: StringResources.EVENT_LIST, path: NavigationPathEnum.EVENT_LIST, iconName: 'celebration'},
  {title: StringResources.CURRENT_AFFAIR_LIST, path: NavigationPathEnum.CURRENT_AFFAIR_LIST, iconName: 'newspaper'},
  {title: StringResources.MATRIMONIAL_LIST, path: NavigationPathEnum.MATRIMONIAL_LIST, iconName: 'diversity_1'},
  {title: StringResources.JOB_LIST, path: NavigationPathEnum.JOB_LIST, iconName: 'work'},
  {title: StringResources.TEMPLE_LIST, path: NavigationPathEnum.TEMPLE_LIST, iconName: 'temple_hindu'},
  {title: StringResources.MANDAL_LIST, path: NavigationPathEnum.MANDAL_LIST, iconName: 'description'},
  {title: StringResources.TRUSTEE_LIST, path: NavigationPathEnum.TRUSTEE_LIST, iconName: 'people'},
  {title: StringResources.FAQ_LIST, path: NavigationPathEnum.FAQ_LIST, iconName: 'quiz'},
  {title: StringResources.CONFIG_PARAMETER_LIST, path: NavigationPathEnum.CONFIG_PARAMETER_LIST, iconName: 'settings'},
  {
    title: 'Report',
    children:
      [
        {title: StringResources.REPORT_INQUIRY, path: NavigationPathEnum.REPORT_INQUIRY, iconName: 'description'},
        {
          title: StringResources.REPORT_PUSH_NOTIFICATION,
          path: NavigationPathEnum.REPORT_PUSH_NOTIFICATION,
          iconName: 'description'
        },
      ],
    iconName: 'summarize'
  },
  {
    title: 'Lov',
    children:
      [
        {title: StringResources.ADDICTION_LIST, path: NavigationPathEnum.ADDICTION_LIST, iconName: 'description'},
        {title: StringResources.GOTRA_LIST, path: NavigationPathEnum.GOTRA_LIST, iconName: 'description'},
        {title: StringResources.GENDER_LIST, path: NavigationPathEnum.GENDER_LIST, iconName: 'description'},
        {
          title: StringResources.RELATION_SHIP_LIST,
          path: NavigationPathEnum.RELATION_SHIP_LIST,
          iconName: 'description'
        },
        {title: StringResources.RELIGION_LIST, path: NavigationPathEnum.RELIGION_LIST, iconName: 'description'},
        {title: StringResources.POST_LIST, path: NavigationPathEnum.POST_LIST, iconName: 'description'},
        {title: StringResources.SERVICE_LIST, path: NavigationPathEnum.SERVICE_LIST, iconName: 'description'},
        {title: StringResources.BUSINESS_LIST, path: NavigationPathEnum.BUSINESS_LIST, iconName: 'description'},
        {title: StringResources.JOB_TYPE_LIST, path: NavigationPathEnum.JOB_TYPE_LIST, iconName: 'description'},
        {title: StringResources.JOB_CATEGORY_LIST, path: NavigationPathEnum.JOB_CATEGORY_LIST, iconName: 'description'},
        {
          title: StringResources.JOB_SUB_CATEGORY_LIST,
          path: NavigationPathEnum.JOB_SUB_CATEGORY_LIST,
          iconName: 'description'
        },
        {title: StringResources.COUNTRY_LIST, path: NavigationPathEnum.COUNTRY_LIST, iconName: 'description'},
        {title: StringResources.STATE_LIST, path: NavigationPathEnum.STATE_LIST, iconName: 'description'},
        {title: StringResources.DISTRICT_LIST, path: NavigationPathEnum.DISTRICT_LIST, iconName: 'description'},
        {title: StringResources.CITY_VILLAGE_LIST, path: NavigationPathEnum.CITY_VILLAGE_LIST, iconName: 'description'},
        {title: StringResources.FAQ_CATEGORY_LIST, path: NavigationPathEnum.FAQ_CATEGORY_LIST, iconName: 'description'},
      ],
    iconName: 'description'
  }
];
