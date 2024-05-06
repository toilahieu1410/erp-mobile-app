const config = {
  screens: {
    PayRollScreen: {
      path: 'payroll',
    },
    // Profile: {
    //   path: 'profile/:id',
    //   parse: {
    //     id: id => `${id}`,
    //   },
    // },
    // Notifications: 'notifications',
    // Settings: 'settings',
  },
};

const linking = {
  prefixes: ['hoplonglms://app'],
  config,
};

export default linking;
