// routes
import { ROOT_PATH, DASHBOARD_PATH, ACCOUNT_PATH } from '@ku/constants/routes'
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

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'admin menus',
        items: [
            { title: 'Dashboard', path: DASHBOARD_PATH, icon: ICONS.dashboard },
            { title: 'Accounts', path: ACCOUNT_PATH, icon: ICONS.person },
            { title: 'Booking', path: ROOT_PATH, icon: ICONS.booking },
            { title: 'Booking Report', path: ROOT_PATH, icon: ICONS.bookingReport },
            { title: 'My Booking', path: ROOT_PATH, icon: ICONS.myBooking },
            { title: 'Equipments', path: ROOT_PATH, icon: ICONS.equipment },
            { title: 'Assessments', path: ROOT_PATH, icon: ICONS.assessments },
            { title: 'Privacy Policies', path: ROOT_PATH, icon: ICONS.privacy },
        ],
    },
]

export default navConfig
