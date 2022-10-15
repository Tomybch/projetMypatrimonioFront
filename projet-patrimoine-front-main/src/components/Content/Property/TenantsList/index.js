import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function TenantsList({
  id,
  firstName,
  lastName,
  email,
  entryDate,
  exitDate,
  phoneNumber,
  rent,
  slug,
  propertyslug,
}) {
  const token = useSelector((state) => state.user.token);

  const handleDelete = () => {
    axios
      .delete(
        `https://mypatrimonio-back.herokuapp.com/api/v1_0/tenants/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Locataire supprimé");
        window.location.href = `/mes-biens/${propertyslug}`;
      });
  };

  return (
    <div className="tenant-content">
      <ul>
        <li className="tenant-data">Prénom : {firstName}</li>
        <li className="tenant-data">Nom : {lastName}</li>
        <li className="tenant-data">Email : {email}</li>
        <li className="tenant-data">N° Tel: {phoneNumber}</li>
        <li className="tenant-data">Loyer : {rent}</li>
      </ul>
      <Link to={`/${slug}/modifier-locataire/${slug}`}>
        <button className="button-34" type="button">
          modifier
        </button>
      </Link>
      <button className="button-34" type="button" onClick={handleDelete}>
        supprimer
      </button>
    </div>
  );
}

export default TenantsList;
