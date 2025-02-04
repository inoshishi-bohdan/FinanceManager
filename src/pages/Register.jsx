import RegisterForm from "../components/RegisterForm";
import { redirect } from 'react-router-dom';

export default function RegisterPage() {
   return <RegisterForm />
}


export async function action({ request }) {
   const data = await request.formData();
   const requestBody = {
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password')
   }
   let response;

   try {
      response = await fetch(`https://localhost:7209/api/Auth/register`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(requestBody)
      });
   } catch (error) {
      console.error("Fetch Error:", error);
      throw new Response(JSON.stringify({ message: 'A network error occurred' }, { status: 500 })); 
   }

   if (response.status === 400) {
      return response;
   }

   if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Could not register user' }, { status: 500 }));
   }

   return redirect('/login');
}