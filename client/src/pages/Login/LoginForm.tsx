import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/ServiceUtilisateur";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.email, data.password);
      window.location.href = "/"; // Redirection vers la page d'accueil
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
    }
  };

  return (
    <div className="societe-form-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="societe-form-box">
        <div className="form-group">
          <label>Email</label>
          <input {...register("email", { required: "Email requis" })} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            {...register("password", { required: "Mot de passe requis" })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
