function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// This is only excuse on the server after deployement
export async function getServerSideProps(context) {
  // This req, and res is same as in node js
  const { params, req, res } = context;

  console.log("Server side code");

  return {
    props: {
      username: "Max",
    },
  };
}
