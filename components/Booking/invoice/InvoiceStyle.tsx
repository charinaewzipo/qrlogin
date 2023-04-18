import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});
Font.register({
  family: 'THSarabunNew',
  fonts: [{ src: '/fonts/THSarabunNew.ttf' }, { src: '/fonts/THSarabunNew Bold.ttf' },
    //  { src: '/fonts/THSarabunNew Italic.ttf' }, { src: '/fonts/THSarabunNew BoldItalic.ttf' }
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

  h1: { fontSize: 54, fontWeight: 700 },
  h2: { fontSize: 24, fontWeight: 700 },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  h5: { fontSize: 11, fontWeight: 700 },

  body1: { fontSize: 16, fontWeight: 700 },
  body2: { fontSize: 12, lineHeight: '0.9' },
  subtitle2: { fontSize: 12, fontWeight: 700 },
  subtitle3: { fontSize: 12, fontWeight: 'normal' },
  alignRight: { textAlign: 'right' },
  borderStyle: { border: '0.5px solid black', padding: '0px 5px 0px 5px' },
  page: {
    padding: '10px 12px 0 12px',
    fontSize: 10,
    lineHeight: 'normal',
    // lineHeight: 1.6,
    fontFamily: 'THSarabunNew',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
    fontStyle: 'normal'
  },
  footer: {
    left: '5px',
    right: 0,
    bottom: '5px',
    margin: '0 5px 30px 5px',
    position: 'absolute',
  },
  footer2: {
    left: '5px',
    right: '5px',
    bottom: '15px',
    margin: '0 5px 0px 5px',
    position: 'absolute',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: '96%' },
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    border: '0.5px solid black',
    backgroundColor: '#d9d9d9'
  },
  tableBody: {},
  tableRow: {
    lineHeight: 1,
    marginTop: '-0.5px',
    padding: '0px 0.5px',
    flexDirection: 'row',
    alignItems: "flex-start",
    border: '0.5px solid black',
  },
  tableRow2: {
    lineHeight: 1,
    marginTop: '-0.5px',
    padding: '0px 0.5px',
    flexDirection: 'row',
    alignItems: "flex-start",
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '30%', padding: '0 5px' },
  tableCell_2: { width: '70%', borderLeft: '0.5px solid black', padding: '0 5px' },
  tableCell_3: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  tableCell_4: { width: '70%', padding: '0 5px' },
});

export default styles;
