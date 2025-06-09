// Import required modules
const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

// Initialize Supabase client
const supabaseUrl = 'https://jmyjdnigxbrntsvkdwxp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpteWpkbmlneGJybnRzdmtkd3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTAxNDQsImV4cCI6MjA2NTA2NjE0NH0.-jmO7HpgjAAt9_9nB-Q7o68xnXAHS9LoicwBqgyPwHI'
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