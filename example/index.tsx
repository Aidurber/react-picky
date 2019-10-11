import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Picky from '../src';
import '../src/Picky.css';
import { OptionType } from '../src/types';

const bigList: any[] = [];

for (var i = 1; i <= 200; i++) {
  bigList.push({ id: i, name: `Item ${i}` });
}
type Item = {
  id: number;
  name: string;
};
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
  valueAccessor = (item: OptionType<Item>) => item.id;
  labelAccessor = (item: OptionType<Item>) => item.name;
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
            <Picky<Item>
              id="multi"
              value={this.state.arrayValue}
              options={bigList}
              onChange={this.selectMultipleOption}
              open={true}
              getLabel={this.labelAccessor}
              getValue={this.valueAccessor}
              multiple={true}
              includeSelectAll={true}
              includeFilter={true}
              dropdownHeight={600}
            />
          </div>
          <div className="col">
            <h3>Single select</h3>
            <Picky
              id={'single'}
              value={this.state.value}
              options={bigList}
              onChange={this.selectOption}
              open={true}
              getLabel={this.labelAccessor}
              getValue={this.valueAccessor}
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
