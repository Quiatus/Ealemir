GRANT USAGE ON SCHEMA public TO anon;

-- 2. Give the anonymous role permission to read the specific table
GRANT SELECT ON TABLE public.test_connection TO anon;