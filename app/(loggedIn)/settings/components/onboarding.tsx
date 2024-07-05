import { Tables } from '@/types/supabase'
import { Link } from 'nextjs13-progress'

type OnboardingProps = {
  userProfile: Tables<'profiles'> | null
  organisation: Tables<'organisations'> | null
}

const Onboarding = ({ userProfile, organisation }: OnboardingProps) => {
  return (
    <div className='mb-6 border dark:bg-purple-300 border-purple-700 p-4 w-full rounded bg-purple-50'>
      {(!userProfile?.first_name || !userProfile?.last_name) &&
        !organisation?.name && (
          <p className='dark:text-black'>
            Finish your profile by adding your{' '}
            <Link
              href='/settings/profile'
              className='underline decoration-1 underline-offset-2'
            >
              personal
            </Link>{' '}
            and{' '}
            <Link
              href='/settings/organisation'
              className='underline decoration-1 underline-offset-2'
            >
              company
            </Link>{' '}
            details
          </p>
        )}

      {(!userProfile?.first_name || !userProfile?.last_name) &&
        organisation?.name && (
          <p className='dark:text-black'>
            Finish your profile by adding your{' '}
            <Link
              href='/settings/profile'
              className='underline decoration-1 underline-offset-2'
            >
              personal
            </Link>{' '}
            details.
          </p>
        )}

      {userProfile?.first_name &&
        userProfile?.last_name &&
        !organisation?.name && (
          <p className='dark:text-black'>
            Finish your profile by adding your{' '}
            <Link
              href='/settings/organisation'
              className='underline decoration-1 underline-offset-2'
            >
              company
            </Link>{' '}
            details
          </p>
        )}
    </div>
  )
}

export default Onboarding
