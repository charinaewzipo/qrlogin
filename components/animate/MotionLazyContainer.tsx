import { LazyMotion, m, domMax } from 'framer-motion'

type Props = {
    children: React.ReactNode
}

export default function MotionLazyContainer({ children }: Props) {
    return (
        <LazyMotion strict features={domMax}>
            <m.div style={{ height: '100%' }}> {children} </m.div>
        </LazyMotion>
    )
}
