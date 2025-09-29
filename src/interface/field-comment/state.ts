let enabled = true;

export default {
  getState: () => {
    return enabled;
  },
  setState: (state: boolean) => {
    enabled = state;
  },
};
