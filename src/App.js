import Start from "./routes/start/start.component";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.componet";
import Authentication from "./routes/authentication/authentication.component";


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
      <Route index element={<Start />} />
      <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};
export default App;
