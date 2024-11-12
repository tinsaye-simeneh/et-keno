import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Keno from "./pages/keno";
import Login from "./pages/login";

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/" element={<Keno />} />
      </Routes>
    </Suspense>
  );
}

export default App;
