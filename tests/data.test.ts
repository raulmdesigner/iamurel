import { beforeEach, describe, expect, it, vi } from 'vitest';
const mock = vi.hoisted(() => ({ result: { data: null as any, error: null as any }, calls: [] as string[], rpc: vi.fn() }));
vi.mock('../src/lib/supabase', () => {
  const query = new Proxy({}, { get(_target, key) {
    if (key === 'then') return (resolve: any) => Promise.resolve(mock.result).then(resolve);
    return (..._args: any[]) => { mock.calls.push(String(key)); return query; };
  } });
  return { configurationError: '', supabase: {
    from: (table: string) => { mock.calls.push(table); return query; },
    rpc: mock.rpc,
  } };
});
import { dataLayer } from '../src/lib/data';
import { withTimeout } from '../src/lib/errors';
describe('Cloud persistence contract', () => {
  beforeEach(() => { mock.result = { data: [], error: null }; mock.calls.length = 0; mock.rpc.mockReset(); });
  it('keeps a deliberately empty collection empty', async () => {
    expect(await dataLayer.getServices()).toEqual([]);
    expect(await dataLayer.getFaq()).toEqual([]);
  });
  it('does not disguise read failures as default content', async () => {
    mock.result = { data: null, error: { message: 'permission denied' } };
    await expect(dataLayer.getSettings()).rejects.toThrow('permission denied');
  });
  it('reports RPC save errors instead of claiming success', async () => {
    mock.rpc.mockResolvedValue({ data: null, error: { message: 'transaction failed' } });
    expect(await dataLayer.savePackages([])).toEqual({ success: false, error: 'transaction failed' });
    expect(mock.rpc).toHaveBeenCalledWith('iamurel_replace_collection', { target_table: 'iamurel_packages', rows: [] });
  });
  it('uses Supabase for appearance reads and writes', async () => {
    mock.result = { data: { id: 'existing', action_color: '#112233' }, error: null };
    const appearance = await dataLayer.getAppearance();
    expect(appearance.action_color).toBe('#112233');
    expect((await dataLayer.saveAppearance(appearance)).success).toBe(true);
    expect(mock.calls).toContain('iamurel_appearance');
    expect(mock.calls).toContain('upsert');
  });
  it('does not confirm a rejected lead', async () => {
    mock.result = { data: null, error: { message: 'database unavailable' } };
    expect(await dataLayer.submitLead({ name: 'Teste', phone: '123', consent: true })).toEqual({ success: false, error: 'database unavailable' });
    expect(mock.calls).toContain('insert');
  });
  it('requires consent before submitting a lead', async () => {
    expect((await dataLayer.submitLead({ name: 'Teste', phone: '123' })).success).toBe(false);
    expect(mock.calls).toEqual([]);
  });
  it('propagates denied CRM changes', async () => {
    mock.result = { data: null, error: { message: 'not allowed' } };
    await expect(dataLayer.updateLeadStatus('id', 'ganho')).rejects.toThrow('not allowed');
  });
  it('sorts package items and handles a null relationship', async () => {
    mock.result = { data: [{ id: '1', items: [{ order_index: 2 }, { order_index: 1 }] }, { id: '2', items: null }], error: null };
    const rows = await dataLayer.getPackages();
    expect(rows[0].items?.map(x => x.order_index)).toEqual([1, 2]);
    expect(rows[1].items).toEqual([]);
  });
  it('ends a stuck session check', async () => {
    await expect(withTimeout(new Promise(() => {}), 5)).rejects.toThrow('demorou');
  });
});
