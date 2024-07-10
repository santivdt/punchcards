import TranslationsProvider from '@/components/TranslationsProvider'
import Hero from './components/hero'
import initTranslations from '@/i18n'

const i18nNamespaces = ['home', 'website']

export default async function IndexPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces)
  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <div className='h-[calc(100vh-200px)] max-h-[1000px] flex items-start lg:items-center'>
        <Hero />
      </div>
    </TranslationsProvider>
  )
}
