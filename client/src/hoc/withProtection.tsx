import { Navigate } from "react-router-dom";

// ce HOC (Higher-Order Component) protège les routes en vérifiant si l'utilisateur est authentifié
// si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion
// si l'utilisateur est authentifié, on rend juste la page derrère
const withProtection = (children: React.ReactNode) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default withProtection;
