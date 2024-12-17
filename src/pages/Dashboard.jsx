import Card from "../components/Card";
import Form from "../components/InviteForm";
import NavBar from "../components/NavBar";
const Dashboard = () => {
  return (
    <>
      <NavBar />
      <Card user="John" />
      <Form />
    </>
  );
};

export default Dashboard;
