import { createdTask } from "@/services/task-service";
import { getTasks } from "../../../repositories/task-repo";

// export const metadata = {
//   title: "Routes"
// };
export async function GET() {
  const tasks = await getTasks();
  return Response.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();

  const createTask = await createdTask(body);
  return Response.json(createTask, {
    status: 201
  });
}
