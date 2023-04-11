// routes
import {
    DASHBOARD_PATH,
    ACCOUNT_PATH,
    PRIVACY_POLICIES_PATH,
    ASSESSMENT_PATH,
    BOOKING_PATH,
    BOOKING_REPORT_PATH,
    MY_BOOKING_PATH,
    EQUIPMENT_PATH,
} from '@ku/constants/routes'
// components
import SvgColor from '@sentry/components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
)

const ICONS = {
    dashboard: icon('ic_dashboard'),
    person: icon('ic_user'),
    booking: icon('ic_blank'),
    bookingReport: icon('ic_invoice'),
    myBooking: icon('ic_booking'),
    equipment: icon('ic_ecommerce'),
    assessments: icon('ic_chat'),
    privacy: icon('ic_file'),
    profile: icon('ic_profile'),

    label: icon('ic_label'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    invoice: icon('ic_invoice'),
    calendar: icon('ic_calendar'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
}

const navConfig = (privilege: TPermission) => [
    // GENERAL
    // ----------------------------------------------------------------------
    ...(privilege === 'ADMIN'
        ? [
              {
                  subheader: 'admin menus',
                  items: [
                      { title: 'Dashboard', path: DASHBOARD_PATH, icon: ICONS.dashboard },
                      { title: 'Accounts', path: ACCOUNT_PATH, icon: ICONS.person },
                      { title: 'Booking', path: BOOKING_PATH, icon: ICONS.booking },
                      {
                          title: 'Booking Report',
                          path: BOOKING_REPORT_PATH,
                          icon: ICONS.bookingReport,
                      },
                      { title: 'My Booking', path: MY_BOOKING_PATH, icon: ICONS.myBooking },
                      { title: 'Equipments', path: EQUIPMENT_PATH, icon: ICONS.equipment },
                      { title: 'Assessments', path: ASSESSMENT_PATH, icon: ICONS.assessments },
                      {
                          title: 'Privacy Policies',
                          path: PRIVACY_POLICIES_PATH,
                          icon: ICONS.privacy,
                      },
                  ],
              },
          ]
        : []),
    ...(privilege === 'FINANCE'
        ? [
              {
                  subheader: 'Finance menus',
                  items: [
                      { title: 'Dashboard', path: DASHBOARD_PATH, icon: ICONS.dashboard },
                      {
                          title: 'Booking Report',
                          path: BOOKING_REPORT_PATH,
                          icon: ICONS.bookingReport,
                      },
                  ],
              },
          ]
        : []),
    ...(privilege === 'SUPERVISOR'
        ? [
              {
                  subheader: 'Supervisor menus',
                  items: [
                      { title: 'Dashboard', path: DASHBOARD_PATH, icon: ICONS.dashboard },
                      { title: 'Accounts', path: ACCOUNT_PATH, icon: ICONS.person },
                      { title: 'Booking', path: BOOKING_PATH, icon: ICONS.booking },
                      {
                          title: 'Booking Report',
                          path: BOOKING_REPORT_PATH,
                          icon: ICONS.bookingReport,
                      },
                      { title: 'My Booking', path: MY_BOOKING_PATH, icon: ICONS.myBooking },
                  ],
              },
          ]
        : []),
    ...(privilege === 'USER'
        ? [
              {
                  subheader: 'User menus',
                  items: [
                      { title: 'Dashboard', path: DASHBOARD_PATH, icon: ICONS.dashboard },
                      { title: 'Booking', path: BOOKING_PATH, icon: ICONS.booking },
                      { title: 'My Booking', path: MY_BOOKING_PATH, icon: ICONS.myBooking },
                  ],
              },
          ]
        : []),
]

export default navConfig
