import { useNavigate } from "react-router-dom";

function DeniedPage() {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold tracking-widest">403</h1>
      <div className="text-xl font-bold m-2">Access Denied</div>
      <button onClick={() => navigate(-1)} className="mt-4">
        <span
          onClick={() => navigate(-1)}
          className="text-lg font-bold bg-orange-500 rounded hover:bg-orange-600 px-6 py-2"
        >
          Go Back
        </span>
      </button>
    </main>
  );
}

export default DeniedPage;
