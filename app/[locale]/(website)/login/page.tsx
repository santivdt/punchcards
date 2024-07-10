import DemoButton from '@/app/[locale]/(website)/components/demo-button'
import { signIn } from '@/app/[locale]/(website)/login/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { SubmitButton } from './submit-button'
import initTranslations from '@/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'

const i18nNamespaces = ['login', 'home']

const Login = async ({
  searchParams,
  params,
}: {
  searchParams: { message: string }
  params: { locale: string }
}) => {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces)

  const RenderMessage = () => {
    switch (searchParams?.message) {
      case 'Could not authenticate user':
        return (
          <p className='text-center bg-red-200 p-2 mt-4 text-red-700 mb-8 w-[300px]'>
            {searchParams.message}
          </p>
        )
      case 'Check your email to confirm your email address. You can sign in afterwards':
        return (
          <p className='text-center bg-green-200 p-2 mt-4 text-green-700 mb-8 w-[300px]'>
            {searchParams.message}.
          </p>
        )
      default:
        return null
    }
  }
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}
    >
      <div className='flex justify-center items-center flex-col '>
        <div>
          <h1 className='text-2xl font-bold'>{t('header')}</h1>
          {searchParams?.message ? (
            <>
              <RenderMessage />
            </>
          ) : (
            <>
              <p className='mt-2'>{t('explanation')} </p>
            </>
          )}
          <form className='flex flex-col justify-center gap-2 w-[300px] mt-4'>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label className='text-md' htmlFor='email'>
                  {t('email')}
                </Label>
                <Input
                  className='px-4 py-2 mb-6 border rounded-md bg-inherit'
                  name='email'
                  placeholder='you@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label className='text-md' htmlFor='password'>
                  {t('password')}
                </Label>
                <Input
                  className='px-4 py-2 mb-6 border rounded-md bg-inherit'
                  type='password'
                  name='password'
                  required
                />
              </div>
              <SubmitButton
                formAction={signIn}
                className='px-4 py-2 mb-2 bg-black text-white border rounded-md '
                pendingText='Signing In...'
              >
                {t('signin')}
              </SubmitButton>

              <DemoButton />
            </div>

            <div className='mt-4 text-center'>
              {t('no-account')}
              <Link href='/signup' className='underline ml-2'>
                {t('signup')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </TranslationsProvider>
  )
}

export default Login
