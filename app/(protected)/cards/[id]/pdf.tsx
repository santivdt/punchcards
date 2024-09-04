'use client'

import { CardWithClient } from '@/types/custom-types'
import { Tables } from '@/types/supabase'
import { Document, Page, Text, View, Svg, Line } from '@react-pdf/renderer'

function LineComponent({ style }: { style?: any }) {
  return (
    <View style={style}>
      <Svg height='4' width='100%' style={{ width: '100%' }}>
        <Line
          x1='0%'
          x2='2000'
          y1='50%'
          y2='50%'
          stroke='rgba(191, 191, 191, 1)'
        />
      </Svg>
    </View>
  )
}

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
      <Page
        size='A4'
        style={{
          fontSize: 11,
          padding: 30,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
        }}
      >
        <View
          style={{
            padding: 16,
            paddingBottom: 128,
            width: '100%',
          }}
        >
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '100%' }}>
              <Text>{`${card.clients?.name}\n${card.clients?.email}`}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <View style={{ alignItems: 'flex-start' }}>
                <Text>Card Number:</Text>
                <Text>Export Date:</Text>
              </View>
              <View style={{ alignItems: 'flex-end', marginLeft: 16 }}>
                <Text>{card.readable_id}</Text>
                <Text>{new Date().toLocaleDateString('en-GB')}</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            paddingBottom: 0,
            color: '#666',
          }}
        >
          <Text style={{ width: '100%' }}>Description</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Text>Duration</Text>
          </View>
        </View>
        <LineComponent style={{ padding: 8, width: '100%' }} />

        {hours.map((hour, index) => {
          const isLast = index === hours.length - 1

          return (
            <View
              key={hour.id}
              style={{
                flexDirection: 'row',
                padding: 16,
                paddingBottom: isLast ? 16 : 0,
              }}
            >
              <Text style={{ width: '100%', paddingRight: 32 }}>
                {hour.description}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <Text>{hour.duration} h</Text>
              </View>
            </View>
          )
        })}

        <LineComponent style={{ padding: 8, width: '100%' }} />

        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '100%' }} />
            <View style={{ width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={{ width: '100%' }}>Total</Text>
                <Text style={{ width: '100%', textAlign: 'right' }}>
                  {totalHours} hours
                </Text>
              </View>

              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                <LineComponent />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            width: '100%',
            padding: 6,
            paddingTop: 128,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Text>{organisation?.name}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default Minimal
