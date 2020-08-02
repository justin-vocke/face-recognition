import React from 'react';
import {routeChange} from '../../redux/reducers/user.actions';
import {connect} from 'react-redux';

const Navigation = ({onRouteChange,routeChange,isSignedIn}) => {



    if(isSignedIn){
      return(
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
          <p
            onClick={() => onRouteChange('signout')}
            className='f3 link dim black underline pa3 pointer'>
            Sign out
          </p>
        </nav>
      );
    }

    else{
      return(

        <nav style={{display:'flex', justifyContent:'flex-end'}}>
          <p
            onClick={() => routeChange('signin')}
            className='f3 link dim black underline pa3 pointer'>
            Sign In
          </p>
          <p
            onClick={() => routeChange('register')}
            className='f3 link dim black underline pa3 pointer'>
            Register
          </p>
        </nav>
      );
    }
}
const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,

})

const mapDispatchToProps = dispatch => ({
  routeChange: route => dispatch(routeChange(route)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
