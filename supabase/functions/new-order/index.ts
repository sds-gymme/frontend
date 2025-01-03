// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log("Hello from Supabase Functions!");

Deno.serve(async (req) => {
  try {
    const { amount, currency, receipt, notes } = await req.json();

    if (!amount || !currency || !receipt) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: amount, currency, or receipt.' }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const razorpayApiUrl = 'https://api.razorpay.com/v1/orders';
    console.log("ENV VARS ARE ALIVE", Deno.env.get('RAZORPAY_KEY_ID'));
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const secretKey = Deno.env.get('RAZORPAY_SECRET_KEY');

    if (!keyId || !secretKey) {
      return new Response(
        JSON.stringify({ error: 'Razorpay credentials are not set in the environment variables.' }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
          
    const authorizationToken = 'Basic ' + btoa(`${keyId}:${secretKey}`);

    const body = {
      amount,
      currency,
      receipt,
      notes: notes || {},
    };

    const response = await fetch(razorpayApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `Error from Razorpay: ${response.status} - ${errorText}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/new-order' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
