import React from 'react';
import { connect } from 'react-redux';


const Rank = ({ entries, name, route }) => {
  return (
    <div>
      <div className='f3 white'>
        {`Hello ${name}! your entry count is...`}

      </div>
      <div className='f1 white'>
        {entries}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  name: state.user.user.name,
  route: state.user.route,
  entries: state.user.entries
})
export default connect(
  mapStateToProps,
  null
)(Rank);
