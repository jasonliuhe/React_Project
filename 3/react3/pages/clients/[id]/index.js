import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.query);
  function loadPorjectHandler() {
    //load data...
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  }
  return (
    <div>
      <h1>The Projects of a given Client</h1>
      <button onClick={loadPorjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
