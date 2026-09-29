import type { Field, FieldHook } from 'payload'

/** Turns "HIV & Women's Health" into "hiv-womens-health". */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * URL slug field for a collection. Sits in the admin sidebar and is generated
 * from `sourceField` (the title by default) whenever it is left blank, so an
 * editor never has to think about it.
 */
export const slugField = (sourceField = 'title'): Field => {
  const beforeValidate: FieldHook = ({ data, value }) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      return slugify(value)
    }

    const source = (data as Record<string, unknown> | undefined)?.[sourceField]

    if (typeof source === 'string' && source.trim().length > 0) {
      return slugify(source)
    }

    return value
  }

  return {
    name: 'slug',
    type: 'text',
    required: true,
    index: true,
    unique: true,
    admin: {
      position: 'sidebar',
      description: 'Used in the page URL. Generated from the title when left blank.',
    },
    hooks: {
      beforeValidate: [beforeValidate],
    },
  }
}
