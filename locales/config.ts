// @mui
import { enUS,thTH } from '@mui/material/locale'

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
    {
        label: 'English',
        value: 'en',
        systemValue: enUS,
        icon: '/assets/icons/flags/ic_flag_en.svg',
    },
    {
        label: 'Thailand',
        value: 'th',
        systemValue: thTH,
        icon: '/assets/icons/flags/ic_flag_fr.svg',
    },
]

export const defaultLang = allLangs[0] // English
