//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
}

const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/list',
    '@fullcalendar/react',
    '@fullcalendar/timegrid',
    '@fullcalendar/timeline',
]);

module.exports = withTM(withNx(nextConfig))