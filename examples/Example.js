import React from 'react';

import Picky from '../src/index';
const oneToOneThousand = [];

for (var i = 1; i <= 1000; i++) {
  oneToOneThousand.push(i);
}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      arrayValue: [1]
    };
    this.selectOption = this.selectOption.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }
  componentWillMount() {}

  selectOption(value) {
    console.log('Val', value);
    this.setState({ value });
  }
  selectMultipleOption(value) {
    console.log('Val', value);
    this.setState({ arrayValue: value });
  }
  render() {
    return (
      <div>
        {
          // <div>
          //   <div style={{ width: '50%', float: 'left' }}>
          //     <Picky
          //       value={this.state.value}
          //       options={[1, 2, 3, 4]}
          //       onChange={this.selectOption}
          //     />
          //   </div>
          //   <div style={{ width: '50%', float: 'left' }}>
          //     <Picky
          //       value={this.state.arrayValue}
          //       options={[1, 2, 3, 4]}
          //       onChange={this.selectMultipleOption}
          //       multiple
          //     />
          //   </div>
          // </div>
          // <br />
        }
        <div>
          <div style={{ width: '50%', float: 'left' }}>
            <Picky
              value={this.state.arrayValue}
              options={oneToOneThousand}
              onChange={this.selectMultipleOption}
              open={false}
              multiple={true}
              includeSelectAll={true}
              includeFilter={true}
              dropdownHeight={600}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
