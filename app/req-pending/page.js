'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import collapseIcon from '/public/collapse.svg'
import arrowIcon from '/public/arrow.svg'
import { useRouter } from 'next/navigation'



export default function AdminTools() {
  const router = useRouter()
  
  const [data, setData] = useState([])
  const [collapsed, setCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/data')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [])

  const pending = data.filter(
    (row) =>
      row['ID Verification'] === 'Not verified' ||
      row['Portfolio Verification'] === 'Not verified'
  )

  const totalPages = Math.ceil(pending.length / rowsPerPage)

  const paginatedData = pending.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const getPaginationRange = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex justify-center items-start py-[87px] px-[79px] font-[Inter]">
      <div className="w-[925px] border border-[#FAFAFA] rounded-[15px]
       px-[60px] py-[30px] overflow-hidden text-sm bg-[#FFF]">

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[14px] text-[#000] font-medium">Requests Pending</p>
            <p className="text-[24px] text-[#000] font-bold">{pending?.length ?? 0}</p>
          </div>
          <button
            onClick={() => router.push('http://localhost:3000/overview')}
            className="w-[89px] h-[36px] flex items-center justify-center gap-[12px] rounded-full bg-[#1B1B1B] text-[#F9FAFB] text-[12px]"
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
                        Name
                        <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                          <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                        </span>
                      </th>
                  <th className="text-left text-[#495057] font-semibold px-3 py-2">
                    Username
                    <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                          <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                        </span>
                      </th>
                  <th className="text-left text-[#495057] font-semibold px-3 py-2">Verification Submitted
                    <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                          <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                        </span>
                  </th>
                  <th className="text-left text-[#495057] font-semibold px-3 py-2">Subscribtion
                    <span className="inline-block ml-1 px-[12px] py-[4px] align-middle">
                          <Image src={arrowIcon} alt="arrow" width={24} height={24} />
                        </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, i) => (
                  <tr key={i} className="even:bg-[#FAFAFA] odd:bg-[#FAFAFA]">
                    <td className="text-[#666666] px-[13px] py-[12px]">{row['Member Name']}</td>
                    <td className="text-[#666666] px-[13px] py-[12px]">{row['Username']}</td>
                    <td className="text-[#666666] px-[13px] py-[12px]">{row['ID Verification']}</td>
                    <td className="text-[#666666] px-[13px] py-[12px]">{row['Subscription']}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Bottom Right */}
            <div className="flex justify-end mt-6 gap-[8px]">
             
              {getPaginationRange().map((page, i) =>
                page === '...' ? (
                  <span key={i} className="text-[#0573E9] text-[15px] px-2">...</span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`text-[15px] bg-[#FFF] border-[1px] border-[#FFF] px-2 ${
                      currentPage === page ? 'font-bold underline text-[#0573E9]' : 'text-[#0573E9]'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

            </div>
          </>
        )}
      </div>
    </div>
  )
}
