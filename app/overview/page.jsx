'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import arrowIcon from '/public/arrow.svg'
import filterIcon from '/public/Filter.svg'
import greenDot from '/public/green.svg'
import redDot from '/public/red.svg'
import collapseIcon from '/public/collapse.svg'
import { useRouter } from 'next/navigation'

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';


const visitClickData= [ 
  { month: "Jul 2024", visits:25, clicks: 15 },
  { month: "Aug 2024", visits: 15, clicks:135 },
  { month: "Sep 2024", visits:240, clicks:175 },
  { month: "Oct 2024", visits: 100, clicks:350 },
  { month: "Nov 2024", visits:260, clicks: 122 },
  { month: "Dec 2024", visits:480, clicks: 180 },
  { month: "Jan 2025", visits: 120, clicks: 300 },
];

const conversionsData = [
  { date: '22 Feb', google: 2, facebook: 1, instagram: 2, total: 5 },
  { date: '23 Feb', google: 3, facebook: 2, instagram: 3, total: 8 },
  { date: '24 Feb', google: 5, facebook: 3, instagram: 5, total: 13 },
  { date: '25 Feb', google: 10, facebook: 6, instagram: 8, total: 24 },
  { date: '26 Feb', google: 3, facebook: 3, instagram: 3, total: 9 },
  { date: '27 Feb', google: 6, facebook: 5, instagram: 5, total: 16 },
  { date: '28 Feb', google: 8, facebook: 7, instagram: 11, total: 26 }
];

export default function OverviewPage() {
  const [data, setData] = useState([])
  const [pendingCollapsed, setPendingCollapsed] = useState(false)
  const [completedCollapsed, setCompletedCollapsed] = useState(false)

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/data');
      setData(res.data);
    } catch (err) {
      alert(`Failed to load data: ${err?.message || 'Unknown error'}`);
    }
  };

  fetchData();
}, []);


  const pending = data.filter(
  (user) =>
    user['ID Verification'] === 'Not verified' ||
    user['Portfolio Verification'] === 'Not verified'
)

const completed = data.filter(
  (user) =>
    user['ID Verification'] === 'Verified' &&
    user['Portfolio Verification'] === 'Verified'
)
 
const router = useRouter()

  return (
    
    <div className="max-w-[1440px] mx-auto bg-[#F0F9FF]  px-[160px] py-[60px] gap-[40px] min-h-screen">
      <h1 className="w-full text-[#2E2A2A] text-[30px] font-semibold leading-[42px] font-inter mb-6">
          Overview
      </h1>



      {/* Stat Cards */}
      <div className="relative overflow-x-auto scrollbar-hide mb-10">
        <div className="flex lg:flex-wrap items-center gap-[44px] min-w-max px-2">
          {[
            ['User Feedback', '3,671'],
            ['Ticket Submit', '100'],
            ['Ticket Closed', '50'],
            ['Teams', '50'],
            ['Admin', '2']
          ].map(([label, value], i) => (
            <div
              key={i}
               className="bg-[#FFF] shrink-0 rounded-[15px] border border-[#DFEAF2] w-[152px] h-[112px] 
               flex flex-col items-center justify-center text-center px-[4px]  py-[2px] shadow-sm"
            >
              {/* Label */}
    <p className="text-[14px] font-normal text-[#000] leading-normal font-inter">{label}</p>

    {/* Value */}
    <p className="text-[24px] font-medium text-[#000] leading-normal font-inter">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Verification */}
    <h2 className="text-[20px] font-semibold  py-[40px] text-black mb-4">User Verification</h2>

    <div className="flex flex-wrap gap-[40px] mb-10">
      {[
        ['Requests Pending', pending, pendingCollapsed, setPendingCollapsed, 'http://localhost:3000/req-pending'],
        ['Requests Completed', completed, completedCollapsed, setCompletedCollapsed, 'http://localhost:3000/req-complete']
      ].map(([label, list, collapsed, setCollapsed, route], i) => (
        <div
          key={i}
          className="w-[440px] h-[260px] bg-[#FFF] rounded-[15px] border-[#DFEAF2] px-[20px] py-[10px] shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[14px] text-[#000] font-[Inter]">{label}</p>
              <p className="text-[24px] font-bold text-[#000] font-[Inter]">{list.length}</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                className="w-[84px] h-[36px] flex items-center justify-center gap-[6px] rounded-[50px] bg-[#1B1B1B] text-[#F9FAFB] text-sm"
                onClick={() => {
                  setCollapsed((prev) => !prev)
                  router.push(route) // navigate to corresponding page
                }}
              >
                {collapsed ? 'Expand' : 'Collapse'}
                <Image src={collapseIcon} alt="expand" />
              </button>
            </div>
          </div>

          {!collapsed && (
            <div className="overflow-y-auto max-h-[160px]">
              <table className="w-full text-sm">
                <tbody>
                  {list.map((user, idx) => (
                    <tr key={idx}>
                      <td className="text-[#000] border-[1px] border-[#DBDBDB] flex items-center gap-2">
                        {user['Member Name']}
                      </td>
                      <td className="text-[#000] border-[1px] border-[#DBDBDB]">{user['Username']}</td>
                      <td className="text-[#000] border-[1px] border-[#DBDBDB]">{user['No. Of Portfolios']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>


      {/* Promotions Management */}
      <h2 className="text-[20px] py-[40px] font-semibold text-black mb-4">Promotions Management</h2>
      <div className="flex flex-wrap justify-start gap-[35px] mb-10">
        {[['Ongoing Promotions', 2], ['Upcoming Promotions', 3], ['Past Promotions', 56]].map(
          ([label, value], i) => (
            <div
              key={i}
              className="bg-[#FFF] rounded-[25px] border border-[#DFEAF2] 
              w-[261px] px-[23px] py-[29px] flex flex-col items-start gap-[10px] shadow-sm"
            >
              <p className="text-[14px] font-normal text-[#000] leading-normal font-inter">{label}</p>
              <p className="text-[24px] font-medium text-[#1C1B1F]">{value}</p>
            </div>
          )
        )}
      </div>

      {/* Performance Summary */}
     <div className="w-full max-w-[1000px] h-auto py-[30px] sm:py-[60px]">
      <div className="bg-[#FFF] rounded-[20px] border border-[#DFEAF2] px-4 sm:px-[40px] py-4 sm:py-[40px] shrink-0 p-6 mb-10 font-roboto">
        <div className="flex justify-between gap-4 sm:gap-[22px] py-[12px] px-[12px] items-center mb-4">
          <p className="text-sm text-black font-medium">Performance Summary</p>
          <div className="flex gap-2">
            <button
            onClick={() => router.push('http://localhost:3000/performance')}
             className="w-[84px] h-[36px] flex items-center justify-center gap-[6px] py-[12px] px-[12px]
                rounded-[50px] bg-[#1B1B1B] text-[#F9FAFB] text-center align-middle text-sm">
              Expand
              <Image src={arrowIcon} alt="expand" />
            </button>
            <button className="w-[38px] h-[36px] flex items-center justify-center rounded-full bg-[#1B1B1B] text-xl">
              <Image src={filterIcon} alt="expand" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#EFF2F7] text-[#495057] font-medium text-[14px]">
                <th className="min-w-[200px] px-3 py-2">Title</th>
                <th className="min-w-[200px] px-3 py-2">Status</th>
                <th className="min-w-[200px] px-3 py-2">Conversions Rate</th>
                <th className="min-w-[200px] px-3 py-2">Clicks/Last 24 Hours</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Buy 1 Get 1 Free', 'Expires 3 days', '22%', '1,240'],
                ['30% off Selected Items', 'Expires 1 day', '19%', '1,090'],
                ['Black Friday Sale', 'Expired 1 week', '25%', '--']
              ].map(([title, status, rate, clicks], i) => (
                <tr key={i} className="even:bg-[#FFF] odd:bg-[#FFF]">
                  <td className="min-w-[200px] h-[50px] text-[#666666] text-center align-middle">{title}</td>
                  <td className="min-w-[200px] h-[50px] text-[#666666] text-center align-middle">{status}</td>
                  <td className="min-w-[200px] h-[50px] text-[#666666] text-center align-middle">{rate}</td>
                  <td className="min-w-[200px] h-[50px] text-[#666666] text-center align-middle">{clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
</div>


 <div className="rounded-[20px] px-6 mb-10">
  <h2 className="text-[20px] py-6 font-semibold text-black mb-6">Advertisements Management</h2>

  <div className="flex gap-[35px] flex-wrap">
    {[
      {
        title: 'Google Ads',
        spend: '$2.5k',
        percent: '30%',
        progress: '30%',
        conversions: 225,
        cost: '$13.44',
        dot: greenDot
      },
      {
        title: 'Facebook',
        spend: '$4.2k',
        percent: '51%',
        progress: '51%',
        conversions: 105,
        cost: '$40.44',
        dot: redDot
      },
      {
        title: 'Instagram',
        spend: '$1.5k',
        percent: '18%',
        progress: '18%',
        conversions: 125,
        cost: '$13.44',
        dot: greenDot
      }
    ].map((ad, i) => (
      <div
        key={i}
        className="w-[261px] h-[405px] shrink-0 rounded-[20px] bg-[#FFF] px-[26px] py-[26px] 
                  flex flex-col justify-start gap-[4px] font-Inter"
      >
        {/* Title */}
        <div className="text-[14px] text-black">{ad.title}</div>

        {/* Spend */}
        <div className="text-[24px] text-black">{ad.spend}</div>
        <p className="text-[12px] text-[#000]">Spend this month</p>

        {/* Progress bar */}
        <div className="w-full h-[8px] rounded-full bg-[#E0E0E0] mt-1 mb-1 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[#4290F9]"
            style={{ width: ad.progress }}
          ></div>
        </div>
        <p className="text-[14px] text-[#000]">{ad.percent} Total Spending</p>

        {/* Conversions */}
        <div className=' py-[38px] '>
          <div className="text-[24px] font-medium text-black">{ad.conversions}</div>
          <p className="text-[12px] text-[#000]">Conversions</p>
        </div>

        {/* Cost per Conversion */}
        <div>
          <div className="flex items-center gap-[20px]">
            <span className="text-[24px] font-medium text-black">{ad.cost}</span>
            <Image src={ad.dot} alt="dot" width={10} height={10} className="shrink-0" />
          </div>
          <p className="text-[12px] text-[#000]">Cost per conversion</p>
        </div>
      </div>
    ))}
  </div>
</div>




      {/* Visits/Click Data */}
  <div className='py-[32px] sm:py-[52px]'>
     <div className="mt-10  text-[#000]  bg-[#F0F9FF]">  
  <h2 className="text-[20px] font-semibold text-black mb-6">Visits/Click Data</h2>

  {/* Filters */}
  <div className="inline-flex items-center gap-[43px]  mb-8">
    <div className="flex flex-col sm:py-[22px]">
      <label className="text-sm font-medium py-[22px] text-[#1C1B1F] mb-1">Select Time Period</label>
      <select className="w-[215px] h-[50px] shrink-0 rounded-[15px] border border-[#DFEAF2] bg-[#FFF] 
      text-sm text-black py-[12px]  px-[4px]">
        <option>19 January 2025</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium py-[22px] sm:py-[22px]
       text-[#1C1B1F] mb-1">Group By</label>
      <div className="flex gap-[12px]">
        {['Day', 'Week', 'Month', 'Year'].map((item) => (
          <div
            key={item}
            className="w-[70px] h-[50px] shrink-0 rounded-[15px] border border-[#DFEAF2] bg-[#FFF] 
            text-sm text-black flex items-center justify-center"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
 <h2 className="text-xl font-semibold mb-4">Site Visits/Clicks</h2>
 <div className="bg-[#FFFF] px-[22px] py-[12px]  rounded-[25px] w-[929px] h-[625px]
                 sm:h-[420px] md:h-[520px]  w-full max-w-[929px] h-[320px]">
       
       <ResponsiveContainer width="100%" height="90%">
         <AreaChart data={visitClickData}>
           <defs>
             <linearGradient id="visitsColor" x1="0" y1="0" x2="0" y2="1">
               <stop offset="5%" stopColor="#A114F3" stopOpacity={0.6} />
               <stop offset="95%" stopColor="#EA00FF" stopOpacity={0.1} />
             </linearGradient>
             <linearGradient id="clicksColor" x1="0" y1="0" x2="0" y2="1">
               <stop offset="5%" stopColor="#1814F3" stopOpacity={0.6} />
               <stop offset="95%" stopColor="#1814F3" stopOpacity={0.1} />
             </linearGradient>
           </defs>
 
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="month" />
           <YAxis
             label={{
               value: "Visitor/Click Numbers",
               angle: -90,
               position: "insideLeft",
             }}
             domain={[0, 1000]}
           />

           
           <Tooltip />
           <Legend verticalAlign="top" height={36}  iconType="rectangle" />
           <Area
             type="monotone"
             dataKey="clicks"
             stroke="#1814F3"
             fill="url(#clicksColor)"
             strokeWidth={2}
             name="Ad Clicks"
           />           
           
           <Area
             type="monotone"
             dataKey="visits"
             stroke="#A114F3"
             fill="url(#visitsColor)"
             strokeWidth={2}
             name="Visits"     
           />
           
         </AreaChart>
       </ResponsiveContainer>
        <div>
            <p className="text-center text-sm text-[#3B82F6] mt-[6px]">2024 - 2025 YEAR</p>
          </div>
     </div>
  </div>
</div>

      {/* Conversions Data Chart */}
<div className="mt-10  bg-[#F0F9FF] p-4 sm:p-6">
  <h2 className="text-[20px] font-semibold text-black mb-6">Conversion Data</h2>

  {/* Filters */}
  <div className="flex flex-wrap gap-[23px] mb-8">
    <div className="flex flex-col gap-[10px] ">
      <label className="text-sm font-medium  gap-[10px]  text-[#1C1B1F] mb-1">Select Time Period</label>
      <select className="w-full max-w-[215px] h-[50px]
       rounded-[15px] border border-[#DFEAF2] bg-[#FFF] text-sm text-black px-4">
        <option>19 January 2025</option>
      </select>
    </div>
    <div className="flex flex-col gap-[10px] ">
      <label className="text-sm font-medium text-[#1C1B1F] mb-1">Select User type</label>
      <select className="w-[215px] h-[50px] rounded-[15px] border border-[#DFEAF2] bg-[#FFF] text-sm text-black px-4">
        <option>All Social Media data</option>
      </select>
    </div>
    <div className="flex flex-col gap-[10px] ">
      <label className="text-sm font-medium text-[#1C1B1F] mb-1">Group By</label>
      <div className="flex gap-[12px]">
        {['Day', 'Week', 'Month', 'Year'].map((item) => (
          <div
            key={item}
            className="w-[70px] h-[50px] rounded-[15px] border border-[#DFEAF2] bg-[#FFF]
             text-sm text-black flex items-center justify-center"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
   <h2 className="text-[20px] font-semibold text-[#1C1B1F] mb-[12px]">Conversions</h2>
  {/* Chart Title and Legend */}
  <div
       className="bg-[#FFFF] px-[22px] py-[12px]  rounded-[25px] w-[929px] h-[625px]
                 sm:h-[420px] md:h-[520px]  w-full max-w-[929px] h-[320px]"
     >
      
 
       {/* Legend */}
       <div className="flex flex-wrap items-center gap-[24px] px-[189px]  mb-[16px]">
  <div className="flex gap-[10px] items-center">
    <div className="w-[40px] h-[8px] rounded-[4px]" style={{ background: '#A114F3' }} />
    <span className="text-[14px] text-[#718EBF]">Google Ads</span>
  </div>
  <div className="flex items-center gap-[10px]">
    <div className="w-[40px] h-[8px] rounded-[4px]" style={{ background: '#1814F3' }} />
    <span className="text-[14px] text-[#718EBF]">Facebook</span>
  </div>
  <div className="flex items-center gap-[10px]">
    <div className="w-[40px] h-[8px] rounded-[4px]" style={{ background: '#D4C239' }} />
    <span className="text-[14px] text-[#718EBF]">Instagram</span>
  </div>
  <div className="flex items-center gap-[10px]">
    <div className="w-[40px] h-[8px] rounded-[4px]" style={{ background: '#14D9F3' }} />
    <span className="text-[14px] text-[#718EBF]">Total</span>
  </div>
</div>

 
       {/* Chart card */}
       <div className=" bg-[#FFF]
       w-full h-[calc(100%-100px)] px-[12px] py-[12px]">
         <div className="w-full h-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={conversionsData} margin={{ top: 10, right: 16, left: 0, bottom: 10 }}>
               <defs>
                 <linearGradient id="gGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#A114F3" stopOpacity={0.45} />
                   <stop offset="95%" stopColor="#A114F3" stopOpacity={0} />
                 </linearGradient>
                 <linearGradient id="fbGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#1814F3" stopOpacity={0.45} />
                   <stop offset="95%" stopColor="#1814F3" stopOpacity={0} />
                 </linearGradient>
                 <linearGradient id="igGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#D4C239" stopOpacity={0.45} />
                   <stop offset="95%" stopColor="#D4C239" stopOpacity={0} />
                 </linearGradient>
                 <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#14D9F3" stopOpacity={0.45} />
                   <stop offset="95%" stopColor="#14D9F3" stopOpacity={0} />
                 </linearGradient>
               </defs>
 
               <CartesianGrid stroke="#DFE5EE" strokeDasharray="3 3" />
               <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 12 }} />
               <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
               <Tooltip />
 
               <Area type="monotone" dataKey="google"    stroke="#A114F3" strokeWidth={3} fill="url(#gGradient)"    dot={false} activeDot={{ r: 4 }} />
               <Area type="monotone" dataKey="facebook"  stroke="#1814F3" strokeWidth={3} fill="url(#fbGradient)"   dot={false} activeDot={{ r: 4 }} />
               <Area type="monotone" dataKey="instagram" stroke="#D4C239" strokeWidth={3} fill="url(#igGradient)"   dot={false} activeDot={{ r: 4 }} />
               <Area type="monotone" dataKey="total"     stroke="#14D9F3" strokeWidth={3} fill="url(#totalGradient)" dot={false} activeDot={{ r: 4 }} />
             </AreaChart>
           </ResponsiveContainer>
           <div>
            <p className="text-center text-sm text-[#3B82F6] mt-[6px]">2024 - 2025 YEAR</p>
          </div>
         </div>
 
        
       </div>
     </div>

</div>
    </div>

  )
}
