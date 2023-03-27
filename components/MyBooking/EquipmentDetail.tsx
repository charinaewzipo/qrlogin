import { Stack, Paper, Typography, Divider } from '@mui/material'
import { orderBy } from 'lodash'
import ImagesCarousel from './ImagesCarousel'
import Label from '@sentry/components/label'

interface IEquipmentDetailProps {
    eqData: IV1RespGetBookingMeRead
}
function EquipmentDetail({ eqData }: IEquipmentDetailProps) {
    const imgSet = orderBy(eqData.eqPictures, 'eqpicSort').map((img) => img.eqpicLink)
    return (
        <Stack spacing={5}>
            <Paper elevation={3} sx={{ borderRadius: 2, p: 1 }}>
                <Stack spacing={8} direction="row">
                    <ImagesCarousel width={420} height={500} images={imgSet} />
                    <Stack pt={5} pr={8.5}>
                        <Label
                            mr="auto"
                            color={eqData.eqStatus === 'Available' ? 'success' : 'error'}
                        >
                            {eqData.eqStatus}
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
                            {eqData.eqCode}
                        </Typography>
                        <Typography variant="h5" paragraph>
                            {eqData.eqName}
                        </Typography>

                        <Divider sx={{ mt: 1, mb: 3 }} />

                        <Typography variant="subtitle1" paragraph mb={1} color="text.secondary">
                            {eqData.eqBrand}
                        </Typography>
                        <Typography variant="body2" paragraph mb={1} color="text.secondary">
                            {eqData.eqModel}
                        </Typography>
                        <Typography variant="caption" paragraph mb={1} color="text.disabled">
                            {eqData.eqDescription}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default EquipmentDetail
