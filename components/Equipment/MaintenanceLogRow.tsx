// @mui
import { TableRow, TableCell, Typography } from '@mui/material';
import Label from '@sentry/components/label/Label';
// utils
import { format } from 'date-fns'
import { get } from 'lodash';
import { fCurrencyBaht } from '@ku/utils/formatNumber';
import { fileNameByUrl } from '@sentry/components/file-thumbnail';
import axios from '@ku/services/axios';
// ----------------------------------------------------------------------

type Props = {
  row: IV1GetEquipmentMaintenanceRead
}

export default function MaintenanceLogRow({
  row,
}: Props) {
  const handleDownload = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
      const eventTargetTag = String(get(e.target, 'tagName', ''))
      if (eventTargetTag === 'BUTTON' || eventTargetTag === 'svg' || eventTargetTag === 'path') return

      const response = await axios({
          method: 'get',
          url: get(row, 'eqmtnpicLink', ''),
          responseType: 'blob',
      })
      const blob = new Blob([response.data], { type: response.headers['content-type'] })
      const fileURL = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = fileURL
      link.download = fileNameByUrl(get(row, 'eqmtnpicLink', ''))
      link.target = "_blank"
      
      link.click()
      link.remove()
  }
  return (
      <>
          <TableRow hover tabIndex={-1} role="none">
              <TableCell align="left">
                  <Typography variant="body2">
                      {format(new Date(get(row, 'eqmtnDate', '').replace('Z', '')), 'dd MMM yyyy')}
                  </Typography>
              </TableCell>
              <TableCell align="right">
                  <Typography variant="body2">
                      {fCurrencyBaht(get(row, 'eqmtnCost', ''))}
                  </Typography>
              </TableCell>
              <TableCell align="center">
                  <Label onClick={handleDownload} variant="outlined" color="info" sx={{ cursor: 'pointer' }} >
                      {fileNameByUrl(get(row, 'eqmtnpicLink', ''))}
                  </Label>
              </TableCell>
              <TableCell align="left">
                  <Typography variant="body2">{get(row, 'eqmtnDescription', '')}</Typography>
              </TableCell>

              <TableCell align="left">
                  <Typography variant="body2">
                      {format(new Date(get(row, 'eqmtnCreatedAt', '').replace('Z', '')), 'dd MMM yyyy HH:mm:ss')}
                  </Typography>
              </TableCell>
          </TableRow>
      </>
  )
}
