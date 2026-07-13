import { supabase } from "@/lib/supabase";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default async function Home() {

  const { data, error } = await supabase
    .from('test_connection')
    .select('message')
    .limit(1)
    .single()

  if (error) {
    console.log("Database error: ", error.message)
  }

  return (
    <div>
      <h1 className="text-forged">{data ? data.message : 'Error' }</h1>
      <p>Main text</p>
      <p>Main text with <span className="text-orange">higlight</span> then some <span className="text-secondary">secondary text</span>.</p>
      <p className="text-flavor">Some flavor text</p>
      <p className="text-gray">Gray text</p>
      <p className="text-yellow">Yellow text</p>
      <p className="text-green">Green text</p>
      <p className="text-red">Red text</p>
      <p className="text-blue">Blue text</p>
      <p className="text-purple">Purple text</p>
      <p className="text-gold">Gold text</p>
      <p className="text-brown">Brown text</p>
      <p className="text-darkgreen">Dark green text</p>
      <Button>Turn</Button>
      <Card>
        <h1 className="text-forged">Ealemir</h1>
        <p>Main text</p>
        <p>Main text with <span className="text-orange">higlight</span> then some <span className="text-secondary">secondary text</span>.</p>
        <p className="text-flavor">Some flavor text</p>
        <p className="text-gray">Gray text</p>
        <p className="text-yellow">Yellow text</p>
        <p className="text-green">Green text</p>
        <p className="text-red">Red text</p>
        <p className="text-blue">Blue text</p>
        <p className="text-purple">Purple text</p>
        <p className="text-gold">Gold text</p>
        <p className="text-brown">Brown text</p>
        <p className="text-darkgreen">Dark green text</p>
        <Button variant="danger">Reset</Button>
      </Card>
    </div>
  );
}
