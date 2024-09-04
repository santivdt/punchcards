'use client'

import { PDFViewer } from '@react-pdf/renderer'
import Minimal from './pdf'
import { Tables } from '@/types/supabase'
import { CardWithClient } from '@/types/custom-types'

const ViewPdf = ({
  card,
  hours,
  organisation,
}: {
  card: CardWithClient
  hours: Tables<'hours'>[]
  organisation: Tables<'organisations'>
}) => {
  return (
    <PDFViewer className='h-screen w-screen' width='100%' height='100%'>
      <Minimal card={card} hours={hours} organisation={organisation} />
    </PDFViewer>
  )
}

export default ViewPdf
