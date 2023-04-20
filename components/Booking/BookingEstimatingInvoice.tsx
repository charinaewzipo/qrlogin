// @mui
import React, { useState } from 'react'
import { Box, Button, Card, Dialog, DialogActions, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme } from "@mui/material";
import { get, isEmpty, isNull } from "lodash";
import Label from "@sentry/components/label/Label";
import Scrollbar from "@sentry/components/scrollbar/Scrollbar";
import { styled } from "@mui/material";
import { Divider } from "@mui/material";
import LogoOnlyLayout from "@ku/layouts/LogoOnlyLayout";
import Iconify from "@sentry/components/iconify/Iconify";
import { PDFViewer } from '@react-pdf/renderer';
import InvoiceDetailPDF from '../Invoice/InvoiceDetailPDF';

type Props = {
  book: IV1RespGetBookingMeRead & IV1TablePayments;
};

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
export default function BookingEstimatingInvoice({ book }: Props) {
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={() => setOpen(false)}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoiceDetailPDF invoice={book} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
      <Card sx={{ pt: 5, px: 5, mt: 5 }}>

        <Stack direction={'row'} display={'flex'} justifyContent={'space-between'} height={100}>
          <LogoOnlyLayout />
          <Box></Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            <Button
              fullWidth
              color="info"
              size="small"
              variant='text'
              onClick={() => setOpen(true)}
              startIcon={<Iconify icon="ant-design:file-pdf-filled" />}
            >
              Download as PDF
            </Button>
            <Label color={'warning'} >{get(book, 'bookStatus', '').toLocaleUpperCase()}</Label>
          </Box>
        </Stack>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell align="left"> Description</TableCell>
                  <TableCell align="left">Qty</TableCell>

                  <TableCell align="right">Unit price</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!isEmpty(get(book, 'eqPrices', [])) && book.eqPrices.map((row, index) => (
                  <React.Fragment key={`key-row-${index}`}>
                    <TableRow
                      key={`rowPrice-${index}`}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                      }}
                    >
                      <TableCell align="left">
                        <Box sx={{ width: 460 }}>
                          <Typography variant="subtitle2">{get(row, 'eqpName', '')}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {get(row, 'eqpDescription', '')}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{get(row, 'eqpQuantity', 0).toLocaleString()}</TableCell>
                      <TableCell align="right">{`${isNull(get(row, 'eqpUnitPrice', 0)) ? 0 : get(row, 'eqpUnitPrice', 0).toLocaleString()} B/${isNull(get(row, 'eqpUnitPer', '')) ? '' : get(row, 'eqpUnitPer', '')}`}</TableCell>
                      <TableCell align="right">{`${(get(row, 'eqpTotal', 0)).toLocaleString()} B`}</TableCell>
                    </TableRow>

                    {!isEmpty(get(row, 'eqsubPrice', [])) && row.eqsubPrice.map((row, index) => (
                      <TableRow
                        key={`rowSubPrice-${index}`}
                        sx={{
                          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,

                        }}
                      >
                        <TableCell align="left" sx={{ pl: 5 }}>
                          <Box sx={{ width: 460 }}>
                            <Typography variant="subtitle2">{get(row, 'eqsubpName', '')}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>

                              {get(row, 'eqsubpDescription', '')}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="left">{get(row, 'eqsubpQuantity', 0).toLocaleString()}</TableCell>
                        <TableCell align="right">{`${isNull(get(row, 'eqsubpUnitPrice', 0)) ? 0 : get(row, 'eqsubpUnitPrice', 0).toLocaleString()} B/${isNull(get(row, 'eqsubpUnitPer', '')) ? '' : get(row, 'eqsubpUnitPer', '')}`}</TableCell>
                        <TableCell align="right">{`${(get(row, 'eqsubpTotal', 0)).toLocaleString()} B`}</TableCell>
                      </TableRow>

                    ))}
                  </React.Fragment>

                ))}

                <StyledRowResult>
                  <TableCell colSpan={2} />
                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 1 }} />
                    Subtotal
                  </TableCell>
                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 1 }} />
                    {`${get(book, 'eqPriceSubTotal', 0).toLocaleString()} B`}
                  </TableCell>
                </StyledRowResult>
                <StyledRowResult>
                  <TableCell colSpan={2} />
                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 1 }} />
                    OT Charge
                  </TableCell>
                  <TableCell align="right" width={120} sx={{ typography: 'body2', color: get(book, 'payOt', 0) === 0 ? 'text.secondary' : 'text.primary' }}>
                    <Box sx={{ mt: 1 }} />
                    {get(book, 'payOt', 0) === 0 ? 'Not including' : `${get(book, 'payOt', 0).toLocaleString()} B`}
                  </TableCell>
                </StyledRowResult>
                <StyledRowResult>
                  <TableCell colSpan={2} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    Discount
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body2', color: get(book, 'payDiscount', 0) === 0 ? 'text.secondary' : theme.palette.error.main }}>
                    <Box sx={{ mt: 1 }} />
                    {get(book, 'payDiscount', 0) === 0 ? 'Not including' : `-${get(book, 'payDiscount', 0).toLocaleString()} B`}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={2} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    Fees
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body2', color: get(book, 'payFees', 0) === 0 ? 'text.secondary' : 'text.primary' }}>
                    <Box sx={{ mt: 1 }} />
                    {get(book, 'payFees', 0) === 0 ? 'Not including' : `${get(book, 'payFees', 0).toLocaleString()} B`}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={2} />

                  <TableCell align="right" sx={{ typography: 'h6' }}>
                    Total Estimated
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                    {`${get(book, 'payTotal', 0).toLocaleString()} B`}
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">NOTES</Typography>

            <Typography variant="body2">

              This price is estimated price not actual price.
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Have a Question?</Typography>

            <Typography variant="body2">Please contact admin</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
