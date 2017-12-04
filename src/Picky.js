import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="my-component">
        <i className="icon-test">One</i>
        <br />
        <i className="icon-test">Two</i>
        <br />
        <i className="icon-test">Three</i>
      </div>
    );
  }
}

export default MyComponent;
