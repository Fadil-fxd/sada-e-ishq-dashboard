import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const cors = {
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type",
  "Content-Type":"application/json"
};

const APP_URL = "https://sada-e-ishq-dashboard-live.onrender.com/?auth=artist";

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
  try{
    const auth=req.headers.get("Authorization")||"";
    const token=auth.replace(/^Bearer\s+/i,"");
    if(!token) return new Response(JSON.stringify({error:"Unauthorized"}),{status:401,headers:cors});
    const url=Deno.env.get("SUPABASE_URL");
    const service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if(!url||!service) throw new Error("Server configuration missing");

    const adminClient=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
    const actor=await adminClient.auth.getUser(token);
    if(actor.error||!actor.data.user) return new Response(JSON.stringify({error:"Unauthorized"}),{status:401,headers:cors});

    const {data:profile}=await adminClient.from("profiles").select("role,active").eq("id",actor.data.user.id).maybeSingle();
    if(!profile||profile.role!=="admin"||!profile.active) return new Response(JSON.stringify({error:"Admin permission required"}),{status:403,headers:cors});

    const body=await req.json();
    const email=String(body.email||"").trim().toLowerCase();
    const display_name=String(body.display_name||"").trim();
    const instrument=String(body.instrument||"").trim()||null;
    if(!email||!display_name) return new Response(JSON.stringify({error:"Email and display name are required"}),{status:400,headers:cors});

    const users=await adminClient.auth.admin.listUsers({page:1,perPage:1000});
    if(users.error) throw users.error;
    const existing=users.data.users.find((u)=>String(u.email||"").toLowerCase()===email);

    if(existing){
      const {data:existingProfile}=await adminClient.from("profiles").select("role,active").eq("id",existing.id).maybeSingle();
      if(existingProfile?.role==="admin") return new Response(JSON.stringify({error:"That email is already an admin account."}),{status:409,headers:cors});
      const ins=await adminClient.from("profiles").upsert({id:existing.id,role:"artist",display_name,instrument,active:true},{onConflict:"id"});
      if(ins.error) throw ins.error;
      return new Response(JSON.stringify({ok:true,user_id:existing.id,existing:true,message:"Artist account already existed. They can request a sign-in link now."}),{status:200,headers:cors});
    }

    const invited=await adminClient.auth.admin.inviteUserByEmail(email,{redirectTo:APP_URL});
    if(invited.error) throw invited.error;
    const user=invited.data.user;
    const ins=await adminClient.from("profiles").upsert({id:user.id,role:"artist",display_name,instrument,active:true},{onConflict:"id"});
    if(ins.error) throw ins.error;

    return new Response(JSON.stringify({ok:true,user_id:user.id,existing:false}),{status:200,headers:cors});
  }catch(e){
    return new Response(JSON.stringify({error:String(e?.message||e||"Invite failed")}),{status:400,headers:cors});
  }
});