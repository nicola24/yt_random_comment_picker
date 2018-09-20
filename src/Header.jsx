import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
  turbineList, handleChange, windfarmList,
}) => (
  <div>
    <form>
      <div className="row">
        <div>
          <img className="logo-dark ml-2" src="assets/img/ensemble_logo.jpg" alt="logo" height="40" width="133" />
        </div>
        <div className="col-auto">
          <select className="form-control border border-primary">
            {windfarmList.map(x => (
              <option value={x} key={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          <select onChange={handleChange} className="form-control border border-primary">
            <option value="allTurbs">All turbines</option>
            {turbineList.map(x => (
              <option value={x} key={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  </div>
);

Header.propTypes = {
  turbineList: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  windfarmList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
