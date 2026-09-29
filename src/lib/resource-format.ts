import { resourceTypeLabels, type ResourceType } from '@/lib/resource-types'

export const formatPublishDate = (value?: null | string): null | string => {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export const labelForResourceType = (value?: null | ResourceType): string =>
  value ? resourceTypeLabels[value] : 'Resource'
