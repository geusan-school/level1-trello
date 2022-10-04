import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { TaskType, TrelloContext } from "../../pages";

const DATA = [
  {
    id: 1,
    title: "1",
    description: "content1"
  },
  {
    id: 2,
    title: "2",
    description: "content2"
  },
  {
    id: 3,
    title: "3",
    description: "content3"
  },
  {
    id: 4,
    title: "4",
    description: "content4"
  },
  {
    id: 5,
    title: "5",
    description: "content5"
  },
]

export default function Section({ title: sectionTitle, index }: { title: string, index: number }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: updateModalIsOpen, onClose: onUpdateModalClose, onOpen: onUpdateModalOpen } = useDisclosure();
  const [currentId, setCurrentId] = useState(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setTasks] = useState<TaskType[]>(DATA);
  const openCreateModal = () => onOpen();
  const { addTask: handleAddTask, tasks: sections, moveTask, deleteTask, swapTask } = useContext(TrelloContext);
  const tasks = sections[index];
  const addTask = () => {
    // 카드 추가
    handleAddTask?.(index, {
      id: Date.now(),
      title: title,
      description,
    });
    // 입력값 초기화
    setTitle('');
    setDescription('');
    // 모달 닫기
    onClose();
  }
  const openUpdateModal = (task: TaskType) => {
    onUpdateModalOpen();
    setTitle(task.title);
    setDescription(task.description);
    setCurrentId(task.id);
  }
  const updateTask = () => {
    const idx = tasks.findIndex(t => t.id === currentId);
    setTasks([
      ...tasks.slice(0, idx),
      {
        id: currentId,
        title,
        description,
      },
      ...tasks.slice(idx + 1),
    ]);
    onUpdateModalClose();
  }
  const moveUpTask = (task: TaskType) => {
    swapTask(index, task, -1);
  }
  const moveDownTask = (task: TaskType) => {
    swapTask(index, task, 1);
  }
  const moveRightTask = (task: TaskType) => {
    moveTask(index, index + 1, task);
  }
  const moveLeftTask = (task: TaskType) => {
    moveTask(index, index - 1, task);
  }
  return (
    <Box bg="tomato" flex={1} borderRadius={4} p={4}>
      <Heading>{sectionTitle}</Heading>
      <Button onClick={openCreateModal}>
        할일 추가
      </Button>
      <Stack>
        {tasks.map((task) => (
          <Box key={task.id} bg="cyan.200" p={4} borderRadius={4}>
            <Heading fontSize="md">{task.title}</Heading>
            <Text>{task.description}</Text>
            <Button onClick={() => deleteTask(index, task)}>삭제</Button>
            <Button onClick={() => openUpdateModal(task)}>
              수정
            </Button>
            <Button onClick={() => moveUpTask(task)}>
              위로
            </Button>
            <Button onClick={() => moveDownTask(task)}>
              아래로
            </Button>
            <Button onClick={() => moveLeftTask(task)}>
               왼쪽으로
            </Button>
            <Button onClick={() => moveRightTask(task)}>
              오른쪽으로
            </Button>
          </Box>
        ))}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>할일 추가</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={addTask}>추가하기</Button>
            <Button variant="text" onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={updateModalIsOpen} onClose={onUpdateModalClose}>
        <ModalContent>
          <ModalHeader>카드 수정</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={updateTask}>수정하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
