/**
 * The resource formats, shared by the Payload collection and the public
 * resources UI so the two can never drift apart.
 */
export const resourceTypeOptions = [
  { label: 'Article', value: 'article' },
  { label: 'Paper', value: 'paper' },
  { label: 'Guide', value: 'guide' },
  { label: 'Report', value: 'report' },
  { label: 'Video', value: 'video' },
  { label: 'Tool', value: 'tool' },
  { label: 'Other', value: 'other' },
] as const

export type ResourceType = (typeof resourceTypeOptions)[number]['value']

export const resourceTypeLabels = Object.fromEntries(
  resourceTypeOptions.map((option) => [option.value, option.label]),
) as Record<ResourceType, string>
