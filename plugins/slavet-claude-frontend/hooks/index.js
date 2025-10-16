'use strict';

module.exports = {
  hooks: [
    {
      name: 'onInstall',
      description: 'Perform a quick, low-cost environment scan and schedule background audits.',
      run: async (ctx) => {
        const report = {
          detectedFrameworks: ctx?.environment?.frameworks || [],
          scheduled: ['slavet-frontend:background-auditor']
        };
        return { ok: true, report };
      }
    }
  ]
};
