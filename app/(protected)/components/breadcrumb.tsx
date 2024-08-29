'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

const Breadcrumbs = ({ subPageName }: { subPageName?: string | null }) => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  const page = paths[0] // page
  const subPageId = paths[1] // id

  return (
    <Breadcrumb className='mt-2 mb-4'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/dashboard'>Home</BreadcrumbLink>
        </BreadcrumbItem>

        {page ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${page}`} className='capitalize'>
                {page}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : null}

        {subPageId ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${page}/${subPageId}`}
                className='capitalize'
              >
                {subPageName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
