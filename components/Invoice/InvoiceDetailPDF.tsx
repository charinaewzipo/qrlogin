/* eslint-disable jsx-a11y/alt-text */
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils

import styles from './InvoiceDetailStyle';
import { get, isEmpty, isNull } from 'lodash';
// ----------------------------------------------------------------------

type Props = {
  invoice: IV1RespGetBookingMeRead & IV1TablePayments;
};

export default function InvoiceDetailPDF({ invoice }: Props) {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]} fixed>
          <Image source="/assets/images/logo/logo.png" style={{ height: 32 }} />

        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader} fixed>
            <View style={styles.tableRow}>

              <View style={styles.tableCell_2}>
                <Text style={[styles.subtitle2_header]} >Description</Text>
              </View>

              <View style={[styles.tableCell_3, { paddingLeft: '16px' }]}>
                <Text style={[styles.subtitle2_header, { paddingLeft: '16px' }]}>Qty</Text>
              </View>

              <View style={[styles.tableCell_3, , styles.alignRight]}>
                <Text style={[styles.subtitle2_header]}>Unit price</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={[styles.subtitle2_header]}>Total</Text>
              </View>
            </View>
          </View>

          <View style={[styles.tableBody]}>
            {!isEmpty(get(invoice, 'eqPrices', [])) && invoice.eqPrices.map((item, index) => (
              <>
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCell_2}>
                    <Text style={styles.subtitle2_Thai}>{get(item, 'eqpName', '')}</Text>
                    <Text style={[styles.body2_Thai, { color: '#637381', maxHeight: '60px' }]}>{get(item, 'eqpDescription', '')}</Text>
                  </View>
                  <View style={[styles.tableCell_3, { paddingLeft: '16px' }]}>
                    <Text style={[styles.body2_Thai, { paddingLeft: '16px' }]}>{get(item, 'eqpQuantity', 0).toLocaleString()}</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text style={styles.body2_Thai}>{`${isNull(get(item, 'eqpUnitPrice', 0)) ? 0 : get(item, 'eqpUnitPrice', 0).toLocaleString()} B/${isNull(get(item, 'eqpUnitPer', '')) ? '' : get(item, 'eqpUnitPer', '')}`}</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text style={styles.body2_Thai}>{`${(get(item, 'eqpTotal', 0)).toLocaleString()} B`}</Text>
                  </View>
                </View>

                {!isEmpty(get(item, 'eqsubPrice', [])) && item.eqsubPrice.map((row, index) => (
                  <View style={[styles.tableRow]} key={index}>
                    <View style={[styles.tableCell_2,]}>
                      <Text style={[styles.subtitle2_Thai, { paddingLeft: '16px' }]}>{get(row, 'eqsubpName', '')}</Text>
                      <Text style={[styles.body2_Thai, { color: '#637381', paddingLeft: '16px', maxHeight: '60px' }]}>{get(row, 'eqsubpDescription', '')}</Text>
                    </View>
                    <View style={[styles.tableCell_3, { paddingLeft: '16px' }]}>
                      <Text style={[styles.body2_Thai, { paddingLeft: '16px' }]}>{get(row, 'eqsubpQuantity', 0).toLocaleString()}</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={styles.body2_Thai}>{`${isNull(get(row, 'eqsubpUnitPrice', 0)) ? 0 : get(row, 'eqsubpUnitPrice', 0).toLocaleString()} B/ `}</Text>
                        <Text style={styles.body2_Thai}>{`${isNull(get(row, 'eqsubpUnitPer', '')) ? '' : get(row, 'eqsubpUnitPer', '')}`}</Text>
                      </View>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text style={styles.body2_Thai}>{`${(get(row, 'eqsubpTotal', 0)).toLocaleString()} B`}</Text>
                    </View>
                  </View>
                ))}



              </>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.body1}>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{`${get(invoice, 'eqPriceSubTotal', 0).toLocaleString()} B`}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.body1}>OT Charge</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight, { color: get(invoice, 'payOt', 0) === 0 ? '#637381' : '#212B36' }]}>
                <Text>{get(invoice, 'payOt', 0) === 0 ? 'Not including' : `${get(invoice, 'payOt', 0).toLocaleString()} B`}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.body1}>Discount</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight, { color: get(invoice, 'payDiscount', 0) === 0 ? '#637381' : '#FF5630' }]}>
                <Text>{get(invoice, 'payDiscount', 0) === 0 ? 'Not including' : `-${get(invoice, 'payDiscount', 0).toLocaleString()} B`}</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.body1}>Fees</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight, { color: get(invoice, 'payFees', 0) === 0 ? '#637381' : '#212B36' }]}>
                <Text>{get(invoice, 'payFees', 0) === 0 ? 'Not including' : `-${get(invoice, 'payFees', 0).toLocaleString()} B`}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={[styles.body1, { fontWeight: 700 }]}>Total Estimated</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={{ fontWeight: 700 }}> {`${get(invoice, 'payTotal', 0).toLocaleString()} B`}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>
              This price is estimated price not actual price.
            </Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>Please contact admin</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
