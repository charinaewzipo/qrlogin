import { formatToTimeZone } from 'date-fns-timezone'
export const getTimeOfDay = (timeArray: number[]) => {
    const timeDay = {
        Early_morning: [7, 8, 9, 10, 11, 12],
        Afternoon: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        Full_Day: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    }
    if (timeArray.every((i) => timeDay.Early_morning.includes(i))) {
        return 'Early morning'
    } else if (timeArray.every((i) => timeDay.Afternoon.includes(i))) {
        return 'Afternoon'
    } else if (timeArray.every((i) => timeDay.Full_Day.includes(i))) {
        return 'Full Day'
    } else return 'Early morning'
}
export function fDateTimeFormatAPI(date?: Date | string | number) {
    if (!date) {
        return ''
    }
    return formatToTimeZone(new Date(date), 'YYYY-MM-DDT00:00:00', { timeZone: 'UTC' })
}
