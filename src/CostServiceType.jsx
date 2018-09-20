import React from 'react';
import PropTypes from 'prop-types';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

const CostServiceType = ({ sumOfExtendedAndLaborCost, turbineName }) => (
  <div>
    <p className="h6 p-3">
      {turbineName === '' ? 'Cost By Service Type' : `Cost By Service Type For Turbine ${turbineName}`}
    </p>
    <BarChart
      width={650}
      height={300}
      data={sumOfExtendedAndLaborCost}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <XAxis dataKey="sr_type" />
      <YAxis unit="$" />
      <Tooltip />
      <Legend verticalAlign="top" iconType="square" align="right" />
      <Bar dataKey="cost" fill="#1c54b2" unit="$" />
    </BarChart>
  </div>
);

CostServiceType.propTypes = {
  sumOfExtendedAndLaborCost: PropTypes.arrayOf(PropTypes.object).isRequired,
  turbineName: PropTypes.string.isRequired,
};

export default CostServiceType;
