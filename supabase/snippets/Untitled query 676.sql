ALTER TABLE public.test_connection ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that explicitly allows anonymous (anon) users to read (SELECT) the data
CREATE POLICY "Allow anonymous read access" 
ON public.test_connection 
FOR SELECT 
TO anon 
USING (true);