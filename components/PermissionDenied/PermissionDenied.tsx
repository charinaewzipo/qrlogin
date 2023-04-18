import { m } from 'framer-motion'
// next
import Head from 'next/head'
import NextLink from 'next/link'
// @mui
import { Button, Typography } from '@mui/material'
// layouts
import CompactLayout from '@ku/layouts/compact'
// components
import { MotionContainer, varBounce } from '@sentry/components/animate'
// assets
import { ForbiddenIllustration } from '@sentry/assets/illustrations'

export default function PermissionDenied() {
    return (
        <CompactLayout>
            <Head>
                <title> Permission Denied </title>
            </Head>

            <MotionContainer>
                <m.div variants={varBounce().in}>
                    <Typography variant="h3" paragraph>
                        Sorry, you don't have permission to access.
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Please contact the website administrator if you believe this is in error.
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <ForbiddenIllustration
                        sx={{
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />
                </m.div>

                <NextLink href="/" passHref>
                    <Button size="large" variant="contained">
                        Go to Home
                    </Button>
                </NextLink>
            </MotionContainer>
        </CompactLayout>
    )
}
