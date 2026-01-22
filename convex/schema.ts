import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    message: v.string(),
    status: v.optional(v.string()), // "new", "contacted", "converted", "archived"
    source: v.optional(v.string()), // "contact-page", "popup", "hero"
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index('by_email', ['email'])
    .index('by_status', ['status'])
    .index('by_createdAt', ['createdAt']),
})
