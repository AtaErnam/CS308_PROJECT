import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Textarea,
    Text,
    Box,
    Divider,
    Stack
} from '@chakra-ui/react'

import "./PaymentPage.css"

const PaymentPage = () => {

    return (
        <form id="paymentPage">
            <br></br>
            <Stack direction='column' p={2}>
            <Text fontSize="2xl">Personal Information</Text>
            <Divider orientation='horizontal' />
                <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder='First name' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder='Last name' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input placeholder='Phone Number' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Textarea
                        placeholder='Address'
                    />
                </FormControl>
            </Stack>
            <Stack direction='column' p={2}>
                <Text fontSize="2xl">Card Information</Text>
                <Divider orientation='horizontal' />
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
                    <FormControl isRequired>
                        <FormLabel>Cardholder Name</FormLabel>
                        <Input placeholder='Cardholder Name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Card Number</FormLabel>
                        <Input placeholder='Card Number' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>CVV</FormLabel>
                        <Input placeholder='CVV' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Expiration Date</FormLabel>
                        <Input placeholder='Expiration Date' />
                    </FormControl>
                </Box>
            </Stack>
            <Button
                mt={4}
                colorScheme='green'
                type='submit'
            >
                Complete Purchase
            </Button>
            <br></br>
        </form>
    )
};

export default PaymentPage;