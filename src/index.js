// Demo component
// this is only example component

import React from 'react';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="my-component">
                <i className="icon-test">One</i><br></br>
                <i className="icon-test">Two</i><br></br>
                <i className="icon-test">Three</i>
            </div>
        )
    }
}

export default MyComponent;