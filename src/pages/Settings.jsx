import UserCard from "../components/ui/UserCard";
import UserModalContextProvider from "../store/user-modal-context";

export default function SettingPage() {
   return (
      <UserModalContextProvider>
         <UserCard />
      </UserModalContextProvider>
   );
}