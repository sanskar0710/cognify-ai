import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg mb-4 w-1/2"></div>
      <div className="space-y-3">
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}
