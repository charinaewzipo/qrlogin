// import '../locales/i18n'
import 'simplebar/src/simplebar.css'
import 'react-image-lightbox/style.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-quill/dist/quill.snow.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import '@unfinity/styles/globals.scss'

import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Provider as ReduxProvider } from 'react-redux'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// TODO:
import { store } from '../redux'
import ThemeLocalization from '@unfinity/locales'

import createEmotionCache from '@sentry/utils/createEmotionCache'
import ThemeProvider from '@sentry/theme'
import { StyledChart } from '@sentry/components/chart'
import ProgressBar from '@sentry/components/progress-bar'
import SnackbarProvider from '@sentry/components/snackbar'
import { MotionLazyContainer } from '@sentry/components/animate'
import { ThemeSettings, SettingsProvider } from '@sentry/components/settings'
import { AuthProvider } from '@unfinity/contexts/AuthContext'

const clientSideEmotionCache = createEmotionCache()

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

interface UnfinityAppProps extends AppProps {
    emotionCache?: EmotionCache
    Component: NextPageWithLayout
}

function UnfinityApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: UnfinityAppProps) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <AuthProvider>
                <ReduxProvider store={store}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <SettingsProvider colorPreset="default">
                            <MotionLazyContainer>
                                <ThemeProvider themeDirection="ltr" themeMode="light">
                                    <ThemeSettings>
                                        <ThemeLocalization>
                                            <SnackbarProvider>
                                                <StyledChart />
                                                <ProgressBar />
                                                {getLayout(<Component {...pageProps} />)}
                                            </SnackbarProvider>
                                        </ThemeLocalization>
                                    </ThemeSettings>
                                </ThemeProvider>
                            </MotionLazyContainer>
                        </SettingsProvider>
                    </LocalizationProvider>
                </ReduxProvider>
            </AuthProvider>
        </CacheProvider>
    )
}

export default UnfinityApp
