'use client'

import { CardWithClient } from '@/types/custom-types'
import { Tables } from '@/types/supabase'
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 30,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clientEmail: {
    fontSize: 10,
    color: '#666666',
  },
  cardInfo: {
    textAlign: 'right',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableHeader: {
    backgroundColor: '#E4E4E4',
    fontWeight: 'bold',
  },
  tableRowEven: {
    backgroundColor: '#F9F9F9',
  },
  tableRowOdd: {
    backgroundColor: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  totalRow: {
    backgroundColor: '#E4E4E4',
    fontWeight: 'bold',
  },
})

const Minimal = ({
  card,
  hours,
  organisation,
}: {
  card: CardWithClient
  hours: Tables<'hours'>[]
  organisation?: Tables<'organisations'> | null
}) => {
  const totalHours = hours.reduce((total, hour) => total + hour.duration, 0)
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.clientName}>{card?.clients?.name}</Text>
            <Text style={styles.clientEmail}>{card?.clients?.email}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text>Card number: {card.readable_id}</Text>
            <Text>Export date: {new Date().toLocaleDateString('en-GB')}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Description</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Duration</Text>
              </View>
            </View>
            {hours.map((hour, index) => (
              <View
                key={hour.id}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {new Date(hour.date).toLocaleDateString('en-GB')}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{hour.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{hour.duration}</Text>
                </View>
              </View>
            ))}
            <View style={[styles.tableRow, styles.totalRow]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total hours</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{totalHours}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.footer}>{organisation?.name}</Text>
      </Page>
    </Document>
  )
}

export default Minimal
