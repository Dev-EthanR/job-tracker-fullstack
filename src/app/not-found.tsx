import NotFound from "./components/NotFound";

const Page404 = () => {
  return (
    <main className="w-full h-screen">
      <NotFound
        heading={"Page not found"}
        subtext={"We can't find the page you're looking for."}
        type={"main"}
      />
    </main>
  );
};

export default Page404;
