import { Stack, Paper, Typography, Divider } from '@mui/material'
import { orderBy } from 'lodash'
import ImagesCarousel from './ImagesCarousel'
import Label from '@sentry/components/label'

interface IEquipmentDetailProps {
    bookingData: IV1RespGetBookingMeRead
}
function EquipmentDetail({ bookingData }: IEquipmentDetailProps) {
    const imgSet = orderBy(bookingData.eqPictures, 'eqpicSort').map((img) => img.eqpicLink)
    return (
        <Stack spacing={5}>
            <Paper elevation={3} sx={{ borderRadius: 2, p: 1 }}>
                <Stack spacing={8} direction="row">
                    <ImagesCarousel width={420} height={500} images={imgSet} />
                    <Stack pt={5} pr={8.5}>
                        <Label
                            mr="auto"
                            color={bookingData.eqStatus === 'Available' ? 'success' : 'error'}
                        >
                            {bookingData.eqStatus}
                        </Label>
                        <Typography
                            variant="overline"
                            sx={{
                                mt: 2,
                                mb: 1,
                                display: 'block',
                                color: (theme) => theme.palette.info.main,
                            }}
                        >
                            {bookingData.eqCode}
                        </Typography>
                        <Typography variant="h5" paragraph>
                            {bookingData.eqName}
                        </Typography>

                        <Divider sx={{ mt: 1, mb: 3 }} />

                        <Typography variant="subtitle1" paragraph mb={1} color="text.secondary">
                            {bookingData.eqBrand}
                        </Typography>
                        <Typography variant="body2" paragraph mb={1} color="text.secondary">
                            {bookingData.eqModel}
                        </Typography>
                        <Typography variant="caption" paragraph mb={1} color="text.disabled">
                            {bookingData.eqDescription}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default EquipmentDetail
