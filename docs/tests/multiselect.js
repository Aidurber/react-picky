import React from 'react';
import Wrapper from './wrapper';
import Picky from '../../src';
import '../../src/picky.css';

class Multiselect extends React.Component {
  render() {
    return (
      <Wrapper mode="multiple" defaultValue={[]}>
        {props => <Picky id="multiselect" {...props} multiple />}
      </Wrapper>
    );
  }
}
export default Multiselect;
