/* eslint-disable jsx-a11y/alt-text */
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils

import styles from './InvoiceStyle';
import { format } from 'date-fns';

// ----------------------------------------------------------------------

export default function InvoicePDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.borderStyle, { flexDirection: 'row', alignItems: 'center' }]}>
          <View style={{ height: 90, width: 90 }}>
            <Image source="/assets/images/logo/logo-without-text.png" style={{ height: '100%', objectFit: 'contain' }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', marginLeft: '20px', alignItems: 'flex-start', }}>
              <Text style={[styles.body1, { lineHeight: 1 }]}>Scientific Equipment Center (SEC)</Text>
              <Text style={styles.body2}>Faculty of Science, Kasetsart University</Text>
              <Text style={styles.body2}>50 Ngamwongwan Rd</Text>
              <Text style={styles.body2}>Latyaod Chatuchak Bangkok</Text>
              <Text style={styles.body2}>10900 Thailand</Text>
              <Text style={styles.body2}>Tel. 02-562-5555 ext 646154-646156</Text>
            </View>
            <View style={{ flexDirection: 'column', marginRight: '10px' }}>
              <Text style={styles.h1}>Bill Payment</Text>
              <Text style={[styles.h2,]}>ใบชำระค่าบริการผ่านธนาคาร</Text>
            </View>
          </View>
        </View>
        <View style={[styles.borderStyle, { flexDirection: 'row', alignItems: 'center', marginTop: '5px' }]}>
          <View style={{ height: 90, width: 90 }}>
            <Image source="/assets/images/logo/logo-without-text.png" style={{ height: '100%', objectFit: 'contain' }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', marginLeft: '20px', alignItems: 'flex-start' }}>
              <Text style={[styles.body2, { fontWeight: 700 }]}>คณะวิทยาศาสตร์มหาวิทยาลัยเกษตรศาสตร์</Text>
              <Text style={[styles.body2, { fontWeight: 700 }]}>50 ถนนงามวงศ์วาน แขวงลาดยาว</Text>
              <Text style={[styles.body2, { fontWeight: 700 }]}>เขตจตุจักร กรุงเทพมหานคร 10900</Text>
            </View>
            <View style={{ height: 100, width: 100, marginRight: '10px' }}>
              <Image source="/assets/images/logo/logottb.png" style={{ height: '100%', objectFit: 'contain' }} />
            </View>
          </View>
        </View>

        <View style={[styles.borderStyle, { flexDirection: 'column', alignItems: 'center', borderTopWidth: 0 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', margin: '5px 0', padding: '0 5px' }}>
            <Text style={styles.body1}>ธนาคารทหารไทยธนชาต Comp. Code: 2560</Text>
            <Text style={[styles.body1, { fontWeight: 'normal' }]}>สาขาผู้รับฝาก_____________</Text>
            <Text style={[styles.body1, { fontWeight: 'normal' }]}>วันที่/Date_______________</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.body2, { fontWeight: 700 }]}>รายละเอียดการชำระเงิน</Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>ชื่อผู้ชำระ (Customer Name)</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Pattanan Nuchan 016471 (Booking)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>รหัสคณะ (Ref. No.1)</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>010-401-0010</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>รหัสรายได้ (Ref. No.2)</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>101</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>จำนวนเงิน</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>25.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>จำนวณเงินตัวอักษร</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>ยี่สินห้า บาทถ้วน</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>หมายเหตุ</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle3}>- กรณีชำระด้วยเช็ค มหาวิทยาลัยฯ จะถือว่าการชำระมีผลสมบูรณ์ต่อเมื่อธนาคารเรียกเก็บเงินตามเช็คได้</Text>
                <Text style={styles.subtitle3}>- ธนาคารจะรับเช็คที่อยู่ในสำนักหักบัญชีเดียวกันเท่านั้น</Text>
              </View>
            </View>
          </View>
          <View style={[styles.table, { flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }]}>
            <View style={{ flexDirection: 'column', marginLeft: '10px' }}>
              <Text style={styles.body2}>ชำระค่าบริการ ได้ที่ธนาคารทหารไทยธนชาต ได้ทุกสาขาทั่วประเทศ</Text>
              <Text style={styles.body2}>ชื่อผู้นำฝาก คณะวิทยาศาสตร์ โทรศัพท์ 02-562-5555</Text>
            </View>
            <View style={{ flexDirection: 'column', width: '25%' }}>
              <View style={[{ flexDirection: 'column', border: '0.5px solid black', }]}>
                <View style={[styles.tableCell_3, { height: '20px', borderBottom: '0.5px solid black' }]}></View>
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>ผู้รับเงิน / Collector</Text>
                </View>
              </View>
            </View>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
            <Text style={[styles.subtitle2, { lineHeight: 0.9, fontStyle: 'italic' }]}>ส่วนที่ 1 สำหรับธนาคาร</Text>
          </View>
        </View>

        <View style={{ border: '0.5px dashed black', marginTop: '5px' }}></View>
        <View style={[styles.borderStyle, { flexDirection: 'row', alignItems: 'center', marginTop: '5px' }]}>
          <View style={{ height: 90, width: 90 }}>
            <Image source="/assets/images/logo/logo-without-text.png" style={{ height: '100%', objectFit: 'contain' }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', marginLeft: '20px', alignItems: 'flex-start' }}>
              <Text style={[styles.body2, { fontWeight: 700 }]}>คณะวิทยาศาสตร์มหาวิทยาลัยเกษตรศาสตร์</Text>
              <Text style={[styles.body2, { fontWeight: 700 }]}>50 ถนนงามวงศ์วาน แขวงลาดยาว</Text>
              <Text style={[styles.body2, { fontWeight: 700 }]}>เขตจตุจักร กรุงเทพมหานคร 10900</Text>
            </View>
            <View style={{ height: 100, width: 100, marginRight: '10px' }}>
              <Image source="/assets/images/logo/logottb.png" style={{ height: '100%', objectFit: 'contain' }} />
            </View>
          </View>
        </View>

        <View style={[styles.borderStyle, { flexDirection: 'column', alignItems: 'center', borderTopWidth: 0 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', margin: '5px 0', padding: '0 5px' }}>
            <Text style={styles.body1}>ธนาคารทหารไทยธนชาต Comp. Code: 2560</Text>
            <Text style={[styles.body1, { fontWeight: 'normal' }]}>สาขาผู้รับฝาก_____________</Text>
            <Text style={[styles.body1, { fontWeight: 'normal' }]}>วันที่/Date_______________</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.body2, { fontWeight: 700 }]}>รายละเอียดการชำระเงิน</Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>ชื่อผู้ชำระ (Customer Name)</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Pattanan Nuchan 016471 (Booking)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>รหัสคณะ (Ref. No.1)</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>010-401-0010</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>รหัสรายได้ (Ref. No.2)</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>101</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>จำนวนเงิน</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>25.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>จำนวณเงินตัวอักษร</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>ยี่สินห้า บาทถ้วน</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle3}>หมายเหตุ</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle3}>- กรณีชำระด้วยเช็ค มหาวิทยาลัยฯ จะถือว่าการชำระมีผลสมบูรณ์ต่อเมื่อธนาคารเรียกเก็บเงินตามเช็คได้</Text>
                <Text style={styles.subtitle3}>- ธนาคารจะรับเช็คที่อยู่ในสำนักหักบัญชีเดียวกันเท่านั้น</Text>
              </View>
            </View>
          </View>
          <View style={[styles.table, { flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }]}>
            <View style={{ flexDirection: 'column', marginLeft: '10px' }}>
              <Text style={styles.body2}>ชำระค่าบริการ ได้ที่ธนาคารทหารไทยธนชาต ได้ทุกสาขาทั่วประเทศ</Text>
              <Text style={styles.body2}>ชื่อผู้นำฝาก คณะวิทยาศาสตร์ โทรศัพท์ 02-562-5555</Text>
            </View>
            <View style={{ flexDirection: 'column', width: '25%' }}>
              <View style={[{ flexDirection: 'column', border: '0.5px solid black', }]}>
                <View style={[styles.tableCell_3, { height: '20px', borderBottom: '0.5px solid black' }]}></View>
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>ผู้รับเงิน / Collector</Text>
                </View>
              </View>
            </View>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
            <Text style={[styles.subtitle2, { lineHeight: 0.9, fontStyle: 'italic' }]}>ส่วนที่ 2 สำหรับลูกค้า</Text>
          </View>
        </View>

        <View style={[styles.borderStyle, styles.footer, { width: '100%', color: 'black' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: '5px 0' }}>
            <Text style={styles.body1}>สำหรับผู้ขอรับบริการศูนย์เครื่องมือวิทยาศาสตร์ คณะวิทยาศาสตร์ มก.</Text>
          </View>
          <View style={styles.tableRow2}>
            <View style={styles.tableCell_1}>
              <Text style={styles.subtitle3}>ชื่อผู้ขอรับบริการ</Text>
            </View>
            <View style={styles.tableCell_4}>
              <Text style={styles.subtitle2}>Pattanan Nuchan 016471 (Booking)</Text>
            </View>
          </View>
          <View style={styles.tableRow2}>
            <View style={styles.tableCell_1}>
              <Text style={styles.subtitle3}>ต้องการออกใบเสร็จในนาม</Text>
            </View>
            <View style={styles.tableCell_4}>
              <Text style={styles.subtitle2}>__________________________</Text>
            </View>
          </View>
          <View style={[{ margin: '5px 0 0 -5px' }]}>
            <Text style={styles.subtitle3}>*** ชื่อผู้นำฝากควรเป็นชื่อเดียวกับ ชื่อผู้ขอรับบริการ ***</Text>
          </View>
        </View>
        <View style={styles.footer2}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: '0px 5px 0px 5px' }}>
            <Text style={[styles.body1, { fontWeight: 'normal' }]}>Print Date {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
