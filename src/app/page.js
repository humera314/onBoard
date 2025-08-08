'use client'

export default function AdminTools() {
  return (
    <div className="p-6 space-y-10 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold">Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: 'User Feedback', value: '3,671' },
          { label: 'Ticket Submit', value: '100' },
          { label: 'Ticket Closed', value: '50' },
          { label: 'Teams', value: '50' },
          { label: 'Admin', value: '2' },
        ].map((item) => (
          <div className="bg-white rounded shadow p-4 text-center" key={item.label}>
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="text-2xl font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>

    
  )
}
