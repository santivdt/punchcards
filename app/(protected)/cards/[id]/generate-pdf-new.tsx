'use client'

import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    fontFamily: 'Inter',
  },
  section: {
    margin: 10,
    padding: 10,
  },
})

const GeneratePdfNew = ({
  client,
  card,
  hours,
}: {
  client: Tables<'clients'>
  card: Tables<'cards'>
  hours: Tables<'hours'>[]
}) => {
  const totalHours = hours.reduce((total, hour) => total + hour.duration, 0)

  const CardExport = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>
            Card {card.readable_id} - {client.name}
          </Text>
          <Text style={{ fontSize: 12 }}>
            Exported at: {new Date().toLocaleDateString('en-GB')}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={{ marginBottom: 10 }}>Hours</Text>
          <View style={{ marginTop: 10 }}>
            {hours.map((hour, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5 }}
              >
                <Text style={{ width: '20%', fontSize: 12 }}>
                  {new Date(hour.date).toLocaleDateString('en-GB')}
                </Text>
                <Text style={{ width: '20%', fontSize: 12 }}>
                  {hour.description}
                </Text>
                <Text style={{ width: '20%', fontSize: 12 }}>
                  {hour.duration}
                </Text>
              </View>
            ))}
            <View
              style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5 }}
            >
              <Text style={{ width: '20%', fontSize: 12 }}>Total</Text>
              <Text style={{ width: '20%', fontSize: 12 }}></Text>
              <Text style={{ width: '20%', fontSize: 12 }}>{totalHours}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )

  return (
    <PDFDownloadLink document={<CardExport />} fileName='example.pdf'>
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : <Button>Download PDF</Button>
      }
    </PDFDownloadLink>
  )
}

export default GeneratePdfNew
