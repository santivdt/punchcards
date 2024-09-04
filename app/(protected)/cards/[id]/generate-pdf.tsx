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
          <Button className='hidden lg:inline-flex text-md h-12 px-3 rounded-md gap-1 mr-2 dark:bg-neutral-900 border-neutral-300 dark:text-neutral-300 bg-neutral-100 text-slate-12 hover:bg-slate-4 focus-visible:ring-2 focus-visible:ring-slate-7 focus-visible:outline-none focus-visible:bg-slate-4 disabled:hover:bg-slate-4 items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'>
            Download PDF
          </Button>
        )
      }
    </PDFDownloadLink>
  )
}

export default GeneratePdfNew
