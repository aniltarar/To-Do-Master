import React, { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { getTasks } from '../../redux/slices/taskSlice';
import { getCategories } from '../../redux/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, PieChart, Pie, Tooltip, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Legend, LabelList } from 'recharts';
import { Link } from 'react-router-dom';

const HomeDash = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { categories } = useSelector((state) => state.category);

  // Kategorilere göre her birinin göreve sahip olma sayısı
  const categoryData = categories?.map((category) => {
    const categoryTasks = tasks.filter((task) => task.category.id === category.id);
    return {
      name: category.categoryName,
      value: categoryTasks.length,
      color: category.categoryColor,
    };
  });

  // Her görevin subtask sayısını gösteren veri
  const taskSubtaskData = tasks?.map((task) => ({
    name: task.taskName,
    value: task.subTasks.length,
    color: task.category.categoryColor,
  }));

  // Her subtask'ın 'done' olma oranını hesaplayan veri
  const taskCompletionData = tasks?.map((task) => {
    const completedSubtasks = task.subTasks.filter((subtask) => subtask.status === 'done').length;
    const completionPercentage = (completedSubtasks / task.subTasks.length) * 100;
    return {
      name: task.taskName,
      value: completionPercentage,
      color: task.category.categoryColor,
    };
  });

  if (categories.length === 0 || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full gap-y-5">
        <h1 className="text-3xl font-semibold">Hey {user.displayName}, Welcome to your Dashboard!</h1>
        <p className="text-lg text-gray-400">You don't have any tasks or categories yet. You can create them from the tasks page. You should create a category first.</p>
        <span className='flex items-center gap-2 '>
          <Link to='/categories' className='text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600'>Go to Categories</Link>
          <Link to='/tasks' className='text-white bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600'>Go to Tasks</Link>
        </span>
      </div>
    )
  }


  useEffect(() => {
    dispatch(getTasks(user.uid));
    dispatch(getCategories(user.uid));
  }, [user]);

  return (
    <div className="flex flex-col w-full gap-y-5">

      <div className='flex flex-col gap-y-5 border-b pb-3'>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Tasks Card */}
        <div className="flex flex-col items-center justify-between p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-2xl font-semibold text-white">Tasks</h1>
          <div className="flex flex-col gap-y-2 mt-4">
            <h1 className="text-4xl font-bold text-indigo-400">{tasks.length}</h1>
            <p className="text-sm font-light text-gray-400">Total Tasks</p>
          </div>
        </div>

        {/* Total Categories Card */}
        <div className="flex flex-col items-center justify-between p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-2xl font-semibold text-white">Categories</h1>
          <div className="flex flex-col gap-y-2 mt-4">
            <h1 className="text-4xl font-bold text-green-400">{categories.length}</h1>
            <p className="text-sm font-light text-gray-400">Total Categories</p>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="flex flex-col items-center justify-between p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-2xl font-semibold text-white">Completed Tasks</h1>
          <div className="flex flex-col gap-y-2 mt-4">
            <h1 className="text-4xl font-bold text-pink-400">{tasks.filter((task) => task.status === 'done').length}</h1>
            <p className="text-sm font-light text-gray-400">Total Completed Tasks</p>
          </div>
        </div>
      </div>

      {/* Grid for PieCharts and BarCharts */}
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        {/* Kategorilere Göre Bar Chart */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-xl text-white font-semibold mb-4">Tasks per Category</h1>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList dataKey="value" position="top" fill="#fff" fontSize={14} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Görevdeki Subtask Sayısının Grafiği */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-xl text-white font-semibold mb-4">Subtasks per Task</h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskSubtaskData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
              >
                {taskSubtaskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList dataKey="value" position="center" fill="#fff" fontSize={14} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subtask Tamamlanma Oranı Bar Chart */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-xl text-white font-semibold mb-4">Completion Percentage per Task</h1>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d">
                {taskCompletionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList dataKey="value" position="top" fill="#fff" fontSize={14} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
