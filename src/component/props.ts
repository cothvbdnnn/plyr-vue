import { PropType } from 'vue';

import { PlyrVueOptions } from './types';

export const vuePlyrProps = {
  options: {
    type: Object as PropType<Partial<PlyrVueOptions>>,
    default: () => {}
  }
};
