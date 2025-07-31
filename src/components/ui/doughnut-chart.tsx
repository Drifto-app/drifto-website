import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DoughnutChartProps {
    total: number;
    used: number;
}

const DoughnutChart = ({
    total, used,
 }: DoughnutChartProps) => {
    const remaining = total - used;
    const usedPercentage = Math.round((used / total) * 100);

    const data = [
        { name: 'Used', value: used },
        { name: 'Available', value: remaining }
    ];

    const COLORS = {
        Used: '#1f2937',
        Available: '#f3f4f6'
    };

    return (
        <div className="relative w-10 h-10">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={12}
                        outerRadius={18}
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[entry.name]}
                                stroke="none"
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xs font-semibold text-gray-900">
                        {usedPercentage}%
                    </div>
                </div>
        </div>
    );
};

export default DoughnutChart;
