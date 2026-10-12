// src/widgets/test/SupabaseTest.tsx
import { useState } from 'react';
import { useSupabase } from '@/shared/hooks/useSupabase';
import { useAuth } from '@clerk/react';

export function SupabaseTest() {
  const { userId } = useAuth();
  const supabase = useSupabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testInsert = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔄 Testing insert for user:', userId);

      const { data, error } = await supabase
        .from('profiles')
        .insert({ clerk_user_id: userId })
        .select()
        .single();

      if (error) throw error;

      setResult({ type: 'insert', data });
      console.log('✅ Insert success:', data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
      console.error('❌ Insert error:', e);
    } finally {
      setLoading(false);
    }
  };

  const testSelect = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from('profiles').select('*');

      if (error) throw error;

      setResult({ type: 'select', data });
      console.log('✅ Select success:', data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
      console.error('❌ Select error:', e);
    } finally {
      setLoading(false);
    }
  };

  const testCard = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('profile_cards')
        .insert({
          clerk_user_id: userId,
          username: 'Test User',
          description: 'Test card',
        })
        .select()
        .single();

      if (error) throw error;

      setResult({ type: 'card_insert', data });
      console.log('✅ Card insert success:', data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
      console.error('❌ Card insert error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">🔒 Supabase Auth Test</h3>
      <p className="text-gray-400 mb-4">
        <span className="font-medium">User ID:</span> {userId || 'Not signed in'}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={testInsert}
          disabled={loading || !userId}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 
                     text-white rounded-lg transition text-sm"
        >
          Test Profile Insert
        </button>
        <button
          onClick={testSelect}
          disabled={loading || !userId}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 
                     text-white rounded-lg transition text-sm"
        >
          Test Select Profiles
        </button>
        <button
          onClick={testCard}
          disabled={loading || !userId}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 
                     text-white rounded-lg transition text-sm"
        >
          Test Card Insert
        </button>
      </div>

      {loading && (
        <div className="p-3 bg-gray-800 rounded text-gray-300 text-sm">⏳ Loading...</div>
      )}

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm mb-2">
          ❌ {error}
        </div>
      )}

      {result && (
        <div className="p-3 bg-green-900/30 border border-green-700 rounded text-green-300 text-sm">
          <p className="font-medium mb-2">✅ {result.type} success</p>
          <pre className="overflow-x-auto text-xs">{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
