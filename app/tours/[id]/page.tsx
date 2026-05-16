const page = ({ params }: { params: { id: string } }) => {
  console.log(params);

  return (
    <div>
      <h1 className="text-4xl">ID : {params.id}</h1>
    </div>
  );
};
export default page;
