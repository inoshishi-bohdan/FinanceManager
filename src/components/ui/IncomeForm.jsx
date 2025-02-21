import useMyQuery from '../../hooks/useMyQuery'
import { fetchCurrencies, fetchIncomeCategories } from "../../util/http";
import FormSelect from "./FormSelect";
import modalClasses from './Modal.module.css'
import Input from "./Input";
import useMyMutation from '../../hooks/useMyMutation';
import ErrorBox from './ErrorBox';

export default function IncomeForm({ title, record, onCancel, mutationFn, onSuccess }) {
   const { data: incomeCategories, isPending: isPendingCategories } = useMyQuery(fetchIncomeCategories, ['income-categories']);
   const { data: currencies, isPending: isPendingCurrencies } = useMyQuery(fetchCurrencies, ['currencies']);
   const { mutate, responseMessage, isPending } = useMyMutation(mutationFn, onSuccess);

   function handleSubmit(event) {
      event.preventDefault();
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const request = {
         title: data.title,
         date: data.date || null,
         amount: data.amount || null,
         currencyId: data.currencyId || null,
         incomeCategoryId: data.incomeCategoryId || null,
      };


      if (record) {
         mutate({ id: record.id, request });
      } else {
         mutate(request)
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <h4 className='text-center auth mb-4'>{title}</h4>
         {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
         <Input
            id='title'
            name='title'
            label='Title'
            type='text'
            defaultValue={record?.title ?? ''}
            required
         />
         <Input
            id='date'
            name='date'
            label='Date'
            type='date'
            defaultValue={record?.date ?? ''}
            required
         />
         <Input
            id='amount'
            name='amount'
            label='Amount'
            type='number'
            defaultValue={record?.amount ?? ''}
            min='0'
            step='0.01'
            required
         />
         {isPendingCurrencies && <p>Loading selectable currencies...</p>}
         {currencies && <FormSelect
            id='currency'
            name='currencyId'
            label='Currency'
            defaultValue={record?.currencyId ?? ''}
            options={currencies}
            text='Select currency'
            required
         />}
         {isPendingCategories && <p>Loading selectable categories...</p>}
         {incomeCategories && <FormSelect
            id='incomeCategory'
            name='incomeCategoryId'
            label='Income category'
            defaultValue={record?.incomeCategoryId ?? ''}
            options={incomeCategories}
            text='Select category'
            required
         />}
         <div className={`${modalClasses['modal-actions']} mt-4`}>
            <button type="submit" className="btn btn-primary" disabled={isPending}>{isPending ? 'Submitting...' : 'Confirm'}</button>
            <button className="btn btn-secondary" onClick={onCancel} disabled={isPending}>Cancel</button>
         </div>
      </form>);
}