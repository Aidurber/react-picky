import React from 'react';
import PropsPanel from './props/props-panel';

const data = [];

for (var i = 1; i <= 20; i++) {
  data.push({ id: i, name: `Item ${i}` });
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || undefined,
      propsPanel: {
        ...this.defaults,
      },
    };
  }
  checkboxAccessor = e => e.target.checked;
  defaultAccessor = e => e.target.value;
  get defaults() {
    return {
      includeSelectAll: {
        value: true,
        type: 'checkbox',
        accessor: this.checkboxAccessor,
      },
      includeFilter: {
        value: true,
        type: 'checkbox',
        accessor: this.checkboxAccessor,
      },
      clearFilterOnClose: {
        value: false,
        type: 'checkbox',
        accessor: this.checkboxAccessor,
      },
      disabled: {
        value: false,
        type: 'checkbox',
        accessor: this.checkboxAccessor,
      },
      caseSensitiveFilter: {
        value: false,
        type: 'checkbox',
        accessor: this.checkboxAccessor,
      },
      defaultFocusFilter: {
        value: false,
        type: 'checkbox',
        accessor: this.checkboxAccessor,
      },
    };
  }
  get renderProp() {
    const dynamicProps = {};
    Object.keys(this.state.propsPanel).forEach(key => {
      dynamicProps[key] = this.state.propsPanel[key].value;
    });
    return {
      onChange: this.handleChange,
      value: this.state.value,
      options: data,
      labelKey: 'name',
      valueKey: 'id',
      selectAllMode: 'filtered',
      ...dynamicProps,
    };
  }

  handleChange = value => {
    if (this.props.mode === 'multiple') {
      this.setState({
        value: [...value],
      });
    } else {
      this.setState({
        value,
      });
    }
  };

  onReset = () => {
    this.setState({
      value: this.props.defaultValue,
      propsPanel: {
        ...this.defaults,
      },
    });
  };

  render() {
    return (
      <>
        <PropsPanel
          values={this.state.propsPanel}
          onChange={newProps => {
            console.log(newProps);
            this.setState({ propsPanel: { ...newProps } });
          }}
        />
        <button type="button" id="reset-button" onClick={this.onReset}>
          Reset
        </button>
        {this.props.children(this.renderProp)}
      </>
    );
  }
}

export default Wrapper;
