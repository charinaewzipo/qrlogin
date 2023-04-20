import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});
Font.register({
  family: 'THSarabunNew',
  fonts: [{ src: '/fonts/THSarabunNew.ttf' },
    , { src: '/fonts/THSarabunNew Bold.ttf' },
  { src: '/fonts/THSarabunNew Italic.ttf', fontStyle: 'italic' }, { src: '/fonts/THSarabunNew BoldItalic.ttf', fontStyle: 'italic', }
  ],
});
const styles = StyleSheet.create({
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  body2: { fontSize: 9, color: '#637381' },
  body2_Thai: { fontSize: 13, fontFamily: 'THSarabunNew', lineHeight: 1 },
  subtitle2_Thai: { fontSize: 13, fontWeight: 700, fontFamily: 'THSarabunNew', lineHeight: 1 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  subtitle2_header: { fontSize: 9, fontWeight: 700, color: '#637381' },
  alignRight: { textAlign: 'right' },
  page: {
    padding: '40px 24px 40px 24px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
    color: '#212B36'
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '50%', paddingLeft: 16 },
  tableCell_3: { width: '15%' },

});

export default styles;
