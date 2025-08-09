'use client'

import { useState } from 'react'
import Image from 'next/image'
import collapseIcon from '/public/collapse.svg'
import arrowIcon from '/public/arrow.svg'
import { useRouter } from 'next/navigation'
// Static rows for Performance Summary
const PERFORMANCE_DATA = [
  { Title: 'Buy 1 Get 1 Free',       Status: 'Expires 3 days',  ConversionRate: '22%', Clicks: '1,240' },
  { Title: '30% off Selected Items', Status: 'Expires 1 day',   ConversionRate: '19%', Clicks: '1,090' },
  { Title: 'Black Friday Sale',      Status: 'Expired 1 week',  ConversionRate: '25%', Clicks: '--' },
  { Title: 'Buy 1 Get 1 Free',       Status: 'Expired 1 week',  ConversionRate: '29%', Clicks: '--' },
  { Title: '30% off Selected Items', Status: 'Expired 2 weeks', ConversionRate: '30%', Clicks: '--' },
  { Title: 'Black Friday Sale',      Status: 'Expired 3 weeks', ConversionRate: '44%', Clicks: '--' },
  { Title: 'Buy 1 Get 1 Free',       Status: 'Expired 1 month', ConversionRate: '18%', Clicks: '--' },
  { Title: '30% off Selected Items', Status: 'Expired 2 months',ConversionRate: '32%', Clicks: '--' },
  { Title: 'Black Friday Sale',      Status: 'Expired 2 months',ConversionRate: '35%', Clicks: '--' },
  { Title: 'Buy 1 Get 1 Free',       Status: 'Expired 3 months',ConversionRate: '25%', Clicks: '--' },
]



export default function AdminTools() {
    
  const router = useRouter()

  const [data] = useState(PERFORMANCE_DATA)
  const [collapsed, setCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  // paginate the static data (kept for consistency)
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex justify-center items-start py-[87px] px-[79px] font-[Inter]">
      <div className="w-[925px] border border-[#FAFAFA] rounded-[12px] px-[60px] py-[30px] overflow-hidden text-sm bg-[#FFF]">

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[14px] text-[#000] font-medium">Performance Summary</p>
            <p className="text-[24px] text-[#000] font-bold">{data.length}</p>
          </div>
          <button
            onClick={() => router.push('http://localhost:3000/overview')}
            className="w-[89px] h-[36px] flex items-center justify-center gap-[12px] 
            rounded-full bg-[#1B1B1B] text-[#F9FAFB] text-[12px]"
          >
            {collapsed ? 'Expand' : 'Collapse'}
            <Image src={collapseIcon} alt="arrow" width={24} height={24} />
          </button>
        </div>

        {!collapsed && (
          <>
            <table className="w-full border-collapse text-sm">
              <thead className="w-[80px] px-[16px] py-[13px] border-[1px] border-[#EFF2F7]">
                <tr>
                  <th className="text-left text-[#495057] font-semibold px-[3px] py-[2px]">
                    Title
                    <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                      <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                    </span>
                  </th>
                  <th className="text-left text-[#495057] font-semibold px-3 py-2">
                    Status
                    <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                      <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                    </span>
                  </th>
                  <th className="text-left text-[#495057] font-semibold px-3 py-2">
                    Conversion Rate
                    <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                      <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                    </span>
                  </th>
                  <th className="text-left text-[#495057] font-semibold px-3 py-2">
                    Clicks/Last 24 Hours
                    <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                      <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, i) => (
                  <tr key={i} className="even:bg-[#FAFAFA] odd:bg-[#FAFAFA]">
                    <td className="text-[#666666] px-[13px] py-[12px]">{row.Title}</td>
                    <td className="text-[#666666] px-[13px] py-[12px]">{row.Status}</td>
                    <td className="text-[#666666] px-[13px] py-[12px]">{row.ConversionRate}</td>
                    <td className="text-[#666666] px-[13px] py-[12px]">{row.Clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Bottom Right (static display: 1 2 3 4 5 6 ...) */}
            <div className="flex justify-end mt-6 gap-[8px]">
              

              {[1, 2, 3, 4, 5, 6].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`text-[15px] bg-[#FFF] border-[1px] border-[#FFF] px-2 ${
                    currentPage === page ? 'font-bold underline text-[#0573E9]' : 'text-[#0573E9]'
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="text-[#0573E9] text-[15px] px-2">...</span>

            </div>
          </>
        )}
      </div>
    </div>
  )
}
