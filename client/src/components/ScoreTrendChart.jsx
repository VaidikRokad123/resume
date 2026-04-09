import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const ScoreTrendChart = ({ analyses }) => {
  const data = analyses
    .slice(-10)
    .map(analysis => ({
      date: format(new Date(analysis.createdAt), 'MM/dd'),
      score: analysis.atsScore
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#93c5fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ScoreTrendChart;
