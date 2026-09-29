import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { anyone, isAdmin, isAdminOrEditor } from '../access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Shared media library: cover images for resources and downloadable PDFs.
 *
 * Files are written to disk for now. Once the Cloudflare R2 credentials are
 * present the S3 storage plugin (see `payload.config.ts`) takes over
 * automatically and these uploads are served from R2 instead.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: anyone,
    update: isAdminOrEditor,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'feature', width: 1600, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Describe the image for screen readers. Not needed for PDFs.',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
