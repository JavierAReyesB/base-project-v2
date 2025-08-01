'use client'

import { useState } from 'react'
import { Expand, Shrink, MapPin, FileText } from 'lucide-react'
import clsx from 'clsx'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export interface MobileCardProps<T extends Record<string, any>> {
  data: T
  titleField?: keyof T
  hiddenFields?: (keyof T)[]
  collapsedFields?: (keyof T)[] // <- nuevo: qué mostrar en contraído
  expandedFieldOrder?: (keyof T)[] // <- nuevo: orden personalizado
  defaultCompact?: boolean
}

export default function MobileCard<T extends Record<string, any>>({
  data,
  titleField,
  hiddenFields = [],
  collapsedFields = [], // si no defines nada, no muestra extra en contraído
  expandedFieldOrder,
  defaultCompact = true
}: MobileCardProps<T>) {
  const [compact, setCompact] = useState(defaultCompact)

  const visibleEntries = Object.entries(data).filter(
    ([key]) => !hiddenFields.includes(key as keyof T)
  )

  const isImage = (val: any) =>
    typeof val === 'string' && /\.(jpg|jpeg|png|webp|gif|svg)$/.test(val)

  const isBadgeField = (key: string) =>
    ['estado', 'tipoProducto', 'status', 'category', 'type'].includes(
      key.toLowerCase()
    )

  // Reordenar según expandedFieldOrder si está definido
  const orderedEntries = expandedFieldOrder
    ? expandedFieldOrder
        .map((field) => visibleEntries.find(([k]) => k === field))
        .filter(Boolean) as [string, any][]
    : visibleEntries

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-sm transition-all hover:shadow-md">
      {/* Encabezado */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Imagen pequeña */}
          {isImage(data?.foto) && (
            <Image
              src={String(data.foto)}
              alt={titleField ? String(data[titleField]) : 'Imagen'}
              width={48}
              height={48}
              className="rounded-lg object-cover border"
              onError={(e) => {
                e.currentTarget.src = '/mock/img/productoprueba.png'
              }}
            />
          )}

          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-sm text-gray-900 truncate dark:text-gray-100 cursor-pointer"
              onClick={() => console.log('Drawer abierto o acción externa')}
            >
              {titleField ? String(data[titleField]) : 'Detalle'}
            </h3>

            {/* Mostrar collapsedFields */}
            {collapsedFields.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {collapsedFields.map((field) =>
                  data[field] ? (
                    <span
                      key={String(field)}
                      className="text-xs text-gray-500 flex items-center gap-1 truncate"
                    >
                      {String(data[field])}
                    </span>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>

        {/* Botón expandir/contraer */}
        <button
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
          onClick={(e) => {
            e.stopPropagation()
            setCompact(!compact)
          }}
        >
          {compact ? (
            <Expand size={18} className="text-gray-500 dark:text-gray-400" />
          ) : (
            <Shrink size={18} className="text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Contenido expandido */}
      {!compact && (
        <div className="border-t bg-gray-50/50 dark:bg-gray-800/40 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {orderedEntries.map(([key, value]) => {
              const isObservaciones = key.toLowerCase() === 'observaciones'

              return (
                <div
                  key={`entry-${key}`}
                  className={clsx(
                    'flex flex-col',
                    isObservaciones && 'col-span-2 sm:col-span-3'
                  )}
                >
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {key}
                  </span>

                  {isImage(value) ? (
                    <Image
                      src={String(value)}
                      alt={key}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover border shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = '/mock/img/productoprueba.png'
                      }}
                    />
                  ) : isBadgeField(key) ? (
                    <Badge variant="outline" className="bg-gray-100">
                      {String(value ?? '—')}
                    </Badge>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                      {String(value ?? '—')}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
