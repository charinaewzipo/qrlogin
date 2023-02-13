import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '@sentry/utils/createEmotionCache'
import palette from '@sentry/theme/palette'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="manifest" href="/manifest.json" />

                    <meta name="theme-color" content={palette('light').primary.main} />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/favicon/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon/favicon-16x16.png"
                    />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Barlow:wght@900&display=swap"
                        rel="stylesheet"
                    />

                    <meta name="emotion-insertion-point" content="" />
                    {(this.props as any).emotionStyleTags}

                    {/* TODO: Change this */}
                    {/* <meta name="description" content="" />
                    <meta
                        name="keywords"
                        content="react,material,kit,application,dashboard,admin,template"
                    /> */}
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (context) => {
    const originalRenderPage = context.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    context.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
        })

    const initialProps = await Document.getInitialProps(context)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        emotionStyleTags,
    }
}
