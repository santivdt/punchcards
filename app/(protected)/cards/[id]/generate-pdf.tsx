'use client'

import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import Minimal from './pdf'
import { CardWithClient } from '@/types/custom-types'
import dynamic from 'next/dynamic'

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)

const GeneratePdfNew = ({
  organisation,
  card,
  hours,
}: {
  organisation?: Tables<'organisations'> | null
  card: CardWithClient
  hours: Tables<'hours'>[]
}) => {
  return (
    <PDFDownloadLink
      document={
        <Minimal card={card} hours={hours} organisation={organisation} />
      }
      fileName={`${card.readable_id} - ${card?.clients?.name}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          'Loading document...'
        ) : (
          <Button className='hidden lg:inline-flex mr-2'>Download PDF</Button>
        )
      }
    </PDFDownloadLink>
  )
}

export default GeneratePdfNew
