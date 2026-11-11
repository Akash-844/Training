import { createdTask, updateTask } from "@/services/task-service";
import { getTasks } from "../../../repositories/task-repo";

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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const { id } = await params;

  const taskId = Number(id);
  const updatedTask = await updateTask(taskId, body);
  return Response.json(updatedTask, { status: 200 });
}
