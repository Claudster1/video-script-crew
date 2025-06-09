// Import required modules
const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_KEY must be set')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Test the connection
async function testConnection() {
    try {
        const { data, error } = await supabase.from('your_table').select('*').limit(1)
        if (error) throw error
        console.log('Successfully connected to Supabase')
    } catch (error) {
        console.error('Error connecting to Supabase:', error.message)
    }
}

// Export the client and test function
module.exports = { supabase, testConnection } 