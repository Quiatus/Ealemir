-- Create the table
CREATE TABLE public.player_resources (
  id INT PRIMARY KEY,
  turn INT NOT NULL DEFAULT 1
);

INSERT INTO public.player_resources (id, turn) VALUES (1, 1);

ALTER TABLE public.player_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access for local dev" ON public.player_resources FOR ALL USING (true);