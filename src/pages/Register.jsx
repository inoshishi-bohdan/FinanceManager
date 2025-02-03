import PageContent from "../components/PageContent";
import RegisterForm from "../components/RegisterForm";
import { redirect } from 'react-router-dom';

export default function RegisterPage() {
   return <RegisterForm />
}


export async function action({ request }) {
   const data = await request.formData();
   const authData = {
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password')
   }

   const response = await fetch(`https://localhost:7209/api/Auth/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
   });

   if (response.status === 400) {
      return response;
   }

   if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Could not register user' }, { status: 500 }));
   }

   return redirect('/login');
}