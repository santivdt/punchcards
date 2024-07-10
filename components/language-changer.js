//TODO make typescript
'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18nConfig from '@/i18nConfig'
import i18n from '@/i18n'
import { Globe } from 'lucide-react'

export default function LanguageChanger() {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language || 'en'
  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = (value) => {
    const newLocale = value

    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className='w-[180px]'>
        <Globe size={13} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='en'>en</SelectItem>
        <SelectItem value='nl'>nl</SelectItem>
        <SelectItem value='de'>de</SelectItem>
      </SelectContent>
    </Select>
  )
}
