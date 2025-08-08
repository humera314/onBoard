'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

const conversionsData = [
  { date: '22 Feb', google: 2, facebook: 1, instagram: 2, total: 5 },
  { date: '23 Feb', google: 3, facebook: 2, instagram: 3, total: 8 },
  { date: '24 Feb', google: 5, facebook: 3, instagram: 5, total: 13 },
  { date: '25 Feb', google: 10, facebook: 6, instagram: 8, total: 24 },
  { date: '26 Feb', google: 3, facebook: 3, instagram: 3, total: 9 },
  { date: '27 Feb', google: 6, facebook: 5, instagram: 5, total: 16 },
  { date: '28 Feb', google: 8, facebook: 7, instagram: 11, total: 26 }
]

export default function ConversionsBlock() {
  return (
    <div
      className="rounded-[15px] border border-[#DFEAF2] bg-[#EAF6FE] px-[24px] py-[24px] shrink-0"
      style={{ width: '924.751px', height: '624.134px' }}
    >
      <h2 className="text-[20px] font-semibold text-[#1C1B1F] mb-[12px]">Conversions</h2>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-[24px] mb-[16px]">
        <LegendItem label="Google Ads" color="#A114F3" />
        <LegendItem label="Facebook"  color="#1814F3" />
        <LegendItem label="Instagram" color="#D4C239" />
        <LegendItem label="Total"     color="#14D9F3" />
      </div>

      {/* Chart card */}
      <div className="bg-white rounded-[20px] border border-[#DFEAF2] w-full h-[calc(100%-100px)] px-[12px] py-[12px]">
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

              <CartesianGrid stroke="#E9EEF5" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip />

              <Area type="monotone" dataKey="google"    stroke="#A114F3" strokeWidth={3} fill="url(#gGradient)"    dot={false} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="facebook"  stroke="#1814F3" strokeWidth={3} fill="url(#fbGradient)"   dot={false} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="instagram" stroke="#D4C239" strokeWidth={3} fill="url(#igGradient)"   dot={false} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="total"     stroke="#14D9F3" strokeWidth={3} fill="url(#totalGradient)" dot={false} activeDot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-sm text-[#3B82F6] mt-[6px]">2024 - 2025 YEAR</p>
      </div>
    </div>
  )
}

function LegendItem({ label, color }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-[40px] h-[8px] rounded-[4px]" style={{ background: color }} />
      <span className="text-[14px] text-[#718EBF]">{label}</span>
    </div>
  )
}
