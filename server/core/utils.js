export const generateHooks = () => ['before', 'after', 'error'].reduce((r, k) => ({
    ...r,
    [k]: ['all', 'find', 'get', 'create', 'update', 'patch', 'remove'].reduce((m, kk) => ({ ...m, [kk]: [] }), {})
}), {})