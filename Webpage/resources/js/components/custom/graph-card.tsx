import React from 'react'
import { Legend } from 'recharts'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

interface SensorData {
    time: string
    lpg_value: number
    co_value: number
    smoke_value: number
}

interface GraphcardProps {
    name: string
    data: SensorData[]
}


const Graphcard = ({ name, data }: GraphcardProps) => (
    <div className="p-3 border relative aspect-video flex-1 overflow-hidden rounded-xl border">
        <div className="h-full flex flex-col">
            <h3 className="text-base mb-2 font-medium text-gray-700 dark:text-white">{name}</h3>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" className='text-[10px]' />
                        <YAxis className='text-[12px]' />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="lpg_value"
                            stroke="#FF5733" // red-orange
                            strokeWidth={2}
                            dot={false}
                            name="LPG"
                        />
                        <Line
                            type="monotone"
                            dataKey="co_value"
                            stroke="#337DFF" // blue
                            strokeWidth={2}
                            dot={false}
                            name="CO"
                        />
                        <Line
                            type="monotone"
                            dataKey="smoke_value"
                            stroke="#6BFF33" // green
                            strokeWidth={2}
                            dot={false}
                            name="Smoke"
                        />
                        <Legend
                            formatter={(value) => (
                                <span style={{ fontSize: '12px', color: '#333' }}>{value}</span>
                            )}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

export default Graphcard
