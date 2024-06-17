'use client'
import { getCardFromId } from '@/app/(loggedIn)/cards/actions'
import { getClient } from '@/app/(loggedIn)/clients/actions'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'

const replaceDashWithSpace = (arr: string[]) => {
  return arr.map((str) => {
    if (str.length < 15) {
      return str.replace(/-/g, ' ')
    }
    return str
  })
}

//TODO Ask Giel about this seems like a hack

const Breadcrumbs = () => {
  const pathname = usePathname()
  const [crumbs, setCrumbs] = useState<string[] | null>([])

  useEffect(() => {
    const fetchBreadcrumbs = async () => {
      let pathSegments = pathname.split('/').filter(Boolean)

      pathSegments = replaceDashWithSpace(pathSegments)

      if (pathSegments.length < 2) {
        return setCrumbs(pathSegments)
      }

      if (pathSegments[0] === 'clients') {
        const crumbPromises = pathSegments.map(async (item) => {
          if (item.length > 10) {
            const { data: client } = await getClient(item)
            return client ? client.name : item
          }
          return item
        })

        const resolvedCrumbs = (await Promise.all(crumbPromises)).filter(
          (item): item is string => item !== null
        )
        setCrumbs(resolvedCrumbs)
      } else if (pathSegments[0] === 'cards') {
        const crumbPromises = pathSegments.map(async (item) => {
          if (item.length > 10) {
            const { data: card } = await getCardFromId(item)
            return card ? `#${card.readable_id}` : item
          }
          return item
        })

        const resolvedCrumbs = (await Promise.all(crumbPromises)).filter(
          (item): item is string => item !== null
        )
        setCrumbs(resolvedCrumbs)
      }
    }

    fetchBreadcrumbs()
  }, [pathname])

  const pathLength = crumbs?.length

  return (
    <Breadcrumb className='mt-2 mb-4'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/dashboard'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs && crumbs.length > 0 && <BreadcrumbSeparator />}
        {crumbs &&
          crumbs.slice(0, -1).map((item, index) => {
            const pathSegmentsForUrl = pathname.split('/').filter(Boolean)
            const url = `/${pathSegmentsForUrl.slice(0, index + 1).join('/')}`

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={url}>{item}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            )
          })}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {pathLength && pathLength > 0 ? crumbs.slice(-1).toString() : null}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
