'use client'

import { Button } from '@/components/ui/button'
import { CardWithClient } from '@/types/custom-types'
import { Tables } from '@/types/supabase'
import { customFormatDuration, formatDate } from '@/utils/'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { ArrowDownToLine } from 'lucide-react'

type GeneratePDFButtonProps = {
  card: CardWithClient
  hours: Tables<'hours'>[]
}

const GeneratePDFButton = ({ card, hours }: GeneratePDFButtonProps) => {
  const cardTable = hours.map((obj) => [
    formatDate(obj.date),
    obj.description,
    customFormatDuration(obj.duration),
  ])

  const formattedDate = formatDate(card.created_at)

  const generatePDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text(`Card ${card.readable_id} - ${card.clients?.name}`, 15, 20)
    doc.setFontSize(12)
    doc.text(`${formattedDate}`, 15, 30)

    autoTable(doc, {
      headStyles: { fillColor: 0, textColor: 255 },
      theme: 'plain',
      startY: 40,
      head: [['Date', 'Description', 'Duration']],
      body: cardTable,
    })

    doc.save(`Card ${card.readable_id} - ${card.clients?.name}.pdf`)
  }

  return (
    <>
      <Button
        variant='default'
        className='hidden lg:inline-flex text-md h-12 px-3 lg:mr-2 rounded-md gap-1 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
        onClick={generatePDF}
      >
        <ArrowDownToLine size={16} /> Export
      </Button>
      <Button
        variant='default'
        className='lg:hidden text-md h-10 px-3 mr-2 rounded-md gap-1 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
        onClick={generatePDF}
      >
        <ArrowDownToLine size={16} />
      </Button>
    </>
  )
}

export default GeneratePDFButton
