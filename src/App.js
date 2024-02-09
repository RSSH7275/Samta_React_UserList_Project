import UserListPage from "./components/UserListPage";
import './App.css';

export const config={endpoint:"https://jsonplaceholder.typicode.com/users"};

function App() {
  return (
    <div className="App">
      <UserListPage/>
    </div>
  );
}

export default App;
