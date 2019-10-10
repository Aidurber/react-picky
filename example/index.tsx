import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Picky from '../src';
import '../src/Picky.css';

const bigList: any[] = [];

for (var i = 1; i <= 200; i++) {
  bigList.push({ id: i, name: `Item ${i}` });
}
class App extends React.Component<any, any> {
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
    console.log('Vals', value);
    this.setState({ value });
  }
  selectMultipleOption(value) {
    console.log('Val', value);
    this.setState({ arrayValue: value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Multi select</h3>
            <Picky
              value={this.state.arrayValue}
              options={bigList}
              onChange={this.selectMultipleOption}
              open={true}
              valueKey="id"
              labelKey="name"
              multiple={true}
              includeSelectAll={true}
              includeFilter={true}
              dropdownHeight={600}
              selectAllMode="filtered"
            />
          </div>
          <div className="col">
            <h3>Single select</h3>
            <Picky
              value={this.state.value}
              options={bigList}
              onChange={this.selectOption}
              open={true}
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

ReactDOM.render(<App />, document.getElementById('root'));
