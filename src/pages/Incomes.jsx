import IncomeTable from "../components/data-display/IncomeTable/IncomeTable";
import LoadingIndicator from "../components/ui/LoadingIndicator/LoadingIndicator";
import useMyQuery from "../hooks/useMyQuery";
import IncomeModalContextProvider from "../store/income-modal-context";
import { fetchIncomes } from "../util/http";

export default function IncomePage() {
   const { isPending, data } = useMyQuery(fetchIncomes, ['incomes']);
   let content;

   if (isPending) {
      content = <LoadingIndicator />
   }

   if (data) {
      content = (
         <IncomeModalContextProvider>
            <IncomeTable data={data} />
         </IncomeModalContextProvider>
      );
   }

   return content;
}

