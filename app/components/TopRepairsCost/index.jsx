import React from 'react';
import PropTypes from 'prop-types';

import { PieChart, Pie, Tooltip } from 'recharts';

const TopRepairsCost = ({ topCost, turbineName }) => (
  <div>
    <p className="h6 p-3">
      {turbineName === '' ? 'Top Repairs By Cost' : `Top Repairs By Cost For Turbine ${turbineName}`}
    </p>
    <PieChart width={650} height={300}>
      <Pie
        data={topCost}
        outerRadius={80}
        fill="#1c54b2"
        label={arr => arr.serviceDesc}
        dataKey="cost"
        nameKey="serviceDesc"
      />
      <Tooltip />
    </PieChart>
  </div>
);

TopRepairsCost.propTypes = {
  topCost: PropTypes.arrayOf(PropTypes.object).isRequired,
  turbineName: PropTypes.string.isRequired,
};

export default TopRepairsCost;
