import { serve } from 'https://deno.fresh.dev/std@v1/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { parse } from 'https://deno.land/std@0.181.0/encoding/csv.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the request body as text
    const body = await req.text()
    
    // Parse CSV data
    const { rows } = await parse(body, {
      skipFirstRow: true,
      columns: ['title', 'description', 'price', 'inventory']
    })

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user ID from the authorization header
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader)
    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    // Insert products
    const { data, error } = await supabaseClient
      .from('products')
      .insert(
        rows.map((row: any) => ({
          ...row,
          price: parseFloat(row.price),
          inventory: parseInt(row.inventory),
          user_id: user.id
        }))
      )

    if (error) {
      console.error('Error inserting products:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ message: 'Products imported successfully', count: rows.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error processing CSV:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})