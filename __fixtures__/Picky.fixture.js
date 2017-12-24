import Picky from '../src/Picky';

const PickyFixture = {
  component: Picky,
  props: {
    value: [1, 2, 3],
    disabled: false,
    options: [1, 2, 3, 4, 5, 6],
    onChange: value => {
      console.log(`Select: ${value}`);
      PickyFixture.value = value;
    }
  }
};

export default PickyFixture;
