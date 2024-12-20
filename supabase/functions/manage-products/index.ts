import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { method, action } = await req.json()
    console.log(`Processing ${method} request with action: ${action}`)

    switch (method) {
      case 'GET':
        const { data: products, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .order('order_index', { ascending: true })

        if (fetchError) throw fetchError
        return new Response(JSON.stringify({ products }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'POST':
        const { product } = await req.json()
        const { data: newProduct, error: createError } = await supabase
          .from('products')
          .insert([product])
          .select()
          .single()

        if (createError) throw createError
        return new Response(JSON.stringify({ product: newProduct }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'PATCH':
        const { id, updates } = await req.json()
        const { data: updatedProduct, error: updateError } = await supabase
          .from('products')
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (updateError) throw updateError
        return new Response(JSON.stringify({ product: updatedProduct }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'DELETE':
        const { productId } = await req.json()
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .eq('id', productId)

        if (deleteError) throw deleteError
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      default:
        throw new Error('Method not supported')
    }
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})