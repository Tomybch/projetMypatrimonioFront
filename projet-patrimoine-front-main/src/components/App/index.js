// == Import
import { setToken } from "src/actions/users";
import { useDispatch } from "react-redux";
import Header from "../Header";
import "./styles.scss";
import Content from "../Content";
import Footer from "../Footer";

// == Composant
function App() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("user"));
  if (token) {
    dispatch(setToken(token));
  }
  return (
    <div className="app">
      <Header />
      <Content />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
