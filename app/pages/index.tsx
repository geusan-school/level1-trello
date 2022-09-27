import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState } from 'react'
import Section from '../src/components/Section'

const Home: NextPage = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={4}>
      <Section title="To Do" />
      <Box w={4} />
      <Section title="Doing" />
      <Box w={4} />
      <Section title="Done" />
    </Box>
  )
}

export default Home
