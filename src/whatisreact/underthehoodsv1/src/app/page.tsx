import ListItems from "@/components/ListItems";
import PageTitle from "@/components/PageTitle";

const Home = () => {

  const pageTitle = 'React JS - Under the Hoods';
  const numbers = [1, 2];

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <div className="flex flex-col items-center w-[800px] bg-slate-100 shadow-md shadow-blue-800 rounded-md border-solid border-2 border-indigo-600">
        <PageTitle title={pageTitle}></PageTitle>

        <ListItems numbers={numbers} />
      </div>
    </main>
  )
};

export default Home;