import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Returns the shared Payload instance for use in Server Components and
 * route handlers. `getPayload` caches the instance for the lifetime of the
 * process, so calling this per-request is cheap.
 */
export const getPayloadClient = () => getPayload({ config })
