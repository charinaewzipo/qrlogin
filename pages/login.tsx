// next
import Head from 'next/head'
import LoginLayout from '@ku/components/Login/Login'
import GuestGuard from '@ku/guard/GuestGuard'

export default function LoginPage() {
    return (
        <>
            <Head>
                <title> Login | KU </title>
            </Head>

            <GuestGuard>
                <LoginLayout />
            </GuestGuard>
        </>
    )
}
