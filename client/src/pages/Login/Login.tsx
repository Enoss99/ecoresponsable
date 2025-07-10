import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
