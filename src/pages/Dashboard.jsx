import Card from "../components/Card";
import InviteForm from "../components/InviteForm";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
const Dashboard = ({ user }) => {
  return (
    <>
      <NavBar />
      <Card user={`${user.data.firstName} ${user?.data.lastName}`} />
      <InviteForm token={user?.token} />
    </>
  );
};
Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
export default Dashboard;
