import { Form, useActionData, useNavigation } from "react-router-dom";
import ErrorBox from "./ErrorBox";
import Input from "./Input";

export default function LoginForm() {
   const data = useActionData();
   const navigation = useNavigation();
   const isSubmitting = navigation.state === 'submitting'

   return (
      <Form className='auth' method='POST'>
         <h4 className='text-center auth mb-5'>Login</h4>
         {data && data.message && data.errors && <ErrorBox message={data.message} errors={data.errors} />}
         <Input required type="email" label='Email address' name='email' id='email' />
         <Input required type="password" label='Password' name='password' id='password' />
         <button type="submit" className={`btn btn-primary auth mt-4`}>{isSubmitting ? 'Submitting...' : 'Login'}</button>
      </Form>
   );
}