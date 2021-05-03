import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>The proejct page for a specific page.</h1>
    </div>
  );
}

export default SelectedClientProjectPage;
