import React from 'react';
import PropTypes from 'prop-types';

import { PieChart, Pie, Tooltip } from 'recharts';

const TopRepairsTime = ({ topTime, turbineName }) => (
  <div>
    <p className="h6 p-3">
      {turbineName === '' ? 'Top Repairs By Time' : `Top Repairs By Time For Turbine ${turbineName}`}
    </p>
    <PieChart width={650} height={300}>
      <Pie
        data={topTime}
        outerRadius={80}
        fill="#82ca9d"
        label={arr => arr.serviceDesc}
        dataKey="duration"
        nameKey="serviceDesc"
      />
      <Tooltip />
    </PieChart>
  </div>
);

TopRepairsTime.propTypes = {
  topTime: PropTypes.arrayOf(PropTypes.object).isRequired,
  turbineName: PropTypes.string.isRequired,
};

export default TopRepairsTime;
