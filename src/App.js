import Start from "./routes/start/start.component";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.componet";
import SignIn from "./routes/sign-in/sign-in.component";


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
      <Route index element={<Start />} />
      <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};
export default App;
