import LoadingIndicator from "../components/UI/LoadingIndicator";
import { fetchExpenses } from "../util/http";
import useMyQuery from "../hooks/useMyQuery";
import ExpenseModalContextProvider from "../store/expense-modal-context";
import ExpenseTable from "../components/data-display/ExpenseTable";

export default function ExpensePage() {
   const { isPending, data } = useMyQuery(fetchExpenses, ['expenses']);
   let content;

   if (isPending) {
      content = <LoadingIndicator />
   }

   if (data) {
      content = (
         <ExpenseModalContextProvider>
            <ExpenseTable data={data} />
         </ExpenseModalContextProvider>
      );
   }

   return content;
}