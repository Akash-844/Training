import { removeTask, replaceTask, updateTask } from "@/services/task-service";

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();

  const { id } = await params;

  const taskId = Number(id);

  const updatedTask = await replaceTask(taskId, body);
  return Response.json(updatedTask, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const taskId = Number(id);
  const deleted = await removeTask(taskId);
  return Response.json(deleted, { status: 200 });
}
