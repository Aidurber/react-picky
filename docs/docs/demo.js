import React from 'react';
import { render } from 'react-dom';
import Picky from '../../src/Picky';
import '../../src/Picky.css';

const bigList = [];

for (var i = 1; i <= 20; i++) {
  bigList.push({ id: i, name: `Item ${i}` });
}
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: [],
    };
    this.selectOption = this.selectOption.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }

  selectOption(value) {
    this.setState({ value });
  }
  selectMultipleOption(value) {
    this.setState({ arrayValue: [...value] });
  }

  render() {
    return (
      <div className="container" style={{ padding: '0 1em' }}>
        <div
          className="row"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div className="col" style={{ flex: 1, padding: '1em' }}>
            <h3>Multi select</h3>
            <Picky
              id="multiselect"
              value={this.state.arrayValue}
              options={bigList}
              onChange={this.selectMultipleOption}
              valueKey="id"
              labelKey="name"
              multiple={true}
              includeSelectAll={true}
              includeFilter={true}
              dropdownHeight={600}
            />
          </div>
          <div className="col" style={{ flex: 1, padding: '1em' }}>
            <h3>Single select</h3>
            <Picky
              id="singleselect"
              value={this.state.value}
              options={bigList}
              onChange={this.selectOption}
              valueKey="id"
              labelKey="name"
              multiple={false}
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

export default Demo;
