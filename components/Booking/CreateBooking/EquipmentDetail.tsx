import { Stack, Paper, Typography, Divider, Grid } from '@mui/material'
import { orderBy } from 'lodash'
import Label from '@sentry/components/label'
import { LoadingButton } from '@mui/lab'
import ImagesCarousel from './ImageCarousel'

const constant = {
    bookNow: 'Book Now',
}
interface IEquipmentDetailProps {
    bookingData: IV1RespGetBookingMeRead
    onClickBookNow: () => void
}
function EquipmentDetail({ bookingData, onClickBookNow }: IEquipmentDetailProps) {
    const imgSet = orderBy(bookingData.eqPictures, 'eqpicSort').map((img) => img.eqpicLink)
    return (
        <Stack spacing={5}>
            <Paper elevation={3} sx={{ borderRadius: 2, p: 1 }}>
                <Stack spacing={8} direction="row">
                    <Grid container spacing={8}>
                        <Grid item xs={12} md={7}>
                            <ImagesCarousel images={imgSet} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Stack pt={5} p={{ xs: 1, md: 0 }} pr={{ xs: 0, md: 8 }}>
                                <Label
                                    mr="auto"
                                    color={
                                        bookingData.eqStatus === 'Available' ? 'success' : 'error'
                                    }
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

                                <Typography
                                    variant="subtitle1"
                                    paragraph
                                    mb={1}
                                    color="text.secondary"
                                >
                                    {bookingData.eqBrand}
                                </Typography>
                                <Typography variant="body2" paragraph mb={1} color="text.secondary">
                                    {bookingData.eqModel}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    paragraph
                                    mb={3}
                                    color="text.disabled"
                                >
                                    {bookingData.eqDescription}
                                </Typography>
                                <Divider sx={{ mb: 4 }} />
                                <LoadingButton
                                    onClick={onClickBookNow}
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    {constant.bookNow}
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default EquipmentDetail
