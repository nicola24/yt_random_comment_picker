import React from 'react';
import PropTypes from 'prop-types';

import {
  LineChart, XAxis, YAxis, Tooltip, Line,
} from 'recharts';

const CumulativeCost = ({ costTrends, turbineName }) => (
  <div>
    <p className="h6 p-3">
      {turbineName === '' ? 'Cumulative Cost' : ` Cumulative Cost For Turbine ${turbineName}`}
    </p>
    <LineChart
      width={650}
      height={300}
      data={costTrends}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <XAxis dataKey="serviceDate" />
      <YAxis unit="$" />
      <Tooltip />
      <Line type="monotone" dataKey="extendedCost" stroke="#da6642" dot={false} />
      <Line type="monotone" dataKey="labourCost" stroke="#1c54b2" dot={false} />
    </LineChart>
  </div>
);

CumulativeCost.propTypes = {
  costTrends: PropTypes.arrayOf(PropTypes.object).isRequired,
  turbineName: PropTypes.string.isRequired,
};

export default CumulativeCost;
