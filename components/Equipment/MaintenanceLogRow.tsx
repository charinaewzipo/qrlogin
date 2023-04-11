// @mui
import { TableRow, TableCell, Typography } from '@mui/material';
import Label from '@sentry/components/label/Label';
// utils
import { get } from 'lodash';
import { fCurrencyBaht } from '@ku/utils/formatNumber';
import { fileNameByUrl } from '@sentry/components/file-thumbnail';
import axios from 'axios';
import { fDateTimeFormat } from '@sentry/utils/formatDateTime';
// ----------------------------------------------------------------------

type Props = {
  row: IV1GetEquipmentMaintenanceRead
  onClickRow: (id: number) => void
}

export default function MaintenanceLogRow({
  row,
  onClickRow
}: Props) {
  const handleDownload = async () => {
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

  const handleClickRow = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      id: number
  ) => {
      const eventTargetId = String(get(e.target, 'id', ''))
      if (eventTargetId === 'downloadFile') return
      onClickRow(id)
  }


  return (
      <TableRow
          hover
          tabIndex={-1}
          role="none"
          onClick={(e) => handleClickRow(e, get(row, 'eqmtnId', 0))}
          sx={{ cursor: 'pointer' }}
      >
          <TableCell align="left">
              <Typography variant="body2">
                  {fDateTimeFormat(get(row, 'eqmtnDate', ''), 'DD MMM YYYY')}
              </Typography>
          </TableCell>
          <TableCell align="right">
              <Typography
                  variant="body2"
                  whiteSpace='nowrap'
              >
                  {fCurrencyBaht(get(row, 'eqmtnCost', ''))}
              </Typography>
          </TableCell>
          <TableCell align="center">
              <Label
                  onClick={handleDownload}
                  variant="outlined"
                  color="info"
                  sx={{ cursor: 'pointer' }}
                  id='downloadFile'
              >
                  {fileNameByUrl(get(row, 'eqmtnpicLink', ''))}
              </Label>
          </TableCell>
          <TableCell align="left">
              <Typography
                  variant="body2"
                  sx={{ wordBreak: 'break-word' }}
              >
                  {get(row, 'eqmtnDescription', '')}
              </Typography>
          </TableCell>

          <TableCell align="left">
              <Typography variant="body2">
                  {fDateTimeFormat(get(row, 'eqmtnCreatedAt', ''), 'DD MMM YYYY HH:mm:ss')}
              </Typography>
          </TableCell>
      </TableRow>
  )
}
