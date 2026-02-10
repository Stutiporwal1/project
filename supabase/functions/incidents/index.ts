import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const url = new URL(req.url)
    const action = url.searchParams.get('action') || 'query'

    if (req.method === 'POST' && action === 'import') {
      // Bulk import CSV data
      const { records } = await req.json()
      
      if (!records || !Array.isArray(records)) {
        return new Response(JSON.stringify({ error: 'records array required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      // Insert in batches of 500
      const batchSize = 500
      let inserted = 0
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize).map((r: any) => ({
          incident_id: r.Incident_ID || r.incident_id,
          timestamp: r.Timestamp || r.timestamp,
          threat_type: r.Threat_Type || r.threat_type,
          severity: r.Severity || r.severity,
          attack_source: r.Attack_Source || r.attack_source,
          target_system: r.Target_System || r.target_system,
          country: r.Country || r.country,
          status: r.Status || r.status,
          affected_systems: parseInt(r.Affected_Systems || r.affected_systems || '0'),
          detection_time_minutes: parseFloat(r.Detection_Time_Minutes || r.detection_time_minutes || '0'),
        }))

        const { error } = await supabase.from('cyber_incidents').upsert(batch, { onConflict: 'incident_id' })
        if (error) {
          console.error('Batch insert error:', error)
          return new Response(JSON.stringify({ error: error.message, inserted }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        }
        inserted += batch.length
      }

      return new Response(JSON.stringify({ success: true, inserted }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // GET - Query incidents
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 1000)
    const severity = url.searchParams.get('severity')
    const threatType = url.searchParams.get('threat_type')
    const country = url.searchParams.get('country')
    const status = url.searchParams.get('status')
    const offset = (page - 1) * limit

    let query = supabase.from('cyber_incidents').select('*', { count: 'exact' })

    if (severity) query = query.eq('severity', severity)
    if (threatType) query = query.eq('threat_type', threatType)
    if (country) query = query.eq('country', country)
    if (status) query = query.eq('status', status)

    query = query.order('timestamp', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Also get summary stats
    const { data: statsData } = await supabase.rpc('get_incident_stats').single()

    return new Response(JSON.stringify({
      data,
      total: count,
      page,
      limit,
      stats: statsData || null,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
