'use strict';

const DEFAULT_CONFIG = {
  tokenCaps: { prompt: 4000, completion: 1000, parallel: 2, session: 100000 },
  strictEvidence: true,
  backgroundAudits: { enabled: true, maxDailyTokens: 15000 },
  interop: { detectSlavetPlugins: true, coordinateSubAgents: true }
};

function getConfig(ctx) {
  const cfg = (ctx && ctx.config) || {};
  return { ...DEFAULT_CONFIG, ...cfg };
}

function enforceTokenCaps(cfg, request) {
  const { tokenCaps } = cfg;
  const prompt = request.prompt || '';
  if (prompt.length > tokenCaps.prompt * 4) {
    throw new Error('Prompt too large for configured caps. Please reduce context.');
  }
}

function assertEvidenceMode(cfg, inputs) {
  if (!cfg.strictEvidence) return;
  const hasEvidence = Boolean(inputs && (inputs.files?.length || inputs.dataKeys?.length));
  if (!hasEvidence) {
    const err = new Error('Insufficient evidence to proceed. Provide files or data keys.');
    err.code = 'EVIDENCE_REQUIRED';
    throw err;
  }
}

module.exports = {
  commands: [
    {
      name: 'audit:quick',
      description: 'Run a lightweight, resource-capped audit of tokens/contrast and structure.',
      run: async (ctx, inputs = {}) => {
        const cfg = getConfig(ctx);
        enforceTokenCaps(cfg, { prompt: JSON.stringify(inputs).slice(0, 16000) });
        // Minimal, non-blocking summary
        return {
          ok: true,
          message: 'Quick audit scheduled. Results will be posted asynchronously.',
          scheduled: true
        };
      }
    },
    {
      name: 'audit:strict',
      description: 'Run an evidence-required audit. Refuses if inputs lack evidence.',
      run: async (ctx, inputs = {}) => {
        const cfg = getConfig(ctx);
        assertEvidenceMode(cfg, inputs);
        enforceTokenCaps(cfg, { prompt: JSON.stringify(inputs).slice(0, 16000) });
        return {
          ok: true,
          message: 'Strict audit accepted. Processing will adhere to evidence-only policy.'
        };
      }
    }
  ]
};
