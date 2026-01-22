/* eslint-disable */
import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  Trash2,
  Users,
  Calendar,
  Mail,
  Building,
  MessageSquare,
  Search,
  X,
  CheckCircle,
  XCircle,
  Filter,
} from 'lucide-react'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

interface ContactForm {
  $id: string
  name: string
  email: string
  company: string
  message: string
  $createdAt: string
  qualified?: boolean
}

interface ContactFormTableProps {
  contactForms: ContactForm[]
  onDelete: (id: string) => void
  onBulkDelete?: (ids: string[]) => void
  onQualifyToggle: (id: string, qualified: boolean) => void
}

const ContactFormTable: React.FC<ContactFormTableProps> = ({
  contactForms,
  onDelete,
  onBulkDelete,
  onQualifyToggle,
}) => {
  const [localContactForms, setLocalContactForms] =
    useState<ContactForm[]>(contactForms)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [qualifiedFilter, setQualifiedFilter] = useState('all')
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showBulkDeletePopup, setShowBulkDeletePopup] = useState(false)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  // Update local contact forms when props change
  useEffect(() => {
    setLocalContactForms(contactForms)
  }, [contactForms])

  // Filter contact forms based on search and qualification status
  const filteredContactForms = useMemo(() => {
    return localContactForms.filter((form) => {
      const matchesSearch =
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.message.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesQualified = true
      if (qualifiedFilter !== 'all') {
        if (qualifiedFilter === 'qualified') {
          matchesQualified = form.qualified === true
        } else if (qualifiedFilter === 'unqualified') {
          matchesQualified =
            form.qualified === false || form.qualified === undefined
        }
      }

      return matchesSearch && matchesQualified
    })
  }, [localContactForms, searchTerm, qualifiedFilter])

  // Bulk selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredContactForms.map((form) => form.$id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectContactForm = (id: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedIds)
    if (checked) {
      newSelectedIds.add(id)
    } else {
      newSelectedIds.delete(id)
    }
    setSelectedIds(newSelectedIds)
  }

  const handleBulkDelete = () => {
    if (selectedIds.size > 0 && onBulkDelete) {
      // Remove from local state immediately (optimistic update)
      setLocalContactForms((prev) =>
        prev.filter((form) => !selectedIds.has(form.$id)),
      )
      // Call parent bulk delete function
      onBulkDelete(Array.from(selectedIds))
      // Clear selection
      setSelectedIds(new Set())
      setShowBulkDeletePopup(false)
    }
  }

  const handleDeleteClick = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    const buttonRect = event.currentTarget.getBoundingClientRect()
    const popupWidth = 288 // w-72 = 288px
    const popupHeight = 140 // approximate height

    // Calculate position with screen bounds checking
    let top = buttonRect.top - popupHeight - 10 // 10px gap above button
    let left = buttonRect.left - popupWidth / 2 + buttonRect.width / 2 // Center horizontally

    // Ensure popup doesn't go off screen
    if (top < 10) {
      top = buttonRect.bottom + 10 // Show below if no space above
    }

    if (left < 10) {
      left = 10 // Keep within left boundary
    } else if (left + popupWidth > window.innerWidth - 10) {
      left = window.innerWidth - popupWidth - 10 // Keep within right boundary
    }

    setPopupPosition({ top, left })
    setDeleteId(id)
    setShowDeletePopup(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      // Immediately remove from local state (optimistic update)
      setLocalContactForms((prev) =>
        prev.filter((form) => form.$id !== deleteId),
      )

      // Call parent delete function for server-side deletion
      onDelete(deleteId)

      // Close popup
      setDeleteId(null)
      setShowDeletePopup(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteId(null)
    setShowDeletePopup(false)
  }

  // Close popup when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showDeletePopup) {
        setShowDeletePopup(false)
        setDeleteId(null)
      }
    }

    if (showDeletePopup) {
      document.addEventListener('keydown', handleEscapeKey)
      return () => {
        document.removeEventListener('keydown', handleEscapeKey)
      }
    }
  }, [showDeletePopup])

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contact forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={qualifiedFilter}
                onChange={(e) => setQualifiedFilter(e.target.value)}
                className="flex h-10 w-[180px] items-center justify-between rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Forms</option>
                <option value="qualified">Qualified</option>
                <option value="unqualified">Unqualified</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {selectedIds.size} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  Clear Selection
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkDeletePopup(true)}
                  className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedIds.size})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Forms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Forms ({filteredContactForms.length})</CardTitle>
          <CardDescription>
            A list of all contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.size === filteredContactForms.length &&
                        filteredContactForms.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded focus:ring-neutral-500 dark:focus:ring-neutral-400"
                    />
                  </div>
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContactForms.map((form) => (
                <TableRow
                  key={form.$id}
                  className={
                    selectedIds.has(form.$id)
                      ? 'bg-neutral-50 dark:bg-neutral-800/50'
                      : ''
                  }
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(form.$id)}
                      onChange={(e) =>
                        handleSelectContactForm(form.$id, e.target.checked)
                      }
                      className="w-4 h-4 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded focus:ring-neutral-500 dark:focus:ring-neutral-400"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{form.name}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {form.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {form.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => onQualifyToggle(form.$id, !form.qualified)}
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                        form.qualified
                          ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {form.qualified ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Qualified
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" />
                          Unqualified
                        </>
                      )}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div
                      className="max-w-[300px] truncate"
                      title={form.message}
                    >
                      {form.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {dayjs(form.$createdAt).format('MMM DD, YYYY')}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="relative">
                      <Button
                        ref={deleteId === form.$id ? deleteButtonRef : null}
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDeleteClick(form.$id, e)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredContactForms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No contact forms found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'Try adjusting your search'
                  : 'No contact form submissions yet'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Delete Confirmation Popup */}
      {showBulkDeletePopup && (
        <>
          {/* Backdrop/Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={() => setShowBulkDeletePopup(false)}
          />

          {/* Popup */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl p-6 w-96 max-w-[90vw]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Delete Multiple Contact Forms
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {selectedIds.size} forms selected
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBulkDeletePopup(false)}
                className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              Are you sure you want to delete these {selectedIds.size} contact
              forms? This action cannot be undone and will permanently remove
              all selected contact form submissions from your database.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowBulkDeletePopup(false)}
                className="flex-1 border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:text-neutral-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBulkDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white border-red-600 dark:border-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete {selectedIds.size} Forms
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Custom Delete Confirmation Popup */}
      {showDeletePopup && deleteId && (
        <>
          {/* Backdrop/Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={handleCancelDelete}
          />

          {/* Popup */}
          <div
            className="fixed z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl p-4 w-72"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Delete Contact Form
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCancelDelete()
                }}
                className="h-6 w-6 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
              Are you sure you want to delete this contact form submission? This
              action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCancelDelete()
                }}
                className="flex-1 text-xs border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:text-neutral-100"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleConfirmDelete()
                }}
                className="flex-1 text-xs bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ContactFormTable
