import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Create a new contact submission
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    message: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert('contacts', {
      name: args.name,
      email: args.email,
      phoneNumber: args.phoneNumber,
      message: args.message,
      status: 'new',
      source: args.source ?? 'contact-page',
      createdAt: Date.now(),
    })

    return contactId
  },
})

// Get all contacts (for admin dashboard)
export const list = query({
  args: {
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let contactsQuery = ctx.db.query('contacts').order('desc')

    if (args.status) {
      contactsQuery = ctx.db
        .query('contacts')
        .withIndex('by_status', (q) => q.eq('status', args.status))
        .order('desc')
    }

    const contacts = await contactsQuery.take(args.limit ?? 100)

    return contacts
  },
})

// Get a single contact by ID
export const get = query({
  args: { id: v.id('contacts') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Update contact status
export const updateStatus = mutation({
  args: {
    id: v.id('contacts'),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      notes: args.notes,
      updatedAt: Date.now(),
    })
  },
})

// Delete a contact
export const remove = mutation({
  args: { id: v.id('contacts') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Get contacts count by status
export const getStats = query({
  handler: async (ctx) => {
    const allContacts = await ctx.db.query('contacts').collect()

    const stats = {
      total: allContacts.length,
      new: allContacts.filter((c) => c.status === 'new').length,
      contacted: allContacts.filter((c) => c.status === 'contacted').length,
      converted: allContacts.filter((c) => c.status === 'converted').length,
      archived: allContacts.filter((c) => c.status === 'archived').length,
    }

    return stats
  },
})
