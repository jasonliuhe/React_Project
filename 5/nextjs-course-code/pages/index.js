import path from "path";
import fs from "fs";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// The browser will first run this getStaticProps function. Then run other functions.
export async function getStaticProps(context) {
  console.log("(Re-)Genereating....");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // cwd is current working directory
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    // This will let page rebuild every 10s.
  };
}

export default HomePage;
