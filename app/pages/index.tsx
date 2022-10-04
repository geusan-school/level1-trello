import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import Section from '../src/components/Section'

export type TaskType = {
  id: number;
  title: string;
  description: string;
}
type ContextProps = {
  tasks: TaskType[][],
  addTask(sectionIndex: number, newTask: TaskType): void,
  deleteTask(sectionIndex: number, newTask: TaskType): void,
  moveTask(beforeSectionIndex: number, afterSectionIndex: number, newTask: TaskType): void,
  swapTask(sectionIndex: number, task: TaskType, movement: number): void,
}
export const TrelloContext = React.createContext<ContextProps>({
  tasks: [],
} as any);

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<TaskType[][]>([
    [],
    [],
    [],
  ]);
  const addTask = (sectionIndex: number, newTask: TaskType) => {
    setTasks(prev => {
      return [
        ...prev.slice(0, sectionIndex),
        [newTask, ...prev[sectionIndex]],
        ...prev.slice(sectionIndex + 1),
      ]
    });
  }
  const deleteTask = (sectionIndex: number, task: TaskType) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, idx),
          ...prev[sectionIndex].slice(idx + 1),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    });
  }
  const moveTask = (beforeSectionIndex: number, afterSectionIndex: number, task: TaskType) => {
    if (tasks.length === afterSectionIndex) return;
    if (afterSectionIndex < 0) return;
    deleteTask(beforeSectionIndex, task);
    addTask(afterSectionIndex, task);
  }
  const swapTask = (sectionIndex: number, task:TaskType, movement: 1 | -1) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      const anotherIndex = idx + movement;
      if (anotherIndex < 0) return prev;
      if (anotherIndex === prev[sectionIndex].length) return prev;
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, Math.min(idx, anotherIndex)),
          ...(movement > 0 ? [
            prev[sectionIndex][anotherIndex],
            prev[sectionIndex][idx],
          ] : [
            prev[sectionIndex][idx],
            prev[sectionIndex][anotherIndex],
          ]),
          ...prev[sectionIndex].slice(Math.max(idx, anotherIndex) + 1),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    })
  };

  return (
    <TrelloContext.Provider value={{ tasks, addTask, deleteTask, moveTask, swapTask }}>
      <NextSeo 
        title="규산투두리스트"
        openGraph={{
          title: '규산투두리스트',
          description: '규산스쿨 첫번째 강의 트렐로',
          images: [
            { url: 'https://upload.wikimedia.org/wikipedia/ko/8/81/Spongebob_4795.jpg' },
          ]
        }}
      />
      <Box display="flex" justifyContent="space-between" p={4}>
        <Section title="To Do" index={0} />
        <Box w={4} />
        <Section title="Doing" index={1} />
        <Box w={4} />
        <Section title="Done" index={2} />
      </Box>
    </TrelloContext.Provider>
  )
}

export default Home
