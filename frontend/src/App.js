import { BrowserRouter } from "react-router-dom";
import { CreateRouter } from './router.jsx';

function App() {
  return (
    <BrowserRouter>
      <CreateRouter />
    </BrowserRouter>
  );
}

export default App