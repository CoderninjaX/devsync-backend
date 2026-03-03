import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
function DroppableColumn({ id, children, title }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 rounded shadow min-h-[400px]"
    >
      <h3 className="font-semibold mb-4 uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}
function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-50 p-3 rounded mb-3 shadow-sm cursor-grab"
    >
      <p className="font-medium">{task.title}</p>
    </div>
  );
}

export default function Workspace() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const { data } = await API.get(`/tasks/${id}`);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return;
    await API.post(`/tasks/${id}`, { title });
    setTitle("");
    fetchTasks();
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    await API.patch(`/tasks/${taskId}/status`, {
      status: newStatus,
    });

    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Workspace</h1>

        <div className="flex gap-4 mb-8">
          <input
            className="border px-4 py-2 rounded w-64"
            placeholder="New task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-black text-white px-6 py-2 rounded"
            onClick={createTask}
          >
            Add Task
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-3 gap-6">
            {["todo", "inprogress", "done"].map((status) => (
              <DroppableColumn key={status} id={status} title={status}>
                <SortableContext
                  items={tasks
                    .filter((t) => t.status === status)
                    .map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {tasks
                    .filter((t) => t.status === status)
                    .map((t) => (
                      <TaskCard key={t.id} task={t} />
                    ))}
                </SortableContext>
              </DroppableColumn>
            ))}
          </div>
        </DndContext>
      </div>
    </>
  );
}