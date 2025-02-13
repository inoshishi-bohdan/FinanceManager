import IncomeTable from "../components/data-display/IncomeTable";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import useMyQuery from "../hooks/useMyQuery";
import { fetchIncomes } from "../util/http";

export default function IncomePage() {
   const {isPending, data} = useMyQuery(fetchIncomes, ['incomes']);
   let content;

   if (isPending) {
      content = <LoadingIndicator />
   }

   if (data) {
      content = <IncomeTable data={data} />
   }

   return content;
}

