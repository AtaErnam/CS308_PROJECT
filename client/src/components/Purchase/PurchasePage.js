import { useState } from "react";
import { Spinner } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Text,
  Box,
  Divider,
  Stack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import "./PurchasePage.css";

const PurchasePage = () => {
  const [processing, setProcessing] = useState(false);
  const [inTransit, setInTransit] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [showModal, setShowModal] = useState(false); // new state variable to control the modal
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setInTransit(true);
    }, 3000);
    setTimeout(() => {
      setInTransit(false);
      setDelivered(true);
      setPurchased(true);
    }, 8000);
    setShowModal(true); // show the modal when the purchase is completed
    toast({
      title: "Purchase Completed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <form id="paymentPage" onSubmit={handleSubmit}>
      <br />
      <Stack direction="column" p={2}>
        <Text fontSize="2xl">Personal Information</Text>
        <Divider orientation="horizontal" />
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
      </Stack>
      <Stack direction="column" p={2}>
        <Text fontSize="2xl">Card Information</Text>
        <Divider orientation="horizontal" />
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
          <FormControl isRequired>
            <FormLabel>Cardholder Name</FormLabel>
            <Input
              placeholder="Cardholder Name"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Card Number</FormLabel>
            <Input
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>CVV</FormLabel>
            <Input
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Expiration Date</FormLabel>
            <Input
              placeholder="Expiration Date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </FormControl>
        </Box>
      </Stack>
      <Button mt={4} colorScheme="green" type="submit">
        Complete Purchase
      </Button>
      {processing && (
        <Box mt={4}>
          <Text fontSize="xl">Processing Purchase... Decreasing from stock...</Text>
          <Spinner size="xl" color="green.500" />
        </Box>
      )}
      {inTransit && (
        <Box mt={4}>
          <Text fontSize="xl">In Transit...</Text>
          <Spinner size="xl" color="yellow.500" />
        </Box>
      )}
      {delivered && (
        <Box mt={4}>
          <Text fontSize="xl">Delivered!</Text>
          <CheckCircleIcon size="xl" color="green.500" />
        </Box>
      )}
    </form>
  );
};

export default PurchasePage;
