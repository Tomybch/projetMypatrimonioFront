import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Homepage from "./Homepage";

import NotFound from "./NotFound";
import AccountParams from "./AccountParams";
import Listing from "./Listing";
import Property from "./Property";
import AddPropertyForm from "./AddPropertyForm";
import AddTenantForm from "./Property/Tenants/TenantAdd";
import TenantEdit from "./Property/Tenants/TenantEdit"
import EditProperty from "./EditProperty";

import AddChargesForm from "./AddChargesForm";

import Subscribe from "./Subscribe";
import Stats from "./Stats";
import "./styles.scss";
import ROISimulation from "./ROISimulation";
import LegalNotice from "../Footer/LegalNotice";
import CreditMod from "./Property/Credit/CreditMod";
import CreditAdd from "./Property/Credit/CreditAdd";
import CreditSimulation from "./CreditSimulation";

function Content() {
  const isLogged = useSelector((state) => state.user.islogged);

  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/simulation-rentabilite" element={<ROISimulation />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/inscription" element={<Subscribe />} />
        <Route path="/parametres" element={<AccountParams />} />
        <Route path="/mentions-legales" element={<LegalNotice />} />
        <Route path="/simulation-credit" element={<CreditSimulation />} />

        {isLogged && (
          <>
            <Route path="/mes-biens" element={<Listing />} />
            <Route path="/mes-biens/:slug" element={<Property />} />
            <Route
              path="/mes-biens/:slug/modifier-credit"
              element={<CreditMod />}
            />
            <Route
              path="/mes-biens/:slug/ajout-credit"
              element={<CreditAdd />}
            />
            <Route path="/ajout-de-bien" element={<AddPropertyForm />} />
            <Route path="/:slug/ajout-locataire" element={<AddTenantForm />} />
            <Route path="/:slug/modifier-locataire/:slug" element={<TenantEdit />} />
            <Route path="/charges" element={<AddChargesForm />} />
            <Route path="/statistiques" element={<Stats />} />
            <Route path="/modifier-mon-bien/:slug" element={<EditProperty />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default Content;
