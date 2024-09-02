import { useState } from "react";
import SearchForm from "./SearchForm";
import DataList from "./DataList";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <SearchForm search={search} setSearch={setSearch} />
      <DataList search={search} />
    </div>
  );
}

export default App;
