import LoginForm from '../components/LoginForm';
import PageContent from '../components/PageContent';
import { redirect } from 'react-router-dom';

export default function LoginPage() {
   return (
      <LoginForm />
   );
}

export async function action({ request }) {
   const data = await request.formData();
   const authData = {
      email: data.get('email'),
      password: data.get('password')
   }

   const response = await fetch(`https://localhost:7209/api/Auth/login`, {
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
      throw new Response(JSON.stringify({ message: 'Could not login user' }, { status: 500 }));
   }

   return redirect('/');
}