import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const {isPending, error, data} = useQuery({
    queryKey:['userData'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/users/');
      return await response.json();
    }
  })

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred ' + error.message;

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div>{data[0].name}</div>
      <div>{data[0].email}</div>
      <div>{data[0].phone}</div>
    </div>
  )
}
