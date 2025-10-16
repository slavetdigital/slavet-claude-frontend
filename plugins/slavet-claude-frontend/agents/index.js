'use strict';

const DEFAULT_CONFIG = {
  tokenCaps: { prompt: 4000, completion: 1000, parallel: 2, session: 100000 },
  backgroundAudits: { enabled: true, maxDailyTokens: 15000 },
  interop: { detectSlavetPlugins: true, coordinateSubAgents: true }
};

function getConfig(ctx) {
  const cfg = (ctx && ctx.config) || {};
  return { ...DEFAULT_CONFIG, ...cfg };
}

function detectSlavetPlugins(ctx) {
  try {
    const installed = ctx?.environment?.plugins || [];
    return installed.filter(p => /slavet-/.test(p.name)).map(p => p.name);
  } catch {
    return [];
  }
}

module.exports = {
  agents: [
    {
      name: 'slavet-frontend:background-auditor',
      description: 'Runs low-cost, non-blocking background audits and posts notifications.',
      run: async (ctx) => {
        const cfg = getConfig(ctx);
        if (!cfg.backgroundAudits?.enabled) {
          return { ok: true, skipped: true, reason: 'background audits disabled' };
        }
        const cooperating = cfg.interop?.detectSlavetPlugins ? detectSlavetPlugins(ctx) : [];
        const summary = {
          cooperatingPlugins: cooperating,
          tokenBudget: cfg.backgroundAudits.maxDailyTokens,
          tasks: ['contrast-scan', 'tokens-lint']
        };
        return { ok: true, summary };
      }
    }
  ]
};
